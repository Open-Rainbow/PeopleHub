import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class OthersComponent {
    static ɵfac = function OthersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OthersComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OthersComponent, selectors: [["others-root"]], decls: 12, vars: 0, consts: [[1, "w-full", "bg-white", "border", "border-gray-200", "rounded-xl", "p-5"], [1, "text-xl", "font-semibold", "mb-4"], [1, "list-disc", "pl-5", "text-sm", "text-gray-700", "space-y-2"]], template: function OthersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "h2", 1);
            i0.ɵɵtext(2, "Other Employee Services");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "ul", 2)(4, "li");
            i0.ɵɵtext(5, "Document Center");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "li");
            i0.ɵɵtext(7, "Benefits and Insurance");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(8, "li");
            i0.ɵɵtext(9, "Training and Certification");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(10, "li");
            i0.ɵɵtext(11, "Policy Acknowledgement");
            i0.ɵɵdomElementEnd()()();
        } }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OthersComponent, [{
        type: Component,
        args: [{ selector: 'others-root', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "    <div class=\"w-full bg-white border border-gray-200 rounded-xl p-5\">\r\n      <h2 class=\"text-xl font-semibold mb-4\">Other Employee Services</h2>\r\n      <ul class=\"list-disc pl-5 text-sm text-gray-700 space-y-2\">\r\n        <li>Document Center</li>\r\n        <li>Benefits and Insurance</li>\r\n        <li>Training and Certification</li>\r\n        <li>Policy Acknowledgement</li>\r\n      </ul>\r\n    </div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OthersComponent, { className: "OthersComponent", filePath: "libs/modules/employees/src/lib/components/others/others.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=others.component.js.map