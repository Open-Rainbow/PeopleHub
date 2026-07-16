import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextBoxComponent, CalendarComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { workExperienceForm } from '../../config/form-configs/work-experience.config';
import * as i0 from "@angular/core";
function WorkExperienceComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.previousOrganization.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.previousOrganization.label)("placeholder", ctx_r0.formConfig.previousOrganization.placeholder ?? "")("minLength", ctx_r0.formConfig.previousOrganization.minLength)("maxLength", ctx_r0.formConfig.previousOrganization.maxLength)("isRequired", ctx_r0.formConfig.previousOrganization.isRequired);
} }
function WorkExperienceComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.previousDesignation.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.previousDesignation.label)("placeholder", ctx_r0.formConfig.previousDesignation.placeholder ?? "")("minLength", ctx_r0.formConfig.previousDesignation.minLength)("maxLength", ctx_r0.formConfig.previousDesignation.maxLength)("isRequired", ctx_r0.formConfig.previousDesignation.isRequired);
} }
function WorkExperienceComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.organizationLocation.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.organizationLocation.label)("placeholder", ctx_r0.formConfig.organizationLocation.placeholder ?? "")("minLength", ctx_r0.formConfig.organizationLocation.minLength)("maxLength", ctx_r0.formConfig.organizationLocation.maxLength)("isRequired", ctx_r0.formConfig.organizationLocation.isRequired);
} }
function WorkExperienceComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.reportingTo.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.reportingTo.label)("placeholder", ctx_r0.formConfig.reportingTo.placeholder ?? "")("minLength", ctx_r0.formConfig.reportingTo.minLength)("maxLength", ctx_r0.formConfig.reportingTo.maxLength)("isRequired", ctx_r0.formConfig.reportingTo.isRequired);
} }
function WorkExperienceComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.companyType.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.companyType.label)("placeholder", ctx_r0.formConfig.companyType.placeholder ?? "")("minLength", ctx_r0.formConfig.companyType.minLength)("maxLength", ctx_r0.formConfig.companyType.maxLength)("isRequired", ctx_r0.formConfig.companyType.isRequired);
} }
function WorkExperienceComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employmentType.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.employmentType.label)("placeholder", ctx_r0.formConfig.employmentType.placeholder ?? "")("minLength", ctx_r0.formConfig.employmentType.minLength)("maxLength", ctx_r0.formConfig.employmentType.maxLength)("isRequired", ctx_r0.formConfig.employmentType.isRequired);
} }
function WorkExperienceComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-calendar", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.startDate.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.startDate.label)("placeholder", ctx_r0.formConfig.startDate.placeholder ?? "")("isRequired", ctx_r0.formConfig.startDate.isRequired);
} }
function WorkExperienceComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-calendar", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.endDate.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.endDate.label)("placeholder", ctx_r0.formConfig.endDate.placeholder ?? "")("isRequired", ctx_r0.formConfig.endDate.isRequired);
} }
function WorkExperienceComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.yearsOfExperience.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.yearsOfExperience.label)("placeholder", ctx_r0.formConfig.yearsOfExperience.placeholder ?? "")("minLength", ctx_r0.formConfig.yearsOfExperience.minLength)("maxLength", ctx_r0.formConfig.yearsOfExperience.maxLength)("isRequired", ctx_r0.formConfig.yearsOfExperience.isRequired);
} }
function WorkExperienceComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.currentlyWorking.id)("parentFormGroup", ctx_r0.workExperience)("label", ctx_r0.formConfig.currentlyWorking.label)("placeholder", ctx_r0.formConfig.currentlyWorking.placeholder ?? "")("minLength", ctx_r0.formConfig.currentlyWorking.minLength)("maxLength", ctx_r0.formConfig.currentlyWorking.maxLength)("isRequired", ctx_r0.formConfig.currentlyWorking.isRequired);
} }
export class WorkExperienceComponent {
    commonService = inject(CommonService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = workExperienceForm;
    workExperience;
    ngOnInit() {
        this.workExperience = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('work-experience');
        if (savedData) {
            this.workExperience.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.workExperience.valid);
        this.workExperience.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function WorkExperienceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkExperienceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkExperienceComponent, selectors: [["employees-work-experience"]], decls: 12, vars: 10, consts: [[1, "bg-white", "rounded-[16px]", "border", "border-[#dbeafe]", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "p-8", "h-full", "hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"], [1, "grid", "grid-cols-3", "gap-[10px]", "max-[768px]:grid-cols-1"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"]], template: function WorkExperienceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, WorkExperienceComponent_Conditional_2_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(3, WorkExperienceComponent_Conditional_3_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(4, WorkExperienceComponent_Conditional_4_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(5, WorkExperienceComponent_Conditional_5_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(6, WorkExperienceComponent_Conditional_6_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(7, WorkExperienceComponent_Conditional_7_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(8, WorkExperienceComponent_Conditional_8_Template, 1, 5, "ui-calendar", 3);
            i0.ɵɵconditionalCreate(9, WorkExperienceComponent_Conditional_9_Template, 1, 5, "ui-calendar", 3);
            i0.ɵɵconditionalCreate(10, WorkExperienceComponent_Conditional_10_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(11, WorkExperienceComponent_Conditional_11_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.previousOrganization.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.previousDesignation.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.organizationLocation.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.reportingTo.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.companyType.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employmentType.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.startDate.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.endDate.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.yearsOfExperience.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.currentlyWorking.isHide ? 11 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, CalendarComponent], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkExperienceComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-work-experience', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, CalendarComponent], template: "<div class=\"bg-white rounded-[16px] border border-[#dbeafe] shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in p-8 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]\">\r\n  <div class=\"grid grid-cols-3 gap-[10px] max-[768px]:grid-cols-1\">\r\n\r\n    @if (!formConfig.previousOrganization.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.previousOrganization.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.previousOrganization.label!\"\r\n        [placeholder]=\"formConfig.previousOrganization.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.previousOrganization.minLength\"\r\n        [maxLength]=\"formConfig.previousOrganization.maxLength\"\r\n        [isRequired]=\"formConfig.previousOrganization.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.previousDesignation.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.previousDesignation.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.previousDesignation.label!\"\r\n        [placeholder]=\"formConfig.previousDesignation.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.previousDesignation.minLength\"\r\n        [maxLength]=\"formConfig.previousDesignation.maxLength\"\r\n        [isRequired]=\"formConfig.previousDesignation.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.organizationLocation.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.organizationLocation.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.organizationLocation.label!\"\r\n        [placeholder]=\"formConfig.organizationLocation.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.organizationLocation.minLength\"\r\n        [maxLength]=\"formConfig.organizationLocation.maxLength\"\r\n        [isRequired]=\"formConfig.organizationLocation.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.reportingTo.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.reportingTo.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.reportingTo.label!\"\r\n        [placeholder]=\"formConfig.reportingTo.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.reportingTo.minLength\"\r\n        [maxLength]=\"formConfig.reportingTo.maxLength\"\r\n        [isRequired]=\"formConfig.reportingTo.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.companyType.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.companyType.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.companyType.label!\"\r\n        [placeholder]=\"formConfig.companyType.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.companyType.minLength\"\r\n        [maxLength]=\"formConfig.companyType.maxLength\"\r\n        [isRequired]=\"formConfig.companyType.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employmentType.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.employmentType.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.employmentType.label!\"\r\n        [placeholder]=\"formConfig.employmentType.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.employmentType.minLength\"\r\n        [maxLength]=\"formConfig.employmentType.maxLength\"\r\n        [isRequired]=\"formConfig.employmentType.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.startDate.isHide) {\r\n      <ui-calendar\r\n        [id]=\"formConfig.startDate.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.startDate.label!\"\r\n        [placeholder]=\"formConfig.startDate.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.startDate.isRequired!\"\r\n      ></ui-calendar>\r\n    }\r\n\r\n    @if (!formConfig.endDate.isHide) {\r\n      <ui-calendar\r\n        [id]=\"formConfig.endDate.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.endDate.label!\"\r\n        [placeholder]=\"formConfig.endDate.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.endDate.isRequired!\"\r\n      ></ui-calendar>\r\n    }\r\n\r\n    @if (!formConfig.yearsOfExperience.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.yearsOfExperience.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.yearsOfExperience.label!\"\r\n        [placeholder]=\"formConfig.yearsOfExperience.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.yearsOfExperience.minLength\"\r\n        [maxLength]=\"formConfig.yearsOfExperience.maxLength\"\r\n        [isRequired]=\"formConfig.yearsOfExperience.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.currentlyWorking.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.currentlyWorking.id\"\r\n        [parentFormGroup]=\"workExperience\"\r\n        [label]=\"formConfig.currentlyWorking.label!\"\r\n        [placeholder]=\"formConfig.currentlyWorking.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.currentlyWorking.minLength\"\r\n        [maxLength]=\"formConfig.currentlyWorking.maxLength\"\r\n        [isRequired]=\"formConfig.currentlyWorking.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkExperienceComponent, { className: "WorkExperienceComponent", filePath: "libs/modules/employees/src/lib/components/work-experience/work-experience.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=work-experience.component.js.map