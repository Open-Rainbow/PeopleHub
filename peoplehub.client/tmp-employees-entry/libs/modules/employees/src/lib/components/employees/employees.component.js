import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class EmployeesComponent {
    static ɵfac = function EmployeesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeesComponent, selectors: [["employees-root"]], decls: 2, vars: 0, template: function EmployeesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, " employees works! ");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeesComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-root', standalone: true, imports: [], template: "    <p>\r\n      employees works!\r\n    </p>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeesComponent, { className: "EmployeesComponent", filePath: "libs/modules/employees/src/lib/components/employees/employees.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=employees.component.js.map