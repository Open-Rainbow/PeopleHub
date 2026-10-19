export type HolidayType = 'Public' | 'Festival' | 'Regional' | 'Company';

export interface Holiday {
  id: number;
  /** yyyy-MM-dd */
  date: string;
  name: string;
  type: HolidayType;
  /** Optional (restricted) holidays don't reduce leave days; employees may take them as leave. */
  isOptional: boolean;
  description: string;
}

/** Add / edit form. */
export interface HolidayDraft {
  date: string;
  name: string;
  type: HolidayType;
  isOptional: boolean;
  description: string;
}

export type HolidayDraftErrors = Partial<Record<keyof HolidayDraft, string>>;
