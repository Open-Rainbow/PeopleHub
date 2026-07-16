import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
function ProgressBarComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r0.usedTextColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Used: ", ctx_r0.used, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r0.totalTextColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Total: ", ctx_r0.total, " ");
} }
function ProgressBarComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("color", ctx_r0.remainingTextColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.remainingDays, " ", ctx_r0.remainingLabel, " ");
} }
export class ProgressBarComponent {
    total = 12;
    used = 3;
    remainingLabel = 'remaining';
    barColor = 'blueviolet';
    showBorderRadius = true;
    totalTextColor = '#374151';
    usedTextColor = '#6b7280';
    remainingTextColor = '#4f46e5';
    parentFormGroup;
    id;
    hideDetails = true;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return (this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    remainingDays = 0;
    progressPercentage = 0;
    ngOnInit() {
        this.calculateProgress();
    }
    ngOnChanges(changes) {
        if (changes['total'] || changes['used']) {
            this.calculateProgress();
        }
    }
    calculateProgress() {
        const totalValue = typeof this.total === 'number' && Number.isFinite(this.total)
            ? this.total
            : 0;
        const usedValue = typeof this.used === 'number' && Number.isFinite(this.used)
            ? this.used
            : 0;
        const safeTotal = Math.max(0, totalValue);
        const safeUsed = Math.max(0, Math.min(usedValue, safeTotal));
        this.remainingDays = safeTotal - safeUsed;
        this.progressPercentage = safeTotal > 0 ? (safeUsed / safeTotal) * 100 : 0;
    }
    static ɵfac = function ProgressBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgressBarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgressBarComponent, selectors: [["ui-progress-bar"]], inputs: { total: "total", used: "used", remainingLabel: "remainingLabel", barColor: "barColor", showBorderRadius: "showBorderRadius", totalTextColor: "totalTextColor", usedTextColor: "usedTextColor", remainingTextColor: "remainingTextColor", parentFormGroup: "parentFormGroup", id: "id", hideDetails: "hideDetails" }, features: [i0.ɵɵNgOnChangesFeature], decls: 6, vars: 14, consts: [[1, "w-full"], [1, "w-full", "bg-transparent", "rounded-lg", "py-[10px]", "px-[2px]", "font-['Inter',sans-serif]"], [1, "flex", "justify-between", "items-center", "text-sm", "mb-2"], [1, "w-full", "h-2", "bg-gray-200", "transition-all", "duration-300"], [1, "h-full", "transition-all", "duration-300"], [1, "text-sm", "mt-2", "font-medium", 3, "color"], [1, "text-sm", "mt-2", "font-medium"]], template: function ProgressBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, ProgressBarComponent_Conditional_2_Template, 5, 6, "div", 2);
            i0.ɵɵdomElementStart(3, "div", 3);
            i0.ɵɵdomElement(4, "div", 4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(5, ProgressBarComponent_Conditional_5_Template, 2, 4, "div", 5);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.hideDetails ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("rounded-lg", ctx.showBorderRadius)("rounded-none", !ctx.showBorderRadius);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("width", ctx.progressPercentage, "%")("background", ctx.barColor);
            i0.ɵɵclassProp("rounded-lg", ctx.showBorderRadius)("rounded-none", !ctx.showBorderRadius);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.hideDetails ? 5 : -1);
        } }, dependencies: [CommonModule], styles: [".progress-bar-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgressBarComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-progress-bar', standalone: true, imports: [CommonModule], template: "<div class=\"w-full\">\r\n  <div\r\n    class=\"w-full bg-transparent rounded-lg py-[10px] px-[2px] font-['Inter',sans-serif]\"\r\n  >\r\n    @if (!hideDetails) {\r\n      <div class=\"flex justify-between items-center text-sm mb-2\">\r\n        <span [style.color]=\"usedTextColor\"> Used: {{ used }} </span>\r\n\r\n        <span [style.color]=\"totalTextColor\"> Total: {{ total }} </span>\r\n      </div>\r\n    }\r\n\r\n    <div\r\n      class=\"w-full h-2 bg-gray-200 transition-all duration-300\"\r\n      [class.rounded-lg]=\"showBorderRadius\"\r\n      [class.rounded-none]=\"!showBorderRadius\"\r\n    >\r\n      <div\r\n        class=\"h-full transition-all duration-300\"\r\n        [style.width.%]=\"progressPercentage\"\r\n        [style.background]=\"barColor\"\r\n        [class.rounded-lg]=\"showBorderRadius\"\r\n        [class.rounded-none]=\"!showBorderRadius\"\r\n      ></div>\r\n    </div>\r\n\r\n    @if (!hideDetails) {\r\n      <div class=\"text-sm mt-2 font-medium\" [style.color]=\"remainingTextColor\">\r\n        {{ remainingDays }} {{ remainingLabel }}\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [".progress-bar-container {\r\n  height: 36px;\r\n}"] }]
    }], null, { total: [{
            type: Input
        }], used: [{
            type: Input
        }], remainingLabel: [{
            type: Input
        }], barColor: [{
            type: Input
        }], showBorderRadius: [{
            type: Input
        }], totalTextColor: [{
            type: Input
        }], usedTextColor: [{
            type: Input
        }], remainingTextColor: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], hideDetails: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgressBarComponent, { className: "ProgressBarComponent", filePath: "libs/shared/ui/src/lib/components/controls/progress-bar/progress-bar.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=progress-bar.component.js.map