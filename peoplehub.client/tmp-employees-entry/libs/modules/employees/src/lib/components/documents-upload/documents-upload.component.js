import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { documentsUploadForm } from '../../config/form-configs/documents-upload.config';
import * as i0 from "@angular/core";
function DocumentsUploadComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePhoto.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeePhoto.label)("isRequired", ctx_r0.formConfig.employeePhoto.isRequired);
} }
function DocumentsUploadComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePanNumber.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeePanNumber.label)("placeholder", ctx_r0.formConfig.employeePanNumber.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeePanNumber.isRequired);
} }
function DocumentsUploadComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePan.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeePan.label)("isRequired", ctx_r0.formConfig.employeePan.isRequired);
} }
function DocumentsUploadComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeAadhaarNumber.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeeAadhaarNumber.label)("placeholder", ctx_r0.formConfig.employeeAadhaarNumber.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeeAadhaarNumber.isRequired);
} }
function DocumentsUploadComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeAadhaar.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeeAadhaar.label)("isRequired", ctx_r0.formConfig.employeeAadhaar.isRequired);
} }
function DocumentsUploadComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePassportNumber.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeePassportNumber.label)("placeholder", ctx_r0.formConfig.employeePassportNumber.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeePassportNumber.isRequired);
} }
function DocumentsUploadComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePassport.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.employeePassport.label)("isRequired", ctx_r0.formConfig.employeePassport.isRequired);
} }
function DocumentsUploadComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.last6monthsBankStatements.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.last6monthsBankStatements.label)("isRequired", ctx_r0.formConfig.last6monthsBankStatements.isRequired);
} }
function DocumentsUploadComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.last3monthsPayslips.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.last3monthsPayslips.label)("isRequired", ctx_r0.formConfig.last3monthsPayslips.isRequired);
} }
function DocumentsUploadComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.experienceLetter.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.experienceLetter.label)("isRequired", ctx_r0.formConfig.experienceLetter.isRequired);
} }
function DocumentsUploadComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.relievingLetter.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.relievingLetter.label)("isRequired", ctx_r0.formConfig.relievingLetter.isRequired);
} }
function DocumentsUploadComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-file-upload", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.offerLetter.id)("parentFormGroup", ctx_r0.documentsUpload)("label", ctx_r0.formConfig.offerLetter.label)("isRequired", ctx_r0.formConfig.offerLetter.isRequired);
} }
export class DocumentsUploadComponent {
    commonService = inject(CommonService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = documentsUploadForm;
    documentsUpload;
    ngOnInit() {
        this.documentsUpload = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('documents-upload');
        if (savedData) {
            this.documentsUpload.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.documentsUpload.valid);
        this.documentsUpload.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function DocumentsUploadComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DocumentsUploadComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DocumentsUploadComponent, selectors: [["employees-documents-upload"]], decls: 14, vars: 12, consts: [[1, "w-full", "h-full", "bg-white", "rounded-[25px]", "p-5", "border", "border-gray-200", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in-out", "hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-5", "p-5"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"]], template: function DocumentsUploadComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, DocumentsUploadComponent_Conditional_2_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(3, DocumentsUploadComponent_Conditional_3_Template, 1, 5, "ui-text-box", 3);
            i0.ɵɵconditionalCreate(4, DocumentsUploadComponent_Conditional_4_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(5, DocumentsUploadComponent_Conditional_5_Template, 1, 5, "ui-text-box", 3);
            i0.ɵɵconditionalCreate(6, DocumentsUploadComponent_Conditional_6_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(7, DocumentsUploadComponent_Conditional_7_Template, 1, 5, "ui-text-box", 3);
            i0.ɵɵconditionalCreate(8, DocumentsUploadComponent_Conditional_8_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(9, DocumentsUploadComponent_Conditional_9_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(10, DocumentsUploadComponent_Conditional_10_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(11, DocumentsUploadComponent_Conditional_11_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(12, DocumentsUploadComponent_Conditional_12_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵconditionalCreate(13, DocumentsUploadComponent_Conditional_13_Template, 1, 4, "ui-file-upload", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.employeePhoto.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeePanNumber.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeePan.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeAadhaarNumber.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeAadhaar.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeePassportNumber.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeePassport.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.last6monthsBankStatements.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.last3monthsPayslips.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.experienceLetter.isHide ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.relievingLetter.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.offerLetter.isHide ? 13 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, FileUploadComponent, TextBoxComponent], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DocumentsUploadComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-documents-upload', standalone: true, imports: [CommonModule, ReactiveFormsModule, FileUploadComponent, TextBoxComponent], template: "<div class=\"w-full h-full bg-white rounded-[25px] p-5 border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]\">\r\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-5 p-5\">\r\n\r\n    @if (!formConfig.employeePhoto.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.employeePhoto.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeePhoto.label!\"\r\n        [isRequired]=\"formConfig.employeePhoto.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.employeePanNumber.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.employeePanNumber.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeePanNumber.label!\"\r\n        [placeholder]=\"formConfig.employeePanNumber.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employeePanNumber.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employeePan.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.employeePan.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeePan.label!\"\r\n        [isRequired]=\"formConfig.employeePan.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.employeeAadhaarNumber.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.employeeAadhaarNumber.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeeAadhaarNumber.label!\"\r\n        [placeholder]=\"formConfig.employeeAadhaarNumber.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employeeAadhaarNumber.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employeeAadhaar.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.employeeAadhaar.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeeAadhaar.label!\"\r\n        [isRequired]=\"formConfig.employeeAadhaar.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.employeePassportNumber.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.employeePassportNumber.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeePassportNumber.label!\"\r\n        [placeholder]=\"formConfig.employeePassportNumber.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.employeePassportNumber.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employeePassport.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.employeePassport.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.employeePassport.label!\"\r\n        [isRequired]=\"formConfig.employeePassport.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.last6monthsBankStatements.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.last6monthsBankStatements.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.last6monthsBankStatements.label!\"\r\n        [isRequired]=\"formConfig.last6monthsBankStatements.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.last3monthsPayslips.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.last3monthsPayslips.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.last3monthsPayslips.label!\"\r\n        [isRequired]=\"formConfig.last3monthsPayslips.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.experienceLetter.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.experienceLetter.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.experienceLetter.label!\"\r\n        [isRequired]=\"formConfig.experienceLetter.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.relievingLetter.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.relievingLetter.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.relievingLetter.label!\"\r\n        [isRequired]=\"formConfig.relievingLetter.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n    @if (!formConfig.offerLetter.isHide) {\r\n      <ui-file-upload\r\n        [id]=\"formConfig.offerLetter.id\"\r\n        [parentFormGroup]=\"documentsUpload\"\r\n        [label]=\"formConfig.offerLetter.label!\"\r\n        [isRequired]=\"formConfig.offerLetter.isRequired!\"\r\n      ></ui-file-upload>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DocumentsUploadComponent, { className: "DocumentsUploadComponent", filePath: "libs/modules/employees/src/lib/components/documents-upload/documents-upload.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=documents-upload.component.js.map