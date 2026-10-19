import { ChangeDetectionStrategy, Component, computed, DestroyRef, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent, TextButtonComponent } from 'ui';
import { OrgBodyPortalDirective } from '../../directives/org-body-portal.directive';
import { OrgNode, OrgPerson } from '../../models/org-chart.model';
import { OrgChartService } from '../../services/org-chart/org-chart.service';
import { buildForest, chainOf, deptTone, descendantIds, findParent, initials, matches } from '../../services/org-chart/org-chart.utils';

/** Until login exists the page treats this employee as "me" (same as Leave / Attendance). */
const ME = 'EMP00001';
const ZOOMS = [0.5, 0.65, 0.8, 1, 1.15, 1.3];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type View = 'tree' | 'list';

/**
 * Organization chart.
 * Everyone: tree with expand / collapse, search, department highlight, zoom, "find me", list view and a profile drawer.
 * HR / admin (`/hr/org-chart`, `/admin/org-chart`, or `[manage]="true"`): change someone's manager (their team moves with them).
 */
@Component({
  selector: 'org-chart-root',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TextButtonComponent, OrgBodyPortalDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './org-chart.component.html',
  styleUrl: './org-chart.component.scss',
})
export class OrgChartComponent implements OnInit {
  private readonly service = inject(OrgChartService);
  private readonly router = inject(Router, { optional: true });
  private readonly document = inject(DOCUMENT);

  /** Force HR tools on/off. Default: on for /hr and /admin routes. */
  readonly manage = input<boolean | null>(null);

  readonly me = ME;
  readonly initials = initials;
  readonly tone = deptTone;

  readonly canManage = computed(() => this.manage() ?? /^\/(hr|admin)(\/|$)/.test(this.router?.url ?? ''));
  readonly isOnline = this.service.isOnline;

  readonly people = signal<OrgPerson[]>([]);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toast = signal<string | null>(null);

  readonly view = signal<View>('tree');
  readonly query = signal('');
  readonly department = signal('All');
  readonly zoomIndex = signal(3);
  readonly expanded = signal<Set<string>>(new Set());
  readonly focusId = signal<string | null>(null);
  readonly selectedId = signal<string | null>(null);
  readonly searchOpen = signal(false);

  readonly forest = computed(() => buildForest(this.people()));
  readonly zoom = computed(() => ZOOMS[this.zoomIndex()]);
  readonly departments = computed(() => [...new Set(this.people().map((p) => p.department).filter(Boolean))].sort());

  readonly stats = computed(() => {
    const f = this.forest();
    const managers = [...f.byId.values()].filter((n) => n.children.length);
    const span = managers.length ? managers.reduce((s, n) => s + n.children.length, 0) / managers.length : 0;
    return {
      people: f.byId.size,
      departments: this.departments().length,
      managers: managers.length,
      levels: f.levels,
      span: Math.round(span * 10) / 10,
    };
  });

  readonly results = computed(() => {
    const q = this.query().trim();
    if (!q) return [];
    return this.people().filter((p) => matches(p, q)).slice(0, 8);
  });

  /** Departments shown in the list view, each with its people (sorted by level then name). */
  readonly listGroups = computed(() => {
    const f = this.forest();
    const q = this.query();
    const dept = this.department();
    const groups = new Map<string, OrgNode[]>();
    for (const n of f.byId.values()) {
      if (!matches(n.person, q)) continue;
      if (dept !== 'All' && n.person.department !== dept) continue;
      const key = n.person.department || 'No department';
      groups.set(key, [...(groups.get(key) ?? []), n]);
    }
    return [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, nodes]) => ({ name, nodes: nodes.sort((a, b) => a.depth - b.depth || a.person.name.localeCompare(b.person.name)) }));
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    return id ? (this.forest().byId.get(id) ?? null) : null;
  });
  readonly selectedChain = computed(() => {
    const id = this.selectedId();
    return id ? chainOf(this.forest(), id) : [];
  });
  readonly selectedManager = computed(() => {
    const id = this.selectedId();
    return id ? findParent(this.forest(), id) : null;
  });
  readonly selectedDotted = computed(() => {
    const id = this.selected()?.person.dottedLineManagerId;
    return id ? (this.forest().byId.get(id) ?? null) : null;
  });
  readonly selectedPeers = computed(() => {
    const mgr = this.selectedManager();
    const id = this.selectedId();
    return mgr ? mgr.children.filter((c) => c.person.employeeId !== id) : [];
  });

  // ---- Change manager --------------------------------------------------------------------------
  readonly moveTo = signal('');
  readonly moveOptions = computed(() => {
    const node = this.selected();
    if (!node) return [];
    const blocked = descendantIds(node);
    blocked.add(node.person.employeeId);
    return [...this.forest().byId.values()]
      .filter((n) => !blocked.has(n.person.employeeId))
      .map((n) => n.person)
      .sort((a, b) => a.name.localeCompare(b.name));
  });
  readonly moveChanged = computed(() => {
    const node = this.selected();
    return !!node && this.moveTo() !== (this.selectedManager()?.person.employeeId ?? '');
  });

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      if (this.toastTimer) clearTimeout(this.toastTimer);
    });
  }

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      this.people.set(await this.service.list());
      this.expandToDepth(2);
    } catch (e) {
      this.fail(e);
    } finally {
      this.loading.set(false);
    }
  }

  // ---- Tree --------------------------------------------------------------------------------
  isOpen(node: OrgNode): boolean {
    return this.expanded().has(node.person.employeeId);
  }

  toggle(node: OrgNode, event?: Event): void {
    event?.stopPropagation();
    const next = new Set(this.expanded());
    const id = node.person.employeeId;
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expanded.set(next);
  }

  expandAll(): void {
    this.expanded.set(new Set([...this.forest().byId.values()].filter((n) => n.children.length).map((n) => n.person.employeeId)));
  }

  collapseAll(): void {
    this.expandToDepth(0);
  }

  /** Dim cards outside the chosen department / search. */
  isDimmed(p: OrgPerson): boolean {
    const dept = this.department();
    if (dept !== 'All' && p.department !== dept) return true;
    const q = this.query().trim();
    return !!q && !matches(p, q);
  }

  zoomIn(): void {
    this.zoomIndex.update((i) => Math.min(ZOOMS.length - 1, i + 1));
  }

  zoomOut(): void {
    this.zoomIndex.update((i) => Math.max(0, i - 1));
  }

  resetZoom(): void {
    this.zoomIndex.set(3);
  }

  /** Open the path to someone, highlight and scroll to them. */
  reveal(id: string, open = false): void {
    const forest = this.forest();
    if (!forest.byId.has(id)) return;
    const next = new Set(this.expanded());
    for (const n of chainOf(forest, id)) next.add(n.person.employeeId);
    this.expanded.set(next);
    this.view.set('tree');
    this.focusId.set(id);
    this.searchOpen.set(false);
    if (open) this.select(id);
    setTimeout(() => {
      this.document.getElementById(`org-node-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    });
    setTimeout(() => {
      if (this.focusId() === id) this.focusId.set(null);
    }, 2500);
  }

  findMe(): void {
    this.reveal(ME, false);
  }

  onQuery(value: string): void {
    this.query.set(value);
    this.searchOpen.set(!!value.trim());
  }

  pickResult(p: OrgPerson): void {
    this.query.set('');
    this.reveal(p.employeeId, true);
  }

  // ---- Drawer ------------------------------------------------------------------------------
  select(id: string): void {
    this.selectedId.set(id);
    this.moveTo.set(findParent(this.forest(), id)?.person.employeeId ?? '');
  }

  closeDrawer(): void {
    if (!this.busy()) this.selectedId.set(null);
  }

  async saveManager(): Promise<void> {
    const node = this.selected();
    if (!node || !this.moveChanged() || this.busy()) return;
    const target = this.moveTo() || null;
    this.busy.set(true);
    this.error.set(null);
    try {
      this.people.set(await this.service.setManager(node.person.employeeId, target));
      const newMgr = target ? this.forest().byId.get(target)?.person.name : null;
      this.showToast(newMgr ? `${node.person.name} now reports to ${newMgr}.` : `${node.person.name} is now at the top of the chart.`);
      this.reveal(node.person.employeeId, true);
    } catch (e) {
      this.fail(e);
    } finally {
      this.busy.set(false);
    }
  }

  joined(date: string): string {
    if (!date) return '—';
    const [y, m, d] = date.split('-').map(Number);
    const months = (new Date().getFullYear() - y) * 12 + (new Date().getMonth() + 1 - m);
    const tenure = months >= 12 ? `${Math.floor(months / 12)}y ${months % 12}m` : `${Math.max(0, months)}m`;
    return `${d} ${MONTHS[m - 1]} ${y} · ${tenure}`;
  }

  exportCsv(): void {
    const f = this.forest();
    const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const rows = [['Employee ID', 'Name', 'Designation', 'Department', 'Location', 'Manager ID', 'Manager', 'Direct reports', 'Total reports']];
    for (const n of [...f.byId.values()].sort((a, b) => a.depth - b.depth || a.person.name.localeCompare(b.person.name))) {
      const mgr = findParent(f, n.person.employeeId)?.person;
      rows.push([n.person.employeeId, n.person.name, n.person.designation, n.person.department, n.person.location, mgr?.employeeId ?? '', mgr?.name ?? '', String(n.children.length), String(n.total)]);
    }
    const blob = new Blob([rows.map((r) => r.map(esc).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = 'org-chart.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.searchOpen()) this.searchOpen.set(false);
    else this.closeDrawer();
  }

  // ---- Helpers -----------------------------------------------------------------------------
  private expandToDepth(depth: number): void {
    this.expanded.set(
      new Set([...this.forest().byId.values()].filter((n) => n.children.length && n.depth < depth).map((n) => n.person.employeeId)),
    );
  }

  private fail(e: unknown): void {
    this.error.set(e instanceof Error && e.message ? e.message : 'Something went wrong.');
  }

  private showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
  }
}
