import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function CalendarComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function CalendarComponent_Conditional_7_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 26);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Conditional_7_For_2_Template_li_click_0_listener() { const ɵ$index_33_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectMonth(ɵ$index_33_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const month_r5 = ctx.$implicit;
    const ɵ$index_33_r4 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ɵ$index_33_r4 === ctx_r1.currentMonth);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", month_r5, " ");
} }
function CalendarComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 13);
    i0.ɵɵrepeaterCreate(1, CalendarComponent_Conditional_7_Conditional_7_For_2_Template, 2, 3, "li", 25, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.months);
} }
function CalendarComponent_Conditional_7_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 26);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Conditional_11_For_2_Template_li_click_0_listener() { const year_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectYear(year_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", year_r7 === ctx_r1.currentYear);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", year_r7, " ");
} }
function CalendarComponent_Conditional_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 13);
    i0.ɵɵrepeaterCreate(1, CalendarComponent_Conditional_7_Conditional_11_For_2_Template, 2, 3, "li", 25, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.years);
} }
function CalendarComponent_Conditional_7_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const weekday_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(weekday_r8);
} }
function CalendarComponent_Conditional_7_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_For_22_Template_div_click_0_listener() { const day_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectDate(day_r10)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r10 = ctx.$implicit;
    i0.ɵɵclassProp("other-month", !day_r10.isCurrentMonth)("today", day_r10.isToday && !day_r10.isSelected)("selected", day_r10.isSelected);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", day_r10.day, " ");
} }
function CalendarComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCalendar()); });
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); $event.stopPropagation(); ctx_r1.closeMonthDropdown(); return i0.ɵɵresetView(ctx_r1.closeYearDropdown()); });
    i0.ɵɵelementStart(2, "div", 9)(3, "div", 10)(4, "div", 11);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_4_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(5, "div", 12);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleMonthDropdown()); });
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, CalendarComponent_Conditional_7_Conditional_7_Template, 3, 0, "ul", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 14);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_8_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(9, "div", 12);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_div_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleYearDropdown()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, CalendarComponent_Conditional_7_Conditional_11_Template, 3, 0, "ul", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 15)(13, "button", 16);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousMonth()); });
    i0.ɵɵelement(14, "ui-icon", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 18);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextMonth()); });
    i0.ɵɵelement(16, "ui-icon", 17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 19);
    i0.ɵɵrepeaterCreate(18, CalendarComponent_Conditional_7_For_19_Template, 2, 1, "div", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 20);
    i0.ɵɵrepeaterCreate(21, CalendarComponent_Conditional_7_For_22_Template, 2, 7, "div", 21, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 22)(24, "button", 23);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelection()); });
    i0.ɵɵtext(25, " Clear ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 24);
    i0.ɵɵlistener("click", function CalendarComponent_Conditional_7_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToToday()); });
    i0.ɵɵtext(27, " Today ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.months[ctx_r1.currentMonth], " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showMonthDropdown ? 7 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentYear, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showYearDropdown ? 11 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", "ic:round-keyboard-arrow-left");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "ic:round-keyboard-arrow-right");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.weekdays);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.calendarDays);
} }
export class CalendarComponent {
    label = 'Date of Birth';
    isRequired = true;
    parentFormGroup;
    id;
    placeholder = 'Select Gender';
    dateSelected = new EventEmitter();
    calendarClosed = new EventEmitter();
    isLabelFloating = false;
    constructor() { }
    showCalendar = false;
    currentDate = new Date();
    calendarDays = [];
    weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    years = [];
    showMonthDropdown = false;
    showYearDropdown = false;
    clickedInside = false;
    selectedDate = null;
    get formattedDate() {
        return this.selectedDate
            ? this.selectedDate.toLocaleDateString('en-GB').replace(/\//g, '-')
            : '';
    }
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    onChange = (_value) => { };
    onTouched = () => { };
    disabled = false;
    handleOutsideClick() {
        this.showMonthDropdown = false;
        if (this.clickedInside) {
            this.clickedInside = false;
            return;
        }
        this.showCalendar = false;
        if (!this.selectedDate) {
            this.isLabelFloating = false;
        }
        this.calendarClosed.emit();
    }
    ngOnInit() {
        this.generateYears();
        this.generateCalendar();
        const value = this.control?.value;
        if (value) {
            this.setDateFromValue(value);
        }
    }
    setDateFromValue(value) {
        if (!value)
            return;
        if (value instanceof Date) {
            this.selectedDate = value;
        }
        else if (typeof value === 'string') {
            const parts = value.split('-');
            if (parts.length === 3) {
                this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
            }
        }
        if (this.selectedDate) {
            this.currentMonth = this.selectedDate.getMonth();
            this.currentYear = this.selectedDate.getFullYear();
            this.isLabelFloating = true;
        }
        this.generateCalendar();
    }
    writeValue(value) {
        if (!value) {
            this.selectedDate = null;
            this.isLabelFloating = false;
            return;
        }
        if (value instanceof Date) {
            this.selectedDate = value;
        }
        else if (typeof value === 'string') {
            if (!isNaN(Date.parse(value))) {
                this.selectedDate = new Date(value);
            }
            else {
                const parts = value.split('-');
                if (parts.length === 3) {
                    this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
                }
            }
        }
        if (this.selectedDate) {
            this.currentMonth = this.selectedDate.getMonth();
            this.currentYear = this.selectedDate.getFullYear();
            this.isLabelFloating = true;
        }
        this.generateCalendar();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    markAsTouched() {
        this.onTouched();
    }
    openDatePicker(event) {
        event.preventDefault();
        this.clickedInside = true;
        this.showCalendar = !this.showCalendar;
        if (this.showCalendar) {
            if (this.selectedDate) {
                this.currentMonth = this.selectedDate.getMonth();
                this.currentYear = this.selectedDate.getFullYear();
            }
            else {
                const today = new Date();
                this.currentMonth = today.getMonth();
                this.currentYear = today.getFullYear();
            }
            this.generateCalendar();
            this.isLabelFloating = true;
        }
        else {
            if (!this.selectedDate) {
                this.isLabelFloating = false;
            }
        }
        this.markAsTouched();
    }
    selectDate(day) {
        this.selectedDate = new Date(day.date);
        this.currentMonth = this.selectedDate.getMonth();
        this.currentYear = this.selectedDate.getFullYear();
        this.generateCalendar();
        this.isLabelFloating = true;
        const dateString = this.formattedDate;
        console.log(dateString);
        const formatted = this.toDDMMYYYY(this.selectedDate);
        this.dateSelected.emit(formatted);
        console.log(formatted);
        this.onChange(formatted);
        this.control?.setValue(formatted);
        this.markAsTouched();
        this.closeCalendar();
    }
    toDDMMYYYY(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    clearSelection() {
        this.selectedDate = null;
        this.control?.setValue(null);
        this.control?.markAsTouched();
        this.control?.markAsDirty();
        this.generateCalendar();
        this.dateSelected.emit(null);
        this.onChange(null);
    }
    closeCalendar() {
        this.showCalendar = false;
        if (!this.selectedDate) {
            this.isLabelFloating = false;
        }
        this.calendarClosed.emit();
    }
    generateYears() {
        this.years = [];
        const startYear = 1950;
        const endYear = 2050;
        for (let i = startYear; i <= endYear; i++) {
            this.years.push(i);
        }
    }
    generateCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        this.calendarDays = [];
        const totalDays = 42;
        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const isCurrentMonth = date.getMonth() === this.currentMonth;
            const isSelected = this.isSelected(date);
            const isToday = this.isToday(date) && !isSelected;
            this.calendarDays.push({
                date,
                day: date.getDate(),
                isCurrentMonth,
                isToday,
                isSelected
            });
        }
    }
    isToday(date) {
        const today = new Date();
        return (date.toDateString() === today.toDateString() &&
            (!this.selectedDate || this.selectedDate.toDateString() !== today.toDateString()));
    }
    isSelected(date) {
        return this.selectedDate
            ? date.toDateString() === this.selectedDate.toDateString()
            : false;
    }
    previousMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }
        this.generateCalendar();
    }
    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }
        this.generateCalendar();
    }
    toggleMonthDropdown() {
        this.showMonthDropdown = !this.showMonthDropdown;
        this.showYearDropdown = false;
        if (this.showMonthDropdown) {
            setTimeout(() => {
                const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
                const monthDropdown = dropdowns[0];
                if (!monthDropdown)
                    return;
                const list = monthDropdown.querySelector('.dropdown-list');
                if (!list)
                    return;
                const selected = list.querySelector('li.selected');
                if (!selected)
                    return;
                list.scrollTop = selected.offsetTop;
            }, 0);
        }
    }
    toggleYearDropdown() {
        this.showYearDropdown = !this.showYearDropdown;
        this.showMonthDropdown = false;
        if (this.showYearDropdown) {
            setTimeout(() => {
                const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
                const yearDropdown = dropdowns[1];
                if (!yearDropdown)
                    return;
                const list = yearDropdown.querySelector('.dropdown-list');
                if (!list)
                    return;
                const selected = list.querySelector('li.selected');
                if (!selected)
                    return;
                list.scrollTop = selected.offsetTop;
            }, 0);
        }
    }
    selectMonth(index) {
        this.currentMonth = index;
        this.showMonthDropdown = false;
        this.defaultDateChanged();
    }
    selectYear(year) {
        this.currentYear = year;
        this.showYearDropdown = false;
        this.defaultDateChanged();
    }
    defaultDateChanged() {
        this.selectedDate = new Date(this.currentYear, this.currentMonth, 1);
        this.generateCalendar();
        const formatted = this.toDDMMYYYY(this.selectedDate);
        this.dateSelected.emit(formatted);
        this.onChange(formatted);
    }
    goToToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.selectedDate = today;
        this.generateCalendar();
        const formatted = this.toDDMMYYYY(this.selectedDate);
        this.dateSelected.emit(formatted);
        this.onChange(formatted);
    }
    closeMonthDropdown() {
        this.showMonthDropdown = false;
    }
    closeYearDropdown() {
        this.showYearDropdown = false;
    }
    static ɵfac = function CalendarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CalendarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalendarComponent, selectors: [["ui-calendar"]], hostBindings: function CalendarComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function CalendarComponent_click_HostBindingHandler() { return ctx.handleOutsideClick(); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: "label", isRequired: "isRequired", parentFormGroup: "parentFormGroup", id: "id", placeholder: "placeholder" }, outputs: { dateSelected: "dateSelected", calendarClosed: "calendarClosed" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => CalendarComponent),
                    multi: true
                }
            ])], decls: 8, vars: 24, consts: [[1, "calendar-container", 3, "formGroup"], [1, "input-wrapper"], ["type", "text", "readonly", "", 1, "calendar-input", 3, "click", "id", "formControlName", "value", "placeholder"], [1, "input-label", 3, "for"], [1, "required-asterisk"], ["width", "20", "height", "20", 1, "calendar-icon", 3, "name"], [1, "calendar-popup"], [1, "calendar-popup", 3, "click"], [1, "calendar-panel", 3, "click"], [1, "calendar-header"], [1, "month-year-selectors"], [1, "month-selector", 3, "click"], [1, "selector-trigger", 3, "click"], [1, "dropdown"], [1, "year-selector", 3, "click"], [1, "calendar-nav"], ["type", "button", "aria-label", "Previous month", 3, "click"], [3, "name"], ["type", "button", "aria-label", "Next month", 3, "click"], [1, "weekdays"], [1, "calendar-grid"], [1, "date-cell", 3, "other-month", "today", "selected"], [1, "calendar-footer"], ["type", "button", 1, "clear-btn", 3, "click"], ["type", "button", 1, "today-btn", 3, "click"], [3, "selected"], [3, "click"], [1, "date-cell", 3, "click"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "input", 2);
            i0.ɵɵlistener("click", function CalendarComponent_Template_input_click_2_listener($event) { return ctx.openDatePicker($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "label", 3);
            i0.ɵɵtext(4);
            i0.ɵɵconditionalCreate(5, CalendarComponent_Conditional_5_Template, 2, 0, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(6, "ui-icon", 5);
            i0.ɵɵconditionalCreate(7, CalendarComponent_Conditional_7_Template, 28, 6, "div", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-gray", !ctx.showCalendar && !ctx.isInvalid)("border-blue", ctx.showCalendar && !ctx.isInvalid)("border-red", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.id)("formControlName", ctx.id)("value", ctx.formattedDate)("placeholder", ctx.showCalendar || ctx.formattedDate || (ctx.control == null ? null : ctx.control.value) ? "dd-mm-yyyy" : "");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("floating", ctx.showCalendar || ctx.formattedDate || (ctx.control == null ? null : ctx.control.value))("blue", ctx.showCalendar && !ctx.isInvalid)("gray", !ctx.showCalendar && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵproperty("for", ctx.id);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("name", "lineicons:calendar-days");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCalendar ? 7 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, IconComponent, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName], styles: ["//[_ngcontent-%COMP%]   Calendar[_ngcontent-%COMP%]   Component[_ngcontent-%COMP%]   Scoped[_ngcontent-%COMP%]   Styles\r\n//[_ngcontent-%COMP%]   Following[_ngcontent-%COMP%]   Angular[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   Material[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   Guidelines\r\n\r\n.calendar-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.calendar-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 2.25rem;\r\n  font-size: 0.75rem; // text-xs\r\n  padding: 0 2.25rem 0 0.75rem; // pr-9 px-3\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n\r\n  &::placeholder {\r\n    color: var(--color-border);\r\n  }\r\n\r\n  &:read-only {\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n  }\r\n\r\n  // Border states\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n\r\n    &:focus {\r\n      border-color: var(--color-border);\r\n    }\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n    color: var(--color-danger);\r\n\r\n    &::placeholder {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.input-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: white;\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.calendar-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  z-index: 10;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.calendar-popup[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: calc(100% + 0.25rem);\r\n  left: 0;\r\n  z-index: 50;\r\n  min-width: 100%;\r\n  width: fit-content;\r\n\r\n  @media (max-width: 640px) {\r\n    min-width: 100vw;\r\n    right: 0;\r\n    left: auto;\r\n    margin-right: 1rem;\r\n  }\r\n}\r\n\r\n.calendar-panel[_ngcontent-%COMP%] {\r\n  background-color: white;\r\n  border-radius: 0.5rem;\r\n  padding: 1rem;\r\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\r\n  font-size: 0.75rem;\r\n  overflow: visible;\r\n\r\n  @media (max-width: 640px) {\r\n    padding: 0.75rem;\r\n  }\r\n}\r\n\r\n.calendar-header[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 0.5rem;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.month-year-selectors[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  align-items: center;\r\n}\r\n\r\n.month-selector[_ngcontent-%COMP%], \r\n.year-selector[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  .selector-trigger {\r\n    padding: 0 0.25rem;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: font-weight 0.2s;\r\n    user-select: none;\r\n\r\n    &:hover {\r\n      font-weight: 700;\r\n    }\r\n  }\r\n\r\n  .dropdown {\r\n    position: absolute;\r\n    top: calc(100% + 0.25rem);\r\n    left: 0;\r\n    background-color: white;\r\n    border: 1px solid var(--color-border);\r\n    border-radius: 0.375rem;\r\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\r\n    max-height: 15rem;\r\n    overflow-y: auto;\r\n    z-index: 50;\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    li {\r\n      padding: 0.25rem 0.5rem;\r\n      cursor: pointer;\r\n      transition: background-color 0.15s;\r\n\r\n      &:hover {\r\n        background-color: var(--color-surface-muted);\r\n      }\r\n\r\n      &.selected,\r\n      &.bg-blue {\r\n        background-color: var(--color-primary);\r\n        color: white;\r\n        font-weight: 500;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.calendar-nav[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  gap: 0.25rem;\r\n\r\n  button {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 1.25rem;\r\n    height: 1.25rem;\r\n    border-radius: 9999px;\r\n    border: none;\r\n    background-color: transparent;\r\n    cursor: pointer;\r\n    transition: background-color 0.15s;\r\n    padding: 0;\r\n\r\n    &:hover {\r\n      background-color: var(--color-border);\r\n    }\r\n\r\n    &:active {\r\n      background-color: var(--color-border);\r\n    }\r\n  }\r\n}\r\n\r\n.weekdays[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  gap: 0.375rem;\r\n  text-align: center;\r\n  font-weight: 500;\r\n  padding-bottom: 0.5rem;\r\n  border-bottom: 1px solid var(--color-surface-muted);\r\n  margin-bottom: 0.5rem;\r\n\r\n  > div {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 1.5rem;\r\n    font-size: 0.7rem;\r\n    color: var(--color-text-secondary);\r\n  }\r\n}\r\n\r\n.calendar-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  gap: 0.375rem;\r\n  padding-bottom: 0.5rem;\r\n  justify-items: center;\r\n\r\n  .date-cell {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 1.5rem;\r\n    height: 1.5rem;\r\n    border-radius: 9999px;\r\n    cursor: pointer;\r\n    font-size: 0.6875rem;\r\n    transition: all 0.15s;\r\n    user-select: none;\r\n    border: 1px solid transparent;\r\n\r\n    &.other-month {\r\n      color: var(--color-border);\r\n      cursor: default;\r\n    }\r\n\r\n    &.today:not(.selected) {\r\n      border-color: var(--color-primary);\r\n      color: var(--color-primary);\r\n      font-weight: 500;\r\n    }\r\n\r\n    &.selected {\r\n      background-color: var(--color-primary);\r\n      color: white;\r\n      font-weight: 600;\r\n      border-color: var(--color-primary);\r\n    }\r\n\r\n    &:not(.other-month):not(.selected):hover {\r\n      background-color: #e0e7ff;\r\n    }\r\n  }\r\n}\r\n\r\n.calendar-footer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  border-top: 1px solid var(--color-surface-muted);\r\n  padding-top: 0.5rem;\r\n  margin-top: 0.25rem;\r\n  font-size: 0.75rem;\r\n\r\n  button {\r\n    padding: 0.25rem 0.5rem;\r\n    border: none;\r\n    background-color: transparent;\r\n    cursor: pointer;\r\n    font-weight: 500;\r\n    transition: color 0.15s;\r\n    color: var(--color-text-secondary);\r\n\r\n    &:hover {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &:active {\r\n      color: var(--color-primary-hover);\r\n    }\r\n  }\r\n}\r\n\r\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   adjustments\r\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 640px) {\r\n  .calendar-panel {\r\n    width: 100%;\r\n    max-width: calc(100vw - 2rem);\r\n  }\r\n\r\n  .calendar-grid {\r\n    gap: 0.25rem;\r\n\r\n    .date-cell {\r\n      width: 1.25rem;\r\n      height: 1.25rem;\r\n      font-size: 0.625rem;\r\n    }\r\n  }\r\n\r\n  .weekdays {\r\n    gap: 0.25rem;\r\n\r\n    > div {\r\n      font-size: 0.65rem;\r\n      height: 1.25rem;\r\n    }\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-calendar', standalone: true, imports: [CommonModule, FormsModule, IconComponent, ReactiveFormsModule], providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => CalendarComponent),
                        multi: true
                    }
                ], template: "<div class=\"calendar-container\" [formGroup]=\"parentFormGroup\">\r\n  \r\n  <div class=\"input-wrapper\">\r\n\r\n    <input\r\n      type=\"text\"\r\n      readonly\r\n      [id]=\"id\"\r\n      [formControlName]=\"id\"\r\n      [value]=\"formattedDate\"\r\n      [placeholder]=\"(showCalendar || formattedDate || control?.value) ? 'dd-mm-yyyy' : ''\"\r\n      (click)=\"openDatePicker($event)\"\r\n      class=\"calendar-input\"\r\n      [class.border-gray]=\"!showCalendar && !isInvalid\"\r\n      [class.border-blue]=\"showCalendar && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n    />\r\n\r\n    <label\r\n      [for]=\"id\"\r\n      class=\"input-label\"\r\n      [class.floating]=\"showCalendar || formattedDate || control?.value\"\r\n      [class.blue]=\"showCalendar && !isInvalid\"\r\n      [class.gray]=\"!showCalendar && !isInvalid\"\r\n      [class.red]=\"isInvalid\"\r\n    >\r\n      {{ label }}\r\n      @if (isRequired) {\r\n        <span class=\"required-asterisk\">*</span>\r\n      }\r\n    </label>\r\n\r\n    <ui-icon \r\n      [name]=\"'lineicons:calendar-days'\" \r\n      width=\"20\" \r\n      height=\"20\"\r\n      class=\"calendar-icon\"\r\n    ></ui-icon>\r\n\r\n    @if (showCalendar) {\r\n      <div class=\"calendar-popup\" (click)=\"closeCalendar()\">\r\n\r\n        <div class=\"calendar-panel\"\r\n          (click)=\"$event.stopPropagation(); closeMonthDropdown(); closeYearDropdown()\">\r\n\r\n          <div class=\"calendar-header\">\r\n\r\n            <div class=\"month-year-selectors\">\r\n\r\n              <div class=\"month-selector\" (click)=\"$event.stopPropagation()\">\r\n                <div class=\"selector-trigger\" (click)=\"toggleMonthDropdown()\">\r\n                  {{ months[currentMonth] }}\r\n                </div>\r\n\r\n                @if (showMonthDropdown) {\r\n                  <ul class=\"dropdown\">\r\n                    @for (month of months; track month; let i = $index) {\r\n                      <li \r\n                        [class.selected]=\"i === currentMonth\" \r\n                        (click)=\"selectMonth(i)\">\r\n                        {{ month }}\r\n                      </li>\r\n                    }\r\n                  </ul>\r\n                }\r\n              </div>\r\n\r\n              <div class=\"year-selector\" (click)=\"$event.stopPropagation()\">\r\n                <div class=\"selector-trigger\" (click)=\"toggleYearDropdown()\">\r\n                  {{ currentYear }}\r\n                </div>\r\n\r\n                @if (showYearDropdown) {\r\n                  <ul class=\"dropdown\">\r\n                    @for (year of years; track year) {\r\n                      <li \r\n                        [class.selected]=\"year === currentYear\" \r\n                        (click)=\"selectYear(year)\">\r\n                        {{ year }}\r\n                      </li>\r\n                    }\r\n                  </ul>\r\n                }\r\n              </div>\r\n\r\n            </div>\r\n\r\n            <div class=\"calendar-nav\">\r\n              <button \r\n                type=\"button\"\r\n                (click)=\"previousMonth()\"\r\n                aria-label=\"Previous month\">\r\n                <ui-icon [name]=\"'ic:round-keyboard-arrow-left'\"></ui-icon>\r\n              </button>\r\n\r\n              <button \r\n                type=\"button\"\r\n                (click)=\"nextMonth()\"\r\n                aria-label=\"Next month\">\r\n                <ui-icon [name]=\"'ic:round-keyboard-arrow-right'\"></ui-icon>\r\n              </button>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"weekdays\">\r\n            @for (weekday of weekdays; track weekday) {\r\n              <div>{{ weekday }}</div>\r\n            }\r\n          </div>\r\n\r\n          <div class=\"calendar-grid\">\r\n            @for (day of calendarDays; track day) {\r\n              <div\r\n                class=\"date-cell\"\r\n                [class.other-month]=\"!day.isCurrentMonth\"\r\n                [class.today]=\"day.isToday && !day.isSelected\"\r\n                [class.selected]=\"day.isSelected\"\r\n                (click)=\"selectDate(day)\">\r\n                {{ day.day }}\r\n              </div>\r\n            }\r\n          </div>\r\n\r\n          <div class=\"calendar-footer\">\r\n\r\n            <button \r\n              type=\"button\"\r\n              (click)=\"clearSelection()\"\r\n              class=\"clear-btn\">\r\n              Clear\r\n            </button>\r\n\r\n            <button \r\n              type=\"button\"\r\n              (click)=\"goToToday()\"\r\n              class=\"today-btn\">\r\n              Today\r\n            </button>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n</div>\r\n", styles: ["// Calendar Component Scoped Styles\r\n// Following Angular and Material Design Guidelines\r\n\r\n.calendar-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.calendar-input {\r\n  width: 100%;\r\n  height: 2.25rem;\r\n  font-size: 0.75rem; // text-xs\r\n  padding: 0 2.25rem 0 0.75rem; // pr-9 px-3\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n\r\n  &::placeholder {\r\n    color: var(--color-border);\r\n  }\r\n\r\n  &:read-only {\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n  }\r\n\r\n  // Border states\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n\r\n    &:focus {\r\n      border-color: var(--color-border);\r\n    }\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n    color: var(--color-danger);\r\n\r\n    &::placeholder {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.input-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: white;\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.calendar-icon {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  z-index: 10;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.calendar-popup {\r\n  position: absolute;\r\n  top: calc(100% + 0.25rem);\r\n  left: 0;\r\n  z-index: 50;\r\n  min-width: 100%;\r\n  width: fit-content;\r\n\r\n  @media (max-width: 640px) {\r\n    min-width: 100vw;\r\n    right: 0;\r\n    left: auto;\r\n    margin-right: 1rem;\r\n  }\r\n}\r\n\r\n.calendar-panel {\r\n  background-color: white;\r\n  border-radius: 0.5rem;\r\n  padding: 1rem;\r\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\r\n  font-size: 0.75rem;\r\n  overflow: visible;\r\n\r\n  @media (max-width: 640px) {\r\n    padding: 0.75rem;\r\n  }\r\n}\r\n\r\n.calendar-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 0.5rem;\r\n  gap: 0.5rem;\r\n}\r\n\r\n.month-year-selectors {\r\n  display: flex;\r\n  gap: 0.5rem;\r\n  align-items: center;\r\n}\r\n\r\n.month-selector,\r\n.year-selector {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  .selector-trigger {\r\n    padding: 0 0.25rem;\r\n    font-weight: 600;\r\n    cursor: pointer;\r\n    transition: font-weight 0.2s;\r\n    user-select: none;\r\n\r\n    &:hover {\r\n      font-weight: 700;\r\n    }\r\n  }\r\n\r\n  .dropdown {\r\n    position: absolute;\r\n    top: calc(100% + 0.25rem);\r\n    left: 0;\r\n    background-color: white;\r\n    border: 1px solid var(--color-border);\r\n    border-radius: 0.375rem;\r\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\r\n    max-height: 15rem;\r\n    overflow-y: auto;\r\n    z-index: 50;\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n\r\n    li {\r\n      padding: 0.25rem 0.5rem;\r\n      cursor: pointer;\r\n      transition: background-color 0.15s;\r\n\r\n      &:hover {\r\n        background-color: var(--color-surface-muted);\r\n      }\r\n\r\n      &.selected,\r\n      &.bg-blue {\r\n        background-color: var(--color-primary);\r\n        color: white;\r\n        font-weight: 500;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.calendar-nav {\r\n  display: flex;\r\n  gap: 0.25rem;\r\n\r\n  button {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 1.25rem;\r\n    height: 1.25rem;\r\n    border-radius: 9999px;\r\n    border: none;\r\n    background-color: transparent;\r\n    cursor: pointer;\r\n    transition: background-color 0.15s;\r\n    padding: 0;\r\n\r\n    &:hover {\r\n      background-color: var(--color-border);\r\n    }\r\n\r\n    &:active {\r\n      background-color: var(--color-border);\r\n    }\r\n  }\r\n}\r\n\r\n.weekdays {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  gap: 0.375rem;\r\n  text-align: center;\r\n  font-weight: 500;\r\n  padding-bottom: 0.5rem;\r\n  border-bottom: 1px solid var(--color-surface-muted);\r\n  margin-bottom: 0.5rem;\r\n\r\n  > div {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 1.5rem;\r\n    font-size: 0.7rem;\r\n    color: var(--color-text-secondary);\r\n  }\r\n}\r\n\r\n.calendar-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  gap: 0.375rem;\r\n  padding-bottom: 0.5rem;\r\n  justify-items: center;\r\n\r\n  .date-cell {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    width: 1.5rem;\r\n    height: 1.5rem;\r\n    border-radius: 9999px;\r\n    cursor: pointer;\r\n    font-size: 0.6875rem;\r\n    transition: all 0.15s;\r\n    user-select: none;\r\n    border: 1px solid transparent;\r\n\r\n    &.other-month {\r\n      color: var(--color-border);\r\n      cursor: default;\r\n    }\r\n\r\n    &.today:not(.selected) {\r\n      border-color: var(--color-primary);\r\n      color: var(--color-primary);\r\n      font-weight: 500;\r\n    }\r\n\r\n    &.selected {\r\n      background-color: var(--color-primary);\r\n      color: white;\r\n      font-weight: 600;\r\n      border-color: var(--color-primary);\r\n    }\r\n\r\n    &:not(.other-month):not(.selected):hover {\r\n      background-color: #e0e7ff;\r\n    }\r\n  }\r\n}\r\n\r\n.calendar-footer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  border-top: 1px solid var(--color-surface-muted);\r\n  padding-top: 0.5rem;\r\n  margin-top: 0.25rem;\r\n  font-size: 0.75rem;\r\n\r\n  button {\r\n    padding: 0.25rem 0.5rem;\r\n    border: none;\r\n    background-color: transparent;\r\n    cursor: pointer;\r\n    font-weight: 500;\r\n    transition: color 0.15s;\r\n    color: var(--color-text-secondary);\r\n\r\n    &:hover {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &:active {\r\n      color: var(--color-primary-hover);\r\n    }\r\n  }\r\n}\r\n\r\n// Responsive adjustments\r\n@media (max-width: 640px) {\r\n  .calendar-panel {\r\n    width: 100%;\r\n    max-width: calc(100vw - 2rem);\r\n  }\r\n\r\n  .calendar-grid {\r\n    gap: 0.25rem;\r\n\r\n    .date-cell {\r\n      width: 1.25rem;\r\n      height: 1.25rem;\r\n      font-size: 0.625rem;\r\n    }\r\n  }\r\n\r\n  .weekdays {\r\n    gap: 0.25rem;\r\n\r\n    > div {\r\n      font-size: 0.65rem;\r\n      height: 1.25rem;\r\n    }\r\n  }\r\n}\r\n"] }]
    }], () => [], { label: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], dateSelected: [{
            type: Output
        }], calendarClosed: [{
            type: Output
        }], handleOutsideClick: [{
            type: HostListener,
            args: ['document:click']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CalendarComponent, { className: "CalendarComponent", filePath: "libs/shared/ui/src/lib/components/controls/calendar/calendar.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=calendar.component.js.map