import { Component, EventEmitter, HostListener, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["hoursCol"];
const _c1 = ["minutesCol"];
const _c2 = ["secondsCol"];
const _c3 = ["ampmCol"];
function TimepickerComponent_Conditional_3_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function TimepickerComponent_Conditional_3_For_7_Template_div_click_0_listener() { const h_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectValue("hours", h_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const h_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.isActive("hours", h_r4));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", h_r4 < 10 ? "0" + h_r4 : h_r4, " ");
} }
function TimepickerComponent_Conditional_3_For_13_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function TimepickerComponent_Conditional_3_For_13_Template_div_click_0_listener() { const m_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectValue("minutes", m_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.isActive("minutes", m_r6));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", m_r6 < 10 ? "0" + m_r6 : m_r6, " ");
} }
function TimepickerComponent_Conditional_3_Conditional_14_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵlistener("click", function TimepickerComponent_Conditional_3_Conditional_14_For_5_Template_div_click_0_listener() { const s_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectValue("seconds", s_r9)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r1.isActive("seconds", s_r9));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r9 < 10 ? "0" + s_r9 : s_r9, " ");
} }
function TimepickerComponent_Conditional_3_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1, " : ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 10, 2);
    i0.ɵɵlistener("scroll", function TimepickerComponent_Conditional_3_Conditional_14_Template_div_scroll_2_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onScroll("seconds")); });
    i0.ɵɵrepeaterCreate(4, TimepickerComponent_Conditional_3_Conditional_14_For_5_Template, 2, 3, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.visibleSeconds);
} }
function TimepickerComponent_Conditional_3_Conditional_15_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵlistener("click", function TimepickerComponent_Conditional_3_Conditional_15_For_3_Template_div_click_0_listener() { const a_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.setAmPm(a_r12)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const a_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", ctx_r1.ampm === a_r12);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", a_r12, " ");
} }
function TimepickerComponent_Conditional_3_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15, 3);
    i0.ɵɵlistener("scroll", function TimepickerComponent_Conditional_3_Conditional_15_Template_div_scroll_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onScroll("ampm")); });
    i0.ɵɵrepeaterCreate(2, TimepickerComponent_Conditional_3_Conditional_15_For_3_Template, 2, 3, "div", 16, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelement(4, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.visibleAmPm);
} }
function TimepickerComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "div", 7);
    i0.ɵɵelement(2, "div", 8)(3, "div", 9);
    i0.ɵɵelementStart(4, "div", 10, 0);
    i0.ɵɵlistener("scroll", function TimepickerComponent_Conditional_3_Template_div_scroll_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onScroll("hours")); });
    i0.ɵɵrepeaterCreate(6, TimepickerComponent_Conditional_3_For_7_Template, 2, 3, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 12);
    i0.ɵɵtext(9, " : ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 10, 1);
    i0.ɵɵlistener("scroll", function TimepickerComponent_Conditional_3_Template_div_scroll_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onScroll("minutes")); });
    i0.ɵɵrepeaterCreate(12, TimepickerComponent_Conditional_3_For_13_Template, 2, 3, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, TimepickerComponent_Conditional_3_Conditional_14_Template, 6, 0);
    i0.ɵɵconditionalCreate(15, TimepickerComponent_Conditional_3_Conditional_15_Template, 5, 0, "div", 13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.visibleHours);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.visibleMinutes);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.showSeconds ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.use24HourFormat ? 15 : -1);
} }
export class TimepickerComponent {
    eRef;
    use24HourFormat = false;
    showSeconds = true;
    timeChange = new EventEmitter();
    blurEvent = new EventEmitter();
    parentFormGroup;
    id;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    isPickerOpen = false;
    userInteracted = false;
    hoursList = [];
    minutesList = Array.from({ length: 60 }, (_, i) => i);
    secondsList = Array.from({ length: 60 }, (_, i) => i);
    ampmList = ['AM', 'PM'];
    visibleHours = [];
    visibleMinutes = [];
    visibleSeconds = [];
    visibleAmPm = [];
    _time = { hours: 0, minutes: 0, seconds: 0, ampm: 'PM' };
    itemHeight = 40;
    repeatCount = 200;
    scrollTimers = new Map();
    liveClockInterval;
    lastMinute = 0;
    hoursCol;
    minutesCol;
    secondsCol;
    ampmCol;
    constructor(eRef) {
        this.eRef = eRef;
    }
    onClickOutside(event) {
        if (this.isPickerOpen && !this.eRef.nativeElement.contains(event.target)) {
            this.closePicker();
        }
    }
    ngOnInit() {
        this.initializeLists();
        this.setInitialTime();
        this.startLiveClock();
    }
    ngAfterViewInit() {
        this.updateVisibleLists();
    }
    ngOnDestroy() {
        this.stopLiveClock();
    }
    initializeLists() {
        this.hoursList = this.use24HourFormat
            ? Array.from({ length: 24 }, (_, i) => i)
            : Array.from({ length: 12 }, (_, i) => i + 1);
    }
    setInitialTime() {
        const istTime = this.getIstTime();
        this.setTimeState({
            hours: istTime.getHours(),
            minutes: istTime.getMinutes(),
            seconds: istTime.getSeconds(),
            ampm: istTime.getHours() >= 12 ? 'PM' : 'AM'
        });
    }
    getIstTime() {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utc + 5.5 * 60 * 60 * 1000);
    }
    setTimeState(time) {
        this._time = { ...this._time, ...time };
        this.timeChange.emit(this.formatDisplayTime());
    }
    onBlur() {
        this.blurEvent.emit();
    }
    togglePicker() {
        if (this.isPickerOpen) {
            this.closePicker();
        }
        else {
            this.openPicker();
        }
    }
    openPicker() {
        this.isPickerOpen = true;
        this.setInitialTime();
        setTimeout(() => {
            this.setScrollBehavior(false);
            requestAnimationFrame(() => {
                this.centerOnSelected(true);
                this.setScrollBehavior(true);
            });
        });
    }
    closePicker() {
        this.isPickerOpen = false;
        this.stopLiveClock();
        this.userInteracted = false;
    }
    startLiveClock() {
        this.stopLiveClock();
        this.liveClockInterval = setInterval(() => {
            const istTime = this.getIstTime();
            const newTime = {
                hours: this.use24HourFormat ? istTime.getHours() : istTime.getHours() % 12 || 12,
                minutes: istTime.getMinutes(),
                seconds: istTime.getSeconds(),
                ampm: istTime.getHours() >= 12 ? 'PM' : 'AM'
            };
            if (!this.userInteracted) {
                this.setTimeState(newTime);
                this.scrollToCurrentSeconds();
                if (this.minutes !== this.lastMinute) {
                    this.lastMinute = this.minutes;
                    this.scrollToCurrentMinutes();
                }
                if (this.minutes === 0 && this.seconds === 0) {
                    this.scrollToCurrentHours();
                }
            }
        }, 1000);
    }
    stopLiveClock() {
        if (this.liveClockInterval) {
            clearInterval(this.liveClockInterval);
            this.liveClockInterval = null;
        }
    }
    onScroll(type) {
        const el = this.getCol(type);
        if (!el)
            return;
        if (!this.userInteracted) {
            this.userInteracted = true;
            this.stopLiveClock();
        }
        if (this.scrollTimers.has(type)) {
            clearTimeout(this.scrollTimers.get(type));
        }
        const scrollTop = el.scrollTop;
        const centerOffset = (el.clientHeight / 2) - (this.itemHeight / 2);
        const position = (scrollTop + centerOffset) / this.itemHeight;
        const list = this.getList(type);
        const index = Math.round(position) % list.length;
        const newValue = list[index];
        this.updateTimeFromScroll(type, newValue);
        const timer = setTimeout(() => {
            const middleIndex = list.length + index;
            el.scrollTo({
                top: (middleIndex * this.itemHeight) - centerOffset,
                behavior: 'smooth'
            });
        }, 200);
        this.scrollTimers.set(type, timer);
    }
    selectValue(type, value) {
        this.userInteracted = true;
        this.stopLiveClock();
        this.updateTimeFromScroll(type, value);
        setTimeout(() => this.centerOnSelected(true), 0);
    }
    setAmPm(value) {
        const normalizedValue = value === 'AM' ? 'AM' : 'PM';
        this.userInteracted = true;
        this.stopLiveClock();
        this.setTimeState({ ...this._time, ampm: normalizedValue });
        if (this.ampmCol?.nativeElement) {
            this.ampmCol.nativeElement.scrollTo({
                top: normalizedValue === 'AM' ? 0 : this.itemHeight,
                behavior: 'smooth'
            });
        }
    }
    getList(type) {
        return type === 'hours' ? this.hoursList :
            type === 'minutes' ? this.minutesList :
                type === 'seconds' ? this.secondsList : this.ampmList;
    }
    updateTimeFromScroll(type, value) {
        const updates = { [type]: value };
        this.setTimeState({ ...this._time, ...updates });
    }
    getCol(type) {
        const cols = {
            hours: this.hoursCol,
            minutes: this.minutesCol,
            seconds: this.secondsCol,
            ampm: this.ampmCol
        };
        return cols[type]?.nativeElement || null;
    }
    updateVisibleLists() {
        const repeat = (arr) => Array.from({ length: this.repeatCount }, () => arr).flat();
        this.visibleHours = repeat(this.hoursList);
        this.visibleMinutes = repeat(this.minutesList);
        this.visibleAmPm = repeat(this.ampmList);
        if (this.showSeconds) {
            this.visibleSeconds = repeat(this.secondsList);
        }
    }
    centerOnSelected(instant = false) {
        if (!this.hoursCol?.nativeElement || !this.minutesCol?.nativeElement)
            return;
        const centerOffset = (this.hoursCol.nativeElement.clientHeight / 2) - (this.itemHeight / 2);
        const behavior = instant ? 'auto' : 'smooth';
        const hoursIndex = this.hoursList.indexOf(this.hours);
        const minutesIndex = this.minutesList.indexOf(this.minutes);
        this.hoursCol.nativeElement.scrollTo({
            top: (this.hoursList.length + hoursIndex) * this.itemHeight - centerOffset,
            behavior
        });
        this.minutesCol.nativeElement.scrollTo({
            top: (this.minutesList.length + minutesIndex) * this.itemHeight - centerOffset,
            behavior
        });
        if (this.showSeconds && this.secondsCol) {
            const secondsIndex = this.secondsList.indexOf(this.seconds);
            this.secondsCol.nativeElement.scrollTo({
                top: (this.secondsList.length + secondsIndex) * this.itemHeight - centerOffset,
                behavior
            });
        }
        if (!this.use24HourFormat && this.ampmCol) {
            const ampmIndex = this.ampmList.indexOf(this.ampm);
            const ampmOffset = (this.ampmCol.nativeElement.clientHeight / 2) - (this.itemHeight / 2);
            this.ampmCol.nativeElement.scrollTo({
                top: (this.ampmList.length + ampmIndex) * this.itemHeight - ampmOffset,
                behavior
            });
        }
    }
    scrollToCurrentHours() {
        if (this.hoursCol)
            this.centerOnSelected(true);
    }
    scrollToCurrentMinutes() {
        if (this.minutesCol)
            this.centerOnSelected(true);
    }
    scrollToCurrentSeconds() {
        if (this.secondsCol)
            this.centerOnSelected(true);
    }
    setScrollBehavior(enable) {
        [this.hoursCol, this.minutesCol, this.secondsCol, this.ampmCol]
            .filter(col => col?.nativeElement)
            .forEach(col => {
            col.nativeElement.classList.toggle('smooth', enable);
        });
    }
    get hours() { return this._time.hours; }
    get minutes() { return this._time.minutes; }
    get seconds() { return this._time.seconds; }
    get ampm() { return this._time.ampm; }
    formatDisplayTime() {
        const hh = this.hours.toString().padStart(2, '0');
        const mm = this.minutes.toString().padStart(2, '0');
        const ss = this.seconds.toString().padStart(2, '0');
        const baseTime = this.showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
        return this.use24HourFormat ? baseTime : `${baseTime} ${this.ampm}`;
    }
    isActive(type, value) {
        return (type === 'hours' && value === this.hours) ||
            (type === 'minutes' && value === this.minutes) ||
            (type === 'seconds' && value === this.seconds);
    }
    static ɵfac = function TimepickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimepickerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TimepickerComponent, selectors: [["ui-timepicker"]], viewQuery: function TimepickerComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.hoursCol = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.minutesCol = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.secondsCol = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.ampmCol = _t.first);
        } }, hostBindings: function TimepickerComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function TimepickerComponent_click_HostBindingHandler($event) { return ctx.onClickOutside($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { use24HourFormat: "use24HourFormat", showSeconds: "showSeconds", parentFormGroup: "parentFormGroup", id: "id" }, outputs: { timeChange: "timeChange", blurEvent: "blurEvent" }, decls: 4, vars: 9, consts: [["hoursCol", ""], ["minutesCol", ""], ["secondsCol", ""], ["ampmCol", ""], [1, "relative", "inline-block", "font-['Poppins',sans-serif]", 3, "formGroup"], ["tabindex", "0", 1, "w-[250px]", "h-[36px]", "px-[16px]", "py-[5px]", "bg-white", "border", "border-[#ccc]", "rounded-[8px]", "cursor-pointer", "font-semibold", "text-center", "focus:border-[#007BFF]", "focus:bg-[#f0f8ff]", "transition-all", "duration-300", "ease-in-out", 3, "click", "blur"], [1, "absolute", "top-[50px]", "left-0", "bg-white", "rounded-[12px]", "px-[18px]", "py-[12px]"], [1, "flex", "items-center", "justify-center", "relative"], [1, "absolute", "left-0", "right-0", "h-[1px]", "bg-[#ccc]", "top-[calc(50%-20px)]"], [1, "absolute", "left-0", "right-0", "h-[1px]", "bg-[#ccc]", "top-[calc(50%+20px)]"], [1, "h-[120px]", "w-[60px]", "overflow-y-auto", "text-center", "[scrollbar-width:none]", "[&::-webkit-scrollbar]:hidden", 3, "scroll"], [1, "relative", "h-[40px]", "leading-[40px]", "opacity-[0.4]", "text-[16px]", "cursor-pointer", "transition", "duration-200", "[&.active]:opacity-100", "[&.active]:font-bold", "[&.active]:text-[#1565d8]", "[&.active]:scale-[1.15]", 3, "active"], [1, "text-[18px]", "font-semibold", "mx-[10px]", "text-[#222]"], [1, "relative", "w-[60px]", "ml-[10px]", "h-[113px]", "mt-[20px]", "mb-[18px]", "overflow-y-auto", "text-center", "[scrollbar-width:none]", "[&::-webkit-scrollbar]:hidden"], [1, "relative", "h-[40px]", "leading-[40px]", "opacity-[0.4]", "text-[16px]", "cursor-pointer", "transition", "duration-200", "[&.active]:opacity-100", "[&.active]:font-bold", "[&.active]:text-[#1565d8]", "[&.active]:scale-[1.15]", 3, "click"], [1, "relative", "w-[60px]", "ml-[10px]", "h-[113px]", "mt-[20px]", "mb-[18px]", "overflow-y-auto", "text-center", "[scrollbar-width:none]", "[&::-webkit-scrollbar]:hidden", 3, "scroll"], [1, "h-[40px]", "leading-[40px]", "text-[14px]", "opacity-[0.4]", "cursor-pointer", "transition", "duration-200", "[&.active]:opacity-100", "[&.active]:font-bold", "[&.active]:text-[#1565d8]", 3, "active"], [1, "absolute", "top-1/2", "left-0", "right-0", "h-[40px]", "rounded-[6px]", "-translate-y-1/2", "pointer-events-none"], [1, "h-[40px]", "leading-[40px]", "text-[14px]", "opacity-[0.4]", "cursor-pointer", "transition", "duration-200", "[&.active]:opacity-100", "[&.active]:font-bold", "[&.active]:text-[#1565d8]", 3, "click"]], template: function TimepickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4)(1, "div", 5);
            i0.ɵɵlistener("click", function TimepickerComponent_Template_div_click_1_listener() { return ctx.togglePicker(); })("blur", function TimepickerComponent_Template_div_blur_1_listener() { return ctx.onBlur(); });
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, TimepickerComponent_Conditional_3_Template, 16, 2, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("error", ctx.isInvalid);
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("border-[#007BFF]", ctx.isPickerOpen)("bg-[#f0f8ff]", ctx.isPickerOpen);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.formatDisplayTime(), " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isPickerOpen ? 3 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.NgControlStatusGroup, i1.FormGroupDirective], styles: [".timepicker-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimepickerComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-timepicker', standalone: true, imports: [ReactiveFormsModule], template: "<div \r\n  class=\"relative inline-block font-['Poppins',sans-serif]\" \r\n  [formGroup]=\"parentFormGroup\" \r\n  [class.error]=\"isInvalid\"\r\n>\r\n\r\n  <div \r\n    class=\"w-[250px] h-[36px] px-[16px] py-[5px] bg-white \r\n           border border-[#ccc] rounded-[8px]\r\n           cursor-pointer font-semibold text-center\r\n           focus:border-[#007BFF] focus:bg-[#f0f8ff]\r\n           transition-all duration-300 ease-in-out\"\r\n    tabindex=\"0\"\r\n    (click)=\"togglePicker()\"\r\n    (blur)=\"onBlur()\"\r\n    [class.border-[#007BFF]]=\"isPickerOpen\"\r\n    [class.bg-[#f0f8ff]]=\"isPickerOpen\"\r\n  >\r\n    {{ formatDisplayTime() }}\r\n  </div>\r\n\r\n  @if (isPickerOpen) {\r\n    <div class=\"absolute top-[50px] left-0 bg-white \r\n                rounded-[12px] px-[18px] py-[12px]\">\r\n\r\n      <div class=\"flex items-center justify-center relative\">\r\n\r\n        \r\n        <div class=\"absolute left-0 right-0 h-[1px] bg-[#ccc] \r\n                    top-[calc(50%-20px)]\"></div>\r\n        <div class=\"absolute left-0 right-0 h-[1px] bg-[#ccc] \r\n                    top-[calc(50%+20px)]\"></div>\r\n\r\n        \r\n        <div \r\n          class=\"h-[120px] w-[60px] overflow-y-auto text-center\r\n                 [scrollbar-width:none]\r\n                 [&::-webkit-scrollbar]:hidden\"\r\n          #hoursCol \r\n          (scroll)=\"onScroll('hours')\"\r\n        >\r\n          @for (h of visibleHours; track h) {\r\n            <div\r\n              class=\"relative h-[40px] leading-[40px] \r\n                     opacity-[0.4] text-[16px] cursor-pointer \r\n                     transition duration-200\r\n                     [&.active]:opacity-100\r\n                     [&.active]:font-bold\r\n                     [&.active]:text-[#1565d8]\r\n                     [&.active]:scale-[1.15]\"\r\n              [class.active]=\"isActive('hours', h)\"\r\n              (click)=\"selectValue('hours', h)\"\r\n            >\r\n              {{ h < 10 ? '0' + h : h }}\r\n            </div>\r\n          }\r\n        </div>\r\n\r\n        <div class=\"text-[18px] font-semibold mx-[10px] text-[#222]\">\r\n          :\r\n        </div>\r\n\r\n        \r\n        <div \r\n          class=\"h-[120px] w-[60px] overflow-y-auto text-center\r\n                 [scrollbar-width:none]\r\n                 [&::-webkit-scrollbar]:hidden\"\r\n          #minutesCol \r\n          (scroll)=\"onScroll('minutes')\"\r\n        >\r\n          @for (m of visibleMinutes; track m) {\r\n            <div\r\n              class=\"relative h-[40px] leading-[40px]\r\n                     opacity-[0.4] text-[16px] cursor-pointer\r\n                     transition duration-200\r\n                     [&.active]:opacity-100\r\n                     [&.active]:font-bold\r\n                     [&.active]:text-[#1565d8]\r\n                     [&.active]:scale-[1.15]\"\r\n              [class.active]=\"isActive('minutes', m)\"\r\n              (click)=\"selectValue('minutes', m)\"\r\n            >\r\n              {{ m < 10 ? '0' + m : m }}\r\n            </div>\r\n          }\r\n        </div>\r\n\r\n        @if (showSeconds) {\r\n          <div class=\"text-[18px] font-semibold mx-[10px] text-[#222]\">\r\n            :\r\n          </div>\r\n\r\n          <div \r\n            class=\"h-[120px] w-[60px] overflow-y-auto text-center\r\n                   [scrollbar-width:none]\r\n                   [&::-webkit-scrollbar]:hidden\"\r\n            #secondsCol \r\n            (scroll)=\"onScroll('seconds')\"\r\n          >\r\n            @for (s of visibleSeconds; track s) {\r\n              <div\r\n                class=\"relative h-[40px] leading-[40px]\r\n                       opacity-[0.4] text-[16px] cursor-pointer\r\n                       transition duration-200\r\n                       [&.active]:opacity-100\r\n                       [&.active]:font-bold\r\n                       [&.active]:text-[#1565d8]\r\n                       [&.active]:scale-[1.15]\"\r\n                [class.active]=\"isActive('seconds', s)\"\r\n                (click)=\"selectValue('seconds', s)\"\r\n              >\r\n                {{ s < 10 ? '0' + s : s }}\r\n              </div>\r\n            }\r\n          </div>\r\n        }\r\n\r\n        \r\n        @if (!use24HourFormat) {\r\n          <div \r\n            class=\"relative w-[60px] ml-[10px] h-[113px] mt-[20px] mb-[18px]\r\n                   overflow-y-auto text-center\r\n                   [scrollbar-width:none]\r\n                   [&::-webkit-scrollbar]:hidden\"\r\n            #ampmCol \r\n            (scroll)=\"onScroll('ampm')\"\r\n          >\r\n            @for (a of visibleAmPm; track a; let i = $index) {\r\n              <div\r\n                class=\"h-[40px] leading-[40px]\r\n                       text-[14px]\r\n                       opacity-[0.4]\r\n                       cursor-pointer\r\n                       transition duration-200\r\n                       [&.active]:opacity-100\r\n                       [&.active]:font-bold\r\n                       [&.active]:text-[#1565d8]\"\r\n                [class.active]=\"ampm === a\"\r\n                (click)=\"setAmPm(a)\"\r\n              >\r\n                {{ a }}\r\n              </div>\r\n            }\r\n\r\n            <div class=\"absolute top-1/2 left-0 right-0 h-[40px]\r\n                        rounded-[6px] -translate-y-1/2\r\n                        pointer-events-none\">\r\n            </div>\r\n          </div>\r\n        }\r\n\r\n      </div>\r\n    </div>\r\n  }\r\n</div>", styles: [".timepicker-container {\r\n  height: 36px;\r\n}\r\n"] }]
    }], () => [{ type: i0.ElementRef }], { use24HourFormat: [{
            type: Input
        }], showSeconds: [{
            type: Input
        }], timeChange: [{
            type: Output
        }], blurEvent: [{
            type: Output
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], hoursCol: [{
            type: ViewChild,
            args: ['hoursCol', { static: false }]
        }], minutesCol: [{
            type: ViewChild,
            args: ['minutesCol', { static: false }]
        }], secondsCol: [{
            type: ViewChild,
            args: ['secondsCol', { static: false }]
        }], ampmCol: [{
            type: ViewChild,
            args: ['ampmCol', { static: false }]
        }], onClickOutside: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TimepickerComponent, { className: "TimepickerComponent", filePath: "libs/shared/ui/src/lib/components/controls/timepicker/timepicker.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=timepicker.component.js.map