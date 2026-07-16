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
export declare const plannerCalendarMockEvents: PlannerCalendarEvent[];
//# sourceMappingURL=planner-calendar.model.d.ts.map