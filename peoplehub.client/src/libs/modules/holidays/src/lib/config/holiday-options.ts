import { Holiday, HolidayType } from '../models/holiday.model';

export const HOLIDAY_TYPES: { id: HolidayType; hint: string; chip: string; tile: string; dot: string }[] = [
  { id: 'Public', hint: 'National holiday', chip: 'bg-blue-50 text-blue-700 ring-blue-600/20', tile: 'bg-blue-600', dot: 'bg-blue-500' },
  { id: 'Festival', hint: 'Festival or religious day', chip: 'bg-amber-50 text-amber-700 ring-amber-600/20', tile: 'bg-amber-500', dot: 'bg-amber-500' },
  { id: 'Regional', hint: 'Applies to some locations', chip: 'bg-violet-50 text-violet-700 ring-violet-600/20', tile: 'bg-violet-600', dot: 'bg-violet-500' },
  { id: 'Company', hint: 'Company-declared day off', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', tile: 'bg-emerald-600', dot: 'bg-emerald-500' },
];

export const HOLIDAY_TYPE_MAP: Record<string, (typeof HOLIDAY_TYPES)[number]> = HOLIDAY_TYPES.reduce(
  (map, t) => ({ ...map, [t.id]: t }),
  {} as Record<string, (typeof HOLIDAY_TYPES)[number]>,
);

export const HOLIDAY_LIMITS = { nameMin: 2, nameMax: 100, descriptionMax: 200 };

/** Demo data (mirrors the seed in database/leave.sql + holidays.sql). */
export const SEED_HOLIDAYS: Holiday[] = [
  { id: 1, date: '2026-01-01', name: 'New Year', type: 'Company', isOptional: false, description: 'First day of the year.' },
  { id: 2, date: '2026-01-26', name: 'Republic Day', type: 'Public', isOptional: false, description: 'National holiday.' },
  { id: 3, date: '2026-03-04', name: 'Holi', type: 'Festival', isOptional: false, description: 'Festival of colours.' },
  { id: 4, date: '2026-08-15', name: 'Independence Day', type: 'Public', isOptional: false, description: 'National holiday.' },
  { id: 5, date: '2026-10-02', name: 'Gandhi Jayanti', type: 'Public', isOptional: false, description: 'National holiday.' },
  { id: 6, date: '2026-10-20', name: 'Dussehra', type: 'Festival', isOptional: false, description: 'Vijayadashami.' },
  { id: 7, date: '2026-11-08', name: 'Diwali', type: 'Festival', isOptional: false, description: 'Festival of lights.' },
  { id: 8, date: '2026-11-24', name: 'Guru Nanak Jayanti', type: 'Festival', isOptional: false, description: "Guru Nanak's birthday." },
  { id: 9, date: '2026-12-25', name: 'Christmas', type: 'Festival', isOptional: false, description: 'Christmas Day.' },
  { id: 10, date: '2027-01-01', name: 'New Year', type: 'Company', isOptional: false, description: 'First day of the year.' },
  { id: 11, date: '2027-01-26', name: 'Republic Day', type: 'Public', isOptional: false, description: 'National holiday.' },
];
