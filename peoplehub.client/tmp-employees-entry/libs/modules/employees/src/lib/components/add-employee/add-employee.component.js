import { ChangeDetectionStrategy, Component, signal, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastStackComponent } from 'ui';
import { StepperComponent } from '../stepper/stepper.component';
import { ButtonNavigationComponent } from '../button-navigation/button-navigation.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AddEmployeeComponent {
    currentComponent = signal(null, ...(ngDevMode ? [{ debugName: "currentComponent" }] : /* istanbul ignore next */ []));
    showPreview = signal(false, ...(ngDevMode ? [{ debugName: "showPreview" }] : /* istanbul ignore next */ []));
    toasts = signal([], ...(ngDevMode ? [{ debugName: "toasts" }] : /* istanbul ignore next */ []));
    toastCounter = 0;
    onComponentActivate(componentRef) {
        this.currentComponent.set(componentRef);
    }
    handleStepSuccess(stepName) {
        this.toasts.update(list => [
            ...list,
            {
                id: ++this.toastCounter,
                title: 'Saved',
                subtitle: `${stepName} details saved successfully!`,
                type: 'success',
                duration: 2000,
                icon: 'charm:tick',
            },
        ]);
    }
    removeToast(id) {
        this.toasts.update(list => list.filter(t => t.id !== id));
    }
    togglePreview(visible) {
        this.showPreview.set(visible);
    }
    static ɵfac = function AddEmployeeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddEmployeeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddEmployeeComponent, selectors: [["employees-add-employee"]], decls: 8, vars: 2, consts: [[1, "flex", "items-stretch", "w-full", "min-h-screen", "bg-[#f9fbfd]"], ["position", "top-right", 3, "toastClosed", "toasts"], [1, "bg-[#f9fbfd]", "border-r", "border-gray-200", "min-h-full"], [1, "flex-1", "bg-[#f9fbfd]", "flex", "flex-col", "min-h-full", "p-0"], [1, "flex", "flex-col", "w-full", "p-4", "box-border", "bg-[#f9fbfd]"], [3, "activate"], [3, "stepSaved", "previewToggle", "activeComponent"]], template: function AddEmployeeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "ui-toast-stack", 1);
            i0.ɵɵlistener("toastClosed", function AddEmployeeComponent_Template_ui_toast_stack_toastClosed_1_listener($event) { return ctx.removeToast($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "aside", 2);
            i0.ɵɵelement(3, "employees-stepper");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "main", 3)(5, "section", 4)(6, "router-outlet", 5);
            i0.ɵɵlistener("activate", function AddEmployeeComponent_Template_router_outlet_activate_6_listener($event) { return ctx.onComponentActivate($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "employees-button-navigation", 6);
            i0.ɵɵlistener("stepSaved", function AddEmployeeComponent_Template_employees_button_navigation_stepSaved_7_listener($event) { return ctx.handleStepSuccess($event); })("previewToggle", function AddEmployeeComponent_Template_employees_button_navigation_previewToggle_7_listener($event) { return ctx.togglePreview($event); });
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("toasts", ctx.toasts());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("activeComponent", ctx.currentComponent());
        } }, dependencies: [RouterModule, i1.RouterOutlet, StepperComponent, ButtonNavigationComponent, ToastStackComponent], styles: ["// Add-employee layout styles handled via Tailwind utilities in template"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddEmployeeComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-add-employee', standalone: true, imports: [RouterModule, StepperComponent, ButtonNavigationComponent, ToastStackComponent], template: "<div class=\"flex items-stretch w-full min-h-screen bg-[#f9fbfd]\">\r\n  <ui-toast-stack\r\n    [toasts]=\"toasts()\"\r\n    position=\"top-right\"\r\n    (toastClosed)=\"removeToast($event)\"\r\n  ></ui-toast-stack>\r\n\r\n  <aside class=\"bg-[#f9fbfd] border-r border-gray-200 min-h-full\">\r\n    <employees-stepper></employees-stepper>\r\n  </aside>\r\n\r\n  <main class=\"flex-1 bg-[#f9fbfd] flex flex-col min-h-full p-0\">\r\n    <section class=\"flex flex-col w-full p-4 box-border bg-[#f9fbfd]\">\r\n      <router-outlet (activate)=\"onComponentActivate($event)\"></router-outlet>\r\n\r\n      <employees-button-navigation\r\n        [activeComponent]=\"currentComponent()\"\r\n        (stepSaved)=\"handleStepSuccess($event)\"\r\n        (previewToggle)=\"togglePreview($event)\"\r\n      ></employees-button-navigation>\r\n    </section>\r\n  </main>\r\n</div>\r\n", styles: ["// Add-employee layout styles handled via Tailwind utilities in template\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddEmployeeComponent, { className: "AddEmployeeComponent", filePath: "libs/modules/employees/src/lib/components/add-employee/add-employee.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=add-employee.component.js.map