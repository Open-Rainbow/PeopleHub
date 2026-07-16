import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class IconComponent {
    name = '';
    color = 'currentColor';
    hoverColor = '';
    size = '1em';
    static ɵfac = function IconComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IconComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconComponent, selectors: [["ui-icon"]], inputs: { name: "name", color: "color", hoverColor: "hoverColor", size: "size" }, decls: 1, vars: 7, consts: [[1, "ui-icon", 3, "icon"]], template: function IconComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElement(0, "iconify-icon", 0);
        } if (rf & 2) {
            i0.ɵɵstyleProp("--ui-icon-color", ctx.color)("--ui-icon-hover-color", ctx.hoverColor || ctx.color)("font-size", ctx.size);
            i0.ɵɵdomProperty("icon", ctx.name);
        } }, styles: [".ui-icon[_ngcontent-%COMP%] {\r\n\t--ui-icon-color: currentColor;\r\n\t--ui-icon-hover-color: var(--ui-icon-color);\r\n\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tline-height: 1;\r\n\tvertical-align: middle;\r\n\tcolor: var(--ui-icon-color);\r\n\ttransition: color 0.15s ease-in-out;\r\n\r\n\t&:hover {\r\n\t\tcolor: var(--ui-icon-hover-color);\r\n\t}\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-icon', standalone: true, imports: [], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "<iconify-icon\r\n  class=\"ui-icon\"\r\n  [icon]=\"name\"\r\n  [style.--ui-icon-color]=\"color\"\r\n  [style.--ui-icon-hover-color]=\"hoverColor || color\"\r\n  [style.font-size]=\"size\">\r\n</iconify-icon>", styles: [".ui-icon {\r\n\t--ui-icon-color: currentColor;\r\n\t--ui-icon-hover-color: var(--ui-icon-color);\r\n\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tline-height: 1;\r\n\tvertical-align: middle;\r\n\tcolor: var(--ui-icon-color);\r\n\ttransition: color 0.15s ease-in-out;\r\n\r\n\t&:hover {\r\n\t\tcolor: var(--ui-icon-hover-color);\r\n\t}\r\n}\r\n"] }]
    }], null, { name: [{
            type: Input
        }], color: [{
            type: Input
        }], hoverColor: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IconComponent, { className: "IconComponent", filePath: "libs/shared/ui/src/lib/components/primitives/icon/icon.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=icon.component.js.map