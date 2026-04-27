import type { PlannerCalendarEventColor, PlannerCalendarView } from './planner-calendar.types';

export interface PlannerCalendarEvent {
  id: string;
  title: string;
  startIso: string;
  endIso: string;
  description?: string;
  location?: string;
  ownerName?: string;
  color: PlannerCalendarEventColor;
  isAllDay?: boolean;
}

export interface PlannerCalendarDayCell {
  date: Date;
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: PlannerCalendarEvent[];
}

export interface PlannerCalendarWeekDay {
  date: Date;
  isoDate: string;
  shortName: string;
  dayNumber: number;
  isToday: boolean;
}

export interface PlannerCalendarPeriod {
  view: PlannerCalendarView;
  startDate: Date;
  endDate: Date;
}

export interface PlannerCalendarSelectionChange {
  selectedDate: Date;
  events: PlannerCalendarEvent[];
}

export const plannerCalendarMockEvents: PlannerCalendarEvent[] = [
  {
    id: 'evt-001',
    title: 'Leadership Standup',
    startIso: '2026-04-27T09:00:00',
    endIso: '2026-04-27T09:45:00',
    location: 'Orion Room',
    ownerName: 'Nisha Verma',
    color: 'blue'
  },
  {
    id: 'evt-002',
    title: 'Hiring Panel - Backend',
    startIso: '2026-04-27T11:30:00',
    endIso: '2026-04-27T12:30:00',
    location: 'Focus Booth 3',
    ownerName: 'A. Das',
    color: 'violet'
  },
  {
    id: 'evt-003',
    title: 'Payroll Lock Review',
    startIso: '2026-04-27T11:30:00',
    endIso: '2026-04-27T12:30:00',
    location: 'Finance Pod',
    ownerName: 'Payroll Team',
    color: 'amber'
  },
  {
    id: 'evt-004',
    title: 'Product Demo Rehearsal',
    startIso: '2026-04-30T16:00:00',
    endIso: '2026-04-30T17:30:00',
    location: 'Studio 2',
    ownerName: 'Product Guild',
    color: 'green'
  },
  {
    id: 'evt-005',
    title: 'Client Escalation Follow-up',
    startIso: '2026-05-03T13:00:00',
    endIso: '2026-05-03T14:00:00',
    location: 'War Room',
    ownerName: 'CS Ops',
    color: 'rose'
  },
  {
    id: 'evt-006',
    title: 'Organization Planning Sync',
    startIso: '2026-05-03T13:00:00',
    endIso: '2026-05-03T14:00:00',
    location: 'North Wing',
    ownerName: 'Strategy Team',
    color: 'blue'
  }
];
