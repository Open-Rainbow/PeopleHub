import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, CheckboxComponent, DropdownComponent, NumberBoxComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { assetsForm } from '../../config/form-configs/assets.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AssetsComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetType.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetType.label)("placeholder", ctx_r0.formConfig.assetType.placeholder ?? "")("isRequired", ctx_r0.formConfig.assetType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.assetTypeOptions$));
} }
function AssetsComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetCategory.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetCategory.label)("placeholder", ctx_r0.formConfig.assetCategory.placeholder ?? "")("isRequired", ctx_r0.formConfig.assetCategory.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.assetCategoryOptions$));
} }
function AssetsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetName.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetName.label)("placeholder", ctx_r0.formConfig.assetName.placeholder ?? "")("minLength", ctx_r0.formConfig.assetName.minLength)("maxLength", ctx_r0.formConfig.assetName.maxLength)("isRequired", ctx_r0.formConfig.assetName.isRequired);
} }
function AssetsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetSerialNumber.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetSerialNumber.label)("placeholder", ctx_r0.formConfig.assetSerialNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.assetSerialNumber.minLength)("maxLength", ctx_r0.formConfig.assetSerialNumber.maxLength)("isRequired", ctx_r0.formConfig.assetSerialNumber.isRequired);
} }
function AssetsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.makeBrand.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.makeBrand.label)("placeholder", ctx_r0.formConfig.makeBrand.placeholder ?? "")("minLength", ctx_r0.formConfig.makeBrand.minLength)("maxLength", ctx_r0.formConfig.makeBrand.maxLength)("isRequired", ctx_r0.formConfig.makeBrand.isRequired);
} }
function AssetsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.model.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.model.label)("placeholder", ctx_r0.formConfig.model.placeholder ?? "")("minLength", ctx_r0.formConfig.model.minLength)("maxLength", ctx_r0.formConfig.model.maxLength)("isRequired", ctx_r0.formConfig.model.isRequired);
} }
function AssetsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.tagNumber.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.tagNumber.label)("placeholder", ctx_r0.formConfig.tagNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.tagNumber.minLength)("maxLength", ctx_r0.formConfig.tagNumber.maxLength)("isRequired", ctx_r0.formConfig.tagNumber.isRequired);
} }
function AssetsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.ownershipType.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.ownershipType.label)("placeholder", ctx_r0.formConfig.ownershipType.placeholder ?? "")("isRequired", ctx_r0.formConfig.ownershipType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.ownershipTypeOptions$));
} }
function AssetsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.issuedDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.issuedDate.label)("isRequired", ctx_r0.formConfig.issuedDate.isRequired);
} }
function AssetsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetConditionAtIssue.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetConditionAtIssue.label)("placeholder", ctx_r0.formConfig.assetConditionAtIssue.placeholder ?? "")("isRequired", ctx_r0.formConfig.assetConditionAtIssue.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.conditionOptions$));
} }
function AssetsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.warrantyStartDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.warrantyStartDate.label)("isRequired", ctx_r0.formConfig.warrantyStartDate.isRequired);
} }
function AssetsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.warrantyEndDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.warrantyEndDate.label)("isRequired", ctx_r0.formConfig.warrantyEndDate.isRequired);
} }
function AssetsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-number-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetValue.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetValue.label)("placeholder", ctx_r0.formConfig.assetValue.placeholder ?? "")("isRequired", ctx_r0.formConfig.assetValue.isRequired);
} }
function AssetsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeAcknowledgement.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.employeeAcknowledgement.label);
} }
function AssetsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.acknowledgementDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.acknowledgementDate.label)("isRequired", ctx_r0.formConfig.acknowledgementDate.isRequired);
} }
function AssetsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "ui-text-area", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.configurationDetails.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.configurationDetails.label)("placeholder", ctx_r0.formConfig.configurationDetails.placeholder ?? "")("maxLength", ctx_r0.formConfig.configurationDetails.maxLength)("isRequired", ctx_r0.formConfig.configurationDetails.isRequired);
} }
function AssetsComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.returnRequired.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.returnRequired.label);
} }
function AssetsComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.expectedReturnDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.expectedReturnDate.label)("isRequired", ctx_r0.formConfig.expectedReturnDate.isRequired);
} }
function AssetsComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.actualReturnDate.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.actualReturnDate.label)("isRequired", ctx_r0.formConfig.actualReturnDate.isRequired);
} }
function AssetsComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.returnCondition.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.returnCondition.label)("placeholder", ctx_r0.formConfig.returnCondition.placeholder ?? "")("isRequired", ctx_r0.formConfig.returnCondition.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.conditionOptions$));
} }
function AssetsComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.recoveryRequired.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.recoveryRequired.label);
} }
function AssetsComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-number-box", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.recoveryAmount.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.recoveryAmount.label)("placeholder", ctx_r0.formConfig.recoveryAmount.placeholder ?? "")("isRequired", ctx_r0.formConfig.recoveryAmount.isRequired);
} }
function AssetsComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.recoveryStatus.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.recoveryStatus.label)("placeholder", ctx_r0.formConfig.recoveryStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.recoveryStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.recoveryStatusOptions$));
} }
function AssetsComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetClosureStatus.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetClosureStatus.label)("placeholder", ctx_r0.formConfig.assetClosureStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.assetClosureStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.assetClosureStatusOptions$));
} }
function AssetsComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "ui-text-area", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.damageNotes.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.damageNotes.label)("placeholder", ctx_r0.formConfig.damageNotes.placeholder ?? "")("maxLength", ctx_r0.formConfig.damageNotes.maxLength)("isRequired", ctx_r0.formConfig.damageNotes.isRequired);
} }
function AssetsComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.policyName.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.policyName.label)("placeholder", ctx_r0.formConfig.policyName.placeholder ?? "")("minLength", ctx_r0.formConfig.policyName.minLength)("maxLength", ctx_r0.formConfig.policyName.maxLength)("isRequired", ctx_r0.formConfig.policyName.isRequired);
} }
function AssetsComponent_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.acknowledgedOn.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.acknowledgedOn.label)("isRequired", ctx_r0.formConfig.acknowledgedOn.isRequired);
} }
function AssetsComponent_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.acknowledgedFlag.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.acknowledgedFlag.label);
} }
function AssetsComponent_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.complianceTrainingName.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.complianceTrainingName.label)("placeholder", ctx_r0.formConfig.complianceTrainingName.placeholder ?? "")("minLength", ctx_r0.formConfig.complianceTrainingName.minLength)("maxLength", ctx_r0.formConfig.complianceTrainingName.maxLength)("isRequired", ctx_r0.formConfig.complianceTrainingName.isRequired);
} }
function AssetsComponent_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.complianceStatus.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.complianceStatus.label)("placeholder", ctx_r0.formConfig.complianceStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.complianceStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.complianceStatusOptions$));
} }
function AssetsComponent_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ui-text-area", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.assetRemarks.id)("parentFormGroup", ctx_r0.assets)("label", ctx_r0.formConfig.assetRemarks.label)("placeholder", ctx_r0.formConfig.assetRemarks.placeholder ?? "")("maxLength", ctx_r0.formConfig.assetRemarks.maxLength)("isRequired", ctx_r0.formConfig.assetRemarks.isRequired);
} }
export class AssetsComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = assetsForm;
    assets;
    assetTypeOptions$;
    assetCategoryOptions$;
    ownershipTypeOptions$;
    conditionOptions$;
    recoveryStatusOptions$;
    assetClosureStatusOptions$;
    complianceStatusOptions$;
    ngOnInit() {
        this.assetTypeOptions$ = this.dropdownService.getOptions('assetType');
        this.assetCategoryOptions$ = this.dropdownService.getOptions('assetCategory');
        this.ownershipTypeOptions$ = this.dropdownService.getOptions('ownershipType');
        this.conditionOptions$ = this.dropdownService.getOptions('assetCondition');
        this.recoveryStatusOptions$ = this.dropdownService.getOptions('recoveryStatus');
        this.assetClosureStatusOptions$ = this.dropdownService.getOptions('assetClosureStatus');
        this.complianceStatusOptions$ = this.dropdownService.getOptions('complianceStatus');
        this.assets = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('assets');
        if (savedData) {
            this.assets.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.assets.valid);
        this.assets.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function AssetsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssetsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssetsComponent, selectors: [["employees-assets"]], decls: 41, vars: 31, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-6"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [1, "mb-4"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-4"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"], [3, "id", "parentFormGroup", "label"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function AssetsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Asset Assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, AssetsComponent_Conditional_4_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(5, AssetsComponent_Conditional_5_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(6, AssetsComponent_Conditional_6_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(7, AssetsComponent_Conditional_7_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(8, AssetsComponent_Conditional_8_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(9, AssetsComponent_Conditional_9_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(10, AssetsComponent_Conditional_10_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(11, AssetsComponent_Conditional_11_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(12, AssetsComponent_Conditional_12_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(13, AssetsComponent_Conditional_13_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(14, AssetsComponent_Conditional_14_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(15, AssetsComponent_Conditional_15_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(16, AssetsComponent_Conditional_16_Template, 2, 5, "div", 3);
            i0.ɵɵconditionalCreate(17, AssetsComponent_Conditional_17_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(18, AssetsComponent_Conditional_18_Template, 2, 4, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(19, AssetsComponent_Conditional_19_Template, 2, 6, "div", 5);
            i0.ɵɵelementStart(20, "p", 1);
            i0.ɵɵtext(21, "Return & Recovery");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 2);
            i0.ɵɵconditionalCreate(23, AssetsComponent_Conditional_23_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(24, AssetsComponent_Conditional_24_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(25, AssetsComponent_Conditional_25_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(26, AssetsComponent_Conditional_26_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(27, AssetsComponent_Conditional_27_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(28, AssetsComponent_Conditional_28_Template, 2, 5, "div", 3);
            i0.ɵɵconditionalCreate(29, AssetsComponent_Conditional_29_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(30, AssetsComponent_Conditional_30_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(31, AssetsComponent_Conditional_31_Template, 2, 6, "div", 5);
            i0.ɵɵelementStart(32, "p", 1);
            i0.ɵɵtext(33, "Compliance & Policy Acknowledgement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 6);
            i0.ɵɵconditionalCreate(35, AssetsComponent_Conditional_35_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(36, AssetsComponent_Conditional_36_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(37, AssetsComponent_Conditional_37_Template, 2, 3, "div", 4);
            i0.ɵɵconditionalCreate(38, AssetsComponent_Conditional_38_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(39, AssetsComponent_Conditional_39_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(40, AssetsComponent_Conditional_40_Template, 2, 6, "div");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.assetType.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetCategory.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetName.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetSerialNumber.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.makeBrand.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.model.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.tagNumber.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.ownershipType.isHide ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.issuedDate.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetConditionAtIssue.isHide ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.warrantyStartDate.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.warrantyEndDate.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetValue.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeAcknowledgement.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.acknowledgementDate.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.configurationDetails.isHide ? 19 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.returnRequired.isHide ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.expectedReturnDate.isHide ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.actualReturnDate.isHide ? 25 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.returnCondition.isHide ? 26 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.recoveryRequired.isHide ? 27 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.recoveryAmount.isHide ? 28 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.recoveryStatus.isHide ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetClosureStatus.isHide ? 30 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.damageNotes.isHide ? 31 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.policyName.isHide ? 35 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.acknowledgedOn.isHide ? 36 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.acknowledgedFlag.isHide ? 37 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.complianceTrainingName.isHide ? 38 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.complianceStatus.isHide ? 39 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.assetRemarks.isHide ? 40 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent,
            CheckboxComponent,
            NumberBoxComponent, i1.AsyncPipe], styles: ["// Assets component styles"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssetsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-assets', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                    CheckboxComponent,
                    NumberBoxComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\r\n\r\n  <!-- Asset Assignment -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Asset Assignment</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.assetType.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.assetType.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetType.label!\"\r\n          [placeholder]=\"formConfig.assetType.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.assetType.isRequired!\"\r\n          [options]=\"assetTypeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetCategory.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.assetCategory.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetCategory.label!\"\r\n          [placeholder]=\"formConfig.assetCategory.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.assetCategory.isRequired!\"\r\n          [options]=\"assetCategoryOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.assetName.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetName.label!\"\r\n          [placeholder]=\"formConfig.assetName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.assetName.minLength\"\r\n          [maxLength]=\"formConfig.assetName.maxLength\"\r\n          [isRequired]=\"formConfig.assetName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetSerialNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.assetSerialNumber.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetSerialNumber.label!\"\r\n          [placeholder]=\"formConfig.assetSerialNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.assetSerialNumber.minLength\"\r\n          [maxLength]=\"formConfig.assetSerialNumber.maxLength\"\r\n          [isRequired]=\"formConfig.assetSerialNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.makeBrand.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.makeBrand.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.makeBrand.label!\"\r\n          [placeholder]=\"formConfig.makeBrand.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.makeBrand.minLength\"\r\n          [maxLength]=\"formConfig.makeBrand.maxLength\"\r\n          [isRequired]=\"formConfig.makeBrand.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.model.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.model.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.model.label!\"\r\n          [placeholder]=\"formConfig.model.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.model.minLength\"\r\n          [maxLength]=\"formConfig.model.maxLength\"\r\n          [isRequired]=\"formConfig.model.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.tagNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.tagNumber.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.tagNumber.label!\"\r\n          [placeholder]=\"formConfig.tagNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.tagNumber.minLength\"\r\n          [maxLength]=\"formConfig.tagNumber.maxLength\"\r\n          [isRequired]=\"formConfig.tagNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.ownershipType.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.ownershipType.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.ownershipType.label!\"\r\n          [placeholder]=\"formConfig.ownershipType.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.ownershipType.isRequired!\"\r\n          [options]=\"ownershipTypeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.issuedDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.issuedDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.issuedDate.label!\"\r\n          [isRequired]=\"formConfig.issuedDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetConditionAtIssue.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.assetConditionAtIssue.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetConditionAtIssue.label!\"\r\n          [placeholder]=\"formConfig.assetConditionAtIssue.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.assetConditionAtIssue.isRequired!\"\r\n          [options]=\"conditionOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.warrantyStartDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.warrantyStartDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.warrantyStartDate.label!\"\r\n          [isRequired]=\"formConfig.warrantyStartDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.warrantyEndDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.warrantyEndDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.warrantyEndDate.label!\"\r\n          [isRequired]=\"formConfig.warrantyEndDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetValue.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-number-box\r\n          [id]=\"formConfig.assetValue.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetValue.label!\"\r\n          [placeholder]=\"formConfig.assetValue.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.assetValue.isRequired!\"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.employeeAcknowledgement.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.employeeAcknowledgement.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.employeeAcknowledgement.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.acknowledgementDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.acknowledgementDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.acknowledgementDate.label!\"\r\n          [isRequired]=\"formConfig.acknowledgementDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.configurationDetails.isHide) {\r\n    <div class=\"mb-4\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.configurationDetails.id\"\r\n        [parentFormGroup]=\"assets\"\r\n        [label]=\"formConfig.configurationDetails.label!\"\r\n        [placeholder]=\"formConfig.configurationDetails.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.configurationDetails.maxLength\"\r\n        [isRequired]=\"formConfig.configurationDetails.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n\r\n  <!-- Return & Recovery -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Return & Recovery</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.returnRequired.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.returnRequired.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.returnRequired.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.expectedReturnDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.expectedReturnDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.expectedReturnDate.label!\"\r\n          [isRequired]=\"formConfig.expectedReturnDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.actualReturnDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.actualReturnDate.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.actualReturnDate.label!\"\r\n          [isRequired]=\"formConfig.actualReturnDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.returnCondition.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.returnCondition.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.returnCondition.label!\"\r\n          [placeholder]=\"formConfig.returnCondition.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.returnCondition.isRequired!\"\r\n          [options]=\"conditionOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.recoveryRequired.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.recoveryRequired.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.recoveryRequired.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.recoveryAmount.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-number-box\r\n          [id]=\"formConfig.recoveryAmount.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.recoveryAmount.label!\"\r\n          [placeholder]=\"formConfig.recoveryAmount.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.recoveryAmount.isRequired!\"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.recoveryStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.recoveryStatus.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.recoveryStatus.label!\"\r\n          [placeholder]=\"formConfig.recoveryStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.recoveryStatus.isRequired!\"\r\n          [options]=\"recoveryStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.assetClosureStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.assetClosureStatus.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.assetClosureStatus.label!\"\r\n          [placeholder]=\"formConfig.assetClosureStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.assetClosureStatus.isRequired!\"\r\n          [options]=\"assetClosureStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.damageNotes.isHide) {\r\n    <div class=\"mb-4\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.damageNotes.id\"\r\n        [parentFormGroup]=\"assets\"\r\n        [label]=\"formConfig.damageNotes.label!\"\r\n        [placeholder]=\"formConfig.damageNotes.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.damageNotes.maxLength\"\r\n        [isRequired]=\"formConfig.damageNotes.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n\r\n  <!-- Compliance & Policy -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Compliance & Policy Acknowledgement</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-4\">\r\n\r\n    @if (!formConfig.policyName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.policyName.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.policyName.label!\"\r\n          [placeholder]=\"formConfig.policyName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.policyName.minLength\"\r\n          [maxLength]=\"formConfig.policyName.maxLength\"\r\n          [isRequired]=\"formConfig.policyName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.acknowledgedOn.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.acknowledgedOn.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.acknowledgedOn.label!\"\r\n          [isRequired]=\"formConfig.acknowledgedOn.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.acknowledgedFlag.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.acknowledgedFlag.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.acknowledgedFlag.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.complianceTrainingName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.complianceTrainingName.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.complianceTrainingName.label!\"\r\n          [placeholder]=\"formConfig.complianceTrainingName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.complianceTrainingName.minLength\"\r\n          [maxLength]=\"formConfig.complianceTrainingName.maxLength\"\r\n          [isRequired]=\"formConfig.complianceTrainingName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.complianceStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.complianceStatus.id\"\r\n          [parentFormGroup]=\"assets\"\r\n          [label]=\"formConfig.complianceStatus.label!\"\r\n          [placeholder]=\"formConfig.complianceStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.complianceStatus.isRequired!\"\r\n          [options]=\"complianceStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.assetRemarks.isHide) {\r\n    <div>\r\n      <ui-text-area\r\n        [id]=\"formConfig.assetRemarks.id\"\r\n        [parentFormGroup]=\"assets\"\r\n        [label]=\"formConfig.assetRemarks.label!\"\r\n        [placeholder]=\"formConfig.assetRemarks.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.assetRemarks.maxLength\"\r\n        [isRequired]=\"formConfig.assetRemarks.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n\r\n</div>\r\n", styles: ["// Assets component styles\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssetsComponent, { className: "AssetsComponent", filePath: "libs/modules/employees/src/lib/components/assets/assets.component.ts", lineNumber: 40 }); })();
//# sourceMappingURL=assets.component.js.map