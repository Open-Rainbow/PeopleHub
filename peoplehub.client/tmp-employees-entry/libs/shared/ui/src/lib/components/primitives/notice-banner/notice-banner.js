import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
function NoticeBannerComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.content);
} }
function NoticeBannerComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.content);
} }
export class NoticeBannerComponent {
    heading = 'Important: ';
    content = 'Changes to leave policies will apply to all employees from the next calendar year. Current year balances will remain unchanged.';
    headingColor = '#1E3A8A';
    contentColor = '#374151';
    contentInNextLine = false;
    bannerColor = '#DBEAFE';
    highlighterColor = '#1E3A8A';
    showIcon = true;
    iconColor = '#1E3A8A';
    showBorder = false;
    static ɵfac = function NoticeBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NoticeBannerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NoticeBannerComponent, selectors: [["ui-notice-banner"]], inputs: { heading: "heading", content: "content", headingColor: "headingColor", contentColor: "contentColor", contentInNextLine: "contentInNextLine", bannerColor: "bannerColor", highlighterColor: "highlighterColor", showIcon: "showIcon", iconColor: "iconColor", showBorder: "showBorder" }, decls: 7, vars: 18, consts: [[1, "flex", "p-4", "rounded-md", "bg-[var(--banner-color,#DBEAFE)]", "border-l-4", "border-[var(--border-color,#1E3A8A)]"], [3, "name"], [1, "ml-3"], [1, "font-semibold", "text-[var(--heading-color,#1E3A8A)]"], [1, "text-[var(--content-color,#374151)]"], [1, "mt-1"]], template: function NoticeBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "ui-icon", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, NoticeBannerComponent_Conditional_5_Template, 2, 1, "span", 4);
            i0.ɵɵconditionalCreate(6, NoticeBannerComponent_Conditional_6_Template, 3, 1, "div", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--banner-color", ctx.bannerColor)("--border-color", ctx.highlighterColor)("--heading-color", ctx.headingColor)("--content-color", ctx.contentColor)("--icon-color", ctx.iconColor);
            i0.ɵɵclassProp("border", ctx.showBorder)("hide-icon", !ctx.showIcon);
            i0.ɵɵadvance();
            i0.ɵɵproperty("name", "mage:information-circle");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.heading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.contentInNextLine ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.contentInNextLine ? 6 : -1);
        } }, dependencies: [IconComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoticeBannerComponent, [{
        type: Component,
        args: [{ selector: 'ui-notice-banner', standalone: true, imports: [IconComponent], template: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div\r\n  class=\"flex p-4 rounded-md bg-[var(--banner-color,#DBEAFE)] border-l-4 border-[var(--border-color,#1E3A8A)]\"\r\n  [class.border]=\"showBorder\"\r\n  [class.hide-icon]=\"!showIcon\"\r\n  [style.--banner-color]=\"bannerColor\"\r\n  [style.--border-color]=\"highlighterColor\"\r\n  [style.--heading-color]=\"headingColor\"\r\n  [style.--content-color]=\"contentColor\"\r\n  [style.--icon-color]=\"iconColor\"\r\n>\r\n\r\n\r\n  <ui-icon [name]=\"'mage:information-circle'\"></ui-icon>\r\n\r\n  <div class=\"ml-3\">\r\n    <span class=\"font-semibold text-[var(--heading-color,#1E3A8A)]\">{{ heading }}</span>\r\n\r\n    @if (!contentInNextLine) {\r\n      <span class=\"text-[var(--content-color,#374151)]\">{{ content }}</span>\r\n    }\r\n\r\n    @if (contentInNextLine) {\r\n      <div class=\"mt-1\">\r\n        <span class=\"text-[var(--content-color,#374151)]\">{{ content }}</span>\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n" }]
    }], null, { heading: [{
            type: Input
        }], content: [{
            type: Input
        }], headingColor: [{
            type: Input
        }], contentColor: [{
            type: Input
        }], contentInNextLine: [{
            type: Input
        }], bannerColor: [{
            type: Input
        }], highlighterColor: [{
            type: Input
        }], showIcon: [{
            type: Input
        }], iconColor: [{
            type: Input
        }], showBorder: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NoticeBannerComponent, { className: "NoticeBannerComponent", filePath: "libs/shared/ui/src/lib/components/primitives/notice-banner/notice-banner.ts", lineNumber: 13 }); })();
//# sourceMappingURL=notice-banner.js.map