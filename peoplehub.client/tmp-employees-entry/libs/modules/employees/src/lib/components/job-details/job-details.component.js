import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextBoxComponent, CalendarComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { jobDetailsForm } from '../../config/form-configs/job-details.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function JobDetailsComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.officeEmail.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.officeEmail.label)("placeholder", ctx_r0.formConfig.officeEmail.placeholder ?? "")("minLength", ctx_r0.formConfig.officeEmail.minLength)("maxLength", ctx_r0.formConfig.officeEmail.maxLength)("isRequired", ctx_r0.formConfig.officeEmail.isRequired);
} }
function JobDetailsComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.department.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.department.label)("placeholder", ctx_r0.formConfig.department.placeholder ?? "")("isRequired", ctx_r0.formConfig.department.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.departmentOptions$));
} }
function JobDetailsComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.designation.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.designation.label)("placeholder", ctx_r0.formConfig.designation.placeholder ?? "")("minLength", ctx_r0.formConfig.designation.minLength)("maxLength", ctx_r0.formConfig.designation.maxLength)("isRequired", ctx_r0.formConfig.designation.isRequired);
} }
function JobDetailsComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeType.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.employeeType.label)("placeholder", ctx_r0.formConfig.employeeType.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeeType.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.employeeTypeOptions$));
} }
function JobDetailsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.workLocation.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.workLocation.label)("placeholder", ctx_r0.formConfig.workLocation.placeholder ?? "")("isRequired", ctx_r0.formConfig.workLocation.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.workLocationOptions$));
} }
function JobDetailsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.shiftTimings.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.shiftTimings.label)("placeholder", ctx_r0.formConfig.shiftTimings.placeholder ?? "")("isRequired", ctx_r0.formConfig.shiftTimings.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.shiftTimingOptions$));
} }
function JobDetailsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.payLevel.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.payLevel.label)("placeholder", ctx_r0.formConfig.payLevel.placeholder ?? "")("isRequired", ctx_r0.formConfig.payLevel.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.payLevelOptions$));
} }
function JobDetailsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.reportingManager.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.reportingManager.label)("placeholder", ctx_r0.formConfig.reportingManager.placeholder ?? "")("isRequired", ctx_r0.formConfig.reportingManager.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.reportingManagerOptions$));
} }
function JobDetailsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.businessUnit.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.businessUnit.label)("placeholder", ctx_r0.formConfig.businessUnit.placeholder ?? "")("isRequired", ctx_r0.formConfig.businessUnit.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.businessUnitOptions$));
} }
function JobDetailsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeCategory.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.employeeCategory.label)("placeholder", ctx_r0.formConfig.employeeCategory.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeeCategory.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.employeeCategoryOptions$));
} }
function JobDetailsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.workSchedule.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.workSchedule.label)("placeholder", ctx_r0.formConfig.workSchedule.placeholder ?? "")("isRequired", ctx_r0.formConfig.workSchedule.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.workScheduleOptions$));
} }
function JobDetailsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.dottedLineManager.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.dottedLineManager.label)("placeholder", ctx_r0.formConfig.dottedLineManager.placeholder ?? "")("isRequired", ctx_r0.formConfig.dottedLineManager.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.dottedLineManagerOptions$));
} }
function JobDetailsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.costCenter.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.costCenter.label)("placeholder", ctx_r0.formConfig.costCenter.placeholder ?? "")("isRequired", ctx_r0.formConfig.costCenter.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.costCenterOptions$));
} }
function JobDetailsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.hrOwner.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.hrOwner.label)("placeholder", ctx_r0.formConfig.hrOwner.placeholder ?? "")("isRequired", ctx_r0.formConfig.hrOwner.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.hrOwnerOptions$));
} }
function JobDetailsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employmentStatus.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.employmentStatus.label)("placeholder", ctx_r0.formConfig.employmentStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.employmentStatus.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.employmentStatusOptions$));
} }
function JobDetailsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-calendar", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.probationStartDate.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.probationStartDate.label)("isRequired", ctx_r0.formConfig.probationStartDate.isRequired);
} }
function JobDetailsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-calendar", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.probationEndDate.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.probationEndDate.label)("isRequired", ctx_r0.formConfig.probationEndDate.isRequired);
} }
function JobDetailsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-calendar", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.confirmationDate.id)("parentFormGroup", ctx_r0.jobDetails)("label", ctx_r0.formConfig.confirmationDate.label)("isRequired", ctx_r0.formConfig.confirmationDate.isRequired);
} }
export class JobDetailsComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = jobDetailsForm;
    jobDetails;
    departmentOptions$;
    employeeTypeOptions$;
    workLocationOptions$;
    shiftTimingOptions$;
    payLevelOptions$;
    reportingManagerOptions$;
    businessUnitOptions$;
    employeeCategoryOptions$;
    workScheduleOptions$;
    dottedLineManagerOptions$;
    costCenterOptions$;
    hrOwnerOptions$;
    employmentStatusOptions$;
    ngOnInit() {
        this.departmentOptions$ = this.dropdownService.getOptions('department');
        this.employeeTypeOptions$ = this.dropdownService.getOptions('employeeType');
        this.workLocationOptions$ = this.dropdownService.getOptions('workLocation');
        this.shiftTimingOptions$ = this.dropdownService.getOptions('shiftTiming');
        this.payLevelOptions$ = this.dropdownService.getOptions('payLevel');
        this.reportingManagerOptions$ = this.dropdownService.getOptions('reportingManager');
        this.businessUnitOptions$ = this.dropdownService.getOptions('businessUnit');
        this.employeeCategoryOptions$ = this.dropdownService.getOptions('employeeCategory');
        this.workScheduleOptions$ = this.dropdownService.getOptions('workSchedule');
        this.dottedLineManagerOptions$ = this.dropdownService.getOptions('dottedLineManager');
        this.costCenterOptions$ = this.dropdownService.getOptions('costCenter');
        this.hrOwnerOptions$ = this.dropdownService.getOptions('hrOwner');
        this.employmentStatusOptions$ = this.dropdownService.getOptions('employmentStatus');
        this.jobDetails = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('job-details');
        if (savedData) {
            this.jobDetails.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.jobDetails.valid);
        this.jobDetails.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function JobDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || JobDetailsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: JobDetailsComponent, selectors: [["employees-job-details"]], decls: 20, vars: 18, consts: [[1, "w-full", "bg-white", "p-5", "rounded-[25px]", "border", "border-gray-300", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in-out", "hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"], [1, "grid", "grid-cols-3", "gap-5", "mt-[3%]"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "isRequired"]], template: function JobDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, JobDetailsComponent_Conditional_2_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(3, JobDetailsComponent_Conditional_3_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(4, JobDetailsComponent_Conditional_4_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(5, JobDetailsComponent_Conditional_5_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(6, JobDetailsComponent_Conditional_6_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(7, JobDetailsComponent_Conditional_7_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(8, JobDetailsComponent_Conditional_8_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(9, JobDetailsComponent_Conditional_9_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(10, JobDetailsComponent_Conditional_10_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(11, JobDetailsComponent_Conditional_11_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(12, JobDetailsComponent_Conditional_12_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(13, JobDetailsComponent_Conditional_13_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(14, JobDetailsComponent_Conditional_14_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(15, JobDetailsComponent_Conditional_15_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(16, JobDetailsComponent_Conditional_16_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(17, JobDetailsComponent_Conditional_17_Template, 1, 4, "ui-calendar", 4);
            i0.ɵɵconditionalCreate(18, JobDetailsComponent_Conditional_18_Template, 1, 4, "ui-calendar", 4);
            i0.ɵɵconditionalCreate(19, JobDetailsComponent_Conditional_19_Template, 1, 4, "ui-calendar", 4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.officeEmail.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.department.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.designation.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeType.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.workLocation.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.shiftTimings.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.payLevel.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.reportingManager.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.businessUnit.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeCategory.isHide ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.workSchedule.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.dottedLineManager.isHide ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.costCenter.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.hrOwner.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employmentStatus.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.probationStartDate.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.probationEndDate.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.confirmationDate.isHide ? 19 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CalendarComponent, i1.AsyncPipe], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JobDetailsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-job-details', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CalendarComponent], template: "<div class=\"w-full bg-white p-5 rounded-[25px] border border-gray-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]\">\r\n  <div class=\"grid grid-cols-3 gap-5 mt-[3%]\">\r\n\r\n    @if (!formConfig.officeEmail.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.officeEmail.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.officeEmail.label!\"\r\n        [placeholder]=\"formConfig.officeEmail.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.officeEmail.minLength\"\r\n        [maxLength]=\"formConfig.officeEmail.maxLength\"\r\n        [isRequired]=\"formConfig.officeEmail.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.department.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.department.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.department.label!\"\r\n        [placeholder]=\"formConfig.department.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.department.isRequired!\"\r\n        [options]=\"departmentOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.designation.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.designation.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.designation.label!\"\r\n        [placeholder]=\"formConfig.designation.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.designation.minLength\"\r\n        [maxLength]=\"formConfig.designation.maxLength\"\r\n        [isRequired]=\"formConfig.designation.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employeeType.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.employeeType.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.employeeType.label!\"\r\n        [placeholder]=\"formConfig.employeeType.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employeeType.isRequired!\"\r\n        [options]=\"employeeTypeOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.workLocation.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.workLocation.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.workLocation.label!\"\r\n        [placeholder]=\"formConfig.workLocation.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.workLocation.isRequired!\"\r\n        [options]=\"workLocationOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.shiftTimings.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.shiftTimings.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.shiftTimings.label!\"\r\n        [placeholder]=\"formConfig.shiftTimings.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.shiftTimings.isRequired!\"\r\n        [options]=\"shiftTimingOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.payLevel.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.payLevel.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.payLevel.label!\"\r\n        [placeholder]=\"formConfig.payLevel.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.payLevel.isRequired!\"\r\n        [options]=\"payLevelOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.reportingManager.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.reportingManager.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.reportingManager.label!\"\r\n        [placeholder]=\"formConfig.reportingManager.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.reportingManager.isRequired!\"\r\n        [options]=\"reportingManagerOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.businessUnit.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.businessUnit.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.businessUnit.label!\"\r\n        [placeholder]=\"formConfig.businessUnit.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.businessUnit.isRequired!\"\r\n        [options]=\"businessUnitOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.employeeCategory.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.employeeCategory.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.employeeCategory.label!\"\r\n        [placeholder]=\"formConfig.employeeCategory.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employeeCategory.isRequired!\"\r\n        [options]=\"employeeCategoryOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.workSchedule.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.workSchedule.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.workSchedule.label!\"\r\n        [placeholder]=\"formConfig.workSchedule.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.workSchedule.isRequired!\"\r\n        [options]=\"workScheduleOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.dottedLineManager.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.dottedLineManager.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.dottedLineManager.label!\"\r\n        [placeholder]=\"formConfig.dottedLineManager.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.dottedLineManager.isRequired!\"\r\n        [options]=\"dottedLineManagerOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.costCenter.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.costCenter.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.costCenter.label!\"\r\n        [placeholder]=\"formConfig.costCenter.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.costCenter.isRequired!\"\r\n        [options]=\"costCenterOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.hrOwner.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.hrOwner.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.hrOwner.label!\"\r\n        [placeholder]=\"formConfig.hrOwner.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.hrOwner.isRequired!\"\r\n        [options]=\"hrOwnerOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.employmentStatus.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.employmentStatus.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.employmentStatus.label!\"\r\n        [placeholder]=\"formConfig.employmentStatus.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employmentStatus.isRequired!\"\r\n        [options]=\"employmentStatusOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.probationStartDate.isHide) {\r\n      <ui-calendar\r\n        [id]=\"formConfig.probationStartDate.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.probationStartDate.label!\"\r\n        [isRequired]=\"formConfig.probationStartDate.isRequired!\"\r\n      ></ui-calendar>\r\n    }\r\n\r\n    @if (!formConfig.probationEndDate.isHide) {\r\n      <ui-calendar\r\n        [id]=\"formConfig.probationEndDate.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.probationEndDate.label!\"\r\n        [isRequired]=\"formConfig.probationEndDate.isRequired!\"\r\n      ></ui-calendar>\r\n    }\r\n\r\n    @if (!formConfig.confirmationDate.isHide) {\r\n      <ui-calendar\r\n        [id]=\"formConfig.confirmationDate.id\"\r\n        [parentFormGroup]=\"jobDetails\"\r\n        [label]=\"formConfig.confirmationDate.label!\"\r\n        [isRequired]=\"formConfig.confirmationDate.isRequired!\"\r\n      ></ui-calendar>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(JobDetailsComponent, { className: "JobDetailsComponent", filePath: "libs/modules/employees/src/lib/components/job-details/job-details.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=job-details.component.js.map