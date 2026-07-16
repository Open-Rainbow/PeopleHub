import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function OrgChartComponent_For_18_For_14_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "div", 21);
} }
function OrgChartComponent_For_18_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 19)(1, "div", 15);
    i0.ɵɵdomElement(2, "img", 5);
    i0.ɵɵdomElementStart(3, "div", 6)(4, "div", 20);
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "div", 17);
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵconditionalCreate(8, OrgChartComponent_For_18_For_14_Conditional_8_Template, 1, 0, "div", 21);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ɵ$index_57_r2 = ctx.$index;
    const dept_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-blue-100", s_r1.color === "blue")("text-blue-800", s_r1.color === "blue")("bg-orange-100", s_r1.color !== "blue")("text-orange-800", s_r1.color !== "blue");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ɵ$index_57_r2 < ((dept_r3.children == null ? null : dept_r3.children.length) ?? 0) - 1 ? 8 : -1);
} }
function OrgChartComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementContainerStart(0);
    i0.ɵɵdomElementStart(1, "div", 13);
    i0.ɵɵdomElement(2, "div", 9);
    i0.ɵɵdomElementStart(3, "div", 14)(4, "div", 15);
    i0.ɵɵdomElement(5, "img", 5);
    i0.ɵɵdomElementStart(6, "div", 6)(7, "div", 16);
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "div", 17);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd()()()();
    i0.ɵɵdomElement(11, "div", 9);
    i0.ɵɵdomElementStart(12, "div", 18);
    i0.ɵɵrepeaterCreate(13, OrgChartComponent_For_18_For_14_Template, 9, 11, "div", 19, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementContainerEnd();
} if (rf & 2) {
    const dept_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("bg-blue-400", dept_r3.color === "blue")("bg-orange-400", dept_r3.color !== "blue")("text-white", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(dept_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dept_r3.title);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(dept_r3.children);
} }
export class OrgChartComponent {
    data = {
        id: 'ceo',
        name: 'Mike Mason',
        title: 'President / CEO',
        color: 'blue',
        children: [
            {
                id: 'marketing',
                name: 'Elvira Peay',
                title: 'Head of Marketing',
                color: 'blue',
                children: [
                    { id: 'c1', name: 'Curtis Hudson', title: 'Staff', color: 'blue' },
                    { id: 'd1', name: 'Dawn Silva', title: 'Staff', color: 'blue' },
                    { id: 'a1', name: 'Ava Gildon', title: 'Staff', color: 'blue' }
                ]
            },
            {
                id: 'tech',
                name: 'Hope Davis',
                title: 'Head of Technology',
                color: 'orange',
                children: [
                    { id: 'c2', name: 'Clay Jordan', title: 'Staff', color: 'orange' },
                    { id: 'w2', name: 'Warren Gray', title: 'Staff', color: 'orange' },
                    { id: 'e2', name: 'Elmer Fraley', title: 'Staff', color: 'orange' }
                ]
            },
            {
                id: 'production',
                name: 'Jeffrey Lee',
                title: 'Head of Production',
                color: 'blue',
                children: [
                    { id: 'c3', name: 'Clive Moore', title: 'Staff', color: 'blue' },
                    { id: 'c4', name: 'Chris Hicks', title: 'Staff', color: 'blue' },
                    { id: 'h4', name: 'Haven Lee', title: 'Staff', color: 'blue' }
                ]
            },
            {
                id: 'finance',
                name: 'Rita Garza',
                title: 'Head of Finance',
                color: 'orange',
                children: [
                    { id: 'h1', name: 'Harper Snee', title: 'Staff', color: 'orange' },
                    { id: 'e1', name: 'Emily McCoy', title: 'Staff', color: 'orange' },
                    { id: 'a2', name: 'Alice Becker', title: 'Staff', color: 'orange' }
                ]
            }
        ]
    };
    static ɵfac = function OrgChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OrgChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OrgChartComponent, selectors: [["ui-org-chart"]], decls: 19, vars: 4, consts: [[1, "org-chart-scroll"], [1, "p-8", "w-[1636px]", "mx-auto"], [1, "flex", "justify-center"], [1, "flex", "items-center", "space-x-4"], [1, "flex", "items-center", "gap-3", "rounded-full", "px-6", "py-3", "bg-blue-500", "text-white", "shadow-lg"], ["src", "data:image/png;base64,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", 1, "h-[40px]", "w-[40px]", "rounded-full"], [1, "flex", "flex-col", "leading-tight"], [1, "font-bold", "text-base"], [1, "text-sm", "opacity-90"], [1, "h-8", "w-[1px]", "bg-gray-600"], [1, "w-full", "justify-between"], [1, "bg-gray-600", "h-[2px]", "mx-[184px]"], [1, "grid", "grid-cols-4", "gap-8"], [1, "flex", "flex-col", "items-center"], [1, "relative", "flex", "items-center"], [1, "flex", "items-center", "gap-3", "rounded-full", "px-6", "py-3", "shadow", "w-full", "text-center"], [1, "font-bold", "uppercase", "text-sm"], [1, "text-xs", "opacity-90"], [1, ""], [1, "flex", "flex-col", "items-center", "relative"], [1, "font-semibold", "text-sm", "uppercase"], [1, "w-[1px]", "h-8", "bg-gray-600"]], template: function OrgChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵdomElement(5, "img", 5);
            i0.ɵɵdomElementStart(6, "div", 6)(7, "span", 7);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "uppercase");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(10, "span", 8);
            i0.ɵɵtext(11);
            i0.ɵɵdomElementEnd()()()()();
            i0.ɵɵdomElementStart(12, "div", 2);
            i0.ɵɵdomElement(13, "div", 9);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(14, "div", 10);
            i0.ɵɵdomElement(15, "hr", 11);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(16, "div", 12);
            i0.ɵɵrepeaterCreate(17, OrgChartComponent_For_18_Template, 15, 8, "ng-container", null, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 2, ctx.data.name));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.data.title);
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.data.children);
        } }, dependencies: [CommonModule, i1.UpperCasePipe], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrgChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-org-chart', imports: [CommonModule], template: "<div class=\"org-chart-scroll\">\r\n<div class=\"p-8 w-[1636px] mx-auto\">\r\n\r\n    \r\n    <div class=\"flex justify-center\">\r\n        <div class=\"flex items-center space-x-4\">\r\n\r\n            <div class=\"flex items-center gap-3 rounded-full px-6 py-3 bg-blue-500 text-white shadow-lg\">\r\n                <img src=\"data:image/png;base64,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\"\r\n                    class=\"h-[40px] w-[40px] rounded-full\">\r\n\r\n                <div class=\"flex flex-col leading-tight\">\r\n                    <span class=\"font-bold text-base\">{{ data.name | uppercase }}</span>\r\n                    <span class=\"text-sm opacity-90\">{{ data.title }}</span>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n    <div class=\"flex justify-center\">\r\n        <div class=\"h-8 w-[1px] bg-gray-600\"></div>\r\n    </div>\r\n\r\n    \r\n\r\n    <div class=\"w-full justify-between\">\r\n        <hr class=\"bg-gray-600 h-[2px]  mx-[184px]\" />\r\n    </div>\r\n    <div class=\"grid grid-cols-4 gap-8 \">\r\n\r\n@for (dept of data.children; track dept) {\r\n  <ng-container>\r\n\r\n    <div class=\"flex flex-col items-center\">\r\n\r\n      <div class=\"h-8 w-[1px] bg-gray-600\"></div>\r\n      \r\n      <div class=\"relative flex items-center\">\r\n\r\n        <div class=\"flex items-center gap-3 rounded-full px-6 py-3 shadow w-full text-center\"\r\n          [class.bg-blue-400]=\"dept.color === 'blue'\"\r\n          [class.bg-orange-400]=\"dept.color !== 'blue'\"\r\n          [class.text-white]=\"true\">\r\n\r\n          <img\r\n            src=\"data:image/png;base64,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\"\r\n            class=\"h-[40px] w-[40px] rounded-full\">\r\n\r\n          <div class=\"flex flex-col leading-tight\">\r\n            <div class=\"font-bold uppercase text-sm\">{{ dept.name }}</div>\r\n            <div class=\"text-xs opacity-90\">{{ dept.title }}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"h-8 w-[1px] bg-gray-600\"></div>\r\n\r\n      <div class=\"\">\r\n        @for (s of dept.children; let i = $index; track i) {\r\n          <div class=\"flex flex-col items-center relative\">\r\n\r\n            <div class=\"flex items-center gap-3 rounded-full px-6 py-3 shadow w-full text-center\"\r\n              [class.bg-blue-100]=\"s.color === 'blue'\"\r\n              [class.text-blue-800]=\"s.color === 'blue'\"\r\n              [class.bg-orange-100]=\"s.color !== 'blue'\"\r\n              [class.text-orange-800]=\"s.color !== 'blue'\">\r\n\r\n              <img\r\n                src=\"data:image/png;base64,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\"\r\n                class=\"h-[40px] w-[40px] rounded-full\">\r\n\r\n              <div class=\"flex flex-col leading-tight\">\r\n                <div class=\"font-semibold text-sm uppercase\">{{ s.name }}</div>\r\n                <div class=\"text-xs opacity-90\">{{ s.title }}</div>\r\n              </div>\r\n            </div>\r\n\r\n            @if (i < ((dept.children?.length ?? 0) - 1)) {\r\n              <div class=\"w-[1px] h-8 bg-gray-600\"></div>\r\n            }\r\n\r\n          </div>\r\n        }\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </ng-container>\r\n}\r\n\r\n</div>\r\n\r\n</div>\r\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OrgChartComponent, { className: "OrgChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/org-chart/org-chart.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=org-chart.component.js.map