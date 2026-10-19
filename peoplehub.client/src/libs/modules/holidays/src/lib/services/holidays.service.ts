import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { SEED_HOLIDAYS } from '../config/holiday-options';
import { Holiday, HolidayDraft, HolidayDraftErrors, HolidayType } from '../models/holiday.model';

/** Backend: PeopleHub.Server HolidayController (proxied by proxy.conf.js). */
export const HOLIDAYS_API = '/api/v1/holidays';

const STORE_KEY = 'ph.holidays.v1';
const API_TIMEOUT_MS = 5000;

type Row = Record<string, unknown>;

/**
 * Company holiday calendar.
 * The first call decides the mode: API when it answers (the database re-checks duplicates),
 * otherwise local demo data in localStorage so the page still works without a backend.
 */
@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  async list(year: number): Promise<Holiday[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${HOLIDAYS_API}?year=${year}`))).map(toHoliday),
      () => this.read().filter((h) => h.date.startsWith(`${year}-`)).sort(byDate),
    );
  }

  async create(draft: HolidayDraft): Promise<Holiday> {
    return this.run(
      async () => toHoliday(await this.call(this.http.post<Row>(HOLIDAYS_API, body(draft)))),
      () => {
        const all = this.read();
        assertFree(all, draft.date, null);
        const saved: Holiday = { ...clean(draft), id: all.reduce((m, h) => Math.max(m, h.id), 0) + 1 };
        this.write([...all, saved]);
        return saved;
      },
    );
  }

  async update(id: number, draft: HolidayDraft): Promise<Holiday> {
    return this.run(
      async () => toHoliday(await this.call(this.http.put<Row>(`${HOLIDAYS_API}/${id}`, body(draft)))),
      () => {
        const all = this.read();
        if (!all.some((h) => h.id === id)) throw new Error('This holiday no longer exists.');
        assertFree(all, draft.date, id);
        const saved: Holiday = { ...clean(draft), id };
        this.write(all.map((h) => (h.id === id ? saved : h)));
        return saved;
      },
    );
  }

  async remove(id: number): Promise<void> {
    return this.run(
      async () => {
        await this.call(this.http.delete(`${HOLIDAYS_API}/${id}`));
      },
      () => this.write(this.read().filter((h) => h.id !== id)),
    );
  }

  resetDemoData(): void {
    this.write(structuredClone(SEED_HOLIDAYS));
  }

  private async run<T>(api: () => Promise<T>, local: () => T): Promise<T> {
    if (this.mode !== 'local') {
      try {
        const result = await api();
        this.setMode('api');
        return result;
      } catch (error) {
        if (this.mode === 'unknown' && unreachable(error)) {
          this.setMode('local');
        } else {
          this.setMode('api');
          throw new Error(readableError(error));
        }
      }
    }
    return local();
  }

  private setMode(mode: 'api' | 'local'): void {
    this.mode = mode;
    this.isOnline.set(mode === 'api');
  }

  private call<T>(request: Observable<T>): Promise<T> {
    return firstValueFrom(request.pipe(timeout(API_TIMEOUT_MS)));
  }

  private read(): Holiday[] {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as Holiday[]) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fall through to seed
    }
    return structuredClone(SEED_HOLIDAYS);
  }

  private write(holidays: Holiday[]): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(holidays));
    } catch {
      // storage blocked
    }
  }
}

/** Field errors for the add/edit form. `others` = holidays already in the calendar (same year). */
export function validateHoliday(draft: HolidayDraft, others: Holiday[], editingId: number | null): HolidayDraftErrors {
  const errors: HolidayDraftErrors = {};
  const name = draft.name.trim();
  if (!draft.date) errors.date = 'Pick a date.';
  else {
    const year = Number(draft.date.slice(0, 4));
    if (year < 2000 || year > 2100) errors.date = 'Year must be between 2000 and 2100.';
    const clash = others.find((h) => h.date === draft.date && h.id !== editingId);
    if (clash) errors.date = `Already a holiday: ${clash.name}.`;
  }
  if (!name) errors.name = 'Give the holiday a name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';
  if (draft.description.length > 200) errors.description = 'Keep it under 200 characters.';
  return errors;
}

function assertFree(all: Holiday[], date: string, id: number | null): void {
  const clash = all.find((h) => h.date === date && h.id !== id);
  if (clash) throw new Error(`${date} is already a holiday (${clash.name}).`);
}

function clean(d: HolidayDraft): Omit<Holiday, 'id'> {
  return { date: d.date, name: d.name.trim(), type: d.type, isOptional: d.isOptional, description: d.description.trim() };
}

function body(d: HolidayDraft): Row {
  return { date: d.date, name: d.name.trim(), type: d.type, isOptional: d.isOptional, description: d.description.trim() || null };
}

function byDate(a: Holiday, b: Holiday): number {
  return a.date.localeCompare(b.date);
}

export function toHoliday(row: Row): Holiday {
  const text = (v: unknown) => (v === null || v === undefined ? '' : String(v));
  return {
    id: Number(row['id']),
    date: text(row['date']).slice(0, 10),
    name: text(row['name']),
    type: (text(row['type']) || 'Public') as HolidayType,
    isOptional: row['isOptional'] === true,
    description: text(row['description']),
  };
}

function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true;
  return error.status === 0 || error.status === 404 || error.status >= 500;
}

function readableError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const b = error.error as { detail?: string; title?: string; errors?: Record<string, string[]> } | null;
    const first = b?.errors ? Object.values(b.errors)[0]?.[0] : undefined;
    return first || b?.detail || b?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}
