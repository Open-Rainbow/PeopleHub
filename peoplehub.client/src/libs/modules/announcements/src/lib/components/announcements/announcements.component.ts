import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'ui';
import { Announcement } from 'common';
import { AnnouncementsService } from '../../services/announcements.service';
import { AnnouncementItem } from '../../models/announcement.model';
import { PRIORITY_STYLES } from '../../config/announcements/announcement.options';
import {
  daysUntil,
  formatDate,
  fromLegacyAnnouncement,
  initials,
  relativeDay,
  statusOf,
} from '../../utils/announcement.utils';

type FeedTab = 'current' | 'expired';

const NEW_WINDOW_DAYS = 3;
const PREVIEW_LENGTH = 220;

/** Employee-facing announcement feed (also used by admin/hr "View Announcement"). */
@Component({
  selector: 'announcements-announcements',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  private readonly service = inject(AnnouncementsService);
  private readonly inputItems = signal<AnnouncementItem[] | null>(null);

  /** Optional: callers (dashboard, stories) can pass legacy announcements. Routed usage loads from the service. */
  @Input() set announcements(value: Announcement[] | null | undefined) {
    this.inputItems.set(Array.isArray(value) ? value.map(fromLegacyAnnouncement) : null);
  }

  readonly priorityStyles = PRIORITY_STYLES;
  readonly formatDate = formatDate;
  readonly relativeDay = relativeDay;
  readonly initials = initials;
  readonly previewLength = PREVIEW_LENGTH;

  readonly loading = this.service.loading;
  readonly tab = signal<FeedTab>('current');
  readonly search = signal('');
  readonly category = signal('All');
  readonly expanded = signal<Set<number>>(new Set());

  private readonly source = computed(() => this.inputItems() ?? this.service.items());

  /** Employees never see scheduled (future) announcements. */
  private readonly current = computed(() => this.source().filter((item) => statusOf(item) === 'Active'));
  private readonly expired = computed(() => this.source().filter((item) => statusOf(item) === 'Expired'));

  readonly counts = computed(() => ({ current: this.current().length, expired: this.expired().length }));

  readonly unreadIds = computed(() => {
    const read = this.service.readIds();
    return this.current()
      .filter((item) => !read.has(item.id))
      .map((item) => item.id);
  });

  readonly categories = computed(() => {
    const pool = this.tab() === 'current' ? this.current() : this.expired();
    return ['All', ...Array.from(new Set(pool.map((item) => item.category))).sort()];
  });

  private readonly filtered = computed(() => {
    const pool = this.tab() === 'current' ? this.current() : this.expired();
    const term = this.search().trim().toLowerCase();
    const category = this.category();
    return pool
      .filter((item) => category === 'All' || item.category === category)
      .filter(
        (item) =>
          !term ||
          [item.title, item.description, item.postedBy, item.category, item.department]
            .join(' ')
            .toLowerCase()
            .includes(term),
      )
      .sort((a, b) => b.publishOn.localeCompare(a.publishOn) || b.id - a.id);
  });

  readonly pinned = computed(() => (this.tab() === 'current' ? this.filtered().filter((item) => item.isPinned) : []));
  readonly feed = computed(() =>
    this.tab() === 'current' ? this.filtered().filter((item) => !item.isPinned) : this.filtered(),
  );
  readonly isEmpty = computed(() => this.pinned().length === 0 && this.feed().length === 0);
  readonly hasFilters = computed(() => this.search().trim() !== '' || this.category() !== 'All');

  ngOnInit(): void {
    if (this.inputItems() === null) {
      this.service.refresh();
    }
  }

  setTab(tab: FeedTab): void {
    this.tab.set(tab);
    this.category.set('All');
  }

  onSearch(value: string): void {
    this.search.set(value ?? '');
  }

  clearFilters(): void {
    this.search.set('');
    this.category.set('All');
  }

  isUnread(item: AnnouncementItem): boolean {
    return this.tab() === 'current' && !this.service.readIds().has(item.id);
  }

  isNew(item: AnnouncementItem): boolean {
    const days = daysUntil(item.publishOn);
    return days !== null && days <= 0 && days > -NEW_WINDOW_DAYS;
  }

  isLong(item: AnnouncementItem): boolean {
    return item.description.length > PREVIEW_LENGTH;
  }

  isExpanded(item: AnnouncementItem): boolean {
    return this.expanded().has(item.id);
  }

  toggleExpanded(item: AnnouncementItem, event?: Event): void {
    event?.stopPropagation();
    const next = new Set(this.expanded());
    if (next.has(item.id)) {
      next.delete(item.id);
    } else {
      next.add(item.id);
    }
    this.expanded.set(next);
    this.markRead(item);
  }

  markRead(item: AnnouncementItem): void {
    if (this.tab() === 'current') this.service.markRead(item.id);
  }

  markAllRead(): void {
    this.service.markAllRead(this.unreadIds());
  }

  expiryLabel(item: AnnouncementItem): string {
    const days = daysUntil(item.expiresOn);
    if (days === null) return '';
    if (days < 0) return `Expired ${formatDate(item.expiresOn)}`;
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    return days <= 7 ? `Expires in ${days} days` : `Until ${formatDate(item.expiresOn)}`;
  }

  expiryTone(item: AnnouncementItem): string {
    const days = daysUntil(item.expiresOn);
    if (days === null || days < 0) return 'text-gray-400';
    return days <= 3 ? 'text-red-600' : days <= 7 ? 'text-amber-600' : 'text-gray-500';
  }
}
