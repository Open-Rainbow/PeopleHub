import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { changeRequestsAuditForm } from '../../config/form-configs/change-requests-audit.config';
import * as i0 from "@angular/core";
function ChangeRequestsAuditComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.changeRequestType.id)("parentFormGroup", ctx_r0.changeRequestsAudit)("label", ctx_r0.formConfig.changeRequestType.label)("placeholder", ctx_r0.formConfig.changeRequestType.placeholder ?? "")("minLength", ctx_r0.formConfig.changeRequestType.minLength)("maxLength", ctx_r0.formConfig.changeRequestType.maxLength)("isRequired", ctx_r0.formConfig.changeRequestType.isRequired);
} }
function ChangeRequestsAuditComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.requestedBy.id)("parentFormGroup", ctx_r0.changeRequestsAudit)("label", ctx_r0.formConfig.requestedBy.label)("placeholder", ctx_r0.formConfig.requestedBy.placeholder ?? "")("minLength", ctx_r0.formConfig.requestedBy.minLength)("maxLength", ctx_r0.formConfig.requestedBy.maxLength)("isRequired", ctx_r0.formConfig.requestedBy.isRequired);
} }
function ChangeRequestsAuditComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.auditReference.id)("parentFormGroup", ctx_r0.changeRequestsAudit)("label", ctx_r0.formConfig.auditReference.label)("placeholder", ctx_r0.formConfig.auditReference.placeholder ?? "")("minLength", ctx_r0.formConfig.auditReference.minLength)("maxLength", ctx_r0.formConfig.auditReference.maxLength)("isRequired", ctx_r0.formConfig.auditReference.isRequired);
} }
function ChangeRequestsAuditComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-area", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.auditRemarks.id)("parentFormGroup", ctx_r0.changeRequestsAudit)("label", ctx_r0.formConfig.auditRemarks.label)("placeholder", ctx_r0.formConfig.auditRemarks.placeholder ?? "")("maxLength", ctx_r0.formConfig.auditRemarks.maxLength)("isRequired", ctx_r0.formConfig.auditRemarks.isRequired);
} }
export class ChangeRequestsAuditComponent {
    commonService = inject(CommonService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = changeRequestsAuditForm;
    changeRequestsAudit;
    ngOnInit() {
        this.changeRequestsAudit = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('change-requests-audit');
        if (savedData) {
            this.changeRequestsAudit.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.changeRequestsAudit.valid);
        this.changeRequestsAudit.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function ChangeRequestsAuditComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChangeRequestsAuditComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChangeRequestsAuditComponent, selectors: [["employees-change-requests-audit"]], decls: 6, vars: 4, consts: [[1, "bg-white", "rounded-[16px]", "border", "border-[#dbeafe]", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "p-8", "h-full", "hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"], [1, "grid", "grid-cols-3", "gap-[10px]", "max-[768px]:grid-cols-1"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [1, "mt-5"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function ChangeRequestsAuditComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, ChangeRequestsAuditComponent_Conditional_2_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(3, ChangeRequestsAuditComponent_Conditional_3_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(4, ChangeRequestsAuditComponent_Conditional_4_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, ChangeRequestsAuditComponent_Conditional_5_Template, 2, 6, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.changeRequestType.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.requestedBy.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.auditReference.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.auditRemarks.isHide ? 5 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChangeRequestsAuditComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-change-requests-audit', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent], template: "<div class=\"bg-white rounded-[16px] border border-[#dbeafe] shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in p-8 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]\">\r\n  <div class=\"grid grid-cols-3 gap-[10px] max-[768px]:grid-cols-1\">\r\n    @if (!formConfig.changeRequestType.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.changeRequestType.id\"\r\n        [parentFormGroup]=\"changeRequestsAudit\"\r\n        [label]=\"formConfig.changeRequestType.label!\"\r\n        [placeholder]=\"formConfig.changeRequestType.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.changeRequestType.minLength\"\r\n        [maxLength]=\"formConfig.changeRequestType.maxLength\"\r\n        [isRequired]=\"formConfig.changeRequestType.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.requestedBy.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.requestedBy.id\"\r\n        [parentFormGroup]=\"changeRequestsAudit\"\r\n        [label]=\"formConfig.requestedBy.label!\"\r\n        [placeholder]=\"formConfig.requestedBy.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.requestedBy.minLength\"\r\n        [maxLength]=\"formConfig.requestedBy.maxLength\"\r\n        [isRequired]=\"formConfig.requestedBy.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.auditReference.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.auditReference.id\"\r\n        [parentFormGroup]=\"changeRequestsAudit\"\r\n        [label]=\"formConfig.auditReference.label!\"\r\n        [placeholder]=\"formConfig.auditReference.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.auditReference.minLength\"\r\n        [maxLength]=\"formConfig.auditReference.maxLength\"\r\n        [isRequired]=\"formConfig.auditReference.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n  </div>\r\n\r\n  @if (!formConfig.auditRemarks.isHide) {\r\n    <div class=\"mt-5\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.auditRemarks.id\"\r\n        [parentFormGroup]=\"changeRequestsAudit\"\r\n        [label]=\"formConfig.auditRemarks.label!\"\r\n        [placeholder]=\"formConfig.auditRemarks.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.auditRemarks.maxLength\"\r\n        [isRequired]=\"formConfig.auditRemarks.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChangeRequestsAuditComponent, { className: "ChangeRequestsAuditComponent", filePath: "libs/modules/employees/src/lib/components/change-requests-audit/change-requests-audit.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=change-requests-audit.component.js.map