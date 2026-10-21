import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  draftFromOrganization,
  emptyOrganizationDraft,
  ORG_COUNTRIES,
  ORG_CURRENCIES,
  ORG_INDUSTRIES,
  ORG_LIMITS,
  ORG_MONTHS,
  ORG_TIME_ZONES,
  Organization,
  OrganizationDraft,
  OrganizationErrors,
  OrganizationService,
  validateOrganization,
} from 'common';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  ChipComponent,
  DropdownComponent,
  IconButtonComponent,
  IconComponent,
  LoaderComponent,
  NoticeBannerComponent,
  optionLabelOf,
  optionValueOf,
  SearchComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
} from 'ui';
import { OrgBodyPortalDirective } from '../../directives/org-body-portal.directive';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type StatusFilter = 'All' | 'Active' | 'Inactive';

const tone = (token: string) => ({
  color: `color-mix(in srgb, var(${token}) 80%, var(--color-text-primary))`,
  bg: `color-mix(in srgb, var(${token}) 14%, transparent)`,
  solid: `var(${token})`,
});

const TONES: Record<Tone, { color: string; bg: string; solid: string }> = {
  primary: tone('--color-primary'),
  success: tone('--color-success'),
  warning: tone('--color-warning'),
  danger: tone('--color-danger'),
  neutral: { color: 'var(--color-text-secondary)', bg: 'var(--color-surface-muted)', solid: 'var(--color-text-secondary)' },
};

function bannerTone(t: Tone) {
  const c = TONES[t];
  return {
    bannerColor: `color-mix(in srgb, ${c.solid} 10%, var(--color-surface))`,
    headingColor: c.color,
    contentColor: 'var(--color-text-primary)',
    highlighterColor: c.solid,
    iconColor: c.solid,
  };
}

/**
 * Organizations (Super Admin only). Create an organization with its details, edit it, deactivate it,
 * and switch to it. After switching, Setup (roles), Add Employee and every other page work inside
 * that organization. A new organization starts with the system roles and their default access.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'organizations-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonGroupComponent,
    ChipComponent,
    DropdownComponent,
    IconButtonComponent,
    IconComponent,
    LoaderComponent,
    NoticeBannerComponent,
    SearchComponent,
    TextAreaComponent,
    TextBoxComponent,
    TextButtonComponent,
    ToastStackComponent,
    OrgBodyPortalDirective,
  ],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent implements OnInit {
  private readonly service = inject(OrganizationService);
  private readonly router = inject(Router);

  readonly tones = TONES;
  readonly limits = ORG_LIMITS;
  readonly errorBanner = bannerTone('danger');
  readonly currentBanner = bannerTone('primary');
  readonly isOnline = this.service.isOnline;
  readonly isSuperAdmin = (() => {
    try {
      return (localStorage.getItem('userRole') || '').trim().toLowerCase() === 'superadmin';
    } catch {
      return false;
    }
  })();

  readonly industryOptions = toDropdownOptions(ORG_INDUSTRIES);
  readonly countryOptions = toDropdownOptions(ORG_COUNTRIES);
  readonly timeZoneOptions = toDropdownOptions(ORG_TIME_ZONES.map((t) => t.label));
  readonly currencyOptions = toDropdownOptions(ORG_CURRENCIES.map((c) => c.label));
  readonly monthOptions = toDropdownOptions(ORG_MONTHS);
  readonly statusItems: ButtonGroupItem[] = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  readonly searchForm = new FormGroup({ search: new FormControl('', { nonNullable: true }) });
  readonly form = new FormGroup({
    code: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    legalName: new FormControl('', { nonNullable: true }),
    industry: new FormControl<number | null>(null),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    website: new FormControl('', { nonNullable: true }),
    addressLine: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    stateProvince: new FormControl('', { nonNullable: true }),
    country: new FormControl<number | null>(null),
    pincode: new FormControl('', { nonNullable: true }),
    timeZone: new FormControl<number | null>(null),
    currency: new FormControl<number | null>(null),
    financialYearStartMonth: new FormControl<number | null>(null),
    taxId: new FormControl('', { nonNullable: true }),
    registrationNumber: new FormControl('', { nonNullable: true }),
  });
  /** Bumped when the form is (re)filled: dropdowns read their value on init. */
  readonly formKey = signal(0);

  readonly orgs = signal<Organization[]>([]);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  readonly search = signal('');
  readonly statusFilter = signal<StatusFilter>('All');
  readonly currentId = signal(this.service.selectedId());
  readonly current = computed(() => this.orgs().find((o) => o.id === this.currentId()) ?? null);

  readonly view = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return this.orgs()
      .filter((o) => status === 'All' || (status === 'Active' ? o.isActive : !o.isActive))
      .filter((o) => !term || [o.name, o.code, o.legalName, o.city, o.email, o.industry].some((v) => (v ?? '').toLowerCase().includes(term)));
  });

  readonly stats = computed(() => {
    const list = this.orgs();
    return [
      { label: 'Organizations', value: list.length, icon: 'group', tone: 'primary' as Tone },
      { label: 'Active', value: list.filter((o) => o.isActive).length, icon: 'check_circle_outline', tone: 'success' as Tone },
      { label: 'Employees (all orgs)', value: list.reduce((s, o) => s + o.employeeCount, 0), icon: 'person', tone: 'warning' as Tone },
      { label: 'Inactive', value: list.filter((o) => !o.isActive).length, icon: 'info', tone: 'neutral' as Tone },
    ];
  });

  // Editor
  readonly editing = signal<Organization | 'new' | null>(null);
  readonly editingOrg = computed(() => {
    const e = this.editing();
    return e && e !== 'new' ? e : null;
  });
  readonly errors = signal<OrganizationErrors>({});
  readonly submitted = signal(false);

  // Dialogs
  readonly created = signal<Organization | null>(null);
  readonly deactivating = signal<Organization | null>(null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.deactivating()) this.deactivating.set(null);
    else if (this.created()) this.created.set(null);
    else if (this.editing()) this.closeEditor();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.orgs.set(await this.service.list('', true));
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  onSearch(value: string): void {
    this.search.set(value ?? '');
  }

  setStatusFilter(values: string[]): void {
    const v = values[0];
    this.statusFilter.set(v === 'Active' || v === 'Inactive' ? v : 'All');
  }

  // ---- Switch --------------------------------------------------------------------------------

  switchTo(o: Organization): void {
    if (!o.isActive) {
      this.toast('Activate this organization before working in it.', 'warning');
      return;
    }
    this.service.switchTo(o);
  }

  /** Switch, then open the given page of the new organization (e.g. setup or add-employee). */
  switchAndOpen(o: Organization, page: string): void {
    if (o.id === this.currentId()) {
      void this.router.navigate(['/superadmin', page]);
      return;
    }
    try {
      localStorage.setItem('ph.orgId', String(o.id));
    } catch {
      // demo only
    }
    location.href = `/superadmin/${page}`;
  }

  // ---- Editor --------------------------------------------------------------------------------

  openEditor(o?: Organization): void {
    const d = o ? draftFromOrganization(o) : emptyOrganizationDraft();
    this.form.reset({
      code: d.code,
      name: d.name,
      legalName: d.legalName,
      industry: optionValueOf(this.industryOptions, d.industry || null),
      email: d.email,
      phone: d.phone,
      website: d.website,
      addressLine: d.addressLine,
      city: d.city,
      stateProvince: d.stateProvince,
      country: optionValueOf(this.countryOptions, d.country || null),
      pincode: d.pincode,
      timeZone: optionValueOf(this.timeZoneOptions, ORG_TIME_ZONES.find((t) => t.id === d.timeZone)?.label),
      currency: optionValueOf(this.currencyOptions, ORG_CURRENCIES.find((c) => c.code === d.currency)?.label),
      financialYearStartMonth: d.financialYearStartMonth,
      taxId: d.taxId,
      registrationNumber: d.registrationNumber,
    });
    this.errors.set({});
    this.submitted.set(false);
    this.editing.set(o ?? 'new');
    this.formKey.update((k) => k + 1);
  }

  closeEditor(): void {
    if (!this.busy()) this.editing.set(null);
  }

  fieldError(key: keyof OrganizationDraft): string | undefined {
    return this.errors()[key];
  }

  async save(): Promise<void> {
    const draft = this.draft();
    const errors = validateOrganization(draft);
    this.submitted.set(true);
    this.errors.set(errors);
    if (Object.keys(errors).length) {
      this.toast('Please fix the highlighted fields.', 'warning');
      return;
    }

    const current = this.editingOrg();
    this.busy.set(true);
    try {
      const saved = current ? await this.service.update(current.id, draft) : await this.service.create(draft);
      this.busy.set(false);
      this.editing.set(null);
      await this.reload();
      if (current) this.toast(`${saved.name} saved.`, 'success');
      else this.created.set(saved);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Status --------------------------------------------------------------------------------

  async activate(o: Organization): Promise<void> {
    await this.setStatus(o, true);
  }

  async confirmDeactivate(): Promise<void> {
    const o = this.deactivating();
    if (!o) return;
    await this.setStatus(o, false);
    this.deactivating.set(null);
  }

  private async setStatus(o: Organization, isActive: boolean): Promise<void> {
    this.busy.set(true);
    try {
      await this.service.setStatus(o.id, isActive);
      this.toast(`${o.name} is now ${isActive ? 'active' : 'inactive'}.`, 'success');
      await this.reload();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Helpers -------------------------------------------------------------------------------

  initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? '')).toUpperCase() || '?';
  }

  location(o: Organization): string {
    return [o.city, o.stateProvince, o.country].filter(Boolean).join(', ') || '—';
  }

  shortDate(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  pill(isActive: boolean) {
    return TONES[isActive ? 'success' : 'neutral'];
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private draft(): OrganizationDraft {
    const v = this.form.getRawValue();
    const tz = optionLabelOf(this.timeZoneOptions, v.timeZone);
    const cur = optionLabelOf(this.currencyOptions, v.currency);
    return {
      code: v.code ?? '',
      name: v.name ?? '',
      legalName: v.legalName ?? '',
      industry: optionLabelOf(this.industryOptions, v.industry),
      email: v.email ?? '',
      phone: v.phone ?? '',
      website: v.website ?? '',
      addressLine: v.addressLine ?? '',
      city: v.city ?? '',
      stateProvince: v.stateProvince ?? '',
      country: optionLabelOf(this.countryOptions, v.country),
      pincode: v.pincode ?? '',
      timeZone: ORG_TIME_ZONES.find((t) => t.label === tz)?.id ?? '',
      currency: ORG_CURRENCIES.find((c) => c.label === cur)?.code ?? '',
      financialYearStartMonth: v.financialYearStartMonth ?? null,
      taxId: v.taxId ?? '',
      registrationNumber: v.registrationNumber ?? '',
    };
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
