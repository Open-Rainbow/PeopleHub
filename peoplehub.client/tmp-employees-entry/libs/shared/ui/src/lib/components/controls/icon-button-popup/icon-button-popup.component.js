import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import * as i0 from "@angular/core";
function IconButtonPopupComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "div");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r0.positionClasses);
    i0.ɵɵstyleProp("background-color", ctx_r0.popupBgColor)("color", ctx_r0.popupTxtColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.description, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.arrowClasses);
    i0.ɵɵstyleProp("background-color", ctx_r0.popupBgColor);
} }
export class IconButtonPopupComponent {
    description = 'Description text';
    popupPosition = 'bottom';
    popupBgColor = '#1f2937';
    popupTxtColor = '#ffffff';
    iconName = 'info';
    variant = 'secondary';
    size = 'medium';
    disabled = false;
    isHovered = false;
    get positionClasses() {
        const base = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none';
        switch (this.popupPosition) {
            case 'top':
                return `${base} bottom-full left-1/2 -translate-x-1/2 mb-2`;
            case 'bottom':
                return `${base} top-full left-1/2 -translate-x-1/2 mt-2`;
            case 'left':
                return `${base} right-full top-1/2 -translate-y-1/2 mr-2`;
            case 'right':
                return `${base} left-full top-1/2 -translate-y-1/2 ml-2`;
            default:
                return `${base} top-full left-1/2 -translate-x-1/2 mt-2`;
        }
    }
    get arrowClasses() {
        const base = 'absolute w-2 h-2 bg-gray-800 transform rotate-45';
        switch (this.popupPosition) {
            case 'top':
                return `${base} top-full left-1/2 -translate-x-1/2 -mt-1`;
            case 'bottom':
                return `${base} bottom-full left-1/2 -translate-x-1/2 -mb-1`;
            case 'left':
                return `${base} left-full top-1/2 -translate-y-1/2 -ml-1`;
            case 'right':
                return `${base} right-full top-1/2 -translate-y-1/2 -mr-1`;
            default:
                return '';
        }
    }
    static ɵfac = function IconButtonPopupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IconButtonPopupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconButtonPopupComponent, selectors: [["ui-icon-button-popup"]], inputs: { description: "description", popupPosition: "popupPosition", popupBgColor: "popupBgColor", popupTxtColor: "popupTxtColor", iconName: "iconName", variant: "variant", size: "size", disabled: "disabled" }, decls: 3, vars: 5, consts: [[1, "relative", "inline-flex", "items-center", "justify-center", 3, "mouseenter", "mouseleave"], [3, "iconName", "variant", "size", "disabled"], ["role", "tooltip", 3, "class", "background-color", "color"], ["role", "tooltip"]], template: function IconButtonPopupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("mouseenter", function IconButtonPopupComponent_Template_div_mouseenter_0_listener() { return !ctx.disabled && (ctx.isHovered = true); })("mouseleave", function IconButtonPopupComponent_Template_div_mouseleave_0_listener() { return !ctx.disabled && (ctx.isHovered = false); });
            i0.ɵɵelement(1, "ui-icon-button", 1);
            i0.ɵɵconditionalCreate(2, IconButtonPopupComponent_Conditional_2_Template, 3, 11, "div", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("iconName", ctx.iconName)("variant", ctx.variant)("size", ctx.size)("disabled", ctx.disabled);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isHovered ? 2 : -1);
        } }, dependencies: [CommonModule, IconButtonComponent], styles: ["/* Styles for icon-button-popup component */"], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconButtonPopupComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-icon-button-popup', standalone: true, imports: [CommonModule, IconButtonComponent], encapsulation: ViewEncapsulation.None, template: "<div \r\n  class=\"relative inline-flex items-center justify-center\"\r\n  (mouseenter)=\"!disabled && (isHovered = true)\"\r\n  (mouseleave)=\"!disabled && (isHovered = false)\"\r\n>\r\n  <ui-icon-button\r\n    [iconName]=\"iconName\"\r\n    [variant]=\"variant\"\r\n    [size]=\"size\"\r\n    [disabled]=\"disabled\"\r\n  ></ui-icon-button>\r\n\r\n  @if(isHovered){\r\n    <div [class]=\"positionClasses\" [style.background-color]=\"popupBgColor\" [style.color]=\"popupTxtColor\"\r\n      role=\"tooltip\">\r\n      {{ description }}\r\n      <div [class]=\"arrowClasses\" [style.background-color]=\"popupBgColor\">\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: ["/* Styles for icon-button-popup component */"] }]
    }], null, { description: [{
            type: Input
        }], popupPosition: [{
            type: Input
        }], popupBgColor: [{
            type: Input
        }], popupTxtColor: [{
            type: Input
        }], iconName: [{
            type: Input
        }], variant: [{
            type: Input
        }], size: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IconButtonPopupComponent, { className: "IconButtonPopupComponent", filePath: "libs/shared/ui/src/lib/components/controls/icon-button-popup/icon-button-popup.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=icon-button-popup.component.js.map