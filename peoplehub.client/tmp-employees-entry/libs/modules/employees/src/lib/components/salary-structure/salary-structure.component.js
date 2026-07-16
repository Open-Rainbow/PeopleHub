import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, DropdownComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { salaryStructureForm } from '../../config/form-configs/salary-structure.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SalaryStructureComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.payrollGroup.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.payrollGroup.label)("placeholder", ctx_r0.formConfig.payrollGroup.placeholder ?? "")("isRequired", ctx_r0.formConfig.payrollGroup.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.payrollGroupOptions$));
} }
function SalaryStructureComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.salaryStructure.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.salaryStructure.label)("placeholder", ctx_r0.formConfig.salaryStructure.placeholder ?? "")("isRequired", ctx_r0.formConfig.salaryStructure.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.salaryStructureOptions$));
} }
function SalaryStructureComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.payGrade.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.payGrade.label)("placeholder", ctx_r0.formConfig.payGrade.placeholder ?? "")("minLength", ctx_r0.formConfig.payGrade.minLength)("maxLength", ctx_r0.formConfig.payGrade.maxLength)("isRequired", ctx_r0.formConfig.payGrade.isRequired);
} }
function SalaryStructureComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.taxRegime.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.taxRegime.label)("placeholder", ctx_r0.formConfig.taxRegime.placeholder ?? "")("isRequired", ctx_r0.formConfig.taxRegime.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.taxRegimeOptions$));
} }
function SalaryStructureComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.salaryPaymentMode.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.salaryPaymentMode.label)("placeholder", ctx_r0.formConfig.salaryPaymentMode.placeholder ?? "")("isRequired", ctx_r0.formConfig.salaryPaymentMode.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.paymentModeOptions$));
} }
function SalaryStructureComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-calendar", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.payrollEffectiveFrom.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.payrollEffectiveFrom.label)("isRequired", ctx_r0.formConfig.payrollEffectiveFrom.isRequired);
} }
function SalaryStructureComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.bankName.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.bankName.label)("placeholder", ctx_r0.formConfig.bankName.placeholder ?? "")("minLength", ctx_r0.formConfig.bankName.minLength)("maxLength", ctx_r0.formConfig.bankName.maxLength)("isRequired", ctx_r0.formConfig.bankName.isRequired);
} }
function SalaryStructureComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.accountHolderName.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.accountHolderName.label)("placeholder", ctx_r0.formConfig.accountHolderName.placeholder ?? "")("minLength", ctx_r0.formConfig.accountHolderName.minLength)("maxLength", ctx_r0.formConfig.accountHolderName.maxLength)("isRequired", ctx_r0.formConfig.accountHolderName.isRequired);
} }
function SalaryStructureComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.bankAccountNumber.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.bankAccountNumber.label)("placeholder", ctx_r0.formConfig.bankAccountNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.bankAccountNumber.minLength)("maxLength", ctx_r0.formConfig.bankAccountNumber.maxLength)("isRequired", ctx_r0.formConfig.bankAccountNumber.isRequired);
} }
function SalaryStructureComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.reEnterAccountNumber.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.reEnterAccountNumber.label)("placeholder", ctx_r0.formConfig.reEnterAccountNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.reEnterAccountNumber.minLength)("maxLength", ctx_r0.formConfig.reEnterAccountNumber.maxLength)("isRequired", ctx_r0.formConfig.reEnterAccountNumber.isRequired);
} }
function SalaryStructureComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.branchName.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.branchName.label)("placeholder", ctx_r0.formConfig.branchName.placeholder ?? "")("minLength", ctx_r0.formConfig.branchName.minLength)("maxLength", ctx_r0.formConfig.branchName.maxLength)("isRequired", ctx_r0.formConfig.branchName.isRequired);
} }
function SalaryStructureComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.ifscCode.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.ifscCode.label)("placeholder", ctx_r0.formConfig.ifscCode.placeholder ?? "")("minLength", ctx_r0.formConfig.ifscCode.minLength)("maxLength", ctx_r0.formConfig.ifscCode.maxLength)("isRequired", ctx_r0.formConfig.ifscCode.isRequired);
} }
function SalaryStructureComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.micrNumber.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.micrNumber.label)("placeholder", ctx_r0.formConfig.micrNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.micrNumber.minLength)("maxLength", ctx_r0.formConfig.micrNumber.maxLength)("isRequired", ctx_r0.formConfig.micrNumber.isRequired);
} }
function SalaryStructureComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.accountType.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.accountType.label)("placeholder", ctx_r0.formConfig.accountType.placeholder ?? "")("isRequired", ctx_r0.formConfig.accountType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.accountTypeOptions$));
} }
function SalaryStructureComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-area", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.bankAddress.id)("parentFormGroup", ctx_r0.salaryStructure)("label", ctx_r0.formConfig.bankAddress.label)("placeholder", ctx_r0.formConfig.bankAddress.placeholder ?? "")("maxLength", ctx_r0.formConfig.bankAddress.maxLength)("isRequired", ctx_r0.formConfig.bankAddress.isRequired);
} }
export class SalaryStructureComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = salaryStructureForm;
    salaryStructure;
    payrollGroupOptions$;
    salaryStructureOptions$;
    accountTypeOptions$;
    paymentModeOptions$;
    taxRegimeOptions$;
    ngOnInit() {
        this.payrollGroupOptions$ = this.dropdownService.getOptions('payrollGroup');
        this.salaryStructureOptions$ = this.dropdownService.getOptions('salaryStructure');
        this.accountTypeOptions$ = this.dropdownService.getOptions('accountType');
        this.paymentModeOptions$ = this.dropdownService.getOptions('paymentMode');
        this.taxRegimeOptions$ = this.dropdownService.getOptions('taxRegime');
        this.salaryStructure = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('salary-structure');
        if (savedData) {
            this.salaryStructure.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.salaryStructure.valid);
        this.salaryStructure.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function SalaryStructureComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SalaryStructureComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SalaryStructureComponent, selectors: [["employees-salary-structure"]], decls: 22, vars: 15, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-6"], [1, "form-group"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-4"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "isRequired"]], template: function SalaryStructureComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Payroll Configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, SalaryStructureComponent_Conditional_4_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(5, SalaryStructureComponent_Conditional_5_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(6, SalaryStructureComponent_Conditional_6_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(7, SalaryStructureComponent_Conditional_7_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(8, SalaryStructureComponent_Conditional_8_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(9, SalaryStructureComponent_Conditional_9_Template, 2, 4, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 1);
            i0.ɵɵtext(11, "Bank Details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 4);
            i0.ɵɵconditionalCreate(13, SalaryStructureComponent_Conditional_13_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(14, SalaryStructureComponent_Conditional_14_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(15, SalaryStructureComponent_Conditional_15_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(16, SalaryStructureComponent_Conditional_16_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(17, SalaryStructureComponent_Conditional_17_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(18, SalaryStructureComponent_Conditional_18_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(19, SalaryStructureComponent_Conditional_19_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(20, SalaryStructureComponent_Conditional_20_Template, 3, 8, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(21, SalaryStructureComponent_Conditional_21_Template, 1, 6, "ui-text-area", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.payrollGroup.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.salaryStructure.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.payGrade.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.taxRegime.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.salaryPaymentMode.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.payrollEffectiveFrom.isHide ? 9 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.bankName.isHide ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.accountHolderName.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.bankAccountNumber.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.reEnterAccountNumber.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.branchName.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.ifscCode.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.micrNumber.isHide ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.accountType.isHide ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.bankAddress.isHide ? 21 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent, i1.AsyncPipe], styles: ["// Salary-structure styles handled via Tailwind utilities in template"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SalaryStructureComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-salary-structure', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\r\n\r\n  <!-- Payroll Configuration -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Payroll Configuration</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\r\n\r\n    @if (!formConfig.payrollGroup.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.payrollGroup.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.payrollGroup.label!\"\r\n          [placeholder]=\"formConfig.payrollGroup.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.payrollGroup.isRequired!\"\r\n          [options]=\"payrollGroupOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.salaryStructure.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.salaryStructure.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.salaryStructure.label!\"\r\n          [placeholder]=\"formConfig.salaryStructure.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.salaryStructure.isRequired!\"\r\n          [options]=\"salaryStructureOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.payGrade.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.payGrade.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.payGrade.label!\"\r\n          [placeholder]=\"formConfig.payGrade.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.payGrade.minLength\"\r\n          [maxLength]=\"formConfig.payGrade.maxLength\"\r\n          [isRequired]=\"formConfig.payGrade.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.taxRegime.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.taxRegime.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.taxRegime.label!\"\r\n          [placeholder]=\"formConfig.taxRegime.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.taxRegime.isRequired!\"\r\n          [options]=\"taxRegimeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.salaryPaymentMode.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.salaryPaymentMode.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.salaryPaymentMode.label!\"\r\n          [placeholder]=\"formConfig.salaryPaymentMode.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.salaryPaymentMode.isRequired!\"\r\n          [options]=\"paymentModeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.payrollEffectiveFrom.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.payrollEffectiveFrom.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.payrollEffectiveFrom.label!\"\r\n          [isRequired]=\"formConfig.payrollEffectiveFrom.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  <!-- Bank Details -->\r\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Bank Details</p>\r\n  <div class=\"grid grid-cols-3 gap-[10px] mb-4\">\r\n\r\n    @if (!formConfig.bankName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.bankName.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.bankName.label!\"\r\n          [placeholder]=\"formConfig.bankName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.bankName.minLength\"\r\n          [maxLength]=\"formConfig.bankName.maxLength\"\r\n          [isRequired]=\"formConfig.bankName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.accountHolderName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.accountHolderName.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.accountHolderName.label!\"\r\n          [placeholder]=\"formConfig.accountHolderName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.accountHolderName.minLength\"\r\n          [maxLength]=\"formConfig.accountHolderName.maxLength\"\r\n          [isRequired]=\"formConfig.accountHolderName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.bankAccountNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.bankAccountNumber.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.bankAccountNumber.label!\"\r\n          [placeholder]=\"formConfig.bankAccountNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.bankAccountNumber.minLength\"\r\n          [maxLength]=\"formConfig.bankAccountNumber.maxLength\"\r\n          [isRequired]=\"formConfig.bankAccountNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.reEnterAccountNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.reEnterAccountNumber.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.reEnterAccountNumber.label!\"\r\n          [placeholder]=\"formConfig.reEnterAccountNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.reEnterAccountNumber.minLength\"\r\n          [maxLength]=\"formConfig.reEnterAccountNumber.maxLength\"\r\n          [isRequired]=\"formConfig.reEnterAccountNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.branchName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.branchName.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.branchName.label!\"\r\n          [placeholder]=\"formConfig.branchName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.branchName.minLength\"\r\n          [maxLength]=\"formConfig.branchName.maxLength\"\r\n          [isRequired]=\"formConfig.branchName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.ifscCode.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.ifscCode.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.ifscCode.label!\"\r\n          [placeholder]=\"formConfig.ifscCode.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.ifscCode.minLength\"\r\n          [maxLength]=\"formConfig.ifscCode.maxLength\"\r\n          [isRequired]=\"formConfig.ifscCode.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.micrNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.micrNumber.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.micrNumber.label!\"\r\n          [placeholder]=\"formConfig.micrNumber.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.micrNumber.minLength\"\r\n          [maxLength]=\"formConfig.micrNumber.maxLength\"\r\n          [isRequired]=\"formConfig.micrNumber.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.accountType.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.accountType.id\"\r\n          [parentFormGroup]=\"salaryStructure\"\r\n          [label]=\"formConfig.accountType.label!\"\r\n          [placeholder]=\"formConfig.accountType.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.accountType.isRequired!\"\r\n          [options]=\"accountTypeOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.bankAddress.isHide) {\r\n    <ui-text-area\r\n      [id]=\"formConfig.bankAddress.id\"\r\n      [parentFormGroup]=\"salaryStructure\"\r\n      [label]=\"formConfig.bankAddress.label!\"\r\n      [placeholder]=\"formConfig.bankAddress.placeholder ?? ''\"\r\n      [maxLength]=\"formConfig.bankAddress.maxLength\"\r\n      [isRequired]=\"formConfig.bankAddress.isRequired!\"\r\n    ></ui-text-area>\r\n  }\r\n\r\n</div>\r\n", styles: ["// Salary-structure styles handled via Tailwind utilities in template\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SalaryStructureComponent, { className: "SalaryStructureComponent", filePath: "libs/modules/employees/src/lib/components/salary-structure/salary-structure.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=salary-structure.component.js.map