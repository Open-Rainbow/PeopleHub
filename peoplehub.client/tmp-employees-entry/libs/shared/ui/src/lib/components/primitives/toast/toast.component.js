import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ToastComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("mouseenter", function ToastComponent_Conditional_0_Template_div_mouseenter_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.pauseTimer()); })("mouseleave", function ToastComponent_Conditional_0_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resumeTimer()); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵelement(2, "ui-icon", 3);
    i0.ɵɵelementStart(3, "div", 4)(4, "div", 5);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 6);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "button", 7);
    i0.ɵɵlistener("click", function ToastComponent_Conditional_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeToast()); });
    i0.ɵɵelement(9, "ui-icon", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 9);
    i0.ɵɵelement(11, "div", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("ui-toast--normal", ctx_r1.type === "normal")("ui-toast--warning", ctx_r1.type === "warning")("ui-toast--alert", ctx_r1.type === "alert")("ui-toast--success", ctx_r1.type === "success");
    i0.ɵɵproperty("ngClass", ctx_r1.getPositionClasses());
    i0.ɵɵattribute("aria-live", ctx_r1.type === "alert" || ctx_r1.type === "warning" ? "assertive" : "polite")("aria-label", ctx_r1.title + " " + ctx_r1.subtitle);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", ctx_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.subtitle);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-valuenow", ctx_r1.progress)("aria-label", "Progress: " + (100 - ctx_r1.progress) + "% complete");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", ctx_r1.progress, "%");
} }
export class ToastComponent {
    cdr;
    type = 'normal';
    title = 'Hi';
    subtitle = 'Hello, world! This is a Toast message.';
    icon = 'home';
    position = 'top-center';
    isStacked = false;
    duration = 5000;
    closed = new EventEmitter();
    isStorybook = false;
    progress = 100;
    visible = true;
    frameId = null;
    startTime = 0;
    elapsedBeforePause = 0;
    defaultDuration = 5000;
    isPaused = false;
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngOnInit() {
        if (!this.duration || this.duration <= 0) {
            this.duration = this.defaultDuration;
        }
        this.startTimer();
    }
    ngOnDestroy() {
        this.clearTimer();
    }
    startTimer() {
        this.clearTimer();
        this.isPaused = false;
        this.elapsedBeforePause = 0;
        this.progress = 100;
        this.startTime = performance.now();
        this.scheduleNextFrame();
    }
    clearTimer() {
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }
    closeToast() {
        this.visible = false;
        this.clearTimer();
        this.cdr.markForCheck();
        this.closed.emit();
    }
    pauseTimer() {
        if (this.isPaused) {
            return;
        }
        this.isPaused = true;
        this.elapsedBeforePause += performance.now() - this.startTime;
        this.clearTimer();
    }
    resumeTimer() {
        if (!this.isPaused || !this.visible) {
            return;
        }
        this.isPaused = false;
        this.startTime = performance.now();
        this.scheduleNextFrame();
    }
    scheduleNextFrame() {
        this.frameId = requestAnimationFrame((timestamp) => {
            this.updateProgress(timestamp);
        });
    }
    updateProgress(timestamp) {
        if (this.isPaused || !this.visible) {
            return;
        }
        const elapsed = this.elapsedBeforePause + (timestamp - this.startTime);
        const normalizedElapsed = Math.min(elapsed / this.duration, 1);
        this.progress = Math.max(0, 100 - normalizedElapsed * 100);
        this.cdr.markForCheck();
        if (normalizedElapsed >= 1) {
            this.visible = false;
            this.clearTimer();
            this.closed.emit();
            return;
        }
        this.scheduleNextFrame();
    }
    getPositionClasses() {
        if (this.isStacked) {
            return '';
        }
        const baseClasses = 'fixed z-[9999]';
        const positionClasses = {
            'top-left': 'top-4 left-4',
            'top-center': 'top-4 left-1/2 -translate-x-1/2',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
            'bottom-right': 'bottom-4 right-4',
        };
        return `${baseClasses} ${positionClasses[this.position]}`;
    }
    static ɵfac = function ToastComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["ui-toast"]], inputs: { type: "type", title: "title", subtitle: "subtitle", icon: "icon", position: "position", isStacked: "isStacked", duration: "duration", isStorybook: "isStorybook" }, outputs: { closed: "closed" }, decls: 1, vars: 1, consts: [["role", "status", 1, "ui-toast", 3, "ngClass", "ui-toast--normal", "ui-toast--warning", "ui-toast--alert", "ui-toast--success"], ["role", "status", 1, "ui-toast", 3, "mouseenter", "mouseleave", "ngClass"], [1, "ui-toast__content"], [1, "ui-toast__icon", 3, "name"], [1, "ui-toast__message"], [1, "ui-toast__title"], [1, "ui-toast__subtitle"], ["aria-label", "Close notification", "type", "button", 1, "ui-toast__close", 3, "click"], ["name", "mdi:multiply"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "ui-toast__progress"], [1, "ui-toast__progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ToastComponent_Conditional_0_Template, 12, 18, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.visible ? 0 : -1);
        } }, dependencies: [IconComponent, CommonModule, i1.NgClass], styles: [".ui-toast[_ngcontent-%COMP%] {\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n\tgap: 1rem;\r\n\tpadding: 0.75rem 1rem;\r\n\twidth: min(320px, calc(100vw - 2rem));\r\n\tmax-width: 100%;\r\n\tborder-radius: 0.75rem;\r\n\toverflow: hidden;\r\n\ttransition: all 300ms ease-in-out;\r\n\tbox-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n\r\n\t&:hover {\r\n\t\tbox-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\r\n\t}\r\n\r\n\t// Type variants\r\n\t&--normal {\r\n\t\tbackground-color: var(--color-surface);\r\n\t\tcolor: var(--color-text-secondary);\r\n\t\tborder: 1px solid var(--color-border);\r\n\t}\r\n\r\n\t&--warning {\r\n\t\tbackground-color: #fbbf24;\r\n\t\tcolor: var(--color-text-primary);\r\n\t\tborder: 1px solid var(--color-warning);\r\n\t}\r\n\r\n\t&--alert {\r\n\t\tbackground-color: #ef4444;\r\n\t\tcolor: var(--color-surface);\r\n\t\tborder: 1px solid var(--color-danger);\r\n\t}\r\n\r\n\t&--success {\r\n\t\tbackground-color: var(--color-success);\r\n\t\tcolor: var(--color-surface);\r\n\t\tborder: 1px solid var(--color-success-hover);\r\n\t}\r\n}\r\n\r\n.ui-toast__content[_ngcontent-%COMP%] {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 0.5rem;\r\n\tflex-grow: 1;\r\n\tmin-width: 0;\r\n}\r\n\r\n.ui-toast__icon[_ngcontent-%COMP%] {\r\n\tfont-size: 1.125rem;\r\n\tflex-shrink: 0;\r\n}\r\n\r\n.ui-toast__message[_ngcontent-%COMP%] {\r\n\tfont-size: 0.875rem;\r\n\tline-height: 1.25rem;\r\n\tword-break: break-word;\r\n\toverflow-wrap: break-word;\r\n\tmin-width: 0;\r\n}\r\n\r\n.ui-toast__title[_ngcontent-%COMP%] {\r\n\tfont-weight: 700;\r\n\tmargin-bottom: 0.125rem;\r\n}\r\n\r\n.ui-toast__subtitle[_ngcontent-%COMP%] {\r\n\tfont-weight: 400;\r\n\topacity: 0.9;\r\n}\r\n\r\n.ui-toast__close[_ngcontent-%COMP%] {\r\n\tflex-shrink: 0;\r\n\tbackground: none;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tcursor: pointer;\r\n\tfont-size: 1.125rem;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tline-height: 1;\r\n\topacity: 0.8;\r\n\ttransition: opacity 200ms ease-in-out;\r\n\r\n\t&:hover {\r\n\t\topacity: 1;\r\n\t}\r\n\r\n\t&:focus-visible {\r\n\t\toutline: 2px solid currentColor;\r\n\t\toutline-offset: 2px;\r\n\t\tborder-radius: 0.25rem;\r\n\t}\r\n}\r\n\r\n.ui-toast__progress[_ngcontent-%COMP%] {\r\n\tposition: absolute;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 0.25rem;\r\n\tbackground-color: rgba(0, 0, 0, 0.1);\r\n\toverflow: hidden;\r\n}\r\n\r\n.ui-toast__progress-bar[_ngcontent-%COMP%] {\r\n\theight: 100%;\r\n\ttransition: none;\r\n\r\n\t.ui-toast--normal & {\r\n\t\tbackground-color: var(--color-text-secondary);\r\n\t}\r\n\r\n\t.ui-toast--warning & {\r\n\t\tbackground-color: var(--color-text-primary);\r\n\t}\r\n\r\n\t.ui-toast--alert & {\r\n\t\tbackground-color: var(--color-surface);\r\n\t}\r\n\r\n\t.ui-toast--success & {\r\n\t\tbackground-color: var(--color-surface);\r\n\t}\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-toast', standalone: true, imports: [IconComponent, CommonModule], template: "@if (visible) {\r\n  <div\r\n    (mouseenter)=\"pauseTimer()\"\r\n    (mouseleave)=\"resumeTimer()\"\r\n    class=\"ui-toast\"\r\n    [ngClass]=\"getPositionClasses()\"\r\n    [class.ui-toast--normal]=\"type === 'normal'\"\r\n    [class.ui-toast--warning]=\"type === 'warning'\"\r\n    [class.ui-toast--alert]=\"type === 'alert'\"\r\n    [class.ui-toast--success]=\"type === 'success'\"\r\n    role=\"status\"\r\n    [attr.aria-live]=\"type === 'alert' || type === 'warning' ? 'assertive' : 'polite'\"\r\n    [attr.aria-label]=\"title + ' ' + subtitle\"\r\n  >\r\n    <div class=\"ui-toast__content\">\r\n      <ui-icon class=\"ui-toast__icon\" [name]=\"icon\"></ui-icon>\r\n\r\n      <div class=\"ui-toast__message\">\r\n        <div class=\"ui-toast__title\">{{ title }}</div>\r\n        <div class=\"ui-toast__subtitle\">{{ subtitle }}</div>\r\n      </div>\r\n    </div>\r\n\r\n    <button\r\n      class=\"ui-toast__close\"\r\n      (click)=\"closeToast()\"\r\n      aria-label=\"Close notification\"\r\n      type=\"button\"\r\n    >\r\n      <ui-icon name=\"mdi:multiply\"></ui-icon>\r\n    </button>\r\n\r\n    <div\r\n      class=\"ui-toast__progress\"\r\n      role=\"progressbar\"\r\n      [attr.aria-valuenow]=\"progress\"\r\n      aria-valuemin=\"0\"\r\n      aria-valuemax=\"100\"\r\n      [attr.aria-label]=\"'Progress: ' + (100 - progress) + '% complete'\"\r\n    >\r\n      <div class=\"ui-toast__progress-bar\" [style.width.%]=\"progress\"></div>\r\n    </div>\r\n  </div>\r\n}\r\n", styles: [".ui-toast {\r\n\tposition: relative;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n\tgap: 1rem;\r\n\tpadding: 0.75rem 1rem;\r\n\twidth: min(320px, calc(100vw - 2rem));\r\n\tmax-width: 100%;\r\n\tborder-radius: 0.75rem;\r\n\toverflow: hidden;\r\n\ttransition: all 300ms ease-in-out;\r\n\tbox-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\r\n\r\n\t&:hover {\r\n\t\tbox-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\r\n\t}\r\n\r\n\t// Type variants\r\n\t&--normal {\r\n\t\tbackground-color: var(--color-surface);\r\n\t\tcolor: var(--color-text-secondary);\r\n\t\tborder: 1px solid var(--color-border);\r\n\t}\r\n\r\n\t&--warning {\r\n\t\tbackground-color: #fbbf24;\r\n\t\tcolor: var(--color-text-primary);\r\n\t\tborder: 1px solid var(--color-warning);\r\n\t}\r\n\r\n\t&--alert {\r\n\t\tbackground-color: #ef4444;\r\n\t\tcolor: var(--color-surface);\r\n\t\tborder: 1px solid var(--color-danger);\r\n\t}\r\n\r\n\t&--success {\r\n\t\tbackground-color: var(--color-success);\r\n\t\tcolor: var(--color-surface);\r\n\t\tborder: 1px solid var(--color-success-hover);\r\n\t}\r\n}\r\n\r\n.ui-toast__content {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 0.5rem;\r\n\tflex-grow: 1;\r\n\tmin-width: 0;\r\n}\r\n\r\n.ui-toast__icon {\r\n\tfont-size: 1.125rem;\r\n\tflex-shrink: 0;\r\n}\r\n\r\n.ui-toast__message {\r\n\tfont-size: 0.875rem;\r\n\tline-height: 1.25rem;\r\n\tword-break: break-word;\r\n\toverflow-wrap: break-word;\r\n\tmin-width: 0;\r\n}\r\n\r\n.ui-toast__title {\r\n\tfont-weight: 700;\r\n\tmargin-bottom: 0.125rem;\r\n}\r\n\r\n.ui-toast__subtitle {\r\n\tfont-weight: 400;\r\n\topacity: 0.9;\r\n}\r\n\r\n.ui-toast__close {\r\n\tflex-shrink: 0;\r\n\tbackground: none;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tcursor: pointer;\r\n\tfont-size: 1.125rem;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tline-height: 1;\r\n\topacity: 0.8;\r\n\ttransition: opacity 200ms ease-in-out;\r\n\r\n\t&:hover {\r\n\t\topacity: 1;\r\n\t}\r\n\r\n\t&:focus-visible {\r\n\t\toutline: 2px solid currentColor;\r\n\t\toutline-offset: 2px;\r\n\t\tborder-radius: 0.25rem;\r\n\t}\r\n}\r\n\r\n.ui-toast__progress {\r\n\tposition: absolute;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 0.25rem;\r\n\tbackground-color: rgba(0, 0, 0, 0.1);\r\n\toverflow: hidden;\r\n}\r\n\r\n.ui-toast__progress-bar {\r\n\theight: 100%;\r\n\ttransition: none;\r\n\r\n\t.ui-toast--normal & {\r\n\t\tbackground-color: var(--color-text-secondary);\r\n\t}\r\n\r\n\t.ui-toast--warning & {\r\n\t\tbackground-color: var(--color-text-primary);\r\n\t}\r\n\r\n\t.ui-toast--alert & {\r\n\t\tbackground-color: var(--color-surface);\r\n\t}\r\n\r\n\t.ui-toast--success & {\r\n\t\tbackground-color: var(--color-surface);\r\n\t}\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { type: [{
            type: Input
        }], title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], icon: [{
            type: Input
        }], position: [{
            type: Input
        }], isStacked: [{
            type: Input
        }], duration: [{
            type: Input
        }], closed: [{
            type: Output
        }], isStorybook: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "libs/shared/ui/src/lib/components/primitives/toast/toast.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=toast.component.js.map