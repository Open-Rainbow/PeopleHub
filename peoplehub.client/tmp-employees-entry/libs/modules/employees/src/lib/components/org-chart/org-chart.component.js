import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeOrgChartComponent } from 'ui';
import * as i0 from "@angular/core";
export class OrgChartComponent {
    static ɵfac = function OrgChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OrgChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OrgChartComponent, selectors: [["org-chart-root"]], decls: 4, vars: 0, consts: [[1, "w-full", "bg-white", "p-5", "rounded-xl", "border", "border-gray-200"], [1, "text-xl", "font-semibold", "mb-5"]], template: function OrgChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h2", 1);
            i0.ɵɵtext(2, "Organization Chart");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "ui-employee-org-chart");
            i0.ɵɵelementEnd();
        } }, dependencies: [CommonModule, EmployeeOrgChartComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrgChartComponent, [{
        type: Component,
        args: [{ selector: 'org-chart-root', standalone: true, imports: [CommonModule, EmployeeOrgChartComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "    <div class=\"w-full bg-white p-5 rounded-xl border border-gray-200\">\r\n      <h2 class=\"text-xl font-semibold mb-5\">Organization Chart</h2>\r\n      <ui-employee-org-chart></ui-employee-org-chart>\r\n    </div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OrgChartComponent, { className: "OrgChartComponent", filePath: "libs/modules/employees/src/lib/components/org-chart/org-chart.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=org-chart.component.js.map