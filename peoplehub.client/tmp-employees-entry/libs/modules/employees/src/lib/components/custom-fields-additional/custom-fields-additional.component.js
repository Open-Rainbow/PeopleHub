import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { customFieldsAdditionalForm } from '../../config/form-configs/custom-fields-additional.config';
import * as i0 from "@angular/core";
function CustomFieldsAdditionalComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.customFieldName.id)("parentFormGroup", ctx_r0.customFieldsAdditional)("label", ctx_r0.formConfig.customFieldName.label)("placeholder", ctx_r0.formConfig.customFieldName.placeholder ?? "")("minLength", ctx_r0.formConfig.customFieldName.minLength)("maxLength", ctx_r0.formConfig.customFieldName.maxLength)("isRequired", ctx_r0.formConfig.customFieldName.isRequired);
} }
function CustomFieldsAdditionalComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.customFieldValue.id)("parentFormGroup", ctx_r0.customFieldsAdditional)("label", ctx_r0.formConfig.customFieldValue.label)("placeholder", ctx_r0.formConfig.customFieldValue.placeholder ?? "")("minLength", ctx_r0.formConfig.customFieldValue.minLength)("maxLength", ctx_r0.formConfig.customFieldValue.maxLength)("isRequired", ctx_r0.formConfig.customFieldValue.isRequired);
} }
function CustomFieldsAdditionalComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-area", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.additionalInformation.id)("parentFormGroup", ctx_r0.customFieldsAdditional)("label", ctx_r0.formConfig.additionalInformation.label)("placeholder", ctx_r0.formConfig.additionalInformation.placeholder ?? "")("maxLength", ctx_r0.formConfig.additionalInformation.maxLength)("isRequired", ctx_r0.formConfig.additionalInformation.isRequired);
} }
export class CustomFieldsAdditionalComponent {
    commonService = inject(CommonService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = customFieldsAdditionalForm;
    customFieldsAdditional;
    ngOnInit() {
        this.customFieldsAdditional = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('custom-fields-additional');
        if (savedData) {
            this.customFieldsAdditional.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.customFieldsAdditional.valid);
        this.customFieldsAdditional.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function CustomFieldsAdditionalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomFieldsAdditionalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomFieldsAdditionalComponent, selectors: [["employees-custom-fields-additional"]], decls: 6, vars: 3, consts: [[1, "bg-white", "rounded-[16px]", "border", "border-[#dbeafe]", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "p-8", "h-full", "hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"], [1, "grid", "grid-cols-3", "gap-[10px]", "max-[768px]:grid-cols-1"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [1, "mt-5"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function CustomFieldsAdditionalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, CustomFieldsAdditionalComponent_Conditional_2_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(3, CustomFieldsAdditionalComponent_Conditional_3_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵelement(4, "div");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, CustomFieldsAdditionalComponent_Conditional_5_Template, 2, 6, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.customFieldName.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.customFieldValue.isHide ? 3 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.additionalInformation.isHide ? 5 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomFieldsAdditionalComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-custom-fields-additional', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent], template: "<div class=\"bg-white rounded-[16px] border border-[#dbeafe] shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in p-8 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]\">\r\n  <div class=\"grid grid-cols-3 gap-[10px] max-[768px]:grid-cols-1\">\r\n    @if (!formConfig.customFieldName.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.customFieldName.id\"\r\n        [parentFormGroup]=\"customFieldsAdditional\"\r\n        [label]=\"formConfig.customFieldName.label!\"\r\n        [placeholder]=\"formConfig.customFieldName.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.customFieldName.minLength\"\r\n        [maxLength]=\"formConfig.customFieldName.maxLength\"\r\n        [isRequired]=\"formConfig.customFieldName.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.customFieldValue.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.customFieldValue.id\"\r\n        [parentFormGroup]=\"customFieldsAdditional\"\r\n        [label]=\"formConfig.customFieldValue.label!\"\r\n        [placeholder]=\"formConfig.customFieldValue.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.customFieldValue.minLength\"\r\n        [maxLength]=\"formConfig.customFieldValue.maxLength\"\r\n        [isRequired]=\"formConfig.customFieldValue.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    <div></div>\r\n  </div>\r\n\r\n  @if (!formConfig.additionalInformation.isHide) {\r\n    <div class=\"mt-5\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.additionalInformation.id\"\r\n        [parentFormGroup]=\"customFieldsAdditional\"\r\n        [label]=\"formConfig.additionalInformation.label!\"\r\n        [placeholder]=\"formConfig.additionalInformation.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.additionalInformation.maxLength\"\r\n        [isRequired]=\"formConfig.additionalInformation.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomFieldsAdditionalComponent, { className: "CustomFieldsAdditionalComponent", filePath: "libs/modules/employees/src/lib/components/custom-fields-additional/custom-fields-additional.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=custom-fields-additional.component.js.map