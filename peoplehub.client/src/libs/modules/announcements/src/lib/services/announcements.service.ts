import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { CommonService } from 'common';
import { AnnouncementDraft, AnnouncementItem } from '../models/announcement.model';
import { buildSeedAnnouncements } from '../config/announcements/announcement.seed';
import { normalizePriority, parseDate, toIsoDate, addDays } from '../utils/announcement.utils';

type AddAnnouncementModel = Parameters<CommonService['addAnnouncement']>[0];

/** Backend: PeopleHub.Server AnnouncementsController (proxied by proxy.conf.js). */
export const ANNOUNCEMENTS_API = '/api/v1/announcements';

const STORE_KEY = 'ph.announcements.v1';
const READ_KEY = 'ph.announcements.read.v1';
const API_TIMEOUT_MS = 5000;

/**
 * Single source of truth for announcements.
 *
 * - When the API answers, it is the source of truth: every write goes to the API
 *   (optimistic in the UI) and the list is re-synced if a write fails.
 * - When the API is unreachable (no backend / DB yet), data lives in
 *   localStorage, seeded with demo data, so the pages still work.
 */
@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  private readonly http = inject(HttpClient);
  private readonly commonService = inject(CommonService);
  private readonly itemsSignal = signal<AnnouncementItem[]>(this.readStore());
  private readonly readSignal = signal<number[]>(this.readJson<number[]>(READ_KEY) ?? []);
  private readonly apiSignal = signal(false);
  private tempId = 0;

  readonly items = this.itemsSignal.asReadonly();
  readonly readIds = computed(() => new Set(this.readSignal()));
  readonly loading = signal(false);
  /** True once the backend has answered; false = working on local demo data. */
  readonly isOnline = this.apiSignal.asReadonly();
  readonly lastError = signal<string | null>(null);

  /** Pulls the latest list from the API; keeps local data when the API is unreachable. */
  refresh(): void {
    this.loading.set(true);
    this.http
      .get<unknown>(ANNOUNCEMENTS_API)
      .pipe(
        timeout(API_TIMEOUT_MS),
        catchError(() => of(null)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((rows) => {
        if (!Array.isArray(rows)) return;
        this.apiSignal.set(true);
        const items = rows.map((row, index) => this.fromApi(row as Record<string, unknown>, index));
        this.itemsSignal.set(items);
        const serverRead = rows
          .filter((row) => (row as Record<string, unknown>)['isRead'] === true)
          .map((row) => Number((row as Record<string, unknown>)['id']));
        if (serverRead.length > 0) this.setRead(Array.from(new Set([...this.readSignal(), ...serverRead])));
      });
  }

  getById(id: number): AnnouncementItem | undefined {
    return this.itemsSignal().find((item) => item.id === id);
  }

  create(draft: AnnouncementDraft): AnnouncementItem {
    const online = this.apiSignal();
    const item: AnnouncementItem = {
      ...draft,
      id: online ? --this.tempId : this.nextId(),
      postedBy: draft.postedBy?.trim() || 'HR Team',
      createdAt: new Date().toISOString(),
    };
    this.setItems([item, ...this.itemsSignal()]);

    if (online) {
      this.http.post<Record<string, unknown>>(ANNOUNCEMENTS_API, this.toRequest(item)).subscribe({
        next: (saved) => this.replace(item.id, this.fromApi(saved, 0)),
        error: (error) => this.fail(error, 'Could not publish the announcement.'),
      });
    }
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

    if (updated && this.apiSignal()) {
      this.http.put<Record<string, unknown>>(`${ANNOUNCEMENTS_API}/${id}`, this.toRequest(updated)).subscribe({
        next: (saved) => this.replace(id, this.fromApi(saved, 0)),
        error: (error) => this.fail(error, 'Could not save your changes.'),
      });
    }
    return updated;
  }

  remove(id: number): void {
    this.setItems(this.itemsSignal().filter((item) => item.id !== id));
    if (this.apiSignal()) {
      this.http.delete(`${ANNOUNCEMENTS_API}/${id}`).subscribe({
        error: (error) => this.fail(error, 'Could not delete the announcement.'),
      });
    }
  }

  togglePin(id: number): void {
    const current = this.getById(id);
    if (!current) return;
    const isPinned = !current.isPinned;
    this.setItems(
      this.itemsSignal().map((item) =>
        item.id === id ? { ...item, isPinned, updatedAt: new Date().toISOString() } : item,
      ),
    );
    if (this.apiSignal()) {
      this.http.patch(`${ANNOUNCEMENTS_API}/${id}/pin`, { isPinned }).subscribe({
        error: (error) => this.fail(error, 'Could not update the pin.'),
      });
    }
  }

  isRead(id: number): boolean {
    return this.readIds().has(id);
  }

  markRead(id: number): void {
    if (this.isRead(id)) return;
    this.setRead([...this.readSignal(), id]);
    this.sendRead([id]);
  }

  markAllRead(ids: number[]): void {
    const fresh = ids.filter((id) => !this.isRead(id));
    if (fresh.length === 0) return;
    this.setRead([...this.readSignal(), ...fresh]);
    this.sendRead(fresh);
  }

  /** Resets local data back to the demo seed (only meaningful while offline). */
  resetDemoData(): void {
    this.setItems(buildSeedAnnouncements());
    this.setRead([]);
  }

  // Legacy pass-throughs kept for existing callers (old summary/expire components).
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

  private sendRead(ids: number[]): void {
    const real = ids.filter((id) => id > 0);
    if (!this.apiSignal() || real.length === 0) return;
    this.http.post(`${ANNOUNCEMENTS_API}/read`, { ids: real }).pipe(catchError(() => of(null))).subscribe();
  }

  private replace(id: number, next: AnnouncementItem): void {
    this.setItems(this.itemsSignal().map((item) => (item.id === id ? next : item)));
  }

  /** A write failed: surface the server message and re-sync with the server. */
  private fail(error: unknown, fallback: string): void {
    const body = (error as { error?: { detail?: string; title?: string } })?.error;
    this.lastError.set(body?.detail || body?.title || fallback);
    this.refresh();
  }

  private nextId(): number {
    return this.itemsSignal().reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  private setItems(items: AnnouncementItem[]): void {
    this.itemsSignal.set(items);
    // Only cache locally while offline; online data always comes from the API.
    if (!this.apiSignal()) this.writeJson(STORE_KEY, items);
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
    const publish = parseDate(text('publishOn', 'postedDate')) ?? new Date();
    const expiry = parseDate(text('expiresOn', 'expireDate')) ?? addDays(publish, 30);
    return {
      id: Number(text('id', 'announcementId')) || index + 1,
      title: text('title') || 'Untitled announcement',
      description: text('description'),
      priority: normalizePriority(text('priority')),
      category: text('category') || 'General',
      department: text('department') || 'All Departments',
      targetAudience: text('targetAudience') || 'All Employees',
      publishOn: toIsoDate(publish),
      expiresOn: toIsoDate(expiry),
      postedBy: text('postedBy') || 'HR Team',
      isPinned: row['isPinned'] === true || String(row['isPinned']).toLowerCase() === 'true',
      createdAt: text('createdAt') || publish.toISOString(),
      updatedAt: text('updatedAt') || undefined,
    };
  }

  /** Matches AnnouncementRequest in PeopleHub.Application. */
  private toRequest(item: AnnouncementItem) {
    return {
      title: item.title,
      description: item.description,
      priority: item.priority,
      category: item.category,
      department: item.department,
      targetAudience: item.targetAudience,
      publishOn: item.publishOn,
      expiresOn: item.expiresOn,
      isPinned: item.isPinned,
      postedBy: item.postedBy,
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
