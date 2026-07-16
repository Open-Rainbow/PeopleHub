import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent, TextButtonComponent } from 'ui';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.empId;
function EmployeeListComponent_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 9)(1, "td", 10);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const emp_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(emp_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(emp_r1.designation);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(emp_r1.department);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(emp_r1.location);
} }
export class EmployeeListComponent {
    employees = [
        { empId: 'E101', name: 'Kiran Babu', designation: 'Senior Developer', department: 'IT', location: 'Hyderabad' },
        { empId: 'E102', name: 'Harini Das', designation: 'HR Executive', department: 'HR', location: 'Bengaluru' },
        { empId: 'E103', name: 'Ajay Rao', designation: 'Finance Analyst', department: 'Finance', location: 'Pune' },
    ];
    static ɵfac = function EmployeeListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeeListComponent, selectors: [["employee-list-root"]], decls: 21, vars: 2, consts: [[1, "w-full", "bg-white", "border", "border-gray-200", "rounded-xl", "p-5"], [1, "flex", "justify-between", "items-center", "mb-4"], [1, "text-xl", "font-semibold"], [1, "flex", "gap-2", "items-center"], [3, "placeholderText", "showBorder"], ["text", "Add Employee", "variant", "secondary"], [1, "min-w-full", "text-sm"], [1, "text-left", "border-b"], [1, "py-2"], [1, "border-b", "last:border-0"], [1, "py-3", "font-medium"]], template: function EmployeeListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
            i0.ɵɵtext(3, "Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵelement(5, "ui-search", 4)(6, "ui-text-button", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "table", 6)(8, "thead")(9, "tr", 7)(10, "th", 8);
            i0.ɵɵtext(11, "Employee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "th");
            i0.ɵɵtext(13, "Designation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "th");
            i0.ɵɵtext(15, "Department");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "th");
            i0.ɵɵtext(17, "Location");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "tbody");
            i0.ɵɵrepeaterCreate(19, EmployeeListComponent_For_20_Template, 9, 4, "tr", 9, _forTrack0);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("placeholderText", "Search employee")("showBorder", true);
            i0.ɵɵadvance(14);
            i0.ɵɵrepeater(ctx.employees);
        } }, dependencies: [CommonModule, SearchComponent, TextButtonComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeListComponent, [{
        type: Component,
        args: [{ selector: 'employee-list-root', standalone: true, imports: [CommonModule, SearchComponent, TextButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "    <div class=\"w-full bg-white border border-gray-200 rounded-xl p-5\">\r\n      <div class=\"flex justify-between items-center mb-4\">\r\n        <h2 class=\"text-xl font-semibold\">Employees</h2>\r\n        <div class=\"flex gap-2 items-center\">\r\n          <ui-search [placeholderText]=\"'Search employee'\" [showBorder]=\"true\"></ui-search>\r\n          <ui-text-button text=\"Add Employee\" variant=\"secondary\"></ui-text-button>\r\n        </div>\r\n      </div>\r\n\r\n      <table class=\"min-w-full text-sm\">\r\n        <thead>\r\n          <tr class=\"text-left border-b\">\r\n            <th class=\"py-2\">Employee</th>\r\n            <th>Designation</th>\r\n            <th>Department</th>\r\n            <th>Location</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          @for (emp of employees; track emp.empId) {\r\n            <tr class=\"border-b last:border-0\">\r\n              <td class=\"py-3 font-medium\">{{ emp.name }}</td>\r\n              <td>{{ emp.designation }}</td>\r\n              <td>{{ emp.department }}</td>\r\n              <td>{{ emp.location }}</td>\r\n            </tr>\r\n          }\r\n        </tbody>\r\n      </table>\r\n    </div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeeListComponent, { className: "EmployeeListComponent", filePath: "libs/modules/employees/src/lib/components/employee-list/employee-list.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=employee-list.component.js.map