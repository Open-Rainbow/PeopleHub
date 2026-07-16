import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfirmPopupService, IconTextButtonComponent } from 'ui';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { EmployeesService } from '../../services/employees/employees.service';
import * as i0 from "@angular/core";
function ButtonNavigationComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ui-icon-text-button", 5);
    i0.ɵɵlistener("buttonClick", function ButtonNavigationComponent_Conditional_4_Template_ui_icon_text_button_buttonClick_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goPreview()); });
    i0.ɵɵelementEnd();
} }
export class ButtonNavigationComponent {
    router = inject(Router);
    stepperService = inject(StepperService);
    confirmPopupService = inject(ConfirmPopupService);
    dataService = inject(EmployeeDataService);
    employeesService = inject(EmployeesService);
    activeComponent = input(null, ...(ngDevMode ? [{ debugName: "activeComponent" }] : /* istanbul ignore next */ []));
    stepSaved = output();
    previewToggle = output();
    steps = signal([], ...(ngDevMode ? [{ debugName: "steps" }] : /* istanbul ignore next */ []));
    isFirstStep = computed(() => this.stepperService.getCurrentStep() === 0, ...(ngDevMode ? [{ debugName: "isFirstStep" }] : /* istanbul ignore next */ []));
    isLastStep = computed(() => this.stepperService.getCurrentStep() === this.steps().length - 1, ...(ngDevMode ? [{ debugName: "isLastStep" }] : /* istanbul ignore next */ []));
    nextButtonLabel = computed(() => this.isLastStep() ? 'Submit' : 'Next', ...(ngDevMode ? [{ debugName: "nextButtonLabel" }] : /* istanbul ignore next */ []));
    isPreviewVisible = false;
    ngOnInit() {
        this.steps.set(this.stepperService.getSteps('addEmployee'));
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
            const currentRoute = this.stepperService.getLastRouteSegment(this.router.url);
            const currentIndex = this.steps().findIndex((s) => s.route === currentRoute);
            if (currentIndex >= 0) {
                this.stepperService.setCurrentStep(currentIndex);
                const savedData = this.dataService.getDataByRoute(currentRoute);
                if (savedData) {
                    this.stepperService.setStepValidity(true);
                }
            }
            this.steps.set(this.stepperService.getSteps('addEmployee'));
        });
    }
    goNext() {
        const currentIndex = this.stepperService.getCurrentStep();
        const activeComp = this.activeComponent();
        const formGroup = this.findFormGroup(activeComp);
        if (formGroup) {
            if (formGroup.valid) {
                const currentRoute = this.steps()[currentIndex].route;
                this.dataService.setDataByRoute(currentRoute, formGroup.value);
                this.stepperService.setStepValidity(true);
                this.stepSaved.emit(this.steps()[currentIndex].title);
                this.steps.set(this.stepperService.getSteps('addEmployee'));
            }
            else {
                formGroup.markAllAsTouched();
                this.confirmPopupService.showValidation(formGroup, activeComp['formConfig']);
                return;
            }
        }
        if (currentIndex < this.steps().length - 1) {
            const nextIndex = currentIndex + 1;
            this.navigateToStep(this.steps()[nextIndex].route);
        }
        else if (currentIndex === this.steps().length - 1) {
            this.stepperService.validateAllSteps();
            this.steps.set(this.stepperService.getSteps('addEmployee'));
            const hasErrors = this.steps().some((s) => s.status === 'notComplete');
            if (!hasErrors) {
                const finalPayload = this.dataService.getAllData();
                this.employeesService.addEmployee(finalPayload).subscribe({
                    next: () => this.stepSaved.emit('Employee'),
                    error: (err) => console.error('Failed to submit employee:', err),
                });
            }
        }
    }
    goPrevious() {
        const currentIndex = this.stepperService.getCurrentStep();
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            this.navigateToStep(this.steps()[prevIndex].route);
            this.stepperService.setCurrentStep(prevIndex);
            this.steps.set(this.stepperService.getSteps('addEmployee'));
        }
    }
    goPreview() {
        this.isPreviewVisible = !this.isPreviewVisible;
        this.previewToggle.emit(this.isPreviewVisible);
    }
    findFormGroup(component) {
        if (!component || typeof component !== 'object')
            return null;
        const comp = component;
        const activeFormGroupGetter = comp['getActiveFormGroup'];
        if (typeof activeFormGroupGetter === 'function') {
            const candidate = activeFormGroupGetter.call(comp);
            if (candidate &&
                typeof candidate === 'object' &&
                'controls' in candidate) {
                return candidate;
            }
        }
        for (const key in comp) {
            const candidate = comp[key];
            if (candidate &&
                typeof candidate === 'object' &&
                'controls' in candidate) {
                return candidate;
            }
        }
        return null;
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
    static ɵfac = function ButtonNavigationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ButtonNavigationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ButtonNavigationComponent, selectors: [["employees-button-navigation"]], inputs: { activeComponent: [1, "activeComponent"] }, outputs: { stepSaved: "stepSaved", previewToggle: "previewToggle" }, decls: 6, vars: 3, consts: [[1, "flex", "items-center", "justify-between", "bg-gray-50", "border", "border-gray-200", "rounded-lg", "shadow-md", "w-full", "p-5", "mt-2"], ["text", "Previous", "iconName", "arrow_left", "iconPosition", "left", "variant", "secondary", 3, "buttonClick", "disabled"], [1, "flex", "items-center", "gap-5"], ["text", "Preview", "variant", "primary"], ["iconName", "arrow_right", "iconPosition", "right", "variant", "primary", 3, "buttonClick", "text"], ["text", "Preview", "variant", "primary", 3, "buttonClick"]], template: function ButtonNavigationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "ui-icon-text-button", 1);
            i0.ɵɵlistener("buttonClick", function ButtonNavigationComponent_Template_ui_icon_text_button_buttonClick_2_listener() { return ctx.goPrevious(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, ButtonNavigationComponent_Conditional_4_Template, 1, 0, "ui-icon-text-button", 3);
            i0.ɵɵelementStart(5, "ui-icon-text-button", 4);
            i0.ɵɵlistener("buttonClick", function ButtonNavigationComponent_Template_ui_icon_text_button_buttonClick_5_listener() { return ctx.goNext(); });
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isFirstStep());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLastStep() ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("text", ctx.nextButtonLabel());
        } }, dependencies: [IconTextButtonComponent], styles: ["// Button navigation styles handled via Tailwind utilities in template"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ButtonNavigationComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-button-navigation', standalone: true, imports: [IconTextButtonComponent], template: "<div class=\"flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg shadow-md w-full p-5 mt-2\">\r\n  <div>\r\n    <ui-icon-text-button\r\n      text=\"Previous\"\r\n      iconName=\"arrow_left\"\r\n      iconPosition=\"left\"\r\n      variant=\"secondary\"\r\n      [disabled]=\"isFirstStep()\"\r\n      (buttonClick)=\"goPrevious()\"\r\n    ></ui-icon-text-button>\r\n  </div>\r\n\r\n  <div class=\"flex items-center gap-5\">\r\n    @if (isLastStep()) {\r\n      <ui-icon-text-button\r\n        text=\"Preview\"\r\n        variant=\"primary\"\r\n        (buttonClick)=\"goPreview()\"\r\n      ></ui-icon-text-button>\r\n    }\r\n\r\n    <ui-icon-text-button\r\n      [text]=\"nextButtonLabel()\"\r\n      iconName=\"arrow_right\"\r\n      iconPosition=\"right\"\r\n      variant=\"primary\"\r\n      (buttonClick)=\"goNext()\"\r\n    ></ui-icon-text-button>\r\n  </div>\r\n</div>\r\n", styles: ["// Button navigation styles handled via Tailwind utilities in template\r\n"] }]
    }], null, { activeComponent: [{ type: i0.Input, args: [{ isSignal: true, alias: "activeComponent", required: false }] }], stepSaved: [{ type: i0.Output, args: ["stepSaved"] }], previewToggle: [{ type: i0.Output, args: ["previewToggle"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ButtonNavigationComponent, { className: "ButtonNavigationComponent", filePath: "libs/modules/employees/src/lib/components/button-navigation/button-navigation.component.ts", lineNumber: 28 }); })();
//# sourceMappingURL=button-navigation.component.js.map