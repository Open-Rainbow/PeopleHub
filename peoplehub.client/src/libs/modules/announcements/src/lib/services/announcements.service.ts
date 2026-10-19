import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { CommonService } from 'common';
import {
  AnnouncementDraft,
  AnnouncementItem,
} from '../models/announcement.model';
import { buildSeedAnnouncements } from '../config/announcements/announcement.seed';
import { optionValue, PRIORITY_OPTIONS } from '../config/announcements/announcement.options';
import { normalizePriority, parseDate, toIsoDate, addDays } from '../utils/announcement.utils';

type AddAnnouncementModel = Parameters<CommonService['addAnnouncement']>[0];

const STORE_KEY = 'ph.announcements.v1';
const READ_KEY = 'ph.announcements.read.v1';

/**
 * Single source of truth for announcements.
 *
 * Works offline-first: data lives in a signal persisted to localStorage (seeded
 * with demo data), and is replaced by the API response when the API answers.
 * Writes go to the API only once it has been reached, so the UI never blocks
 * on a missing backend.
 */
@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  private readonly commonService = inject(CommonService);
  private readonly itemsSignal = signal<AnnouncementItem[]>(this.readStore());
  private readonly readSignal = signal<number[]>(this.readJson<number[]>(READ_KEY) ?? []);
  private apiAvailable = false;

  readonly items = this.itemsSignal.asReadonly();
  readonly readIds = computed(() => new Set(this.readSignal()));
  readonly loading = signal(false);

  /** Pulls the latest list from the API; keeps local data when the API is unreachable. */
  refresh(): void {
    this.loading.set(true);
    this.commonService
      .getAddAnnouncements()
      .pipe(
        timeout(5000),
        catchError(() => of(null)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((rows: unknown) => {
        if (Array.isArray(rows) && rows.length > 0) {
          this.apiAvailable = true;
          this.setItems(rows.map((row, index) => this.fromApi(row as Record<string, unknown>, index)));
        }
      });
  }

  getById(id: number): AnnouncementItem | undefined {
    return this.itemsSignal().find((item) => item.id === id);
  }

  create(draft: AnnouncementDraft): AnnouncementItem {
    const item: AnnouncementItem = {
      ...draft,
      id: this.nextId(),
      postedBy: draft.postedBy?.trim() || 'HR Team',
      createdAt: new Date().toISOString(),
    };
    this.setItems([item, ...this.itemsSignal()]);
    this.sync(this.commonService.addAnnouncement(this.toApi(item)));
    return item;
  }

  update(id: number, draft: AnnouncementDraft): AnnouncementItem | undefined {
    let updated: AnnouncementItem | undefined;
    this.setItems(
      this.itemsSignal().map((item) => {
        if (item.id !== id) return item;
        updated = {
          ...item,
          ...draft,
          postedBy: draft.postedBy?.trim() || item.postedBy,
          updatedAt: new Date().toISOString(),
        };
        return updated;
      }),
    );
    return updated;
  }

  remove(id: number): void {
    this.setItems(this.itemsSignal().filter((item) => item.id !== id));
    this.sync(this.commonService.deleteAnnouncement(id));
  }

  togglePin(id: number): void {
    this.setItems(
      this.itemsSignal().map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned, updatedAt: new Date().toISOString() } : item,
      ),
    );
  }

  isRead(id: number): boolean {
    return this.readIds().has(id);
  }

  markRead(id: number): void {
    if (this.isRead(id)) return;
    this.setRead([...this.readSignal(), id]);
  }

  markAllRead(ids: number[]): void {
    this.setRead(Array.from(new Set([...this.readSignal(), ...ids])));
  }

  /** Resets local data back to the demo seed (handy while the API is not ready). */
  resetDemoData(): void {
    this.setItems(buildSeedAnnouncements());
    this.setRead([]);
  }

  // Legacy pass-throughs kept for existing callers.
  getAnnouncements(): Observable<unknown> {
    return this.commonService.getAddAnnouncements();
  }

  getExpiredAnnouncements(): Observable<unknown> {
    return this.commonService.getExpiredAnnouncements();
  }

  addAnnouncement(model: AddAnnouncementModel): Observable<unknown> {
    return this.commonService.addAnnouncement(model);
  }

  deleteAnnouncement(id: unknown): Observable<unknown> {
    return this.commonService.deleteAnnouncement(id);
  }

  private sync(request: Observable<unknown>): void {
    if (!this.apiAvailable) return;
    request.pipe(catchError(() => of(null))).subscribe();
  }

  private nextId(): number {
    return this.itemsSignal().reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  private setItems(items: AnnouncementItem[]): void {
    this.itemsSignal.set(items);
    this.writeJson(STORE_KEY, items);
  }

  private setRead(ids: number[]): void {
    this.readSignal.set(ids);
    this.writeJson(READ_KEY, ids);
  }

  private readStore(): AnnouncementItem[] {
    const stored = this.readJson<AnnouncementItem[]>(STORE_KEY);
    if (Array.isArray(stored) && stored.length > 0) return stored;
    const seed = buildSeedAnnouncements();
    this.writeJson(STORE_KEY, seed);
    return seed;
  }

  private fromApi(row: Record<string, unknown>, index: number): AnnouncementItem {
    const text = (...keys: string[]) => {
      for (const key of keys) {
        const value = row[key];
        if (value !== undefined && value !== null && String(value).trim() !== '') return String(value);
      }
      return '';
    };
    const publish = parseDate(text('publishOn', 'postedDate', 'published', 'createdOn')) ?? new Date();
    const expiry = parseDate(text('expiresOn', 'expireOn', 'expireDate')) ?? addDays(publish, 30);
    return {
      id: Number(text('id', 'announcementId')) || index + 1,
      title: text('title') || 'Untitled announcement',
      description: text('description'),
      priority: normalizePriority(text('priorityDesc', 'priority')),
      category: text('category') || 'General',
      department: text('department') || 'All Departments',
      targetAudience: text('targetAudience') || 'All Employees',
      publishOn: toIsoDate(publish),
      expiresOn: toIsoDate(expiry),
      postedBy: text('postedBy') || 'HR Team',
      isPinned: String(row['isPinned']).toLowerCase() === 'true',
      createdAt: publish.toISOString(),
    };
  }

  private toApi(item: AnnouncementItem): AddAnnouncementModel {
    return {
      Title: item.title,
      Date: parseDate(item.expiresOn) ?? new Date(),
      Priority: String(optionValue(PRIORITY_OPTIONS, item.priority) ?? 2),
      Description: item.description,
      OrgId: 1,
      Category: item.category,
      Department: item.department,
      TargetAudience: item.targetAudience,
    };
  }

  private readJson<T>(key: string): T | null {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  private writeJson(key: string, value: unknown): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked: keep working in memory
    }
  }
}
