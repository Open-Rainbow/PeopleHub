import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconComponent } from 'ui';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.route;
function StepperComponent_For_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 11);
} }
function StepperComponent_For_10_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 12);
} }
function StepperComponent_For_10_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 13);
} if (rf & 2) {
    const step_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("name", step_r3.icon);
} }
function StepperComponent_For_10_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Current step");
    i0.ɵɵelementEnd();
} }
function StepperComponent_For_10_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Completed");
    i0.ɵɵelementEnd();
} }
function StepperComponent_For_10_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1, "Not Completed");
    i0.ɵɵelementEnd();
} }
function StepperComponent_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 8);
    i0.ɵɵlistener("click", function StepperComponent_For_10_Template_li_click_0_listener() { const ctx_r1 = i0.ɵɵrestoreView(_r1); const step_r3 = ctx_r1.$implicit; const ɵ$index_17_r4 = ctx_r1.$index; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onStepClick(step_r3, ɵ$index_17_r4)); });
    i0.ɵɵelementStart(1, "div", 9)(2, "span", 10);
    i0.ɵɵconditionalCreate(3, StepperComponent_For_10_Conditional_3_Template, 1, 0, "ui-icon", 11)(4, StepperComponent_For_10_Conditional_4_Template, 1, 0, "ui-icon", 12)(5, StepperComponent_For_10_Conditional_5_Template, 1, 1, "ui-icon", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 14)(7, "span", 15);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, StepperComponent_For_10_Conditional_9_Template, 2, 0, "small", 16);
    i0.ɵɵconditionalCreate(10, StepperComponent_For_10_Conditional_10_Template, 2, 0, "small", 16);
    i0.ɵɵconditionalCreate(11, StepperComponent_For_10_Conditional_11_Template, 2, 0, "small", 16);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r3 = ctx.$implicit;
    i0.ɵɵclassProp("bg-[#e8f0ff]", step_r3.status === "active")("border-l-4", step_r3.status === "active" || step_r3.status === "completed" || step_r3.status === "notComplete")("border-[#0a58ff]", step_r3.status === "active")("text-[#0a58ff]", step_r3.status === "active")("bg-[#e8f5e9]", step_r3.status === "completed")("border-[#2e7d32]", step_r3.status === "completed")("text-[#2e7d32]", step_r3.status === "completed")("bg-[#f4dede]", step_r3.status === "notComplete")("border-[#f52525]", step_r3.status === "notComplete")("text-[#8e3434]", step_r3.status === "notComplete");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(step_r3.status === "completed" ? 3 : step_r3.status === "notComplete" ? 4 : 5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(step_r3.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r3.status === "active" ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r3.status === "completed" ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r3.status === "notComplete" ? 11 : -1);
} }
export class StepperComponent {
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    router = inject(Router);
    steps = signal([], ...(ngDevMode ? [{ debugName: "steps" }] : /* istanbul ignore next */ []));
    completedCount = computed(() => this.steps().filter(s => s.isValid === true && this.dataService.getDataByRoute(s.route) !== null).length, ...(ngDevMode ? [{ debugName: "completedCount" }] : /* istanbul ignore next */ []));
    totalCount = computed(() => this.steps().length, ...(ngDevMode ? [{ debugName: "totalCount" }] : /* istanbul ignore next */ []));
    progressPercent = computed(() => this.totalCount() > 0 ? (this.completedCount() / this.totalCount()) * 100 : 0, ...(ngDevMode ? [{ debugName: "progressPercent" }] : /* istanbul ignore next */ []));
    ngOnInit() {
        this.steps.set(this.stepperService.getSteps('addEmployee'));
        this.stepperService.currentStep$.subscribe(() => {
            this.steps.set(this.stepperService.getSteps('addEmployee'));
        });
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
            this.steps.set(this.stepperService.getSteps('addEmployee'));
        });
    }
    onStepClick(step, index) {
        this.stepperService.setCurrentStep(index);
        this.navigateToStep(step.route);
        if (this.stepperService.isEntered()) {
            this.stepperService.validateAllSteps();
        }
        this.steps.set(this.stepperService.getSteps('addEmployee'));
    }
    navigateToStep(targetRoute) {
        const currentPath = this.router.url.split('?')[0].split('#')[0];
        const segments = currentPath.split('/').filter(Boolean);
        if (segments.length === 0) {
            return;
        }
        const addEmployeeIndex = segments.lastIndexOf('add-employee');
        if (addEmployeeIndex === -1) {
            return;
        }
        const baseSegments = segments.slice(0, addEmployeeIndex + 1);
        this.router.navigateByUrl(`/${[...baseSegments, targetRoute].join('/')}`);
    }
    static ɵfac = function StepperComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StepperComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StepperComponent, selectors: [["employees-stepper"]], decls: 11, vars: 4, consts: [[1, "flex", "flex-col", "w-[260px]", "min-h-screen", "bg-[#f9fbfd]", "border-r", "border-[#e6e9ef]", "px-5", "py-5"], [1, "font-semibold", "text-[16px]", "text-[#333]", "mb-3"], [1, "mb-5"], [1, "h-[6px]", "bg-[#f0f2f6]", "rounded-full", "mb-1.5"], [1, "h-[6px]", "bg-[#0066ff]", "rounded-full", "transition-[width]", "duration-300", "ease-in-out"], [1, "text-[13px]", "text-[#666]", "m-0"], [1, "list-none", "p-0", "m-0", "flex", "flex-col", "gap-1.5"], [1, "flex", "items-center", "px-3", "py-2.5", "rounded-md", "cursor-pointer", "transition-all", "duration-200", "ease-in-out", "hover:bg-[#f5f7fa]", 3, "bg-[#e8f0ff]", "border-l-4", "border-[#0a58ff]", "text-[#0a58ff]", "bg-[#e8f5e9]", "border-[#2e7d32]", "text-[#2e7d32]", "bg-[#f4dede]", "border-[#f52525]", "text-[#8e3434]"], [1, "flex", "items-center", "px-3", "py-2.5", "rounded-md", "cursor-pointer", "transition-all", "duration-200", "ease-in-out", "hover:bg-[#f5f7fa]", 3, "click"], [1, "flex", "items-center", "gap-3", "w-full"], [1, "flex", "items-center", "justify-center", "w-[22px]", "h-[22px]", "flex-shrink-0"], ["name", "charm:tick"], ["name", "radix-icons:cross-2"], [3, "name"], [1, "flex", "flex-col"], [1, "text-[13px]", "font-medium", "leading-snug"], [1, "text-[11px]"]], template: function StepperComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "Add New Employee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3);
            i0.ɵɵelement(5, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "ul", 6);
            i0.ɵɵrepeaterCreate(9, StepperComponent_For_10_Template, 12, 25, "li", 7, _forTrack0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵstyleProp("width", ctx.progressPercent(), "%");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.completedCount(), " of ", ctx.totalCount(), " steps completed");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps());
        } }, dependencies: [CommonModule, RouterModule, IconComponent], styles: ["// Stepper styles handled via Tailwind utilities in template"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StepperComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-stepper', standalone: true, imports: [CommonModule, RouterModule, IconComponent], template: "<div class=\"flex flex-col w-[260px] min-h-screen bg-[#f9fbfd] border-r border-[#e6e9ef] px-5 py-5\">\r\n  <h3 class=\"font-semibold text-[16px] text-[#333] mb-3\">Add New Employee</h3>\r\n\r\n  <div class=\"mb-5\">\r\n    <div class=\"h-[6px] bg-[#f0f2f6] rounded-full mb-1.5\">\r\n      <div\r\n        class=\"h-[6px] bg-[#0066ff] rounded-full transition-[width] duration-300 ease-in-out\"\r\n        [style.width.%]=\"progressPercent()\"\r\n      ></div>\r\n    </div>\r\n    <p class=\"text-[13px] text-[#666] m-0\">{{ completedCount() }} of {{ totalCount() }} steps completed</p>\r\n  </div>\r\n\r\n  <ul class=\"list-none p-0 m-0 flex flex-col gap-1.5\">\r\n    @for (step of steps(); let i = $index; track step.route) {\r\n      <li\r\n        class=\"flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#f5f7fa]\"\r\n        [class.bg-[#e8f0ff]]=\"step.status === 'active'\"\r\n        [class.border-l-4]=\"step.status === 'active' || step.status === 'completed' || step.status === 'notComplete'\"\r\n        [class.border-[#0a58ff]]=\"step.status === 'active'\"\r\n        [class.text-[#0a58ff]]=\"step.status === 'active'\"\r\n        [class.bg-[#e8f5e9]]=\"step.status === 'completed'\"\r\n        [class.border-[#2e7d32]]=\"step.status === 'completed'\"\r\n        [class.text-[#2e7d32]]=\"step.status === 'completed'\"\r\n        [class.bg-[#f4dede]]=\"step.status === 'notComplete'\"\r\n        [class.border-[#f52525]]=\"step.status === 'notComplete'\"\r\n        [class.text-[#8e3434]]=\"step.status === 'notComplete'\"\r\n        (click)=\"onStepClick(step, i)\"\r\n      >\r\n        <div class=\"flex items-center gap-3 w-full\">\r\n          <span class=\"flex items-center justify-center w-[22px] h-[22px] flex-shrink-0\">\r\n            @if (step.status === 'completed') {\r\n              <ui-icon name=\"charm:tick\"></ui-icon>\r\n            } @else if (step.status === 'notComplete') {\r\n              <ui-icon name=\"radix-icons:cross-2\"></ui-icon>\r\n            } @else {\r\n              <ui-icon [name]=\"step.icon\"></ui-icon>\r\n            }\r\n          </span>\r\n          <div class=\"flex flex-col\">\r\n            <span class=\"text-[13px] font-medium leading-snug\">{{ step.title }}</span>\r\n            @if (step.status === 'active') {\r\n              <small class=\"text-[11px]\">Current step</small>\r\n            }\r\n            @if (step.status === 'completed') {\r\n              <small class=\"text-[11px]\">Completed</small>\r\n            }\r\n            @if (step.status === 'notComplete') {\r\n              <small class=\"text-[11px]\">Not Completed</small>\r\n            }\r\n          </div>\r\n        </div>\r\n      </li>\r\n    }\r\n  </ul>\r\n</div>\r\n", styles: ["// Stepper styles handled via Tailwind utilities in template\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StepperComponent, { className: "StepperComponent", filePath: "libs/modules/employees/src/lib/components/stepper/stepper.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=stepper.component.js.map