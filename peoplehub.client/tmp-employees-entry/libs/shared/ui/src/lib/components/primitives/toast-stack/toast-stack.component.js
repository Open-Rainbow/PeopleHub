import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import * as i0 from "@angular/core";
function ToastStackComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ui-toast", 2);
    i0.ɵɵlistener("closed", function ToastStackComponent_For_2_Template_ui_toast_closed_0_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeToast(toast_r2.id)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("subtitle", toast_r2.subtitle)("type", toast_r2.type ?? "normal")("icon", toast_r2.icon ?? "")("title", toast_r2.title ?? "")("position", ctx_r2.position)("isStacked", true)("duration", toast_r2.duration ?? 30000);
} }
export class ToastStackComponent {
    toastInstanceKeys = new WeakMap();
    nextToastInstanceKey = 1;
    position = 'top-right';
    toasts = [];
    toastClosed = new EventEmitter();
    removeToast(id) {
        this.toastClosed.emit(id);
    }
    trackByToastInstance(_index, toast) {
        const existingKey = this.toastInstanceKeys.get(toast);
        if (existingKey !== undefined) {
            return existingKey;
        }
        const newKey = this.nextToastInstanceKey++;
        this.toastInstanceKeys.set(toast, newKey);
        return newKey;
    }
    static ɵfac = function ToastStackComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastStackComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastStackComponent, selectors: [["ui-toast-stack"]], inputs: { position: "position", toasts: "toasts" }, outputs: { toastClosed: "toastClosed" }, decls: 3, vars: 12, consts: [[1, "fixed", "z-[9999]", "flex", "flex-col", "gap-3"], [1, "transition-all", "duration-300", "ease-in-out", 3, "subtitle", "type", "icon", "title", "position", "isStacked", "duration"], [1, "transition-all", "duration-300", "ease-in-out", 3, "closed", "subtitle", "type", "icon", "title", "position", "isStacked", "duration"]], template: function ToastStackComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ToastStackComponent_For_2_Template, 1, 7, "ui-toast", 1, ctx.trackByToastInstance, true);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("top-4", ctx.position === "top-right" || ctx.position === "top-left" || ctx.position === "top-center")("bottom-4", ctx.position === "bottom-right" || ctx.position === "bottom-left" || ctx.position === "bottom-center")("right-4", ctx.position === "top-right" || ctx.position === "bottom-right")("left-4", ctx.position === "top-left" || ctx.position === "bottom-left")("left-1/2", ctx.position === "top-center" || ctx.position === "bottom-center")("-translate-x-1/2", ctx.position === "top-center" || ctx.position === "bottom-center");
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.toasts);
        } }, dependencies: [CommonModule, ToastComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastStackComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-toast-stack', standalone: true, imports: [CommonModule, ToastComponent], template: "<div\r\n  class=\"fixed z-[9999] flex flex-col gap-3\"\r\n  [class.top-4]=\"position === 'top-right' || position === 'top-left' || position === 'top-center'\"\r\n  [class.bottom-4]=\"position === 'bottom-right' || position === 'bottom-left' || position === 'bottom-center'\"\r\n  [class.right-4]=\"position === 'top-right' || position === 'bottom-right'\"\r\n  [class.left-4]=\"position === 'top-left' || position === 'bottom-left'\"\r\n  [class.left-1/2]=\"position === 'top-center' || position === 'bottom-center'\"\r\n  [class.-translate-x-1/2]=\"position === 'top-center' || position === 'bottom-center'\"\r\n>\r\n  @for (toast of toasts; track trackByToastInstance($index, toast)) {\r\n    <ui-toast\r\n      class=\"transition-all duration-300 ease-in-out\"\r\n      [subtitle]=\"toast.subtitle\"\r\n      [type]=\"toast.type ?? 'normal'\"\r\n      [icon]=\"toast.icon ?? ''\"\r\n      [title]=\"toast.title ?? ''\"\r\n      [position]=\"position\"\r\n      [isStacked]=\"true\"\r\n      [duration]=\"toast.duration ?? 30000\"\r\n      (closed)=\"removeToast(toast.id)\"\r\n    >\r\n    </ui-toast>\r\n  }\r\n</div>\r\n" }]
    }], null, { position: [{
            type: Input
        }], toasts: [{
            type: Input
        }], toastClosed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastStackComponent, { className: "ToastStackComponent", filePath: "libs/shared/ui/src/lib/components/primitives/toast-stack/toast-stack.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=toast-stack.component.js.map