import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, CheckboxComponent, DropdownComponent, NumberBoxComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { separationForm } from '../../config/form-configs/separation.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SeparationComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.separationType.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.separationType.label)("placeholder", ctx_r0.formConfig.separationType.placeholder ?? "")("isRequired", ctx_r0.formConfig.separationType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.separationTypeOptions$));
} }
function SeparationComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.separationStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.separationStatus.label)("placeholder", ctx_r0.formConfig.separationStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.separationStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.separationStatusOptions$));
} }
function SeparationComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.exitReason.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.exitReason.label)("placeholder", ctx_r0.formConfig.exitReason.placeholder ?? "")("minLength", ctx_r0.formConfig.exitReason.minLength)("maxLength", ctx_r0.formConfig.exitReason.maxLength)("isRequired", ctx_r0.formConfig.exitReason.isRequired);
} }
function SeparationComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.initiationDate.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.initiationDate.label)("isRequired", ctx_r0.formConfig.initiationDate.isRequired);
} }
function SeparationComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.resignationDate.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.resignationDate.label)("isRequired", ctx_r0.formConfig.resignationDate.isRequired);
} }
function SeparationComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.noticeStartDate.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.noticeStartDate.label)("isRequired", ctx_r0.formConfig.noticeStartDate.isRequired);
} }
function SeparationComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.noticeEndDate.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.noticeEndDate.label)("isRequired", ctx_r0.formConfig.noticeEndDate.isRequired);
} }
function SeparationComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.proposedLastWorkingDay.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.proposedLastWorkingDay.label)("isRequired", ctx_r0.formConfig.proposedLastWorkingDay.isRequired);
} }
function SeparationComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.finalLastWorkingDay.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.finalLastWorkingDay.label)("isRequired", ctx_r0.formConfig.finalLastWorkingDay.isRequired);
} }
function SeparationComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.rehireEligible.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.rehireEligible.label);
} }
function SeparationComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.attritionCategory.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.attritionCategory.label)("placeholder", ctx_r0.formConfig.attritionCategory.placeholder ?? "")("isRequired", ctx_r0.formConfig.attritionCategory.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.attritionCategoryOptions$));
} }
function SeparationComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.managerClearanceStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.managerClearanceStatus.label)("placeholder", ctx_r0.formConfig.managerClearanceStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.managerClearanceStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.clearanceStatusOptions$));
} }
function SeparationComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.hrClearanceStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.hrClearanceStatus.label)("placeholder", ctx_r0.formConfig.hrClearanceStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.hrClearanceStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.clearanceStatusOptions$));
} }
function SeparationComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.exitInterviewRequired.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.exitInterviewRequired.label);
} }
function SeparationComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.exitInterviewStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.exitInterviewStatus.label)("placeholder", ctx_r0.formConfig.exitInterviewStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.exitInterviewStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.interviewStatusOptions$));
} }
function SeparationComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.knowledgeTransferRequired.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.knowledgeTransferRequired.label);
} }
function SeparationComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.knowledgeTransferStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.knowledgeTransferStatus.label)("placeholder", ctx_r0.formConfig.knowledgeTransferStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.knowledgeTransferStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.interviewStatusOptions$));
} }
function SeparationComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-number-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.leaveBalanceAtExit.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.leaveBalanceAtExit.label)("placeholder", ctx_r0.formConfig.leaveBalanceAtExit.placeholder ?? "")("isRequired", ctx_r0.formConfig.leaveBalanceAtExit.isRequired);
} }
function SeparationComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.gratuityEligible.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.gratuityEligible.label);
} }
function SeparationComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.finalSettlementStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.finalSettlementStatus.label)("placeholder", ctx_r0.formConfig.finalSettlementStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.finalSettlementStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.settlementStatusOptions$));
} }
function SeparationComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.officialEmailDisableDate.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.officialEmailDisableDate.label)("isRequired", ctx_r0.formConfig.officialEmailDisableDate.isRequired);
} }
function SeparationComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.applicationAccessRevokeStatus.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.applicationAccessRevokeStatus.label)("placeholder", ctx_r0.formConfig.applicationAccessRevokeStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.applicationAccessRevokeStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.revokeStatusOptions$));
} }
function SeparationComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "ui-text-area", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.detailedExitRemarks.id)("parentFormGroup", ctx_r0.separation)("label", ctx_r0.formConfig.detailedExitRemarks.label)("placeholder", ctx_r0.formConfig.detailedExitRemarks.placeholder ?? "")("maxLength", ctx_r0.formConfig.detailedExitRemarks.maxLength)("isRequired", ctx_r0.formConfig.detailedExitRemarks.isRequired);
} }
export class SeparationComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = separationForm;
    separation;
    separationTypeOptions$;
    separationStatusOptions$;
    attritionCategoryOptions$;
    clearanceStatusOptions$;
    interviewStatusOptions$;
    settlementStatusOptions$;
    revokeStatusOptions$;
    ngOnInit() {
        this.separationTypeOptions$ = this.dropdownService.getOptions('separationType');
        this.separationStatusOptions$ = this.dropdownService.getOptions('separationStatus');
        this.attritionCategoryOptions$ = this.dropdownService.getOptions('attritionCategory');
        this.clearanceStatusOptions$ = this.dropdownService.getOptions('clearanceStatus');
        this.interviewStatusOptions$ = this.dropdownService.getOptions('interviewStatus');
        this.settlementStatusOptions$ = this.dropdownService.getOptions('settlementStatus');
        this.revokeStatusOptions$ = this.dropdownService.getOptions('revokeStatus');
        this.separation = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('separation');
        if (savedData) {
            this.separation.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.separation.valid);
        this.separation.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function SeparationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SeparationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SeparationComponent, selectors: [["employees-separation"]], decls: 33, vars: 23, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-6"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [1, "mt-2"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function SeparationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Separation Details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, SeparationComponent_Conditional_4_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(5, SeparationComponent_Conditional_5_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(6, SeparationComponent_Conditional_6_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(7, SeparationComponent_Conditional_7_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(8, SeparationComponent_Conditional_8_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(9, SeparationComponent_Conditional_9_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(10, SeparationComponent_Conditional_10_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(11, SeparationComponent_Conditional_11_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(12, SeparationComponent_Conditional_12_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(13, SeparationComponent_Conditional_13_Template, 2, 3, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "p", 1);
            i0.ɵɵtext(15, "Clearance & Workflow");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 2);
            i0.ɵɵconditionalCreate(17, SeparationComponent_Conditional_17_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(18, SeparationComponent_Conditional_18_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(19, SeparationComponent_Conditional_19_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(20, SeparationComponent_Conditional_20_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(21, SeparationComponent_Conditional_21_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(22, SeparationComponent_Conditional_22_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(23, SeparationComponent_Conditional_23_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "p", 1);
            i0.ɵɵtext(25, "Settlement & Access Closure");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 2);
            i0.ɵɵconditionalCreate(27, SeparationComponent_Conditional_27_Template, 2, 5, "div", 3);
            i0.ɵɵconditionalCreate(28, SeparationComponent_Conditional_28_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(29, SeparationComponent_Conditional_29_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(30, SeparationComponent_Conditional_30_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(31, SeparationComponent_Conditional_31_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(32, SeparationComponent_Conditional_32_Template, 2, 6, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.separationType.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.separationStatus.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.exitReason.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.initiationDate.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.resignationDate.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.noticeStartDate.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.noticeEndDate.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.proposedLastWorkingDay.isHide ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.finalLastWorkingDay.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.rehireEligible.isHide ? 13 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.attritionCategory.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.managerClearanceStatus.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.hrClearanceStatus.isHide ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.exitInterviewRequired.isHide ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.exitInterviewStatus.isHide ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.knowledgeTransferRequired.isHide ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.knowledgeTransferStatus.isHide ? 23 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.leaveBalanceAtExit.isHide ? 27 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.gratuityEligible.isHide ? 28 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.finalSettlementStatus.isHide ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.officialEmailDisableDate.isHide ? 30 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.applicationAccessRevokeStatus.isHide ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.detailedExitRemarks.isHide ? 32 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent,
            CheckboxComponent,
            NumberBoxComponent, i1.AsyncPipe], styles: ["// Separation component styles"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SeparationComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-separation', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                    CheckboxComponent,
                    NumberBoxComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\r\n\r\n  <!-- Separation Overview -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Separation Details</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.separationType.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.separationType.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.separationType.label!\"\r\n          [placeholder]=\"formConfig.separationType.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.separationType.isRequired!\"\r\n          [options]=\"separationTypeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.separationStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.separationStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.separationStatus.label!\"\r\n          [placeholder]=\"formConfig.separationStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.separationStatus.isRequired!\"\r\n          [options]=\"separationStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.exitReason.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.exitReason.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.exitReason.label!\"\r\n          [placeholder]=\"formConfig.exitReason.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.exitReason.minLength\"\r\n          [maxLength]=\"formConfig.exitReason.maxLength\"\r\n          [isRequired]=\"formConfig.exitReason.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.initiationDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.initiationDate.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.initiationDate.label!\"\r\n          [isRequired]=\"formConfig.initiationDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.resignationDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.resignationDate.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.resignationDate.label!\"\r\n          [isRequired]=\"formConfig.resignationDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.noticeStartDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.noticeStartDate.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.noticeStartDate.label!\"\r\n          [isRequired]=\"formConfig.noticeStartDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.noticeEndDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.noticeEndDate.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.noticeEndDate.label!\"\r\n          [isRequired]=\"formConfig.noticeEndDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.proposedLastWorkingDay.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.proposedLastWorkingDay.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.proposedLastWorkingDay.label!\"\r\n          [isRequired]=\"formConfig.proposedLastWorkingDay.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.finalLastWorkingDay.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.finalLastWorkingDay.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.finalLastWorkingDay.label!\"\r\n          [isRequired]=\"formConfig.finalLastWorkingDay.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.rehireEligible.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.rehireEligible.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.rehireEligible.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  <!-- Clearance & Workflow -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Clearance & Workflow</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.attritionCategory.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.attritionCategory.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.attritionCategory.label!\"\r\n          [placeholder]=\"formConfig.attritionCategory.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.attritionCategory.isRequired!\"\r\n          [options]=\"attritionCategoryOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.managerClearanceStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.managerClearanceStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.managerClearanceStatus.label!\"\r\n          [placeholder]=\"formConfig.managerClearanceStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.managerClearanceStatus.isRequired!\"\r\n          [options]=\"clearanceStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.hrClearanceStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.hrClearanceStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.hrClearanceStatus.label!\"\r\n          [placeholder]=\"formConfig.hrClearanceStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.hrClearanceStatus.isRequired!\"\r\n          [options]=\"clearanceStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.exitInterviewRequired.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.exitInterviewRequired.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.exitInterviewRequired.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.exitInterviewStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.exitInterviewStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.exitInterviewStatus.label!\"\r\n          [placeholder]=\"formConfig.exitInterviewStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.exitInterviewStatus.isRequired!\"\r\n          [options]=\"interviewStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.knowledgeTransferRequired.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.knowledgeTransferRequired.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.knowledgeTransferRequired.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.knowledgeTransferStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.knowledgeTransferStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.knowledgeTransferStatus.label!\"\r\n          [placeholder]=\"formConfig.knowledgeTransferStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.knowledgeTransferStatus.isRequired!\"\r\n          [options]=\"interviewStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  <!-- Settlement & Access -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Settlement & Access Closure</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.leaveBalanceAtExit.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-number-box\r\n          [id]=\"formConfig.leaveBalanceAtExit.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.leaveBalanceAtExit.label!\"\r\n          [placeholder]=\"formConfig.leaveBalanceAtExit.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.leaveBalanceAtExit.isRequired!\"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.gratuityEligible.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.gratuityEligible.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.gratuityEligible.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.finalSettlementStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.finalSettlementStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.finalSettlementStatus.label!\"\r\n          [placeholder]=\"formConfig.finalSettlementStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.finalSettlementStatus.isRequired!\"\r\n          [options]=\"settlementStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.officialEmailDisableDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.officialEmailDisableDate.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.officialEmailDisableDate.label!\"\r\n          [isRequired]=\"formConfig.officialEmailDisableDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.applicationAccessRevokeStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.applicationAccessRevokeStatus.id\"\r\n          [parentFormGroup]=\"separation\"\r\n          [label]=\"formConfig.applicationAccessRevokeStatus.label!\"\r\n          [placeholder]=\"formConfig.applicationAccessRevokeStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.applicationAccessRevokeStatus.isRequired!\"\r\n          [options]=\"revokeStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.detailedExitRemarks.isHide) {\r\n    <div class=\"mt-2\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.detailedExitRemarks.id\"\r\n        [parentFormGroup]=\"separation\"\r\n        [label]=\"formConfig.detailedExitRemarks.label!\"\r\n        [placeholder]=\"formConfig.detailedExitRemarks.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.detailedExitRemarks.maxLength\"\r\n        [isRequired]=\"formConfig.detailedExitRemarks.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n\r\n</div>\r\n", styles: ["// Separation component styles\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SeparationComponent, { className: "SeparationComponent", filePath: "libs/modules/employees/src/lib/components/separation/separation.component.ts", lineNumber: 40 }); })();
//# sourceMappingURL=separation.component.js.map