import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class CountWidgetComponent {
    label = 'Total';
    labelColor = '#6b7280';
    value = 20;
    valueColor = '#0284c7';
    borderColor = '#d1d5db';
    backgroundColor = '#ffffff';
    showBorder = true;
    labelPosition = 'top';
    labelSize = '14px';
    valueSize = '24px';
    locale = 'en-US';
    useGrouping = true;
    get isVertical() {
        return this.labelPosition === 'top' || this.labelPosition === 'bottom';
    }
    get isReverse() {
        return this.labelPosition === 'bottom' || this.labelPosition === 'after';
    }
    get formattedValue() {
        const safeValue = Number.isFinite(this.value) ? this.value : 0;
        return new Intl.NumberFormat(this.locale, { useGrouping: this.useGrouping }).format(safeValue);
    }
    static ɵfac = function CountWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CountWidgetComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CountWidgetComponent, selectors: [["ui-count-widget"]], inputs: { label: "label", labelColor: "labelColor", value: "value", valueColor: "valueColor", borderColor: "borderColor", backgroundColor: "backgroundColor", showBorder: "showBorder", labelPosition: "labelPosition", labelSize: "labelSize", valueSize: "valueSize", locale: "locale", useGrouping: "useGrouping" }, decls: 5, vars: 23, consts: [["role", "status", 1, "ui-count-widget"], [1, "ui-count-widget__label"], [1, "ui-count-widget__value"]], template: function CountWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "span", 2);
            i0.ɵɵtext(4);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--cw-border-color", ctx.borderColor)("--cw-background-color", ctx.backgroundColor);
            i0.ɵɵclassProp("ui-count-widget--borderless", !ctx.showBorder)("ui-count-widget--vertical", ctx.isVertical)("ui-count-widget--horizontal", !ctx.isVertical)("ui-count-widget--reverse", ctx.isReverse);
            i0.ɵɵattribute("aria-label", ctx.label + " " + ctx.formattedValue);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("color", ctx.labelColor)("font-size", ctx.labelSize);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("color", ctx.valueColor)("font-size", ctx.valueSize);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.formattedValue);
        } }, dependencies: [CommonModule], styles: [".ui-count-widget[_ngcontent-%COMP%] {\r\n\t--cw-border-color: var(--color-border);\r\n\t--cw-background-color: var(--color-surface);\r\n\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tmin-height: 4rem;\r\n\tborder: 2px solid var(--cw-border-color);\r\n\tborder-radius: 0.5rem;\r\n\tpadding: 0.5rem;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tgap: 0.5rem;\r\n\toverflow: hidden;\r\n\tbackground-color: var(--cw-background-color);\r\n\r\n\t&--borderless {\r\n\t\tborder-color: transparent;\r\n\t}\r\n\r\n\t&--vertical {\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t&--horizontal {\r\n\t\tflex-direction: row;\r\n\t}\r\n\r\n\t&--reverse {\r\n\t\tflex-direction: column-reverse;\r\n\t}\r\n\r\n\t&--horizontal.ui-count-widget--reverse {\r\n\t\tflex-direction: row-reverse;\r\n\t}\r\n\r\n\t&__label,\r\n\t&__value {\r\n\t\tfont-family: Inter, sans-serif;\r\n\t\tline-height: 1;\r\n\t\twhite-space: nowrap;\r\n\t\ttext-align: center;\r\n\t\tfont-size: clamp(8px, 2vw, 22px);\r\n\t}\r\n\r\n\t&__value {\r\n\t\tfont-weight: 600;\r\n\t}\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CountWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-count-widget', standalone: true, imports: [CommonModule], template: "<div\r\n  class=\"ui-count-widget\"\r\n  [class.ui-count-widget--borderless]=\"!showBorder\"\r\n  [class.ui-count-widget--vertical]=\"isVertical\"\r\n  [class.ui-count-widget--horizontal]=\"!isVertical\"\r\n  [class.ui-count-widget--reverse]=\"isReverse\"\r\n  [style.--cw-border-color]=\"borderColor\"\r\n  [style.--cw-background-color]=\"backgroundColor\"\r\n  role=\"status\"\r\n  [attr.aria-label]=\"label + ' ' + formattedValue\"\r\n>\r\n  <span class=\"ui-count-widget__label\" [style.color]=\"labelColor\" [style.font-size]=\"labelSize\">{{ label }}</span>\r\n  <span class=\"ui-count-widget__value\" [style.color]=\"valueColor\" [style.font-size]=\"valueSize\">{{ formattedValue }}</span>\r\n</div>", styles: [".ui-count-widget {\r\n\t--cw-border-color: var(--color-border);\r\n\t--cw-background-color: var(--color-surface);\r\n\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tmin-height: 4rem;\r\n\tborder: 2px solid var(--cw-border-color);\r\n\tborder-radius: 0.5rem;\r\n\tpadding: 0.5rem;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tgap: 0.5rem;\r\n\toverflow: hidden;\r\n\tbackground-color: var(--cw-background-color);\r\n\r\n\t&--borderless {\r\n\t\tborder-color: transparent;\r\n\t}\r\n\r\n\t&--vertical {\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t&--horizontal {\r\n\t\tflex-direction: row;\r\n\t}\r\n\r\n\t&--reverse {\r\n\t\tflex-direction: column-reverse;\r\n\t}\r\n\r\n\t&--horizontal.ui-count-widget--reverse {\r\n\t\tflex-direction: row-reverse;\r\n\t}\r\n\r\n\t&__label,\r\n\t&__value {\r\n\t\tfont-family: Inter, sans-serif;\r\n\t\tline-height: 1;\r\n\t\twhite-space: nowrap;\r\n\t\ttext-align: center;\r\n\t\tfont-size: clamp(8px, 2vw, 22px);\r\n\t}\r\n\r\n\t&__value {\r\n\t\tfont-weight: 600;\r\n\t}\r\n}\r\n\r\n"] }]
    }], null, { label: [{
            type: Input
        }], labelColor: [{
            type: Input
        }], value: [{
            type: Input
        }], valueColor: [{
            type: Input
        }], borderColor: [{
            type: Input
        }], backgroundColor: [{
            type: Input
        }], showBorder: [{
            type: Input
        }], labelPosition: [{
            type: Input
        }], labelSize: [{
            type: Input
        }], valueSize: [{
            type: Input
        }], locale: [{
            type: Input
        }], useGrouping: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CountWidgetComponent, { className: "CountWidgetComponent", filePath: "libs/shared/ui/src/lib/components/primitives/count-widget/count-widget.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=count-widget.component.js.map