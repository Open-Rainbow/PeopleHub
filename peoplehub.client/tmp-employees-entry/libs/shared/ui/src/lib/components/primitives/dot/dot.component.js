import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
function DotComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 2);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElement(2, "span", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("color", ctx_r0.labelColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background-color", ctx_r0.dotColor)("width", ctx_r0.dotSize === "small" ? "8px" : ctx_r0.dotSize === "medium" ? "10px" : "12px")("height", ctx_r0.dotSize === "small" ? "8px" : ctx_r0.dotSize === "medium" ? "10px" : "12px");
} }
function DotComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "span", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-color", ctx_r0.dotColor)("width", ctx_r0.dotSize === "small" ? "8px" : ctx_r0.dotSize === "medium" ? "10px" : "12px")("height", ctx_r0.dotSize === "small" ? "8px" : ctx_r0.dotSize === "medium" ? "10px" : "12px");
} }
export class DotComponent {
    label = "Text";
    labelColor = 'lightgreen';
    labelPosition = 'left';
    dotColor = "lightgreen";
    dotSize = 'small';
    getDotSize(dotSize) {
        switch (dotSize) {
            case 'small':
                return { width: '8px', height: '8px' };
            case 'medium':
                return { width: '10px', height: '10px' };
            case 'large':
                return { width: '12px', height: '12px' };
            default:
                return { width: '8px', height: '8px' };
        }
    }
    static ɵfac = function DotComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DotComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DotComponent, selectors: [["ui-dot"]], inputs: { label: "label", labelColor: "labelColor", labelPosition: "labelPosition", dotColor: "dotColor", dotSize: "dotSize" }, decls: 3, vars: 3, consts: [[1, "flex", "items-center", "gap-[2px]"], [1, "rounded-full", "shrink-0", "inline-block", "mt-[9px]", 3, "backgroundColor", "width", "height"], [1, "text-2xl", "font-bold", "leading-none", "flex", "items-center"], [1, "rounded-full", "shrink-0", "inline-block", "mt-[9px]"]], template: function DotComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, DotComponent_Conditional_1_Template, 3, 9)(2, DotComponent_Conditional_2_Template, 1, 6, "span", 1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("flex-row-reverse", ctx.labelPosition === "right");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.label ? 1 : 2);
        } }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DotComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-dot', imports: [CommonModule], template: "<div class=\"flex items-center gap-[2px]\" [class.flex-row-reverse]=\"labelPosition === 'right'\">\r\n  @if (label) {\r\n  <span class=\"text-2xl font-bold leading-none flex items-center\" [style.color]=\"labelColor\">\r\n    {{ label }}\r\n  </span>\r\n  <span class=\"rounded-full shrink-0 inline-block mt-[9px]\" [style.backgroundColor]=\"dotColor\"\r\n    [style.width]=\"dotSize === 'small' ? '8px' : dotSize === 'medium' ? '10px' : '12px'\"\r\n    [style.height]=\"dotSize === 'small' ? '8px' : dotSize === 'medium' ? '10px' : '12px'\"></span>\r\n\r\n  } @else {\r\n  <span class=\"rounded-full shrink-0 inline-block mt-[9px]\" [style.backgroundColor]=\"dotColor\"\r\n    [style.width]=\"dotSize === 'small' ? '8px' : dotSize === 'medium' ? '10px' : '12px'\"\r\n    [style.height]=\"dotSize === 'small' ? '8px' : dotSize === 'medium' ? '10px' : '12px'\"></span>\r\n  }\r\n</div>" }]
    }], null, { label: [{
            type: Input
        }], labelColor: [{
            type: Input
        }], labelPosition: [{
            type: Input
        }], dotColor: [{
            type: Input
        }], dotSize: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DotComponent, { className: "DotComponent", filePath: "libs/shared/ui/src/lib/components/primitives/dot/dot.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=dot.component.js.map