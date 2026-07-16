import { ChangeDetectionStrategy, Component, computed, inject, signal, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, CheckboxComponent, DropdownComponent, NumberBoxComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { insurancePolicyForm, nomineeForm } from '../../config/form-configs/insurance-details.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
function InsuranceDetailsComponent_Conditional_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.benefitType.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.benefitType.label)("placeholder", ctx_r0.insurancePolicyConfig.benefitType.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.benefitType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.benefitTypeOptions$));
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.providerName.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.providerName.label)("placeholder", ctx_r0.insurancePolicyConfig.providerName.placeholder ?? "")("minLength", ctx_r0.insurancePolicyConfig.providerName.minLength)("maxLength", ctx_r0.insurancePolicyConfig.providerName.maxLength)("isRequired", ctx_r0.insurancePolicyConfig.providerName.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.policyNumber.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.policyNumber.label)("placeholder", ctx_r0.insurancePolicyConfig.policyNumber.placeholder ?? "")("minLength", ctx_r0.insurancePolicyConfig.policyNumber.minLength)("maxLength", ctx_r0.insurancePolicyConfig.policyNumber.maxLength)("isRequired", ctx_r0.insurancePolicyConfig.policyNumber.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.coverageStartDate.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.coverageStartDate.label)("isRequired", ctx_r0.insurancePolicyConfig.coverageStartDate.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.coverageEndDate.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.coverageEndDate.label)("isRequired", ctx_r0.insurancePolicyConfig.coverageEndDate.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.premiumSharingType.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.premiumSharingType.label)("placeholder", ctx_r0.insurancePolicyConfig.premiumSharingType.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.premiumSharingType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.premiumSharingOptions$));
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-number-box", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.coverageAmount.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.coverageAmount.label)("placeholder", ctx_r0.insurancePolicyConfig.coverageAmount.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.coverageAmount.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.policyStatus.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.policyStatus.label)("placeholder", ctx_r0.insurancePolicyConfig.policyStatus.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.policyStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.policyStatusOptions$));
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "ui-checkbox", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.employeeCovered.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.employeeCovered.label);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.coveredMemberName.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.coveredMemberName.label)("placeholder", ctx_r0.insurancePolicyConfig.coveredMemberName.placeholder ?? "")("minLength", ctx_r0.insurancePolicyConfig.coveredMemberName.minLength)("maxLength", ctx_r0.insurancePolicyConfig.coveredMemberName.maxLength)("isRequired", ctx_r0.insurancePolicyConfig.coveredMemberName.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.coveredMemberRelationship.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.coveredMemberRelationship.label)("placeholder", ctx_r0.insurancePolicyConfig.coveredMemberRelationship.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.coveredMemberRelationship.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.relationOptions$));
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-number-box", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.sumInsuredAllocation.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.sumInsuredAllocation.label)("placeholder", ctx_r0.insurancePolicyConfig.sumInsuredAllocation.placeholder ?? "")("isRequired", ctx_r0.insurancePolicyConfig.sumInsuredAllocation.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.memberCoverageFrom.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.memberCoverageFrom.label)("isRequired", ctx_r0.insurancePolicyConfig.memberCoverageFrom.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.memberCoverageTo.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.memberCoverageTo.label)("isRequired", ctx_r0.insurancePolicyConfig.memberCoverageTo.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-area", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r0.insurancePolicyConfig.insuranceRemarks.id)("parentFormGroup", ctx_r0.insurance)("label", ctx_r0.insurancePolicyConfig.insuranceRemarks.label)("placeholder", ctx_r0.insurancePolicyConfig.insuranceRemarks.placeholder ?? "")("maxLength", ctx_r0.insurancePolicyConfig.insuranceRemarks.maxLength)("isRequired", ctx_r0.insurancePolicyConfig.insuranceRemarks.isRequired);
} }
function InsuranceDetailsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "form", 3)(1, "p", 4);
    i0.ɵɵtext(2, "Policy Information");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵconditionalCreate(4, InsuranceDetailsComponent_Conditional_6_Conditional_4_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(5, InsuranceDetailsComponent_Conditional_6_Conditional_5_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(6, InsuranceDetailsComponent_Conditional_6_Conditional_6_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(7, InsuranceDetailsComponent_Conditional_6_Conditional_7_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(8, InsuranceDetailsComponent_Conditional_6_Conditional_8_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(9, InsuranceDetailsComponent_Conditional_6_Conditional_9_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(10, InsuranceDetailsComponent_Conditional_6_Conditional_10_Template, 2, 5, "div", 6);
    i0.ɵɵconditionalCreate(11, InsuranceDetailsComponent_Conditional_6_Conditional_11_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(12, InsuranceDetailsComponent_Conditional_6_Conditional_12_Template, 2, 3, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 4);
    i0.ɵɵtext(14, "Covered Member");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 5);
    i0.ɵɵconditionalCreate(16, InsuranceDetailsComponent_Conditional_6_Conditional_16_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(17, InsuranceDetailsComponent_Conditional_6_Conditional_17_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(18, InsuranceDetailsComponent_Conditional_6_Conditional_18_Template, 2, 5, "div", 6);
    i0.ɵɵconditionalCreate(19, InsuranceDetailsComponent_Conditional_6_Conditional_19_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(20, InsuranceDetailsComponent_Conditional_6_Conditional_20_Template, 2, 4, "div", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, InsuranceDetailsComponent_Conditional_6_Conditional_21_Template, 1, 6, "ui-text-area", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.insurance);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.benefitType.isHide ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.providerName.isHide ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.policyNumber.isHide ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.coverageStartDate.isHide ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.coverageEndDate.isHide ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.premiumSharingType.isHide ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.coverageAmount.isHide ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.policyStatus.isHide ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.employeeCovered.isHide ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.coveredMemberName.isHide ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.coveredMemberRelationship.isHide ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.sumInsuredAllocation.isHide ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.memberCoverageFrom.isHide ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.memberCoverageTo.isHide ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.insurancePolicyConfig.insuranceRemarks.isHide ? 21 : -1);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeBenefitType.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeBenefitType.label)("placeholder", ctx_r0.nomineeConfig.nomineeBenefitType.placeholder ?? "")("isRequired", ctx_r0.nomineeConfig.nomineeBenefitType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.benefitTypeOptions$));
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeName.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeName.label)("placeholder", ctx_r0.nomineeConfig.nomineeName.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeName.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeName.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeName.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-dropdown", 9);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeRelationship.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeRelationship.label)("placeholder", ctx_r0.nomineeConfig.nomineeRelationship.placeholder ?? "")("isRequired", ctx_r0.nomineeConfig.nomineeRelationship.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.relationOptions$));
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeDateOfBirth.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeDateOfBirth.label)("isRequired", ctx_r0.nomineeConfig.nomineeDateOfBirth.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeContactNumber.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeContactNumber.label)("placeholder", ctx_r0.nomineeConfig.nomineeContactNumber.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeContactNumber.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeContactNumber.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeContactNumber.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.sharePercentage.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.sharePercentage.label)("placeholder", ctx_r0.nomineeConfig.sharePercentage.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.sharePercentage.minLength)("maxLength", ctx_r0.nomineeConfig.sharePercentage.maxLength)("isRequired", ctx_r0.nomineeConfig.sharePercentage.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-number-box", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.priorityOrder.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.priorityOrder.label)("placeholder", ctx_r0.nomineeConfig.priorityOrder.placeholder ?? "")("isRequired", ctx_r0.nomineeConfig.priorityOrder.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeEffectiveFrom.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeEffectiveFrom.label)("isRequired", ctx_r0.nomineeConfig.nomineeEffectiveFrom.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-calendar", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeEffectiveTo.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeEffectiveTo.label)("isRequired", ctx_r0.nomineeConfig.nomineeEffectiveTo.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "ui-checkbox", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.minorFlag.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.minorFlag.label);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.guardianName.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.guardianName.label)("placeholder", ctx_r0.nomineeConfig.guardianName.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.guardianName.minLength)("maxLength", ctx_r0.nomineeConfig.guardianName.maxLength)("isRequired", ctx_r0.nomineeConfig.guardianName.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "ui-checkbox", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeActive.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeActive.label);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeBankName.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeBankName.label)("placeholder", ctx_r0.nomineeConfig.nomineeBankName.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeBankName.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeBankName.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeBankName.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeAccountNumber.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeAccountNumber.label)("placeholder", ctx_r0.nomineeConfig.nomineeAccountNumber.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeAccountNumber.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeAccountNumber.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeAccountNumber.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeIfscCode.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeIfscCode.label)("placeholder", ctx_r0.nomineeConfig.nomineeIfscCode.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeIfscCode.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeIfscCode.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeIfscCode.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineeAadhaarNumber.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineeAadhaarNumber.label)("placeholder", ctx_r0.nomineeConfig.nomineeAadhaarNumber.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineeAadhaarNumber.minLength)("maxLength", ctx_r0.nomineeConfig.nomineeAadhaarNumber.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineeAadhaarNumber.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "ui-text-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.nomineeConfig.nomineePanNumber.id)("parentFormGroup", ctx_r0.nominee)("label", ctx_r0.nomineeConfig.nomineePanNumber.label)("placeholder", ctx_r0.nomineeConfig.nomineePanNumber.placeholder ?? "")("minLength", ctx_r0.nomineeConfig.nomineePanNumber.minLength)("maxLength", ctx_r0.nomineeConfig.nomineePanNumber.maxLength)("isRequired", ctx_r0.nomineeConfig.nomineePanNumber.isRequired);
} }
function InsuranceDetailsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "form", 3)(1, "div", 5);
    i0.ɵɵconditionalCreate(2, InsuranceDetailsComponent_Conditional_7_Conditional_2_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(3, InsuranceDetailsComponent_Conditional_7_Conditional_3_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(4, InsuranceDetailsComponent_Conditional_7_Conditional_4_Template, 3, 8, "div", 6);
    i0.ɵɵconditionalCreate(5, InsuranceDetailsComponent_Conditional_7_Conditional_5_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(6, InsuranceDetailsComponent_Conditional_7_Conditional_6_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(7, InsuranceDetailsComponent_Conditional_7_Conditional_7_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(8, InsuranceDetailsComponent_Conditional_7_Conditional_8_Template, 2, 5, "div", 6);
    i0.ɵɵconditionalCreate(9, InsuranceDetailsComponent_Conditional_7_Conditional_9_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(10, InsuranceDetailsComponent_Conditional_7_Conditional_10_Template, 2, 4, "div", 6);
    i0.ɵɵconditionalCreate(11, InsuranceDetailsComponent_Conditional_7_Conditional_11_Template, 2, 3, "div", 7);
    i0.ɵɵconditionalCreate(12, InsuranceDetailsComponent_Conditional_7_Conditional_12_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(13, InsuranceDetailsComponent_Conditional_7_Conditional_13_Template, 2, 3, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 4);
    i0.ɵɵtext(15, "Nominee Bank Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 14);
    i0.ɵɵconditionalCreate(17, InsuranceDetailsComponent_Conditional_7_Conditional_17_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(18, InsuranceDetailsComponent_Conditional_7_Conditional_18_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(19, InsuranceDetailsComponent_Conditional_7_Conditional_19_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(20, InsuranceDetailsComponent_Conditional_7_Conditional_20_Template, 2, 7, "div", 6);
    i0.ɵɵconditionalCreate(21, InsuranceDetailsComponent_Conditional_7_Conditional_21_Template, 2, 7, "div", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.nominee);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeBenefitType.isHide ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeName.isHide ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeRelationship.isHide ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeDateOfBirth.isHide ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeContactNumber.isHide ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.sharePercentage.isHide ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.priorityOrder.isHide ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeEffectiveFrom.isHide ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeEffectiveTo.isHide ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.minorFlag.isHide ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.guardianName.isHide ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeActive.isHide ? 13 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeBankName.isHide ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeAccountNumber.isHide ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeIfscCode.isHide ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineeAadhaarNumber.isHide ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.nomineeConfig.nomineePanNumber.isHide ? 21 : -1);
} }
export class InsuranceDetailsComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    insurancePolicyConfig = insurancePolicyForm;
    nomineeConfig = nomineeForm;
    insurance;
    nominee;
    activeTab = signal('insurance', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    isInsuranceTab = computed(() => this.activeTab() === 'insurance', ...(ngDevMode ? [{ debugName: "isInsuranceTab" }] : /* istanbul ignore next */ []));
    benefitTypeOptions$;
    premiumSharingOptions$;
    policyStatusOptions$;
    relationOptions$;
    ngOnInit() {
        this.benefitTypeOptions$ = this.dropdownService.getOptions('benefitType');
        this.premiumSharingOptions$ = this.dropdownService.getOptions('premiumSharing');
        this.policyStatusOptions$ = this.dropdownService.getOptions('policyStatus');
        this.relationOptions$ = this.dropdownService.getOptions('relation');
        this.insurance = this.commonService.createForm(this.insurancePolicyConfig);
        this.nominee = this.commonService.createForm(this.nomineeConfig);
        const savedInsurance = this.dataService.getDataByRoute('insurance-policy');
        if (savedInsurance) {
            this.insurance.patchValue(savedInsurance);
        }
        const savedNominee = this.dataService.getDataByRoute('insurance-nominee');
        if (savedNominee) {
            this.nominee.patchValue(savedNominee);
        }
        this.stepperService.setStepValidity(true);
    }
    switchTab(tab) {
        if (tab === 'insurance') {
            this.dataService.setDataByRoute('insurance-nominee', this.nominee.value);
        }
        else {
            this.dataService.setDataByRoute('insurance-policy', this.insurance.value);
        }
        this.activeTab.set(tab);
    }
    static ɵfac = function InsuranceDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InsuranceDetailsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InsuranceDetailsComponent, selectors: [["employees-insurance-details"]], decls: 8, vars: 18, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "flex", "gap-2", "border-b", "border-gray-200", "mb-6"], ["type", "button", 1, "px-5", "py-2", "text-sm", "font-medium", "rounded-t-lg", "transition-colors", "duration-150", 3, "click"], [3, "formGroup"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-4"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"], [3, "id", "parentFormGroup", "label"], [1, "grid", "grid-cols-3", "gap-[10px]"]], template: function InsuranceDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function InsuranceDetailsComponent_Template_button_click_2_listener() { return ctx.switchTab("insurance"); });
            i0.ɵɵtext(3, " Insurance ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 2);
            i0.ɵɵlistener("click", function InsuranceDetailsComponent_Template_button_click_4_listener() { return ctx.switchTab("nominee"); });
            i0.ɵɵtext(5, " Nominees ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, InsuranceDetailsComponent_Conditional_6_Template, 22, 16, "form", 3);
            i0.ɵɵconditionalCreate(7, InsuranceDetailsComponent_Conditional_7_Template, 22, 18, "form", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("text-blue-600", ctx.isInsuranceTab())("border-b-2", ctx.isInsuranceTab())("border-blue-600", ctx.isInsuranceTab())("text-gray-500", !ctx.isInsuranceTab());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("text-blue-600", !ctx.isInsuranceTab())("border-b-2", !ctx.isInsuranceTab())("border-blue-600", !ctx.isInsuranceTab())("text-gray-500", ctx.isInsuranceTab());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isInsuranceTab() ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isInsuranceTab() ? 7 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.FormGroupDirective, TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent,
            CheckboxComponent,
            NumberBoxComponent, i2.AsyncPipe], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InsuranceDetailsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-insurance-details', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                    CheckboxComponent,
                    NumberBoxComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\n\n  <!-- Tab Header -->\n  <div class=\"flex gap-2 border-b border-gray-200 mb-6\">\n    <button\n      type=\"button\"\n      class=\"px-5 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150\"\n      [class.text-blue-600]=\"isInsuranceTab()\"\n      [class.border-b-2]=\"isInsuranceTab()\"\n      [class.border-blue-600]=\"isInsuranceTab()\"\n      [class.text-gray-500]=\"!isInsuranceTab()\"\n      (click)=\"switchTab('insurance')\"\n    >\n      Insurance\n    </button>\n    <button\n      type=\"button\"\n      class=\"px-5 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150\"\n      [class.text-blue-600]=\"!isInsuranceTab()\"\n      [class.border-b-2]=\"!isInsuranceTab()\"\n      [class.border-blue-600]=\"!isInsuranceTab()\"\n      [class.text-gray-500]=\"isInsuranceTab()\"\n      (click)=\"switchTab('nominee')\"\n    >\n      Nominees\n    </button>\n  </div>\n\n  <!-- Tab A: Insurance Policy -->\n  @if (isInsuranceTab()) {\n    <form [formGroup]=\"insurance\">\n      <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Policy Information</p>\n      <div class=\"grid grid-cols-3 gap-[10px] mb-4\">\n\n        @if (!insurancePolicyConfig.benefitType.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"insurancePolicyConfig.benefitType.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.benefitType.label!\"\n              [placeholder]=\"insurancePolicyConfig.benefitType.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.benefitType.isRequired!\"\n              [options]=\"benefitTypeOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.providerName.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"insurancePolicyConfig.providerName.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.providerName.label!\"\n              [placeholder]=\"insurancePolicyConfig.providerName.placeholder ?? ''\"\n              [minLength]=\"insurancePolicyConfig.providerName.minLength\"\n              [maxLength]=\"insurancePolicyConfig.providerName.maxLength\"\n              [isRequired]=\"insurancePolicyConfig.providerName.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.policyNumber.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"insurancePolicyConfig.policyNumber.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.policyNumber.label!\"\n              [placeholder]=\"insurancePolicyConfig.policyNumber.placeholder ?? ''\"\n              [minLength]=\"insurancePolicyConfig.policyNumber.minLength\"\n              [maxLength]=\"insurancePolicyConfig.policyNumber.maxLength\"\n              [isRequired]=\"insurancePolicyConfig.policyNumber.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.coverageStartDate.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"insurancePolicyConfig.coverageStartDate.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.coverageStartDate.label!\"\n              [isRequired]=\"insurancePolicyConfig.coverageStartDate.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.coverageEndDate.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"insurancePolicyConfig.coverageEndDate.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.coverageEndDate.label!\"\n              [isRequired]=\"insurancePolicyConfig.coverageEndDate.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.premiumSharingType.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"insurancePolicyConfig.premiumSharingType.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.premiumSharingType.label!\"\n              [placeholder]=\"insurancePolicyConfig.premiumSharingType.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.premiumSharingType.isRequired!\"\n              [options]=\"premiumSharingOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.coverageAmount.isHide) {\n          <div class=\"form-group\">\n            <ui-number-box\n              [id]=\"insurancePolicyConfig.coverageAmount.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.coverageAmount.label!\"\n              [placeholder]=\"insurancePolicyConfig.coverageAmount.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.coverageAmount.isRequired!\"\n            ></ui-number-box>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.policyStatus.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"insurancePolicyConfig.policyStatus.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.policyStatus.label!\"\n              [placeholder]=\"insurancePolicyConfig.policyStatus.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.policyStatus.isRequired!\"\n              [options]=\"policyStatusOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.employeeCovered.isHide) {\n          <div class=\"form-group flex items-end pb-2\">\n            <ui-checkbox\n              [id]=\"insurancePolicyConfig.employeeCovered.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.employeeCovered.label!\"\n            ></ui-checkbox>\n          </div>\n        }\n\n      </div>\n\n      <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Covered Member</p>\n      <div class=\"grid grid-cols-3 gap-[10px] mb-4\">\n\n        @if (!insurancePolicyConfig.coveredMemberName.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"insurancePolicyConfig.coveredMemberName.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.coveredMemberName.label!\"\n              [placeholder]=\"insurancePolicyConfig.coveredMemberName.placeholder ?? ''\"\n              [minLength]=\"insurancePolicyConfig.coveredMemberName.minLength\"\n              [maxLength]=\"insurancePolicyConfig.coveredMemberName.maxLength\"\n              [isRequired]=\"insurancePolicyConfig.coveredMemberName.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.coveredMemberRelationship.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"insurancePolicyConfig.coveredMemberRelationship.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.coveredMemberRelationship.label!\"\n              [placeholder]=\"insurancePolicyConfig.coveredMemberRelationship.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.coveredMemberRelationship.isRequired!\"\n              [options]=\"relationOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.sumInsuredAllocation.isHide) {\n          <div class=\"form-group\">\n            <ui-number-box\n              [id]=\"insurancePolicyConfig.sumInsuredAllocation.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.sumInsuredAllocation.label!\"\n              [placeholder]=\"insurancePolicyConfig.sumInsuredAllocation.placeholder ?? ''\"\n              [isRequired]=\"insurancePolicyConfig.sumInsuredAllocation.isRequired!\"\n            ></ui-number-box>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.memberCoverageFrom.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"insurancePolicyConfig.memberCoverageFrom.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.memberCoverageFrom.label!\"\n              [isRequired]=\"insurancePolicyConfig.memberCoverageFrom.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!insurancePolicyConfig.memberCoverageTo.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"insurancePolicyConfig.memberCoverageTo.id\"\n              [parentFormGroup]=\"insurance\"\n              [label]=\"insurancePolicyConfig.memberCoverageTo.label!\"\n              [isRequired]=\"insurancePolicyConfig.memberCoverageTo.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n      </div>\n\n      @if (!insurancePolicyConfig.insuranceRemarks.isHide) {\n        <ui-text-area\n          [id]=\"insurancePolicyConfig.insuranceRemarks.id\"\n          [parentFormGroup]=\"insurance\"\n          [label]=\"insurancePolicyConfig.insuranceRemarks.label!\"\n          [placeholder]=\"insurancePolicyConfig.insuranceRemarks.placeholder ?? ''\"\n          [maxLength]=\"insurancePolicyConfig.insuranceRemarks.maxLength\"\n          [isRequired]=\"insurancePolicyConfig.insuranceRemarks.isRequired!\"\n        ></ui-text-area>\n      }\n    </form>\n  }\n\n  <!-- Tab B: Nominees -->\n  @if (!isInsuranceTab()) {\n    <form [formGroup]=\"nominee\">\n      <div class=\"grid grid-cols-3 gap-[10px] mb-4\">\n\n        @if (!nomineeConfig.nomineeBenefitType.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"nomineeConfig.nomineeBenefitType.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeBenefitType.label!\"\n              [placeholder]=\"nomineeConfig.nomineeBenefitType.placeholder ?? ''\"\n              [isRequired]=\"nomineeConfig.nomineeBenefitType.isRequired!\"\n              [options]=\"benefitTypeOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeName.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeName.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeName.label!\"\n              [placeholder]=\"nomineeConfig.nomineeName.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeName.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeName.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeName.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeRelationship.isHide) {\n          <div class=\"form-group\">\n            <ui-dropdown\n              [id]=\"nomineeConfig.nomineeRelationship.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeRelationship.label!\"\n              [placeholder]=\"nomineeConfig.nomineeRelationship.placeholder ?? ''\"\n              [isRequired]=\"nomineeConfig.nomineeRelationship.isRequired!\"\n              [options]=\"relationOptions$ | async\"\n            ></ui-dropdown>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeDateOfBirth.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"nomineeConfig.nomineeDateOfBirth.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeDateOfBirth.label!\"\n              [isRequired]=\"nomineeConfig.nomineeDateOfBirth.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeContactNumber.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeContactNumber.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeContactNumber.label!\"\n              [placeholder]=\"nomineeConfig.nomineeContactNumber.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeContactNumber.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeContactNumber.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeContactNumber.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.sharePercentage.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.sharePercentage.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.sharePercentage.label!\"\n              [placeholder]=\"nomineeConfig.sharePercentage.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.sharePercentage.minLength\"\n              [maxLength]=\"nomineeConfig.sharePercentage.maxLength\"\n              [isRequired]=\"nomineeConfig.sharePercentage.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.priorityOrder.isHide) {\n          <div class=\"form-group\">\n            <ui-number-box\n              [id]=\"nomineeConfig.priorityOrder.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.priorityOrder.label!\"\n              [placeholder]=\"nomineeConfig.priorityOrder.placeholder ?? ''\"\n              [isRequired]=\"nomineeConfig.priorityOrder.isRequired!\"\n            ></ui-number-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeEffectiveFrom.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"nomineeConfig.nomineeEffectiveFrom.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeEffectiveFrom.label!\"\n              [isRequired]=\"nomineeConfig.nomineeEffectiveFrom.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeEffectiveTo.isHide) {\n          <div class=\"form-group\">\n            <ui-calendar\n              [id]=\"nomineeConfig.nomineeEffectiveTo.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeEffectiveTo.label!\"\n              [isRequired]=\"nomineeConfig.nomineeEffectiveTo.isRequired!\"\n            ></ui-calendar>\n          </div>\n        }\n\n        @if (!nomineeConfig.minorFlag.isHide) {\n          <div class=\"form-group flex items-end pb-2\">\n            <ui-checkbox\n              [id]=\"nomineeConfig.minorFlag.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.minorFlag.label!\"\n            ></ui-checkbox>\n          </div>\n        }\n\n        @if (!nomineeConfig.guardianName.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.guardianName.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.guardianName.label!\"\n              [placeholder]=\"nomineeConfig.guardianName.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.guardianName.minLength\"\n              [maxLength]=\"nomineeConfig.guardianName.maxLength\"\n              [isRequired]=\"nomineeConfig.guardianName.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeActive.isHide) {\n          <div class=\"form-group flex items-end pb-2\">\n            <ui-checkbox\n              [id]=\"nomineeConfig.nomineeActive.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeActive.label!\"\n            ></ui-checkbox>\n          </div>\n        }\n\n      </div>\n\n      <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Nominee Bank Details</p>\n      <div class=\"grid grid-cols-3 gap-[10px]\">\n\n        @if (!nomineeConfig.nomineeBankName.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeBankName.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeBankName.label!\"\n              [placeholder]=\"nomineeConfig.nomineeBankName.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeBankName.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeBankName.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeBankName.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeAccountNumber.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeAccountNumber.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeAccountNumber.label!\"\n              [placeholder]=\"nomineeConfig.nomineeAccountNumber.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeAccountNumber.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeAccountNumber.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeAccountNumber.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeIfscCode.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeIfscCode.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeIfscCode.label!\"\n              [placeholder]=\"nomineeConfig.nomineeIfscCode.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeIfscCode.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeIfscCode.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeIfscCode.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineeAadhaarNumber.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineeAadhaarNumber.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineeAadhaarNumber.label!\"\n              [placeholder]=\"nomineeConfig.nomineeAadhaarNumber.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineeAadhaarNumber.minLength\"\n              [maxLength]=\"nomineeConfig.nomineeAadhaarNumber.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineeAadhaarNumber.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n        @if (!nomineeConfig.nomineePanNumber.isHide) {\n          <div class=\"form-group\">\n            <ui-text-box\n              [id]=\"nomineeConfig.nomineePanNumber.id\"\n              [parentFormGroup]=\"nominee\"\n              [label]=\"nomineeConfig.nomineePanNumber.label!\"\n              [placeholder]=\"nomineeConfig.nomineePanNumber.placeholder ?? ''\"\n              [minLength]=\"nomineeConfig.nomineePanNumber.minLength\"\n              [maxLength]=\"nomineeConfig.nomineePanNumber.maxLength\"\n              [isRequired]=\"nomineeConfig.nomineePanNumber.isRequired!\"\n            ></ui-text-box>\n          </div>\n        }\n\n      </div>\n    </form>\n  }\n\n</div>\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InsuranceDetailsComponent, { className: "InsuranceDetailsComponent", filePath: "libs/modules/employees/src/lib/components/insurance-details/insurance-details.component.ts", lineNumber: 42 }); })();
//# sourceMappingURL=insurance-details.component.js.map