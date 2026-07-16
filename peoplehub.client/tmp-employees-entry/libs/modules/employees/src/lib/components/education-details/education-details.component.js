import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextAreaComponent, TextBoxComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { educationDetailsForm } from '../../config/form-configs/education-details.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function EducationDetailsComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.higherQualification.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.higherQualification.label)("placeholder", ctx_r0.formConfig.higherQualification.placeholder ?? "")("minLength", ctx_r0.formConfig.higherQualification.minLength)("maxLength", ctx_r0.formConfig.higherQualification.maxLength)("isRequired", ctx_r0.formConfig.higherQualification.isRequired);
} }
function EducationDetailsComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.board.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.board.label)("placeholder", ctx_r0.formConfig.board.placeholder ?? "")("minLength", ctx_r0.formConfig.board.minLength)("maxLength", ctx_r0.formConfig.board.maxLength)("isRequired", ctx_r0.formConfig.board.isRequired);
} }
function EducationDetailsComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.courseType.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.courseType.label)("placeholder", ctx_r0.formConfig.courseType.placeholder ?? "")("minLength", ctx_r0.formConfig.courseType.minLength)("maxLength", ctx_r0.formConfig.courseType.maxLength)("isRequired", ctx_r0.formConfig.courseType.isRequired);
} }
function EducationDetailsComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.specialization.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.specialization.label)("placeholder", ctx_r0.formConfig.specialization.placeholder ?? "")("minLength", ctx_r0.formConfig.specialization.minLength)("maxLength", ctx_r0.formConfig.specialization.maxLength)("isRequired", ctx_r0.formConfig.specialization.isRequired);
} }
function EducationDetailsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.percentageScore.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.percentageScore.label)("placeholder", ctx_r0.formConfig.percentageScore.placeholder ?? "")("minLength", ctx_r0.formConfig.percentageScore.minLength)("maxLength", ctx_r0.formConfig.percentageScore.maxLength)("isRequired", ctx_r0.formConfig.percentageScore.isRequired);
} }
function EducationDetailsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.scoringMethod.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.scoringMethod.label)("placeholder", ctx_r0.formConfig.scoringMethod.placeholder ?? "")("minLength", ctx_r0.formConfig.scoringMethod.minLength)("maxLength", ctx_r0.formConfig.scoringMethod.maxLength)("isRequired", ctx_r0.formConfig.scoringMethod.isRequired);
} }
function EducationDetailsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.monthOfPassing.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.monthOfPassing.label)("placeholder", ctx_r0.formConfig.monthOfPassing.placeholder ?? "")("minLength", ctx_r0.formConfig.monthOfPassing.minLength)("maxLength", ctx_r0.formConfig.monthOfPassing.maxLength)("isRequired", ctx_r0.formConfig.monthOfPassing.isRequired);
} }
function EducationDetailsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-dropdown", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.yearOfPassing.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.yearOfPassing.label)("placeholder", ctx_r0.formConfig.yearOfPassing.placeholder ?? "")("isRequired", ctx_r0.formConfig.yearOfPassing.isRequired)("options", i0.ɵɵpipeBind1(1, 6, ctx_r0.yearOfPassingOptions$));
} }
function EducationDetailsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-text-box", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.formConfig.universityName.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.universityName.label)("placeholder", ctx_r0.formConfig.universityName.placeholder ?? "")("minLength", ctx_r0.formConfig.universityName.minLength)("maxLength", ctx_r0.formConfig.universityName.maxLength)("isRequired", ctx_r0.formConfig.universityName.isRequired);
} }
function EducationDetailsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-text-area", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.certifications.id)("parentFormGroup", ctx_r0.educationDetails)("label", ctx_r0.formConfig.certifications.label)("placeholder", ctx_r0.formConfig.certifications.placeholder ?? "")("maxLength", ctx_r0.formConfig.certifications.maxLength)("isRequired", ctx_r0.formConfig.certifications.isRequired);
} }
export class EducationDetailsComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = educationDetailsForm;
    educationDetails;
    yearOfPassingOptions$;
    ngOnInit() {
        this.yearOfPassingOptions$ = this.dropdownService.getOptions('yearOfPassing');
        this.educationDetails = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('education-details');
        if (savedData) {
            this.educationDetails.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.educationDetails.valid);
        this.educationDetails.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function EducationDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EducationDetailsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EducationDetailsComponent, selectors: [["employees-education-details"]], decls: 14, vars: 10, consts: [[1, "w-full", "h-full", "bg-white", "rounded-[25px]", "p-5", "shadow-sm", "transition-shadow", "duration-200", "ease-out", "hover:shadow-md"], [1, "grid", "grid-cols-3", "gap-5", "mt-5"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [1, "mt-5"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function EducationDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, EducationDetailsComponent_Conditional_2_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(3, EducationDetailsComponent_Conditional_3_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(4, EducationDetailsComponent_Conditional_4_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(5, EducationDetailsComponent_Conditional_5_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(6, EducationDetailsComponent_Conditional_6_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(7, EducationDetailsComponent_Conditional_7_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(8, EducationDetailsComponent_Conditional_8_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵconditionalCreate(9, EducationDetailsComponent_Conditional_9_Template, 2, 8, "ui-dropdown", 3);
            i0.ɵɵconditionalCreate(10, EducationDetailsComponent_Conditional_10_Template, 1, 7, "ui-text-box", 2);
            i0.ɵɵelement(11, "div")(12, "div");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(13, EducationDetailsComponent_Conditional_13_Template, 2, 6, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.higherQualification.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.board.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.courseType.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.specialization.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.percentageScore.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.scoringMethod.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.monthOfPassing.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.yearOfPassing.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.universityName.isHide ? 10 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.formConfig.certifications.isHide ? 13 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent, DropdownComponent, i1.AsyncPipe], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EducationDetailsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-education-details', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent, DropdownComponent], template: "<div class=\"w-full h-full bg-white rounded-[25px] p-5 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md\">\r\n  <div class=\"grid grid-cols-3 gap-5 mt-5\">\r\n\r\n    @if (!formConfig.higherQualification.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.higherQualification.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.higherQualification.label!\"\r\n        [placeholder]=\"formConfig.higherQualification.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.higherQualification.minLength\"\r\n        [maxLength]=\"formConfig.higherQualification.maxLength\"\r\n        [isRequired]=\"formConfig.higherQualification.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.board.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.board.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.board.label!\"\r\n        [placeholder]=\"formConfig.board.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.board.minLength\"\r\n        [maxLength]=\"formConfig.board.maxLength\"\r\n        [isRequired]=\"formConfig.board.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.courseType.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.courseType.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.courseType.label!\"\r\n        [placeholder]=\"formConfig.courseType.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.courseType.minLength\"\r\n        [maxLength]=\"formConfig.courseType.maxLength\"\r\n        [isRequired]=\"formConfig.courseType.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.specialization.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.specialization.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.specialization.label!\"\r\n        [placeholder]=\"formConfig.specialization.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.specialization.minLength\"\r\n        [maxLength]=\"formConfig.specialization.maxLength\"\r\n        [isRequired]=\"formConfig.specialization.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.percentageScore.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.percentageScore.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.percentageScore.label!\"\r\n        [placeholder]=\"formConfig.percentageScore.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.percentageScore.minLength\"\r\n        [maxLength]=\"formConfig.percentageScore.maxLength\"\r\n        [isRequired]=\"formConfig.percentageScore.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.scoringMethod.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.scoringMethod.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.scoringMethod.label!\"\r\n        [placeholder]=\"formConfig.scoringMethod.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.scoringMethod.minLength\"\r\n        [maxLength]=\"formConfig.scoringMethod.maxLength\"\r\n        [isRequired]=\"formConfig.scoringMethod.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.monthOfPassing.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.monthOfPassing.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.monthOfPassing.label!\"\r\n        [placeholder]=\"formConfig.monthOfPassing.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.monthOfPassing.minLength\"\r\n        [maxLength]=\"formConfig.monthOfPassing.maxLength\"\r\n        [isRequired]=\"formConfig.monthOfPassing.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.yearOfPassing.isHide) {\r\n      <ui-dropdown\r\n        [id]=\"formConfig.yearOfPassing.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.yearOfPassing.label!\"\r\n        [placeholder]=\"formConfig.yearOfPassing.placeholder ?? ''\"\r\n        [isRequired]=\"formConfig.yearOfPassing.isRequired!\"\r\n        [options]=\"yearOfPassingOptions$ | async\"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.universityName.isHide) {\r\n      <ui-text-box\r\n        [id]=\"formConfig.universityName.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.universityName.label!\"\r\n        [placeholder]=\"formConfig.universityName.placeholder ?? ''\"\r\n        [minLength]=\"formConfig.universityName.minLength\"\r\n        [maxLength]=\"formConfig.universityName.maxLength\"\r\n        [isRequired]=\"formConfig.universityName.isRequired!\"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    <!-- Empty columns to preserve 3-col grid alignment -->\r\n    <div></div>\r\n    <div></div>\r\n  </div>\r\n\r\n  @if (!formConfig.certifications.isHide) {\r\n    <div class=\"mt-5\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.certifications.id\"\r\n        [parentFormGroup]=\"educationDetails\"\r\n        [label]=\"formConfig.certifications.label!\"\r\n        [placeholder]=\"formConfig.certifications.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.certifications.maxLength\"\r\n        [isRequired]=\"formConfig.certifications.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EducationDetailsComponent, { className: "EducationDetailsComponent", filePath: "libs/modules/employees/src/lib/components/education-details/education-details.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=education-details.component.js.map