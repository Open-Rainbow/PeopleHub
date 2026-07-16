import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'ui';
import * as i0 from "@angular/core";
export class EmployeeOverviewComponent {
    static ɵfac = function EmployeeOverviewComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeOverviewComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeeOverviewComponent, selectors: [["employee-overview-root"]], decls: 29, vars: 0, consts: [[1, "w-full", "p-6", "bg-white", "rounded-xl", "border", "border-gray-200"], [1, "flex", "items-center", "gap-4", "mb-6"], [1, "w-16", "h-16", "rounded-full", "bg-blue-600", "text-white", "font-semibold", "text-xl", "flex", "items-center", "justify-center"], [1, "text-xl", "font-semibold"], [1, "text-sm", "text-gray-500"], [1, "grid", "grid-cols-2", "gap-4", "text-sm"], [1, "p-4", "rounded-lg", "border", "bg-gray-50"], [1, "text-gray-500"], [1, "font-medium"], ["text", "Active", "bgColor", "#dcfce7", "color", "#166534"]], template: function EmployeeOverviewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3, "KR");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div")(5, "h2", 3);
            i0.ɵɵtext(6, "Kiran Babu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Senior Developer | Employee ID: E101");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 5)(10, "div", 6)(11, "p", 7);
            i0.ɵɵtext(12, "Department");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 8);
            i0.ɵɵtext(14, "Information Technology");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 6)(16, "p", 7);
            i0.ɵɵtext(17, "Location");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p", 8);
            i0.ɵɵtext(19, "Hyderabad");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 6)(21, "p", 7);
            i0.ɵɵtext(22, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p", 8);
            i0.ɵɵtext(24, "kiran.babu@peoplehub.com");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 6)(26, "p", 7);
            i0.ɵɵtext(27, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "ui-chip", 9);
            i0.ɵɵelementEnd()()();
        } }, dependencies: [CommonModule, ChipComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeOverviewComponent, [{
        type: Component,
        args: [{ selector: 'employee-overview-root', standalone: true, imports: [CommonModule, ChipComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "    <div class=\"w-full p-6 bg-white rounded-xl border border-gray-200\">\r\n      <div class=\"flex items-center gap-4 mb-6\">\r\n        <div class=\"w-16 h-16 rounded-full bg-blue-600 text-white font-semibold text-xl flex items-center justify-center\">KR</div>\r\n        <div>\r\n          <h2 class=\"text-xl font-semibold\">Kiran Babu</h2>\r\n          <p class=\"text-sm text-gray-500\">Senior Developer | Employee ID: E101</p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"grid grid-cols-2 gap-4 text-sm\">\r\n        <div class=\"p-4 rounded-lg border bg-gray-50\">\r\n          <p class=\"text-gray-500\">Department</p>\r\n          <p class=\"font-medium\">Information Technology</p>\r\n        </div>\r\n        <div class=\"p-4 rounded-lg border bg-gray-50\">\r\n          <p class=\"text-gray-500\">Location</p>\r\n          <p class=\"font-medium\">Hyderabad</p>\r\n        </div>\r\n        <div class=\"p-4 rounded-lg border bg-gray-50\">\r\n          <p class=\"text-gray-500\">Email</p>\r\n          <p class=\"font-medium\">kiran.babu@peoplehub.com</p>\r\n        </div>\r\n        <div class=\"p-4 rounded-lg border bg-gray-50\">\r\n          <p class=\"text-gray-500\">Status</p>\r\n          <ui-chip text=\"Active\" bgColor=\"#dcfce7\" color=\"#166534\"></ui-chip>\r\n        </div>\r\n      </div>\r\n    </div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeeOverviewComponent, { className: "EmployeeOverviewComponent", filePath: "libs/modules/employees/src/lib/components/employee-overview/employee-overview.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=employee-overview.component.js.map