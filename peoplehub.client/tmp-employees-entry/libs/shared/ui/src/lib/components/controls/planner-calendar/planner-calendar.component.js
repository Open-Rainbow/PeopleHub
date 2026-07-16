import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { plannerCalendarMockEvents } from '../../../models/component-models/planner-calendar.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PlannerCalendarComponent_For_17_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 23);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_For_17_Template_button_click_0_listener() { const view_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setView(view_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "titlecase");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const view_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("is-active", ctx_r2.isCurrentView(view_r2));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 3, view_r2), " ");
} }
function PlannerCalendarComponent_Conditional_20_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 25);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const weekDay_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(weekDay_r4);
} }
function PlannerCalendarComponent_Conditional_20_For_6_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 34);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_Conditional_20_For_6_For_5_Template_button_click_0_listener($event) { const event_r8 = i0.ɵɵrestoreView(_r7).$implicit; const dayCell_r6 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onEventClick(event_r8, dayCell_r6.date)); });
    i0.ɵɵdomElementStart(1, "span", 35);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span", 36);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const event_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("color-blue", event_r8.color === "blue")("color-green", event_r8.color === "green")("color-amber", event_r8.color === "amber")("color-rose", event_r8.color === "rose")("color-violet", event_r8.color === "violet");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatEventTime(event_r8));
} }
function PlannerCalendarComponent_Conditional_20_For_6_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const dayCell_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", dayCell_r6.events.length - 3, " more");
} }
function PlannerCalendarComponent_Conditional_20_For_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 33);
    i0.ɵɵtext(1, "No events");
    i0.ɵɵdomElementEnd();
} }
function PlannerCalendarComponent_Conditional_20_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "article", 28);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_Conditional_20_For_6_Template_article_click_0_listener() { const dayCell_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onMonthCellClick(dayCell_r6)); })("keydown.enter", function PlannerCalendarComponent_Conditional_20_For_6_Template_article_keydown_enter_0_listener() { const dayCell_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onMonthCellClick(dayCell_r6)); })("keydown.space", function PlannerCalendarComponent_Conditional_20_For_6_Template_article_keydown_space_0_listener() { const dayCell_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onMonthCellClick(dayCell_r6)); });
    i0.ɵɵdomElementStart(1, "span", 29);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "div", 30);
    i0.ɵɵrepeaterCreate(4, PlannerCalendarComponent_Conditional_20_For_6_For_5_Template, 5, 12, "button", 31, i0.ɵɵcomponentInstance().trackByEvent, true);
    i0.ɵɵconditionalCreate(6, PlannerCalendarComponent_Conditional_20_For_6_Conditional_6_Template, 2, 1, "p", 32);
    i0.ɵɵconditionalCreate(7, PlannerCalendarComponent_Conditional_20_For_6_Conditional_7_Template, 2, 0, "p", 33);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const dayCell_r6 = ctx.$implicit;
    i0.ɵɵclassProp("is-current-month", dayCell_r6.isCurrentMonth)("is-selected", dayCell_r6.isSelected)("is-today", dayCell_r6.isToday);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-current", dayCell_r6.isToday ? "date" : null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", dayCell_r6.dayNumber, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(dayCell_r6.events.slice(0, 3));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(dayCell_r6.events.length > 3 ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(dayCell_r6.events.length === 0 && dayCell_r6.isSelected ? 7 : -1);
} }
function PlannerCalendarComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 14)(1, "div", 24);
    i0.ɵɵrepeaterCreate(2, PlannerCalendarComponent_Conditional_20_For_3_Template, 2, 1, "div", 25, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "div", 26);
    i0.ɵɵrepeaterCreate(5, PlannerCalendarComponent_Conditional_20_For_6_Template, 8, 10, "article", 27, i0.ɵɵcomponentInstance().trackByDayCell, true);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.weekDayHeaders);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.monthCells());
} }
function PlannerCalendarComponent_Conditional_21_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 43);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_Conditional_21_For_4_Template_button_click_0_listener() { const weekDay_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectDate(weekDay_r10.date)); });
    i0.ɵɵdomElementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const weekDay_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-selected", ctx_r2.isSelectedDate(weekDay_r10.date))("is-today", weekDay_r10.isToday);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(weekDay_r10.shortName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(weekDay_r10.dayNumber);
} }
function PlannerCalendarComponent_Conditional_21_For_7_For_4_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 47);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_Conditional_21_For_7_For_4_For_2_Template_button_click_0_listener() { const event_r12 = i0.ɵɵrestoreView(_r11).$implicit; const weekDay_r13 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onEventClick(event_r12, weekDay_r13.date)); });
    i0.ɵɵdomElementStart(1, "span", 35);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span", 36);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const event_r12 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("color-blue", event_r12.color === "blue")("color-green", event_r12.color === "green")("color-amber", event_r12.color === "amber")("color-rose", event_r12.color === "rose")("color-violet", event_r12.color === "violet");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r12.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatEventTime(event_r12));
} }
function PlannerCalendarComponent_Conditional_21_For_7_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 45);
    i0.ɵɵrepeaterCreate(1, PlannerCalendarComponent_Conditional_21_For_7_For_4_For_2_Template, 5, 12, "button", 46, i0.ɵɵcomponentInstance().trackByEvent, true);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const weekDay_r13 = ctx.$implicit;
    const hour_r14 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.getEventsForHour(weekDay_r13.date, hour_r14));
} }
function PlannerCalendarComponent_Conditional_21_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 42)(1, "div", 44);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵrepeaterCreate(3, PlannerCalendarComponent_Conditional_21_For_7_For_4_Template, 3, 0, "div", 45, i0.ɵɵcomponentInstance().trackByWeekDay, true);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const hour_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatHourLabel(hour_r14));
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.weekDays());
} }
function PlannerCalendarComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 37)(1, "div", 38);
    i0.ɵɵdomElement(2, "div", 39);
    i0.ɵɵrepeaterCreate(3, PlannerCalendarComponent_Conditional_21_For_4_Template, 5, 6, "button", 40, i0.ɵɵcomponentInstance().trackByWeekDay, true);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "div", 41);
    i0.ɵɵrepeaterCreate(6, PlannerCalendarComponent_Conditional_21_For_7_Template, 5, 1, "div", 42, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("planner-schedule--single", ctx_r2.isCurrentView("day"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.weekDays());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.timelineHours);
} }
function PlannerCalendarComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 20);
    i0.ɵɵtext(1, "No planned items for this date.");
    i0.ɵɵdomElementEnd();
} }
function PlannerCalendarComponent_For_30_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 50);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const event_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(event_r15.location);
} }
function PlannerCalendarComponent_For_30_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 50);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const event_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Owner: ", event_r15.ownerName);
} }
function PlannerCalendarComponent_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "article", 21)(1, "p", 48);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p", 49);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(5, PlannerCalendarComponent_For_30_Conditional_5_Template, 2, 1, "p", 50);
    i0.ɵɵconditionalCreate(6, PlannerCalendarComponent_For_30_Conditional_6_Template, 2, 1, "p", 50);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const event_r15 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r15.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatEventTime(event_r15));
    i0.ɵɵadvance();
    i0.ɵɵconditional(event_r15.location ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(event_r15.ownerName ? 6 : -1);
} }
function PlannerCalendarComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 20);
    i0.ɵɵtext(1, "No upcoming events in this period.");
    i0.ɵɵdomElementEnd();
} }
function PlannerCalendarComponent_For_36_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 51);
    i0.ɵɵdomListener("click", function PlannerCalendarComponent_For_36_Template_button_click_0_listener() { const event_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onUpcomingEventClick(event_r17)); });
    i0.ɵɵdomElementStart(1, "span", 52);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const event_r17 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(event_r17.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatEventTime(event_r17));
} }
export class PlannerCalendarComponent {
    events = input(plannerCalendarMockEvents, ...(ngDevMode ? [{ debugName: "events" }] : /* istanbul ignore next */ []));
    initialDate = input(new Date(), ...(ngDevMode ? [{ debugName: "initialDate" }] : /* istanbul ignore next */ []));
    availableViews = input(['month', 'week', 'day'], ...(ngDevMode ? [{ debugName: "availableViews" }] : /* istanbul ignore next */ []));
    sidebarMode = input('agenda', ...(ngDevMode ? [{ debugName: "sidebarMode" }] : /* istanbul ignore next */ []));
    dateSelected = output();
    eventSelected = output();
    viewChanged = output();
    periodChanged = output();
    selectionChanged = output();
    currentView = signal('month', ...(ngDevMode ? [{ debugName: "currentView" }] : /* istanbul ignore next */ []));
    selectedDate = signal(this.normalizeDate(new Date()), ...(ngDevMode ? [{ debugName: "selectedDate" }] : /* istanbul ignore next */ []));
    anchorDate = signal(this.normalizeDate(new Date()), ...(ngDevMode ? [{ debugName: "anchorDate" }] : /* istanbul ignore next */ []));
    today = this.normalizeDate(new Date());
    weekDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    timelineHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    monthLabel = computed(() => this.anchorDate().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    }), ...(ngDevMode ? [{ debugName: "monthLabel" }] : /* istanbul ignore next */ []));
    periodLabel = computed(() => {
        const view = this.currentView();
        if (view === 'month') {
            return this.monthLabel();
        }
        if (view === 'day') {
            return this.formatDayTitle(this.anchorDate());
        }
        const weekDays = this.weekDays();
        const startDate = weekDays[0]?.date;
        const endDate = weekDays[weekDays.length - 1]?.date;
        if (!startDate || !endDate) {
            return '';
        }
        const sameYear = startDate.getFullYear() === endDate.getFullYear();
        const sameMonth = startDate.getMonth() === endDate.getMonth();
        const startLabel = startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const endLabel = endDate.toLocaleDateString('en-US', {
            month: sameMonth ? undefined : 'short',
            day: 'numeric'
        });
        const yearLabel = sameYear
            ? startDate.getFullYear()
            : `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
        return `${startLabel} - ${endLabel}, ${yearLabel}`;
    }, ...(ngDevMode ? [{ debugName: "periodLabel" }] : /* istanbul ignore next */ []));
    weekDays = computed(() => {
        const baseDate = this.anchorDate();
        if (this.currentView() === 'day') {
            const isoDate = this.toIsoDate(baseDate);
            return [
                {
                    date: baseDate,
                    isoDate,
                    shortName: baseDate.toLocaleDateString('en-US', { weekday: 'short' }),
                    dayNumber: baseDate.getDate(),
                    isToday: this.isSameDate(baseDate, this.today)
                }
            ];
        }
        const start = this.startOfWeek(baseDate);
        return Array.from({ length: 7 }, (_, index) => {
            const date = this.addDays(start, index);
            return {
                date,
                isoDate: this.toIsoDate(date),
                shortName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNumber: date.getDate(),
                isToday: this.isSameDate(date, this.today)
            };
        });
    }, ...(ngDevMode ? [{ debugName: "weekDays" }] : /* istanbul ignore next */ []));
    monthCells = computed(() => {
        const anchorDate = this.anchorDate();
        const selectedDate = this.selectedDate();
        const monthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
        const gridStart = this.startOfWeek(monthStart);
        return Array.from({ length: 42 }, (_, index) => {
            const date = this.addDays(gridStart, index);
            const events = this.getEventsForDate(date);
            return {
                date,
                isoDate: this.toIsoDate(date),
                dayNumber: date.getDate(),
                isCurrentMonth: date.getMonth() === anchorDate.getMonth(),
                isToday: this.isSameDate(date, this.today),
                isSelected: this.isSameDate(date, selectedDate),
                events
            };
        });
    }, ...(ngDevMode ? [{ debugName: "monthCells" }] : /* istanbul ignore next */ []));
    selectedDayEvents = computed(() => {
        const selectedDate = this.selectedDate();
        return this.getEventsForDate(selectedDate);
    }, ...(ngDevMode ? [{ debugName: "selectedDayEvents" }] : /* istanbul ignore next */ []));
    upcomingEvents = computed(() => {
        const fromDate = this.selectedDate().getTime();
        return [...this.events()]
            .filter((event) => new Date(event.startIso).getTime() >= fromDate)
            .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime())
            .slice(0, 6);
    }, ...(ngDevMode ? [{ debugName: "upcomingEvents" }] : /* istanbul ignore next */ []));
    currentPeriod = computed(() => {
        const view = this.currentView();
        if (view === 'month') {
            const monthDate = this.anchorDate();
            return {
                view,
                startDate: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
                endDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
            };
        }
        if (view === 'day') {
            const date = this.anchorDate();
            return {
                view,
                startDate: date,
                endDate: date
            };
        }
        const weekDays = this.weekDays();
        return {
            view,
            startDate: weekDays[0]?.date ?? this.anchorDate(),
            endDate: weekDays[weekDays.length - 1]?.date ?? this.anchorDate()
        };
    }, ...(ngDevMode ? [{ debugName: "currentPeriod" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const incomingDate = this.normalizeDate(this.initialDate());
            this.anchorDate.set(incomingDate);
            this.selectedDate.set(incomingDate);
        });
        effect(() => {
            this.periodChanged.emit(this.currentPeriod());
        });
        effect(() => {
            const selectedDate = this.selectedDate();
            this.selectionChanged.emit({
                selectedDate,
                events: this.getEventsForDate(selectedDate)
            });
        });
    }
    setView(view) {
        if (view === this.currentView()) {
            return;
        }
        this.currentView.set(view);
        this.viewChanged.emit(view);
    }
    goToToday() {
        this.selectDate(this.today);
    }
    goToPrevious() {
        const currentDate = this.anchorDate();
        const currentView = this.currentView();
        if (currentView === 'month') {
            this.anchorDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            return;
        }
        const daysToMove = currentView === 'week' ? -7 : -1;
        this.anchorDate.set(this.addDays(currentDate, daysToMove));
    }
    goToNext() {
        const currentDate = this.anchorDate();
        const currentView = this.currentView();
        if (currentView === 'month') {
            this.anchorDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            return;
        }
        const daysToMove = currentView === 'week' ? 7 : 1;
        this.anchorDate.set(this.addDays(currentDate, daysToMove));
    }
    selectDate(date) {
        const normalizedDate = this.normalizeDate(date);
        this.selectedDate.set(normalizedDate);
        this.anchorDate.set(normalizedDate);
        this.dateSelected.emit(normalizedDate);
    }
    onMonthCellClick(cell) {
        this.selectDate(cell.date);
    }
    onEventClick(event, date) {
        this.selectDate(date);
        this.eventSelected.emit(event);
    }
    onUpcomingEventClick(event) {
        this.onEventClick(event, new Date(event.startIso));
    }
    trackByDayCell(_, dayCell) {
        return dayCell.isoDate;
    }
    trackByWeekDay(_, weekDay) {
        return weekDay.isoDate;
    }
    trackByEvent(_, event) {
        return event.id;
    }
    getEventsForHour(date, hour) {
        return this.getEventsForDate(date).filter((event) => {
            const eventStart = new Date(event.startIso);
            return eventStart.getHours() === hour;
        });
    }
    formatHourLabel(hour) {
        return new Date(2026, 0, 1, hour).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    }
    formatSelectedDate() {
        return this.selectedDate().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    formatEventTime(event) {
        if (event.isAllDay) {
            return 'All day';
        }
        const start = new Date(event.startIso);
        const end = new Date(event.endIso);
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
        return `${formatter.format(start)} - ${formatter.format(end)}`;
    }
    isCurrentView(view) {
        return this.currentView() === view;
    }
    isSelectedDate(date) {
        return this.isSameDate(date, this.selectedDate());
    }
    isToday(date) {
        return this.isSameDate(date, this.today);
    }
    getEventsForDate(date) {
        const isoDate = this.toIsoDate(date);
        return [...this.events()]
            .filter((event) => this.toIsoDate(new Date(event.startIso)) === isoDate)
            .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());
    }
    startOfWeek(date) {
        const normalizedDate = this.normalizeDate(date);
        const weekDay = normalizedDate.getDay();
        return this.addDays(normalizedDate, -weekDay);
    }
    addDays(date, days) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + days);
        return this.normalizeDate(nextDate);
    }
    isSameDate(firstDate, secondDate) {
        return firstDate.toDateString() === secondDate.toDateString();
    }
    normalizeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    toIsoDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    formatDayTitle(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    static ɵfac = function PlannerCalendarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PlannerCalendarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlannerCalendarComponent, selectors: [["ui-planner-calendar"]], hostAttrs: [1, "ui-planner-calendar-host"], inputs: { events: [1, "events"], initialDate: [1, "initialDate"], availableViews: [1, "availableViews"], sidebarMode: [1, "sidebarMode"] }, outputs: { dateSelected: "dateSelected", eventSelected: "eventSelected", viewChanged: "viewChanged", periodChanged: "periodChanged", selectionChanged: "selectionChanged" }, decls: 37, vars: 8, consts: [["aria-label", "Planner calendar", 1, "planner-calendar"], ["aria-label", "Planner toolbar", 1, "planner-toolbar"], [1, "planner-toolbar__identity"], [1, "planner-toolbar__kicker"], [1, "planner-toolbar__title"], [1, "planner-toolbar__controls"], ["role", "group", "aria-label", "Calendar navigation", 1, "planner-toolbar__nav"], ["type", "button", "aria-label", "Previous period", 1, "planner-button", "planner-button--ghost", 3, "click"], ["type", "button", "aria-label", "Go to today", 1, "planner-button", "planner-button--primary", 3, "click"], ["type", "button", "aria-label", "Next period", 1, "planner-button", "planner-button--ghost", 3, "click"], ["role", "group", "aria-label", "Calendar view switcher", 1, "planner-toolbar__views"], ["type", "button", 1, "planner-button", "planner-button--view", 3, "is-active"], [1, "planner-layout"], [1, "planner-main"], ["role", "grid", "aria-label", "Month view", 1, "planner-month"], ["role", "table", "aria-label", "Schedule view", 1, "planner-schedule", 3, "planner-schedule--single"], ["aria-label", "Planner sidebar", 1, "planner-sidebar"], [1, "planner-sidebar__section"], [1, "planner-sidebar__label"], [1, "planner-sidebar__heading"], [1, "planner-sidebar__empty"], [1, "planner-sidebar__event-card"], ["type", "button", 1, "planner-sidebar__upcoming"], ["type", "button", 1, "planner-button", "planner-button--view", 3, "click"], ["role", "row", 1, "planner-month__weekday-row"], ["role", "columnheader", 1, "planner-month__weekday"], [1, "planner-month__grid"], ["tabindex", "0", "role", "button", 1, "planner-day", 3, "is-current-month", "is-selected", "is-today"], ["tabindex", "0", "role", "button", 1, "planner-day", 3, "click", "keydown.enter", "keydown.space"], [1, "planner-day__date"], [1, "planner-day__events"], ["type", "button", 1, "planner-event", 3, "color-blue", "color-green", "color-amber", "color-rose", "color-violet"], [1, "planner-day__more"], [1, "planner-day__empty"], ["type", "button", 1, "planner-event", 3, "click"], [1, "planner-event__title"], [1, "planner-event__time"], ["role", "table", "aria-label", "Schedule view", 1, "planner-schedule"], ["role", "rowgroup", 1, "planner-schedule__header"], ["aria-hidden", "true", 1, "planner-schedule__spacer"], ["type", "button", 1, "planner-schedule__day", 3, "is-selected", "is-today"], ["role", "rowgroup", 1, "planner-schedule__body"], ["role", "row", 1, "planner-schedule__row"], ["type", "button", 1, "planner-schedule__day", 3, "click"], ["role", "cell", 1, "planner-schedule__time"], ["role", "cell", 1, "planner-schedule__cell"], ["type", "button", 1, "planner-event", "planner-event--compact", 3, "color-blue", "color-green", "color-amber", "color-rose", "color-violet"], ["type", "button", 1, "planner-event", "planner-event--compact", 3, "click"], [1, "planner-sidebar__event-title"], [1, "planner-sidebar__event-time"], [1, "planner-sidebar__event-meta"], ["type", "button", 1, "planner-sidebar__upcoming", 3, "click"], [1, "planner-sidebar__upcoming-title"], [1, "planner-sidebar__upcoming-time"]], template: function PlannerCalendarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
            i0.ɵɵtext(4, "Planning calendar");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "h2", 4);
            i0.ɵɵtext(6);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(7, "div", 5)(8, "div", 6)(9, "button", 7);
            i0.ɵɵdomListener("click", function PlannerCalendarComponent_Template_button_click_9_listener() { return ctx.goToPrevious(); });
            i0.ɵɵtext(10, " Previous ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "button", 8);
            i0.ɵɵdomListener("click", function PlannerCalendarComponent_Template_button_click_11_listener() { return ctx.goToToday(); });
            i0.ɵɵtext(12, " Today ");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(13, "button", 9);
            i0.ɵɵdomListener("click", function PlannerCalendarComponent_Template_button_click_13_listener() { return ctx.goToNext(); });
            i0.ɵɵtext(14, " Next ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(15, "div", 10);
            i0.ɵɵrepeaterCreate(16, PlannerCalendarComponent_For_17_Template, 3, 5, "button", 11, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(18, "div", 12)(19, "div", 13);
            i0.ɵɵconditionalCreate(20, PlannerCalendarComponent_Conditional_20_Template, 7, 0, "div", 14);
            i0.ɵɵconditionalCreate(21, PlannerCalendarComponent_Conditional_21_Template, 8, 2, "div", 15);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(22, "aside", 16)(23, "section", 17)(24, "p", 18);
            i0.ɵɵtext(25, "Selected date");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(26, "h3", 19);
            i0.ɵɵtext(27);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(28, PlannerCalendarComponent_Conditional_28_Template, 2, 0, "p", 20);
            i0.ɵɵrepeaterCreate(29, PlannerCalendarComponent_For_30_Template, 7, 4, "article", 21, ctx.trackByEvent, true);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(31, "section", 17)(32, "p", 18);
            i0.ɵɵtext(33, "Upcoming");
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(34, PlannerCalendarComponent_Conditional_34_Template, 2, 0, "p", 20);
            i0.ɵɵrepeaterCreate(35, PlannerCalendarComponent_For_36_Template, 5, 2, "button", 22, ctx.trackByEvent, true);
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.periodLabel());
            i0.ɵɵadvance(10);
            i0.ɵɵrepeater(ctx.availableViews());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.isCurrentView("month") ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isCurrentView("month") ? 21 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.formatSelectedDate());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedDayEvents().length === 0 ? 28 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.selectedDayEvents());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("is-hidden", ctx.sidebarMode() === "details");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.upcomingEvents().length === 0 ? 34 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.upcomingEvents());
        } }, dependencies: [CommonModule, i1.TitleCasePipe], styles: ["[_nghost-%COMP%] {\r\n  --planner-bg: #f7f8fa;\r\n  --planner-card: var(--color-surface);\r\n  --planner-border: #dce1e8;\r\n  --planner-text: #142236;\r\n  --planner-muted: #5f6f86;\r\n  --planner-accent: #f97316;\r\n  --planner-accent-soft: #fff2e8;\r\n  --planner-focus: #123151;\r\n  --planner-blue: var(--color-primary);\r\n  --planner-green: var(--color-success);\r\n  --planner-amber: var(--color-warning);\r\n  --planner-rose: var(--color-danger);\r\n  --planner-violet: #7c3aed;\r\n\r\n  display: block;\r\n  font-family: 'Manrope', 'Segoe UI', sans-serif;\r\n  color: var(--planner-text);\r\n}\r\n\r\n@media (prefers-color-scheme: dark) {\r\n  [_nghost-%COMP%] {\r\n    --planner-bg: #131a22;\r\n    --planner-card: #1d2632;\r\n    --planner-border: #2d3a4b;\r\n    --planner-text: #e5edf7;\r\n    --planner-muted: #9bb0cb;\r\n    --planner-accent: #fb923c;\r\n    --planner-accent-soft: #2b2320;\r\n    --planner-focus: #9fc4ff;\r\n    --planner-blue: #7aa2ff;\r\n    --planner-green: #6de29b;\r\n    --planner-amber: #ffc777;\r\n    --planner-rose: #ff7f9f;\r\n    --planner-violet: #bea0ff;\r\n  }\r\n}\r\n\r\n.planner-calendar[_ngcontent-%COMP%] {\r\n  background:\r\n    radial-gradient(circle at top right, rgba(249, 115, 22, 0.1), transparent 45%),\r\n    radial-gradient(circle at top left, rgba(18, 49, 81, 0.09), transparent 40%),\r\n    var(--planner-bg);\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 20px;\r\n  padding: 20px;\r\n  display: grid;\r\n  gap: 20px;\r\n}\r\n\r\n.planner-toolbar[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 16px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.planner-toolbar__kicker[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  letter-spacing: 0.08em;\r\n  text-transform: uppercase;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-toolbar__title[_ngcontent-%COMP%] {\r\n  margin: 4px 0 0;\r\n  font-size: clamp(22px, 3vw, 30px);\r\n  line-height: 1.1;\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-toolbar__controls[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 10px;\r\n  align-items: center;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.planner-toolbar__nav[_ngcontent-%COMP%], \r\n.planner-toolbar__views[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  gap: 8px;\r\n  padding: 6px;\r\n  border-radius: 12px;\r\n  background: var(--planner-card);\r\n  border: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-button[_ngcontent-%COMP%] {\r\n  border: 1px solid transparent;\r\n  border-radius: 10px;\r\n  padding: 8px 14px;\r\n  background: transparent;\r\n  color: var(--planner-text);\r\n  cursor: pointer;\r\n  font: inherit;\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-button[_ngcontent-%COMP%]:focus-visible, \r\n.planner-day[_ngcontent-%COMP%]:focus-visible, \r\n.planner-event[_ngcontent-%COMP%]:focus-visible, \r\n.planner-sidebar__upcoming[_ngcontent-%COMP%]:focus-visible, \r\n.planner-schedule__day[_ngcontent-%COMP%]:focus-visible {\r\n  outline: 2px solid var(--planner-focus);\r\n  outline-offset: 2px;\r\n}\r\n\r\n.planner-button--primary[_ngcontent-%COMP%] {\r\n  background: var(--planner-accent);\r\n  color: var(--color-surface);\r\n}\r\n\r\n.planner-button--ghost[_ngcontent-%COMP%] {\r\n  background: var(--planner-accent-soft);\r\n  border-color: color-mix(in srgb, var(--planner-accent) 30%, transparent);\r\n}\r\n\r\n.planner-button--view.is-active[_ngcontent-%COMP%] {\r\n  background: var(--planner-text);\r\n  color: var(--planner-card);\r\n}\r\n\r\n.planner-layout[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1fr) 300px;\r\n  gap: 16px;\r\n  align-items: start;\r\n}\r\n\r\n.planner-main[_ngcontent-%COMP%], \r\n.planner-sidebar[_ngcontent-%COMP%] {\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 16px;\r\n  background: var(--planner-card);\r\n}\r\n\r\n.planner-main[_ngcontent-%COMP%] {\r\n  overflow: hidden;\r\n}\r\n\r\n.planner-month__weekday-row[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  border-bottom: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-month__weekday[_ngcontent-%COMP%] {\r\n  padding: 10px;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.06em;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-month__grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, minmax(0, 1fr));\r\n}\r\n\r\n.planner-day[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  background: transparent;\r\n  min-height: 130px;\r\n  padding: 8px;\r\n  display: grid;\r\n  grid-template-rows: auto 1fr;\r\n  gap: 6px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.planner-day[_ngcontent-%COMP%]:nth-child(7n) {\r\n  border-right: 0;\r\n}\r\n\r\n.planner-day__date[_ngcontent-%COMP%] {\r\n  width: 28px;\r\n  height: 28px;\r\n  border-radius: 999px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-day.is-selected[_ngcontent-%COMP%] {\r\n  background: color-mix(in srgb, var(--planner-accent) 12%, transparent);\r\n}\r\n\r\n.planner-day.is-selected[_ngcontent-%COMP%]   .planner-day__date[_ngcontent-%COMP%] {\r\n  background: var(--planner-accent);\r\n  color: var(--color-surface);\r\n}\r\n\r\n.planner-day.is-today[_ngcontent-%COMP%]:not(.is-selected)   .planner-day__date[_ngcontent-%COMP%] {\r\n  border: 1px solid var(--planner-accent);\r\n  color: var(--planner-accent);\r\n}\r\n\r\n.planner-day[_ngcontent-%COMP%]:not(.is-current-month) {\r\n  background: color-mix(in srgb, var(--planner-bg) 70%, transparent);\r\n}\r\n\r\n.planner-day[_ngcontent-%COMP%]:not(.is-current-month)   .planner-day__date[_ngcontent-%COMP%] {\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-day__events[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 6px;\r\n  align-content: start;\r\n}\r\n\r\n.planner-day__more[_ngcontent-%COMP%], \r\n.planner-day__empty[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-event[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid transparent;\r\n  border-left-width: 4px;\r\n  border-radius: 8px;\r\n  background: color-mix(in srgb, var(--planner-bg) 65%, transparent);\r\n  padding: 6px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  display: grid;\r\n  gap: 2px;\r\n}\r\n\r\n.planner-event--compact[_ngcontent-%COMP%] {\r\n  min-height: 52px;\r\n}\r\n\r\n.planner-event__title[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  font-weight: 700;\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-event__time[_ngcontent-%COMP%] {\r\n  font-size: 11px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-event.color-blue[_ngcontent-%COMP%] {\r\n  border-left-color: var(--planner-blue);\r\n}\r\n\r\n.planner-event.color-green[_ngcontent-%COMP%] {\r\n  border-left-color: var(--planner-green);\r\n}\r\n\r\n.planner-event.color-amber[_ngcontent-%COMP%] {\r\n  border-left-color: var(--planner-amber);\r\n}\r\n\r\n.planner-event.color-rose[_ngcontent-%COMP%] {\r\n  border-left-color: var(--planner-rose);\r\n}\r\n\r\n.planner-event.color-violet[_ngcontent-%COMP%] {\r\n  border-left-color: var(--planner-violet);\r\n}\r\n\r\n.planner-schedule[_ngcontent-%COMP%] {\r\n  overflow-x: auto;\r\n}\r\n\r\n.planner-schedule__header[_ngcontent-%COMP%], \r\n.planner-schedule__row[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 72px repeat(7, minmax(130px, 1fr));\r\n}\r\n\r\n.planner-schedule.planner-schedule--single[_ngcontent-%COMP%]   .planner-schedule__header[_ngcontent-%COMP%], \r\n.planner-schedule.planner-schedule--single[_ngcontent-%COMP%]   .planner-schedule__row[_ngcontent-%COMP%] {\r\n  grid-template-columns: 72px minmax(220px, 1fr);\r\n}\r\n\r\n.planner-schedule__spacer[_ngcontent-%COMP%], \r\n.planner-schedule__time[_ngcontent-%COMP%] {\r\n  border-right: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-schedule__day[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  background: transparent;\r\n  padding: 10px;\r\n  display: grid;\r\n  gap: 4px;\r\n  justify-items: center;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-schedule__day[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-schedule__day.is-selected[_ngcontent-%COMP%] {\r\n  background: color-mix(in srgb, var(--planner-accent) 12%, transparent);\r\n}\r\n\r\n.planner-schedule__day.is-today[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\r\n  color: var(--planner-accent);\r\n}\r\n\r\n.planner-schedule__time[_ngcontent-%COMP%] {\r\n  padding: 10px 8px;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-schedule__cell[_ngcontent-%COMP%] {\r\n  min-height: 72px;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  padding: 6px;\r\n  display: grid;\r\n  gap: 6px;\r\n  align-content: start;\r\n}\r\n\r\n.planner-sidebar[_ngcontent-%COMP%] {\r\n  padding: 14px;\r\n  display: grid;\r\n  gap: 14px;\r\n}\r\n\r\n.planner-sidebar__section[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  gap: 8px;\r\n}\r\n\r\n.planner-sidebar__section.is-hidden[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n.planner-sidebar__label[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 11px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-sidebar__heading[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 18px;\r\n}\r\n\r\n.planner-sidebar__empty[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  color: var(--planner-muted);\r\n  font-size: 13px;\r\n}\r\n\r\n.planner-sidebar__event-card[_ngcontent-%COMP%] {\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 12px;\r\n  padding: 10px;\r\n  display: grid;\r\n  gap: 4px;\r\n}\r\n\r\n.planner-sidebar__event-title[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-sidebar__event-time[_ngcontent-%COMP%], \r\n.planner-sidebar__event-meta[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-sidebar__upcoming[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 10px;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  text-align: left;\r\n  padding: 8px;\r\n  display: grid;\r\n  gap: 2px;\r\n}\r\n\r\n.planner-sidebar__upcoming-title[_ngcontent-%COMP%] {\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-sidebar__upcoming-time[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .planner-layout[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n  .planner-calendar[_ngcontent-%COMP%] {\r\n    padding: 14px;\r\n  }\r\n\r\n  .planner-toolbar[_ngcontent-%COMP%] {\r\n    align-items: flex-start;\r\n  }\r\n\r\n  .planner-toolbar__controls[_ngcontent-%COMP%] {\r\n    justify-content: flex-start;\r\n  }\r\n\r\n  .planner-day[_ngcontent-%COMP%] {\r\n    min-height: 108px;\r\n  }\r\n\r\n  .planner-schedule__header[_ngcontent-%COMP%], \r\n   .planner-schedule__row[_ngcontent-%COMP%] {\r\n    grid-template-columns: 64px repeat(7, minmax(116px, 1fr));\r\n  }\r\n\r\n  .planner-schedule.planner-schedule--single[_ngcontent-%COMP%]   .planner-schedule__header[_ngcontent-%COMP%], \r\n   .planner-schedule.planner-schedule--single[_ngcontent-%COMP%]   .planner-schedule__row[_ngcontent-%COMP%] {\r\n    grid-template-columns: 64px minmax(180px, 1fr);\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlannerCalendarComponent, [{
        type: Component,
        args: [{ selector: 'ui-planner-calendar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                    class: 'ui-planner-calendar-host'
                }, template: "<section class=\"planner-calendar\" aria-label=\"Planner calendar\">\r\n  <header class=\"planner-toolbar\" aria-label=\"Planner toolbar\">\r\n    <div class=\"planner-toolbar__identity\">\r\n      <p class=\"planner-toolbar__kicker\">Planning calendar</p>\r\n      <h2 class=\"planner-toolbar__title\">{{ periodLabel() }}</h2>\r\n    </div>\r\n\r\n    <div class=\"planner-toolbar__controls\">\r\n      <div class=\"planner-toolbar__nav\" role=\"group\" aria-label=\"Calendar navigation\">\r\n        <button type=\"button\" class=\"planner-button planner-button--ghost\" (click)=\"goToPrevious()\" aria-label=\"Previous period\">\r\n          Previous\r\n        </button>\r\n        <button type=\"button\" class=\"planner-button planner-button--primary\" (click)=\"goToToday()\" aria-label=\"Go to today\">\r\n          Today\r\n        </button>\r\n        <button type=\"button\" class=\"planner-button planner-button--ghost\" (click)=\"goToNext()\" aria-label=\"Next period\">\r\n          Next\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"planner-toolbar__views\" role=\"group\" aria-label=\"Calendar view switcher\">\r\n        @for (view of availableViews(); track view) {\r\n          <button\r\n            type=\"button\"\r\n            class=\"planner-button planner-button--view\"\r\n            [class.is-active]=\"isCurrentView(view)\"\r\n            (click)=\"setView(view)\">\r\n            {{ view | titlecase }}\r\n          </button>\r\n        }\r\n      </div>\r\n    </div>\r\n  </header>\r\n\r\n  <div class=\"planner-layout\">\r\n    <div class=\"planner-main\">\r\n      @if (isCurrentView('month')) {\r\n        <div class=\"planner-month\" role=\"grid\" aria-label=\"Month view\">\r\n          <div class=\"planner-month__weekday-row\" role=\"row\">\r\n            @for (weekDay of weekDayHeaders; track weekDay) {\r\n              <div class=\"planner-month__weekday\" role=\"columnheader\">{{ weekDay }}</div>\r\n            }\r\n          </div>\r\n\r\n          <div class=\"planner-month__grid\">\r\n            @for (dayCell of monthCells(); track trackByDayCell($index, dayCell)) {\r\n              <article\r\n                class=\"planner-day\"\r\n                tabindex=\"0\"\r\n                role=\"button\"\r\n                [class.is-current-month]=\"dayCell.isCurrentMonth\"\r\n                [class.is-selected]=\"dayCell.isSelected\"\r\n                [class.is-today]=\"dayCell.isToday\"\r\n                (click)=\"onMonthCellClick(dayCell)\"\r\n                (keydown.enter)=\"onMonthCellClick(dayCell)\"\r\n                (keydown.space)=\"onMonthCellClick(dayCell)\">\r\n                <span class=\"planner-day__date\" [attr.aria-current]=\"dayCell.isToday ? 'date' : null\">\r\n                  {{ dayCell.dayNumber }}\r\n                </span>\r\n\r\n                <div class=\"planner-day__events\">\r\n                  @for (event of dayCell.events.slice(0, 3); track trackByEvent($index, event)) {\r\n                    <button\r\n                      type=\"button\"\r\n                      class=\"planner-event\"\r\n                      [class.color-blue]=\"event.color === 'blue'\"\r\n                      [class.color-green]=\"event.color === 'green'\"\r\n                      [class.color-amber]=\"event.color === 'amber'\"\r\n                      [class.color-rose]=\"event.color === 'rose'\"\r\n                      [class.color-violet]=\"event.color === 'violet'\"\r\n                      (click)=\"$event.stopPropagation(); onEventClick(event, dayCell.date)\">\r\n                      <span class=\"planner-event__title\">{{ event.title }}</span>\r\n                      <span class=\"planner-event__time\">{{ formatEventTime(event) }}</span>\r\n                    </button>\r\n                  }\r\n\r\n                  @if (dayCell.events.length > 3) {\r\n                    <p class=\"planner-day__more\">+{{ dayCell.events.length - 3 }} more</p>\r\n                  }\r\n\r\n                  @if (dayCell.events.length === 0 && dayCell.isSelected) {\r\n                    <p class=\"planner-day__empty\">No events</p>\r\n                  }\r\n                </div>\r\n              </article>\r\n            }\r\n          </div>\r\n        </div>\r\n      }\r\n\r\n      @if (!isCurrentView('month')) {\r\n        <div class=\"planner-schedule\" [class.planner-schedule--single]=\"isCurrentView('day')\" role=\"table\" aria-label=\"Schedule view\">\r\n          <div class=\"planner-schedule__header\" role=\"rowgroup\">\r\n            <div class=\"planner-schedule__spacer\" aria-hidden=\"true\"></div>\r\n            @for (weekDay of weekDays(); track trackByWeekDay($index, weekDay)) {\r\n              <button\r\n                type=\"button\"\r\n                class=\"planner-schedule__day\"\r\n                [class.is-selected]=\"isSelectedDate(weekDay.date)\"\r\n                [class.is-today]=\"weekDay.isToday\"\r\n                (click)=\"selectDate(weekDay.date)\">\r\n                <span>{{ weekDay.shortName }}</span>\r\n                <strong>{{ weekDay.dayNumber }}</strong>\r\n              </button>\r\n            }\r\n          </div>\r\n\r\n          <div class=\"planner-schedule__body\" role=\"rowgroup\">\r\n            @for (hour of timelineHours; track hour) {\r\n              <div class=\"planner-schedule__row\" role=\"row\">\r\n                <div class=\"planner-schedule__time\" role=\"cell\">{{ formatHourLabel(hour) }}</div>\r\n\r\n                @for (weekDay of weekDays(); track trackByWeekDay($index, weekDay)) {\r\n                  <div class=\"planner-schedule__cell\" role=\"cell\">\r\n                    @for (event of getEventsForHour(weekDay.date, hour); track trackByEvent($index, event)) {\r\n                      <button\r\n                        type=\"button\"\r\n                        class=\"planner-event planner-event--compact\"\r\n                        [class.color-blue]=\"event.color === 'blue'\"\r\n                        [class.color-green]=\"event.color === 'green'\"\r\n                        [class.color-amber]=\"event.color === 'amber'\"\r\n                        [class.color-rose]=\"event.color === 'rose'\"\r\n                        [class.color-violet]=\"event.color === 'violet'\"\r\n                        (click)=\"onEventClick(event, weekDay.date)\">\r\n                        <span class=\"planner-event__title\">{{ event.title }}</span>\r\n                        <span class=\"planner-event__time\">{{ formatEventTime(event) }}</span>\r\n                      </button>\r\n                    }\r\n                  </div>\r\n                }\r\n              </div>\r\n            }\r\n          </div>\r\n        </div>\r\n      }\r\n    </div>\r\n\r\n    <aside class=\"planner-sidebar\" aria-label=\"Planner sidebar\">\r\n      <section class=\"planner-sidebar__section\">\r\n        <p class=\"planner-sidebar__label\">Selected date</p>\r\n        <h3 class=\"planner-sidebar__heading\">{{ formatSelectedDate() }}</h3>\r\n\r\n        @if (selectedDayEvents().length === 0) {\r\n          <p class=\"planner-sidebar__empty\">No planned items for this date.</p>\r\n        }\r\n\r\n        @for (event of selectedDayEvents(); track trackByEvent($index, event)) {\r\n          <article class=\"planner-sidebar__event-card\">\r\n            <p class=\"planner-sidebar__event-title\">{{ event.title }}</p>\r\n            <p class=\"planner-sidebar__event-time\">{{ formatEventTime(event) }}</p>\r\n            @if (event.location) {\r\n              <p class=\"planner-sidebar__event-meta\">{{ event.location }}</p>\r\n            }\r\n            @if (event.ownerName) {\r\n              <p class=\"planner-sidebar__event-meta\">Owner: {{ event.ownerName }}</p>\r\n            }\r\n          </article>\r\n        }\r\n      </section>\r\n\r\n      <section class=\"planner-sidebar__section\" [class.is-hidden]=\"sidebarMode() === 'details'\">\r\n        <p class=\"planner-sidebar__label\">Upcoming</p>\r\n\r\n        @if (upcomingEvents().length === 0) {\r\n          <p class=\"planner-sidebar__empty\">No upcoming events in this period.</p>\r\n        }\r\n\r\n        @for (event of upcomingEvents(); track trackByEvent($index, event)) {\r\n          <button\r\n            type=\"button\"\r\n            class=\"planner-sidebar__upcoming\"\r\n            (click)=\"onUpcomingEventClick(event)\">\r\n            <span class=\"planner-sidebar__upcoming-title\">{{ event.title }}</span>\r\n            <span class=\"planner-sidebar__upcoming-time\">{{ formatEventTime(event) }}</span>\r\n          </button>\r\n        }\r\n      </section>\r\n    </aside>\r\n  </div>\r\n</section>\r\n", styles: [":host {\r\n  --planner-bg: #f7f8fa;\r\n  --planner-card: var(--color-surface);\r\n  --planner-border: #dce1e8;\r\n  --planner-text: #142236;\r\n  --planner-muted: #5f6f86;\r\n  --planner-accent: #f97316;\r\n  --planner-accent-soft: #fff2e8;\r\n  --planner-focus: #123151;\r\n  --planner-blue: var(--color-primary);\r\n  --planner-green: var(--color-success);\r\n  --planner-amber: var(--color-warning);\r\n  --planner-rose: var(--color-danger);\r\n  --planner-violet: #7c3aed;\r\n\r\n  display: block;\r\n  font-family: 'Manrope', 'Segoe UI', sans-serif;\r\n  color: var(--planner-text);\r\n}\r\n\r\n@media (prefers-color-scheme: dark) {\r\n  :host {\r\n    --planner-bg: #131a22;\r\n    --planner-card: #1d2632;\r\n    --planner-border: #2d3a4b;\r\n    --planner-text: #e5edf7;\r\n    --planner-muted: #9bb0cb;\r\n    --planner-accent: #fb923c;\r\n    --planner-accent-soft: #2b2320;\r\n    --planner-focus: #9fc4ff;\r\n    --planner-blue: #7aa2ff;\r\n    --planner-green: #6de29b;\r\n    --planner-amber: #ffc777;\r\n    --planner-rose: #ff7f9f;\r\n    --planner-violet: #bea0ff;\r\n  }\r\n}\r\n\r\n.planner-calendar {\r\n  background:\r\n    radial-gradient(circle at top right, rgba(249, 115, 22, 0.1), transparent 45%),\r\n    radial-gradient(circle at top left, rgba(18, 49, 81, 0.09), transparent 40%),\r\n    var(--planner-bg);\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 20px;\r\n  padding: 20px;\r\n  display: grid;\r\n  gap: 20px;\r\n}\r\n\r\n.planner-toolbar {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 16px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.planner-toolbar__kicker {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  letter-spacing: 0.08em;\r\n  text-transform: uppercase;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-toolbar__title {\r\n  margin: 4px 0 0;\r\n  font-size: clamp(22px, 3vw, 30px);\r\n  line-height: 1.1;\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-toolbar__controls {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 10px;\r\n  align-items: center;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.planner-toolbar__nav,\r\n.planner-toolbar__views {\r\n  display: inline-flex;\r\n  gap: 8px;\r\n  padding: 6px;\r\n  border-radius: 12px;\r\n  background: var(--planner-card);\r\n  border: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-button {\r\n  border: 1px solid transparent;\r\n  border-radius: 10px;\r\n  padding: 8px 14px;\r\n  background: transparent;\r\n  color: var(--planner-text);\r\n  cursor: pointer;\r\n  font: inherit;\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-button:focus-visible,\r\n.planner-day:focus-visible,\r\n.planner-event:focus-visible,\r\n.planner-sidebar__upcoming:focus-visible,\r\n.planner-schedule__day:focus-visible {\r\n  outline: 2px solid var(--planner-focus);\r\n  outline-offset: 2px;\r\n}\r\n\r\n.planner-button--primary {\r\n  background: var(--planner-accent);\r\n  color: var(--color-surface);\r\n}\r\n\r\n.planner-button--ghost {\r\n  background: var(--planner-accent-soft);\r\n  border-color: color-mix(in srgb, var(--planner-accent) 30%, transparent);\r\n}\r\n\r\n.planner-button--view.is-active {\r\n  background: var(--planner-text);\r\n  color: var(--planner-card);\r\n}\r\n\r\n.planner-layout {\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1fr) 300px;\r\n  gap: 16px;\r\n  align-items: start;\r\n}\r\n\r\n.planner-main,\r\n.planner-sidebar {\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 16px;\r\n  background: var(--planner-card);\r\n}\r\n\r\n.planner-main {\r\n  overflow: hidden;\r\n}\r\n\r\n.planner-month__weekday-row {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  border-bottom: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-month__weekday {\r\n  padding: 10px;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.06em;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-month__grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, minmax(0, 1fr));\r\n}\r\n\r\n.planner-day {\r\n  border: 0;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  background: transparent;\r\n  min-height: 130px;\r\n  padding: 8px;\r\n  display: grid;\r\n  grid-template-rows: auto 1fr;\r\n  gap: 6px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n}\r\n\r\n.planner-day:nth-child(7n) {\r\n  border-right: 0;\r\n}\r\n\r\n.planner-day__date {\r\n  width: 28px;\r\n  height: 28px;\r\n  border-radius: 999px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-day.is-selected {\r\n  background: color-mix(in srgb, var(--planner-accent) 12%, transparent);\r\n}\r\n\r\n.planner-day.is-selected .planner-day__date {\r\n  background: var(--planner-accent);\r\n  color: var(--color-surface);\r\n}\r\n\r\n.planner-day.is-today:not(.is-selected) .planner-day__date {\r\n  border: 1px solid var(--planner-accent);\r\n  color: var(--planner-accent);\r\n}\r\n\r\n.planner-day:not(.is-current-month) {\r\n  background: color-mix(in srgb, var(--planner-bg) 70%, transparent);\r\n}\r\n\r\n.planner-day:not(.is-current-month) .planner-day__date {\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-day__events {\r\n  display: grid;\r\n  gap: 6px;\r\n  align-content: start;\r\n}\r\n\r\n.planner-day__more,\r\n.planner-day__empty {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-event {\r\n  width: 100%;\r\n  border: 1px solid transparent;\r\n  border-left-width: 4px;\r\n  border-radius: 8px;\r\n  background: color-mix(in srgb, var(--planner-bg) 65%, transparent);\r\n  padding: 6px;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  display: grid;\r\n  gap: 2px;\r\n}\r\n\r\n.planner-event--compact {\r\n  min-height: 52px;\r\n}\r\n\r\n.planner-event__title {\r\n  font-size: 12px;\r\n  font-weight: 700;\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-event__time {\r\n  font-size: 11px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-event.color-blue {\r\n  border-left-color: var(--planner-blue);\r\n}\r\n\r\n.planner-event.color-green {\r\n  border-left-color: var(--planner-green);\r\n}\r\n\r\n.planner-event.color-amber {\r\n  border-left-color: var(--planner-amber);\r\n}\r\n\r\n.planner-event.color-rose {\r\n  border-left-color: var(--planner-rose);\r\n}\r\n\r\n.planner-event.color-violet {\r\n  border-left-color: var(--planner-violet);\r\n}\r\n\r\n.planner-schedule {\r\n  overflow-x: auto;\r\n}\r\n\r\n.planner-schedule__header,\r\n.planner-schedule__row {\r\n  display: grid;\r\n  grid-template-columns: 72px repeat(7, minmax(130px, 1fr));\r\n}\r\n\r\n.planner-schedule.planner-schedule--single .planner-schedule__header,\r\n.planner-schedule.planner-schedule--single .planner-schedule__row {\r\n  grid-template-columns: 72px minmax(220px, 1fr);\r\n}\r\n\r\n.planner-schedule__spacer,\r\n.planner-schedule__time {\r\n  border-right: 1px solid var(--planner-border);\r\n}\r\n\r\n.planner-schedule__day {\r\n  border: 0;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  background: transparent;\r\n  padding: 10px;\r\n  display: grid;\r\n  gap: 4px;\r\n  justify-items: center;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-schedule__day strong {\r\n  color: var(--planner-text);\r\n}\r\n\r\n.planner-schedule__day.is-selected {\r\n  background: color-mix(in srgb, var(--planner-accent) 12%, transparent);\r\n}\r\n\r\n.planner-schedule__day.is-today strong {\r\n  color: var(--planner-accent);\r\n}\r\n\r\n.planner-schedule__time {\r\n  padding: 10px 8px;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-schedule__cell {\r\n  min-height: 72px;\r\n  border-right: 1px solid var(--planner-border);\r\n  border-bottom: 1px solid var(--planner-border);\r\n  padding: 6px;\r\n  display: grid;\r\n  gap: 6px;\r\n  align-content: start;\r\n}\r\n\r\n.planner-sidebar {\r\n  padding: 14px;\r\n  display: grid;\r\n  gap: 14px;\r\n}\r\n\r\n.planner-sidebar__section {\r\n  display: grid;\r\n  gap: 8px;\r\n}\r\n\r\n.planner-sidebar__section.is-hidden {\r\n  display: none;\r\n}\r\n\r\n.planner-sidebar__label {\r\n  margin: 0;\r\n  font-size: 11px;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.08em;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-sidebar__heading {\r\n  margin: 0;\r\n  font-size: 18px;\r\n}\r\n\r\n.planner-sidebar__empty {\r\n  margin: 0;\r\n  color: var(--planner-muted);\r\n  font-size: 13px;\r\n}\r\n\r\n.planner-sidebar__event-card {\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 12px;\r\n  padding: 10px;\r\n  display: grid;\r\n  gap: 4px;\r\n}\r\n\r\n.planner-sidebar__event-title {\r\n  margin: 0;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-sidebar__event-time,\r\n.planner-sidebar__event-meta {\r\n  margin: 0;\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n.planner-sidebar__upcoming {\r\n  width: 100%;\r\n  border: 1px solid var(--planner-border);\r\n  border-radius: 10px;\r\n  background: transparent;\r\n  cursor: pointer;\r\n  text-align: left;\r\n  padding: 8px;\r\n  display: grid;\r\n  gap: 2px;\r\n}\r\n\r\n.planner-sidebar__upcoming-title {\r\n  font-size: 13px;\r\n  font-weight: 700;\r\n}\r\n\r\n.planner-sidebar__upcoming-time {\r\n  font-size: 12px;\r\n  color: var(--planner-muted);\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n  .planner-layout {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n  .planner-calendar {\r\n    padding: 14px;\r\n  }\r\n\r\n  .planner-toolbar {\r\n    align-items: flex-start;\r\n  }\r\n\r\n  .planner-toolbar__controls {\r\n    justify-content: flex-start;\r\n  }\r\n\r\n  .planner-day {\r\n    min-height: 108px;\r\n  }\r\n\r\n  .planner-schedule__header,\r\n  .planner-schedule__row {\r\n    grid-template-columns: 64px repeat(7, minmax(116px, 1fr));\r\n  }\r\n\r\n  .planner-schedule.planner-schedule--single .planner-schedule__header,\r\n  .planner-schedule.planner-schedule--single .planner-schedule__row {\r\n    grid-template-columns: 64px minmax(180px, 1fr);\r\n  }\r\n}\r\n"] }]
    }], () => [], { events: [{ type: i0.Input, args: [{ isSignal: true, alias: "events", required: false }] }], initialDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "initialDate", required: false }] }], availableViews: [{ type: i0.Input, args: [{ isSignal: true, alias: "availableViews", required: false }] }], sidebarMode: [{ type: i0.Input, args: [{ isSignal: true, alias: "sidebarMode", required: false }] }], dateSelected: [{ type: i0.Output, args: ["dateSelected"] }], eventSelected: [{ type: i0.Output, args: ["eventSelected"] }], viewChanged: [{ type: i0.Output, args: ["viewChanged"] }], periodChanged: [{ type: i0.Output, args: ["periodChanged"] }], selectionChanged: [{ type: i0.Output, args: ["selectionChanged"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PlannerCalendarComponent, { className: "PlannerCalendarComponent", filePath: "libs/shared/ui/src/lib/components/controls/planner-calendar/planner-calendar.component.ts", lineNumber: 35 }); })();
//# sourceMappingURL=planner-calendar.component.js.map