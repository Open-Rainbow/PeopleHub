import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CalendarComponent,
  DropdownComponent,
  IconComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
} from 'ui';
import { AnnouncementsService } from '../../services/announcements.service';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import {
  AnnouncementDraft,
  AnnouncementItem,
  AnnouncementPriority,
  AnnouncementStatus,
} from '../../models/announcement.model';
import {
  AUDIENCE_OPTIONS,
  CATEGORY_OPTIONS,
  DEPARTMENT_OPTIONS,
  optionName,
  optionValue,
  PRIORITY_OPTIONS,
  PRIORITY_STYLES,
  PriorityStyle,
  STATUS_STYLES,
} from '../../config/announcements/announcement.options';
import {
  addDays,
  daysUntil,
  downloadText,
  formatDate,
  initials,
  parseDate,
  relativeDay,
  statusOf,
  toCsv,
  toIsoDate,
} from '../../utils/announcement.utils';

type StatusFilter = 'All' | AnnouncementStatus;
type PriorityFilter = 'All' | AnnouncementPriority;
type SortKey = 'newest' | 'oldest' | 'expiring' | 'priority';

const PRIORITY_RANK: Record<AnnouncementPriority, number> = { High: 0, Medium: 1, Low: 2 };
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1000;

/** HR / admin page: create, schedule, edit, pin, delete and export announcements. */
@Component({
  selector: 'announcements-add-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
    TextButtonComponent,
    IconComponent,
    BodyPortalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit, OnDestroy {
  private readonly service = inject(AnnouncementsService);
  private readonly fb = inject(FormBuilder);
  private toastTimer?: ReturnType<typeof setTimeout>;

  // options + helpers used by the template
  readonly priorityOptions = PRIORITY_OPTIONS;
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly departmentOptions = DEPARTMENT_OPTIONS;
  readonly audienceOptions = AUDIENCE_OPTIONS;
  /** Keyed by string so templates can index it with untyped values (ng-template context, option names). */
  readonly priorityStyles: Record<string, PriorityStyle> = PRIORITY_STYLES;
  readonly statusStyles = STATUS_STYLES;
  readonly statusTabs: StatusFilter[] = ['All', 'Active', 'Scheduled', 'Expired'];
  readonly priorityFilters: PriorityFilter[] = ['All', 'High', 'Medium', 'Low'];
  readonly sortOptions: { key: SortKey; label: string }[] = [
    { key: 'newest', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
    { key: 'expiring', label: 'Expiring soon' },
    { key: 'priority', label: 'Priority' },
  ];
  readonly expiryPresets = [
    { label: '1 week', days: 7 },
    { label: '2 weeks', days: 14 },
    { label: '1 month', days: 30 },
    { label: '3 months', days: 90 },
  ];
  readonly titleMax = TITLE_MAX;
  readonly descriptionMax = DESCRIPTION_MAX;
  readonly pageSize = 8;

  readonly statusOf = statusOf;
  readonly formatDate = formatDate;
  readonly relativeDay = relativeDay;
  readonly initials = initials;

  // list state
  readonly items = this.service.items;
  readonly loading = this.service.loading;
  readonly search = signal('');
  readonly status = signal<StatusFilter>('All');
  readonly priorityFilter = signal<PriorityFilter>('All');
  readonly sort = signal<SortKey>('newest');
  readonly page = signal(1);

  // overlays
  readonly formOpen = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly viewing = signal<AnnouncementItem | null>(null);
  readonly pendingDelete = signal<AnnouncementItem | null>(null);
  readonly formError = signal<string | null>(null);
  readonly toast = signal<string | null>(null);

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(TITLE_MAX)]],
    description: ['', [Validators.required, Validators.maxLength(DESCRIPTION_MAX)]],
    priority: [2 as number | null, Validators.required],
    category: [1 as number | null, Validators.required],
    department: [1 as number | null, Validators.required],
    targetAudience: [1 as number | null, Validators.required],
    publishOn: [new Date() as Date | string | null, Validators.required],
    expiresOn: [addDays(new Date(), 14) as Date | string | null, Validators.required],
    isPinned: [false],
  });

  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  readonly preview = computed(() => this.draftFrom(this.formValue()));
  readonly previewStatus = computed(() => statusOf(this.preview()));
  readonly selectedPriority = computed(() => this.preview().priority);
  readonly isEdit = computed(() => this.editingId() !== null);

  readonly counts = computed(() => {
    const counts: Record<StatusFilter, number> = { All: 0, Active: 0, Scheduled: 0, Expired: 0 };
    for (const item of this.items()) {
      counts.All++;
      counts[statusOf(item)]++;
    }
    return counts;
  });

  readonly stats = computed(() => {
    const c = this.counts();
    return [
      { key: 'All' as StatusFilter, label: 'Total', count: c.All, icon: 'announcement_megaphone', tone: 'bg-blue-50 text-blue-600' },
      { key: 'Active' as StatusFilter, label: 'Live now', count: c.Active, icon: 'check_circle_outline', tone: 'bg-emerald-50 text-emerald-600' },
      { key: 'Scheduled' as StatusFilter, label: 'Scheduled', count: c.Scheduled, icon: 'calendar', tone: 'bg-indigo-50 text-indigo-600' },
      { key: 'Expired' as StatusFilter, label: 'Expired', count: c.Expired, icon: 'calendar_remove', tone: 'bg-gray-100 text-gray-500' },
    ];
  });

  readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const status = this.status();
    const priority = this.priorityFilter();
    const time = (value: string) => parseDate(value)?.getTime() ?? 0;

    const rows = this.items().filter(
      (item) =>
        (status === 'All' || statusOf(item) === status) &&
        (priority === 'All' || item.priority === priority) &&
        (!term ||
          [item.title, item.description, item.postedBy, item.category, item.department, item.targetAudience].some(
            (value) => value?.toLowerCase().includes(term),
          )),
    );

    return [...rows].sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      switch (this.sort()) {
        case 'oldest':
          return time(a.publishOn) - time(b.publishOn);
        case 'expiring':
          return time(a.expiresOn) - time(b.expiresOn);
        case 'priority':
          return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        default:
          return time(b.publishOn) - time(a.publishOn) || b.id - a.id;
      }
    });
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  readonly currentPage = computed(() => Math.min(this.page(), this.totalPages()));
  readonly paged = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });
  readonly rangeLabel = computed(() => {
    const total = this.filtered().length;
    if (total === 0) return 'No results';
    const start = (this.currentPage() - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, total);
    return `Showing ${start}-${end} of ${total}`;
  });
  readonly hasFilters = computed(
    () => !!this.search().trim() || this.status() !== 'All' || this.priorityFilter() !== 'All',
  );

  ngOnInit(): void {
    this.service.refresh();
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }

  // ---------- filters ----------
  onSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  setStatus(status: StatusFilter): void {
    this.status.set(status);
    this.page.set(1);
  }

  setPriorityFilter(value: string): void {
    this.priorityFilter.set(value as PriorityFilter);
    this.page.set(1);
  }

  setSort(value: string): void {
    this.sort.set(value as SortKey);
  }

  clearFilters(): void {
    this.search.set('');
    this.status.set('All');
    this.priorityFilter.set('All');
    this.page.set(1);
  }

  goToPage(page: number): void {
    this.page.set(Math.min(Math.max(page, 1), this.totalPages()));
  }

  // ---------- create / edit ----------
  openCreate(): void {
    this.editingId.set(null);
    this.form.reset({
      title: '',
      description: '',
      priority: 2,
      category: 1,
      department: 1,
      targetAudience: 1,
      publishOn: new Date(),
      expiresOn: addDays(new Date(), 14),
      isPinned: false,
    });
    this.formError.set(null);
    this.formOpen.set(true);
  }

  openEdit(item: AnnouncementItem): void {
    this.editingId.set(item.id);
    this.form.reset({
      title: item.title,
      description: item.description,
      priority: optionValue(PRIORITY_OPTIONS, item.priority) ?? 2,
      category: optionValue(CATEGORY_OPTIONS, item.category) ?? 1,
      department: optionValue(DEPARTMENT_OPTIONS, item.department) ?? 1,
      targetAudience: optionValue(AUDIENCE_OPTIONS, item.targetAudience) ?? 1,
      publishOn: parseDate(item.publishOn),
      expiresOn: parseDate(item.expiresOn),
      isPinned: item.isPinned,
    });
    this.formError.set(null);
    this.viewing.set(null);
    this.formOpen.set(true);
  }

  duplicate(item: AnnouncementItem): void {
    this.openEdit(item);
    this.editingId.set(null);
    this.form.patchValue({
      title: `${item.title} (copy)`.slice(0, TITLE_MAX),
      publishOn: new Date(),
      expiresOn: addDays(new Date(), 14),
      isPinned: false,
    });
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  setPriority(name: AnnouncementPriority): void {
    this.form.patchValue({ priority: optionValue(PRIORITY_OPTIONS, name) });
  }

  setExpiryPreset(days: number): void {
    const publish = parseDate(this.form.getRawValue().publishOn) ?? new Date();
    this.form.patchValue({ expiresOn: addDays(publish, days) });
  }

  save(): void {
    this.form.markAllAsTouched();
    const raw = this.form.getRawValue();
    const draft = this.draftFrom(raw);

    if (!draft.title || !draft.description) {
      this.formError.set('Title and description are required.');
      return;
    }
    if (draft.title.length > TITLE_MAX || draft.description.length > DESCRIPTION_MAX) {
      this.formError.set(`Keep the title under ${TITLE_MAX} and the description under ${DESCRIPTION_MAX} characters.`);
      return;
    }
    const publish = parseDate(raw.publishOn);
    const expiry = parseDate(raw.expiresOn);
    if (!publish || !expiry) {
      this.formError.set('Pick both a publish date and an expiry date.');
      return;
    }
    if (expiry.getTime() < publish.getTime()) {
      this.formError.set('The expiry date must be on or after the publish date.');
      return;
    }

    const id = this.editingId();
    if (id !== null) {
      this.service.update(id, draft);
      this.showToast('Announcement updated');
    } else {
      this.service.create(draft);
      this.showToast(statusOf(draft) === 'Scheduled' ? 'Announcement scheduled' : 'Announcement published');
      this.clearFilters();
    }
    this.formOpen.set(false);
  }

  // ---------- row actions ----------
  view(item: AnnouncementItem): void {
    this.viewing.set(item);
    this.service.markRead(item.id);
  }

  closeView(): void {
    this.viewing.set(null);
  }

  togglePin(item: AnnouncementItem): void {
    this.service.togglePin(item.id);
    this.showToast(item.isPinned ? 'Unpinned' : 'Pinned to top');
    if (this.viewing()?.id === item.id) {
      this.viewing.set(this.service.getById(item.id) ?? null);
    }
  }

  askDelete(item: AnnouncementItem): void {
    this.pendingDelete.set(item);
  }

  cancelDelete(): void {
    this.pendingDelete.set(null);
  }

  confirmDelete(): void {
    const item = this.pendingDelete();
    if (!item) return;
    this.service.remove(item.id);
    this.pendingDelete.set(null);
    if (this.viewing()?.id === item.id) this.viewing.set(null);
    this.showToast('Announcement deleted');
  }

  exportCsv(): void {
    const rows = this.filtered();
    downloadText(`announcements-${toIsoDate(new Date())}.csv`, toCsv(rows));
    this.showToast(`Exported ${rows.length} announcement${rows.length === 1 ? '' : 's'}`);
  }

  // ---------- template helpers ----------
  expiryHint(item: AnnouncementItem): string {
    const status = statusOf(item);
    if (status === 'Expired') return `ended ${relativeDay(item.expiresOn)}`;
    if (status === 'Scheduled') return `goes live ${relativeDay(item.publishOn)}`;
    return relativeDay(item.expiresOn);
  }

  isExpiringSoon(item: AnnouncementItem): boolean {
    const days = daysUntil(item.expiresOn);
    return statusOf(item) === 'Active' && days !== null && days <= 3;
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && control.touched;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pendingDelete()) this.pendingDelete.set(null);
    else if (this.formOpen()) this.formOpen.set(false);
    else if (this.viewing()) this.viewing.set(null);
  }

  private draftFrom(value: Partial<Record<string, unknown>>): AnnouncementDraft {
    const publish = parseDate(value['publishOn'] as Date | string | null) ?? new Date();
    const expiry = parseDate(value['expiresOn'] as Date | string | null) ?? addDays(publish, 14);
    return {
      title: String(value['title'] ?? '').trim(),
      description: String(value['description'] ?? '').trim(),
      priority: (optionName(PRIORITY_OPTIONS, value['priority']) || 'Medium') as AnnouncementPriority,
      category: optionName(CATEGORY_OPTIONS, value['category']) || 'General',
      department: optionName(DEPARTMENT_OPTIONS, value['department']) || 'All Departments',
      targetAudience: optionName(AUDIENCE_OPTIONS, value['targetAudience']) || 'All Employees',
      publishOn: toIsoDate(publish),
      expiresOn: toIsoDate(expiry),
      isPinned: !!value['isPinned'],
    };
  }

  private showToast(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3000);
  }
}
