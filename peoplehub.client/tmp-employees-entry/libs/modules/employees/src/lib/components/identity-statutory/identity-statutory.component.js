import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, DropdownComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { identityStatutoryForm } from '../../config/form-configs/identity-statutory.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function IdentityStatutoryComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.panNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.panNumber.label)("placeholder", ctx_r0.formConfig.panNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.panNumber.minLength)("maxLength", ctx_r0.formConfig.panNumber.maxLength)("isRequired", ctx_r0.formConfig.panNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.aadhaarNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.aadhaarNumber.label)("placeholder", ctx_r0.formConfig.aadhaarNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.aadhaarNumber.minLength)("maxLength", ctx_r0.formConfig.aadhaarNumber.maxLength)("isRequired", ctx_r0.formConfig.aadhaarNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.uanNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.uanNumber.label)("placeholder", ctx_r0.formConfig.uanNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.uanNumber.minLength)("maxLength", ctx_r0.formConfig.uanNumber.maxLength)("isRequired", ctx_r0.formConfig.uanNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.pfAccountNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.pfAccountNumber.label)("placeholder", ctx_r0.formConfig.pfAccountNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.pfAccountNumber.minLength)("maxLength", ctx_r0.formConfig.pfAccountNumber.maxLength)("isRequired", ctx_r0.formConfig.pfAccountNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.esiNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.esiNumber.label)("placeholder", ctx_r0.formConfig.esiNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.esiNumber.minLength)("maxLength", ctx_r0.formConfig.esiNumber.maxLength)("isRequired", ctx_r0.formConfig.esiNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.documentType.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.documentType.label)("placeholder", ctx_r0.formConfig.documentType.placeholder ?? "")("isRequired", ctx_r0.formConfig.documentType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.documentTypeOptions$));
} }
function IdentityStatutoryComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.documentNumber.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.documentNumber.label)("placeholder", ctx_r0.formConfig.documentNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.documentNumber.minLength)("maxLength", ctx_r0.formConfig.documentNumber.maxLength)("isRequired", ctx_r0.formConfig.documentNumber.isRequired);
} }
function IdentityStatutoryComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.nameOnDocument.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.nameOnDocument.label)("placeholder", ctx_r0.formConfig.nameOnDocument.placeholder ?? "")("minLength", ctx_r0.formConfig.nameOnDocument.minLength)("maxLength", ctx_r0.formConfig.nameOnDocument.maxLength)("isRequired", ctx_r0.formConfig.nameOnDocument.isRequired);
} }
function IdentityStatutoryComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.issuingAuthority.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.issuingAuthority.label)("placeholder", ctx_r0.formConfig.issuingAuthority.placeholder ?? "")("minLength", ctx_r0.formConfig.issuingAuthority.minLength)("maxLength", ctx_r0.formConfig.issuingAuthority.maxLength)("isRequired", ctx_r0.formConfig.issuingAuthority.isRequired);
} }
function IdentityStatutoryComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.issueDate.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.issueDate.label)("isRequired", ctx_r0.formConfig.issueDate.isRequired);
} }
function IdentityStatutoryComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.validFrom.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.validFrom.label)("isRequired", ctx_r0.formConfig.validFrom.isRequired);
} }
function IdentityStatutoryComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.validTo.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.validTo.label)("isRequired", ctx_r0.formConfig.validTo.isRequired);
} }
function IdentityStatutoryComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.countryOfIssue.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.countryOfIssue.label)("placeholder", ctx_r0.formConfig.countryOfIssue.placeholder ?? "")("isRequired", ctx_r0.formConfig.countryOfIssue.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.countryOptions$));
} }
function IdentityStatutoryComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.placeOfIssue.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.placeOfIssue.label)("placeholder", ctx_r0.formConfig.placeOfIssue.placeholder ?? "")("minLength", ctx_r0.formConfig.placeOfIssue.minLength)("maxLength", ctx_r0.formConfig.placeOfIssue.maxLength)("isRequired", ctx_r0.formConfig.placeOfIssue.isRequired);
} }
function IdentityStatutoryComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.verificationStatus.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.verificationStatus.label)("placeholder", ctx_r0.formConfig.verificationStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.verificationStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.verificationStatusOptions$));
} }
function IdentityStatutoryComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "ui-text-area", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.documentRemarks.id)("parentFormGroup", ctx_r0.identityStatutory)("label", ctx_r0.formConfig.documentRemarks.label)("placeholder", ctx_r0.formConfig.documentRemarks.placeholder ?? "")("maxLength", ctx_r0.formConfig.documentRemarks.maxLength)("isRequired", ctx_r0.formConfig.documentRemarks.isRequired);
} }
export class IdentityStatutoryComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = identityStatutoryForm;
    identityStatutory;
    documentTypeOptions$;
    verificationStatusOptions$;
    countryOptions$;
    ngOnInit() {
        this.documentTypeOptions$ = this.dropdownService.getOptions('documentType');
        this.verificationStatusOptions$ = this.dropdownService.getOptions('verificationStatus');
        this.countryOptions$ = this.dropdownService.getOptions('country');
        this.identityStatutory = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('identity-statutory');
        if (savedData) {
            this.identityStatutory.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.identityStatutory.valid);
        this.identityStatutory.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function IdentityStatutoryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IdentityStatutoryComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IdentityStatutoryComponent, selectors: [["employees-identity-statutory"]], decls: 23, vars: 16, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-6"], [1, "form-group"], [1, "grid", "grid-cols-3", "gap-[10px]"], [1, "mt-4"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function IdentityStatutoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Statutory Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, IdentityStatutoryComponent_Conditional_4_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(5, IdentityStatutoryComponent_Conditional_5_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(6, IdentityStatutoryComponent_Conditional_6_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(7, IdentityStatutoryComponent_Conditional_7_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(8, IdentityStatutoryComponent_Conditional_8_Template, 2, 7, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 1);
            i0.ɵɵtext(10, "Identity Document");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 4);
            i0.ɵɵconditionalCreate(12, IdentityStatutoryComponent_Conditional_12_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(13, IdentityStatutoryComponent_Conditional_13_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(14, IdentityStatutoryComponent_Conditional_14_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(15, IdentityStatutoryComponent_Conditional_15_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(16, IdentityStatutoryComponent_Conditional_16_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(17, IdentityStatutoryComponent_Conditional_17_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(18, IdentityStatutoryComponent_Conditional_18_Template, 2, 4, "div", 3);
            i0.ɵɵconditionalCreate(19, IdentityStatutoryComponent_Conditional_19_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(20, IdentityStatutoryComponent_Conditional_20_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(21, IdentityStatutoryComponent_Conditional_21_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(22, IdentityStatutoryComponent_Conditional_22_Template, 2, 6, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.panNumber.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.aadhaarNumber.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.uanNumber.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.pfAccountNumber.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.esiNumber.isHide ? 8 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.documentType.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.documentNumber.isHide ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.nameOnDocument.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.issuingAuthority.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.issueDate.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.validFrom.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.validTo.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.countryOfIssue.isHide ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.placeOfIssue.isHide ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.verificationStatus.isHide ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.documentRemarks.isHide ? 22 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent, i1.AsyncPipe], styles: ["// Identity & Statutory component styles"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IdentityStatutoryComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-identity-statutory', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\r\n\r\n  <!-- Statutory IDs Section -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Statutory Information</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.panNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.panNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.panNumber.label!\"\r\n          [placeholder]=\"formConfig.panNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.panNumber.minLength\"\r\n          [maxLength]=\"formConfig.panNumber.maxLength\"\r\n          [isRequired]=\"formConfig.panNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.aadhaarNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.aadhaarNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.aadhaarNumber.label!\"\r\n          [placeholder]=\"formConfig.aadhaarNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.aadhaarNumber.minLength\"\r\n          [maxLength]=\"formConfig.aadhaarNumber.maxLength\"\r\n          [isRequired]=\"formConfig.aadhaarNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.uanNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.uanNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.uanNumber.label!\"\r\n          [placeholder]=\"formConfig.uanNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.uanNumber.minLength\"\r\n          [maxLength]=\"formConfig.uanNumber.maxLength\"\r\n          [isRequired]=\"formConfig.uanNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.pfAccountNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.pfAccountNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.pfAccountNumber.label!\"\r\n          [placeholder]=\"formConfig.pfAccountNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.pfAccountNumber.minLength\"\r\n          [maxLength]=\"formConfig.pfAccountNumber.maxLength\"\r\n          [isRequired]=\"formConfig.pfAccountNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.esiNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.esiNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.esiNumber.label!\"\r\n          [placeholder]=\"formConfig.esiNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.esiNumber.minLength\"\r\n          [maxLength]=\"formConfig.esiNumber.maxLength\"\r\n          [isRequired]=\"formConfig.esiNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n  </div>\r\n\r\n  <!-- Identity Document Section -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Identity Document</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px]\">\r\n\r\n    @if (!formConfig.documentType.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.documentType.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.documentType.label!\"\r\n          [placeholder]=\"formConfig.documentType.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.documentType.isRequired!\"\r\n          [options]=\"documentTypeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.documentNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.documentNumber.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.documentNumber.label!\"\r\n          [placeholder]=\"formConfig.documentNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.documentNumber.minLength\"\r\n          [maxLength]=\"formConfig.documentNumber.maxLength\"\r\n          [isRequired]=\"formConfig.documentNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.nameOnDocument.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.nameOnDocument.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.nameOnDocument.label!\"\r\n          [placeholder]=\"formConfig.nameOnDocument.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.nameOnDocument.minLength\"\r\n          [maxLength]=\"formConfig.nameOnDocument.maxLength\"\r\n          [isRequired]=\"formConfig.nameOnDocument.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.issuingAuthority.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.issuingAuthority.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.issuingAuthority.label!\"\r\n          [placeholder]=\"formConfig.issuingAuthority.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.issuingAuthority.minLength\"\r\n          [maxLength]=\"formConfig.issuingAuthority.maxLength\"\r\n          [isRequired]=\"formConfig.issuingAuthority.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.issueDate.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.issueDate.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.issueDate.label!\"\r\n          [isRequired]=\"formConfig.issueDate.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.validFrom.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.validFrom.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.validFrom.label!\"\r\n          [isRequired]=\"formConfig.validFrom.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.validTo.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.validTo.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.validTo.label!\"\r\n          [isRequired]=\"formConfig.validTo.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.countryOfIssue.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.countryOfIssue.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.countryOfIssue.label!\"\r\n          [placeholder]=\"formConfig.countryOfIssue.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.countryOfIssue.isRequired!\"\r\n          [options]=\"countryOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.placeOfIssue.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.placeOfIssue.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.placeOfIssue.label!\"\r\n          [placeholder]=\"formConfig.placeOfIssue.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.placeOfIssue.minLength\"\r\n          [maxLength]=\"formConfig.placeOfIssue.maxLength\"\r\n          [isRequired]=\"formConfig.placeOfIssue.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.verificationStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.verificationStatus.id\"\r\n          [parentFormGroup]=\"identityStatutory\"\r\n          [label]=\"formConfig.verificationStatus.label!\"\r\n          [placeholder]=\"formConfig.verificationStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.verificationStatus.isRequired!\"\r\n          [options]=\"verificationStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.documentRemarks.isHide) {\r\n    <div class=\"mt-4\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.documentRemarks.id\"\r\n        [parentFormGroup]=\"identityStatutory\"\r\n        [label]=\"formConfig.documentRemarks.label!\"\r\n        [placeholder]=\"formConfig.documentRemarks.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.documentRemarks.maxLength\"\r\n        [isRequired]=\"formConfig.documentRemarks.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n\r\n</div>\r\n", styles: ["// Identity & Statutory component styles\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IdentityStatutoryComponent, { className: "IdentityStatutoryComponent", filePath: "libs/modules/employees/src/lib/components/identity-statutory/identity-statutory.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=identity-statutory.component.js.map