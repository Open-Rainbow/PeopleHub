import { ChangeDetectionStrategy, Component, computed, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  calendarToIso,
  CalendarComponent,
  ChipComponent,
  DropdownComponent,
  FileUploadComponent,
  IconButtonComponent,
  IconComponent,
  isoToCalendar,
  LoaderComponent,
  NoticeBannerComponent,
  optionLabelOf,
  optionValueOf,
  SearchComponent,
  staticChip,
  TabButtonComponent,
  TabButtonItem,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  ToggleComponent,
} from 'ui';
import {
  CATEGORY_STYLES,
  POLICY_CATEGORIES,
  POLICY_DEMO_EMPLOYEE_ID,
  POLICY_DEPARTMENTS,
  POLICY_FILE_ACCEPT,
  POLICY_LIMITS,
  POLICY_STATUSES,
  STATUS_CHIPS,
} from '../../config/policy-options';
import { PolicyBodyPortalDirective } from '../../directives/policy-body-portal.directive';
import { Policy, PolicyAck, PolicyCategory, PolicyDraft, PolicyErrors, PolicyFileDraft, PolicyStatus } from '../../models/policy.model';
import { PoliciesService } from '../../services/policies.service';
import {
  ackPercent,
  acksToCsv,
  draftFrom,
  emptyDraft,
  fileKind,
  fileSizeLabel,
  needsMyAck,
  shortDate,
  validatePolicy,
} from '../../services/policies.utils';

type Tab = 'library' | 'manage';

/** Payload of the shared ui-file-upload (fileSelectionChange). */
interface UploadSelection {
  files: { name: string; type: string; size?: number; data: string }[];
  source: string;
}

/**
 * Company policies (floor / desk management, WFH, IT use, ...).
 * Everyone: browse published policies, read them, open / download the attachment, acknowledge.
 * Admin / HR / super-admin (`/admin`, `/hr`, `/superadmin` routes or `[manage]="true"`):
 * write or upload policies, publish, archive, new versions and acknowledgement tracking.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'policies-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonGroupComponent,
    CalendarComponent,
    ChipComponent,
    DropdownComponent,
    FileUploadComponent,
    IconButtonComponent,
    IconComponent,
    LoaderComponent,
    NoticeBannerComponent,
    SearchComponent,
    TabButtonComponent,
    TextAreaComponent,
    TextBoxComponent,
    TextButtonComponent,
    ToastStackComponent,
    ToggleComponent,
    PolicyBodyPortalDirective,
  ],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit {
  private readonly service = inject(PoliciesService);
  private readonly router = inject(Router, { optional: true });
  private readonly document = inject(DOCUMENT);
  private readonly sanitizer = inject(DomSanitizer);

  /** Force the manage tab on/off. Default: on for /admin, /hr and /superadmin routes. */
  readonly manage = input<boolean | null>(null);

  readonly employeeId = POLICY_DEMO_EMPLOYEE_ID;
  readonly limits = POLICY_LIMITS;
  readonly accept = POLICY_FILE_ACCEPT;
  readonly categoryStyles = CATEGORY_STYLES;
  readonly statusChips = STATUS_CHIPS;
  readonly chip = staticChip;
  readonly shortDate = shortDate;
  readonly fileKind = fileKind;
  readonly fileSize = fileSizeLabel;
  readonly ackPercent = ackPercent;
  readonly needsMyAck = needsMyAck;

  readonly categoryItems: ButtonGroupItem[] = [{ label: 'All', value: 'All' }, ...POLICY_CATEGORIES.map((c) => ({ label: c, value: c }))];
  readonly statusItems: ButtonGroupItem[] = [{ label: 'All', value: 'All' }, ...POLICY_STATUSES.map((s) => ({ label: s, value: s }))];
  readonly categoryOptions = toDropdownOptions(POLICY_CATEGORIES);
  readonly audienceOptions = toDropdownOptions(['Everyone', ...POLICY_DEPARTMENTS]);

  // ---- Forms for the shared controls ---------------------------------------------------------
  readonly libraryForm = new FormGroup({ search: new FormControl('', { nonNullable: true }) });
  readonly manageForm = new FormGroup({ search: new FormControl('', { nonNullable: true }) });
  readonly editorForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    category: new FormControl<number | null>(null),
    audience: new FormControl<number | null>(null),
    effectiveFrom: new FormControl('', { nonNullable: true }),
    summary: new FormControl('', { nonNullable: true }),
    content: new FormControl('', { nonNullable: true }),
    file: new FormControl<unknown>(null),
    requiresAck: new FormControl(false, { nonNullable: true }),
    isPinned: new FormControl(false, { nonNullable: true }),
    newVersion: new FormControl(false, { nonNullable: true }),
  });
  /** Bumped when the editor is (re)filled: dropdown / calendar / toggle read their value on init. */
  readonly editorKey = signal(0);

  readonly canManage = computed(() => this.manage() ?? /^\/(hr|admin|superadmin)(\/|$)/.test(this.router?.url ?? ''));
  readonly isOnline = this.service.isOnline;
  readonly tabs = computed<TabButtonItem[]>(() => [
    { id: 'library', label: 'Policy library' },
    { id: 'manage', label: 'Manage policies' },
  ]);
  readonly tab = signal<Tab>('library');

  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  // Library
  readonly library = signal<Policy[]>([]);
  readonly libraryCategory = signal<PolicyCategory | 'All'>('All');
  readonly librarySearch = signal('');
  readonly onlyPending = signal(false);
  readonly pendingAcks = computed(() => this.library().filter(needsMyAck));
  readonly libraryView = computed(() => {
    const term = this.librarySearch().trim().toLowerCase();
    return this.library()
      .filter((p) => this.libraryCategory() === 'All' || p.category === this.libraryCategory())
      .filter((p) => !this.onlyPending() || needsMyAck(p))
      .filter((p) => !term || [p.title, p.summary ?? '', p.category, p.fileName ?? ''].some((v) => v.toLowerCase().includes(term)));
  });
  readonly categoryCounts = computed(() => {
    const counts: Record<string, number> = {};
    this.library().forEach((p) => (counts[p.category] = (counts[p.category] ?? 0) + 1));
    return counts;
  });

  // Manage
  readonly all = signal<Policy[]>([]);
  readonly manageStatus = signal<PolicyStatus | 'All'>('All');
  readonly manageSearch = signal('');
  readonly manageView = computed(() => {
    const term = this.manageSearch().trim().toLowerCase();
    return this.all()
      .filter((p) => this.manageStatus() === 'All' || p.status === this.manageStatus())
      .filter((p) => !term || [p.title, p.summary ?? '', p.category, p.audience ?? ''].some((v) => v.toLowerCase().includes(term)));
  });
  readonly manageStats = computed(() => {
    const list = this.all();
    const published = list.filter((p) => p.status === 'Published');
    const tracked = published.filter((p) => p.requiresAck);
    return [
      { label: 'Published', value: String(published.length) },
      { label: 'Drafts', value: String(list.filter((p) => p.status === 'Draft').length) },
      { label: 'Archived', value: String(list.filter((p) => p.status === 'Archived').length) },
      {
        label: 'Acknowledged',
        value: tracked.length
          ? `${Math.round((tracked.reduce((s, p) => s + p.ackCount, 0) / Math.max(1, tracked.reduce((s, p) => s + p.audienceCount, 0))) * 100)}%`
          : '–',
      },
    ];
  });

  // Reader
  readonly reading = signal<Policy | null>(null);
  readonly readingLoading = signal(false);
  readonly readerManage = signal(false);
  readonly preview = computed<{ kind: 'pdf' | 'image'; url: SafeResourceUrl | string } | null>(() => {
    const p = this.reading();
    if (!p?.hasFile) return null;
    const kind = fileKind(p.fileName);
    const url = this.service.fileUrl(p, this.employeeId, this.readerManage(), true);
    if (!url) return null;
    if (kind === 'PDF') return { kind: 'pdf', url: this.sanitizer.bypassSecurityTrustResourceUrl(url) };
    if (kind === 'PNG' || kind === 'JPG') return { kind: 'image', url };
    return null;
  });

  // Editor
  readonly editing = signal<Policy | 'new' | null>(null);
  readonly pickedFile = signal<PolicyFileDraft | null>(null);
  readonly removeFile = signal(false);
  readonly errors = signal<PolicyErrors>({});
  readonly submitted = signal(false);
  readonly editingPolicy = computed(() => {
    const e = this.editing();
    return e && e !== 'new' ? e : null;
  });
  readonly keptFile = computed(() => {
    const p = this.editingPolicy();
    return p?.hasFile && !this.removeFile() && !this.pickedFile() ? p : null;
  });

  // Acknowledgements
  readonly ackPolicy = signal<Policy | null>(null);
  readonly ackRows = signal<PolicyAck[]>([]);
  readonly ackLoading = signal(false);
  readonly ackFilter = signal<'All' | 'Pending' | 'Done'>('All');
  readonly ackFilterItems: ButtonGroupItem[] = [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Acknowledged', value: 'Done' },
  ];
  readonly ackView = computed(() =>
    this.ackRows().filter((r) => this.ackFilter() === 'All' || (this.ackFilter() === 'Pending' ? !r.acknowledgedAt : !!r.acknowledgedAt)),
  );

  // Delete
  readonly deleting = signal<Policy | null>(null);

  async ngOnInit(): Promise<void> {
    this.libraryForm.controls.search.valueChanges.subscribe((v) => this.librarySearch.set(v ?? ''));
    this.manageForm.controls.search.valueChanges.subscribe((v) => this.manageSearch.set(v ?? ''));
    await this.reload();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.deleting()) this.deleting.set(null);
    else if (this.editing()) this.closeEditor();
    else if (this.ackPolicy()) this.ackPolicy.set(null);
    else if (this.reading()) this.reading.set(null);
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const library = await this.service.list({ employeeId: this.employeeId, manage: false });
      this.library.set(library);
      if (this.canManage()) this.all.set(await this.service.list({ employeeId: this.employeeId, manage: true }));
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  onTab(id: string): void {
    this.tab.set(id === 'manage' ? 'manage' : 'library');
  }

  setCategory(values: string[]): void {
    this.libraryCategory.set((values[0] as PolicyCategory | 'All') ?? 'All');
  }

  setStatus(values: string[]): void {
    this.manageStatus.set((values[0] as PolicyStatus | 'All') ?? 'All');
  }

  onLibrarySearch(value: string): void {
    this.librarySearch.set(value ?? '');
  }

  onManageSearch(value: string): void {
    this.manageSearch.set(value ?? '');
  }

  // ---- Reader --------------------------------------------------------------------------------

  async open(p: Policy, asManager = false): Promise<void> {
    this.readerManage.set(asManager);
    this.reading.set(p);
    this.readingLoading.set(true);
    try {
      this.reading.set(await this.service.get(p.id, this.employeeId, asManager));
    } catch (e) {
      this.toast(message(e), 'alert');
      this.reading.set(null);
    } finally {
      this.readingLoading.set(false);
    }
  }

  download(p: Policy, inline = false): void {
    const url = this.service.fileUrl(p, this.employeeId, this.readerManage() || p.status !== 'Published', inline);
    if (!url) {
      this.toast('No file attached to this policy.', 'warning');
      return;
    }
    const a = this.document.createElement('a');
    a.href = url;
    if (inline) a.target = '_blank';
    else a.download = p.fileName ?? 'policy';
    a.rel = 'noopener';
    this.document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async acknowledge(p: Policy): Promise<void> {
    this.busy.set(true);
    try {
      const updated = await this.service.acknowledge(p.id, this.employeeId);
      this.reading.set({ ...updated, content: this.reading()?.content ?? updated.content });
      this.library.update((list) => list.map((x) => (x.id === p.id ? { ...updated, content: null } : x)));
      if (this.canManage()) this.all.set(await this.service.list({ employeeId: this.employeeId, manage: true }));
      this.toast(`Thanks. "${p.title}" acknowledged.`, 'success');
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Editor --------------------------------------------------------------------------------

  async openEditor(p?: Policy): Promise<void> {
    let source = p ?? null;
    if (source && !source.content && source.hasContent) {
      try {
        source = await this.service.get(source.id, this.employeeId, true);
      } catch (e) {
        this.toast(message(e), 'alert');
        return;
      }
    }
    const d = source ? draftFrom(source) : emptyDraft();
    this.editorForm.reset({
      title: d.title,
      category: d.category ? optionValueOf(this.categoryOptions, d.category) : null,
      audience: optionValueOf(this.audienceOptions, d.audience || 'Everyone'),
      effectiveFrom: isoToCalendar(d.effectiveFrom),
      summary: d.summary,
      content: d.content,
      file: null,
      requiresAck: d.requiresAck,
      isPinned: d.isPinned,
      newVersion: false,
    });
    this.pickedFile.set(null);
    this.removeFile.set(false);
    this.errors.set({});
    this.submitted.set(false);
    this.editing.set(source ?? 'new');
    this.editorKey.update((k) => k + 1);
  }

  closeEditor(): void {
    if (!this.busy()) this.editing.set(null);
  }

  onFilePicked(selection: UploadSelection): void {
    if (selection.source !== 'user') return;
    const f = selection.files[0];
    this.pickedFile.set(f ? { fileName: f.name, contentType: f.type, size: f.size ?? approxBytes(f.data), data: f.data } : null);
    if (f) this.removeFile.set(false);
    if (this.submitted()) this.errors.set(this.validate(this.draft(false)));
  }

  dropExistingFile(): void {
    this.removeFile.set(true);
    if (this.submitted()) this.errors.set(this.validate(this.draft(false)));
  }

  async save(publish: boolean): Promise<void> {
    const draft = this.draft(publish);
    const errors = this.validate(draft);
    this.submitted.set(true);
    this.errors.set(errors);
    if (Object.keys(errors).length) return;

    const current = this.editingPolicy();
    this.busy.set(true);
    try {
      const saved = current ? await this.service.update(current.id, draft) : await this.service.create(draft);
      this.busy.set(false);
      this.editing.set(null);
      this.toast(
        saved.status === 'Published'
          ? draft.newVersion
            ? `"${saved.title}" v${saved.version} published. Everyone will be asked to acknowledge again.`
            : `"${saved.title}" is live for ${saved.audience ?? 'everyone'}.`
          : `"${saved.title}" saved as ${saved.status.toLowerCase()}.`,
        'success',
      );
      await this.reload();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  fieldError(key: keyof PolicyErrors): string | undefined {
    return this.errors()[key];
  }

  // ---- Status / delete / acknowledgements ---------------------------------------------------

  async changeStatus(p: Policy, status: PolicyStatus): Promise<void> {
    this.busy.set(true);
    try {
      await this.service.setStatus(p.id, status);
      const verb = status === 'Published' ? 'published' : status === 'Archived' ? 'archived (hidden from employees)' : 'moved back to draft';
      this.toast(`"${p.title}" ${verb}.`, 'success');
      await this.reload();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  async confirmDelete(): Promise<void> {
    const p = this.deleting();
    if (!p) return;
    this.busy.set(true);
    try {
      await this.service.remove(p.id);
      this.deleting.set(null);
      this.toast(`"${p.title}" deleted.`, 'success');
      await this.reload();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  async openAcks(p: Policy): Promise<void> {
    this.ackPolicy.set(p);
    this.ackFilter.set('All');
    this.ackRows.set([]);
    this.ackLoading.set(true);
    try {
      this.ackRows.set(await this.service.acknowledgements(p.id));
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.ackLoading.set(false);
    }
  }

  setAckFilter(values: string[]): void {
    this.ackFilter.set((values[0] as 'All' | 'Pending' | 'Done') ?? 'All');
  }

  exportAcks(): void {
    const p = this.ackPolicy();
    if (!p) return;
    const blob = new Blob([acksToCsv(p, this.ackRows())], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = `${p.title.replace(/[^\w-]+/g, '-').toLowerCase()}-acknowledgements.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  categoryCount(value: string): number {
    return value === 'All' ? this.library().length : this.categoryCounts()[value] ?? 0;
  }

  // ---- Helpers -------------------------------------------------------------------------------

  private draft(publish: boolean): PolicyDraft {
    const v = this.editorForm.getRawValue() as {
      title: string; category: number | null; audience: number | null; effectiveFrom: string; summary: string; content: string;
      requiresAck: boolean; isPinned: boolean; newVersion: boolean;
    };
    const audience = optionLabelOf(this.audienceOptions, v.audience);
    const current = this.editingPolicy();
    return {
      title: v.title ?? '',
      category: (optionLabelOf(this.categoryOptions, v.category) as PolicyCategory) || '',
      summary: v.summary ?? '',
      content: v.content ?? '',
      file: this.pickedFile(),
      removeFile: this.removeFile(),
      effectiveFrom: calendarToIso(v.effectiveFrom),
      requiresAck: !!v.requiresAck,
      audience: audience && audience !== 'Everyone' ? audience : '',
      isPinned: !!v.isPinned,
      publish,
      newVersion: !!current && current.status === 'Published' && !!v.newVersion,
    };
  }

  private validate(d: PolicyDraft): PolicyErrors {
    const max = this.service.isLocal() ? POLICY_LIMITS.offlineFileMaxBytes : POLICY_LIMITS.fileMaxBytes;
    return validatePolicy(d, !!this.editingPolicy()?.hasFile, max);
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }
}

/** Decoded size of a data URI when the upload did not report one. */
function approxBytes(dataUri: string): number {
  const i = dataUri.indexOf('base64,');
  return Math.floor(((i >= 0 ? dataUri.length - i - 7 : dataUri.length) * 3) / 4);
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
