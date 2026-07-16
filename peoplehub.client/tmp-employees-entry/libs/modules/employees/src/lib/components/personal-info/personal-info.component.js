import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, DropdownComponent, TextBoxComponent, FileUploadComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { personalInfoForm } from '../../config/form-configs/personal-info.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PersonalInfoComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.salutation.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.salutation.label)("placeholder", ctx_r0.formConfig.salutation.placeholder ?? "")("isRequired", ctx_r0.formConfig.salutation.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.titleOptions$));
} }
function PersonalInfoComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.firstName.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.firstName.label)("placeholder", ctx_r0.formConfig.firstName.placeholder ?? "")("minLength", ctx_r0.formConfig.firstName.minLength)("maxLength", ctx_r0.formConfig.firstName.maxLength)("isRequired", ctx_r0.formConfig.firstName.isRequired);
} }
function PersonalInfoComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.middleName.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.middleName.label)("placeholder", ctx_r0.formConfig.middleName.placeholder ?? "")("minLength", ctx_r0.formConfig.middleName.minLength)("maxLength", ctx_r0.formConfig.middleName.maxLength)("isRequired", ctx_r0.formConfig.middleName.isRequired);
} }
function PersonalInfoComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.lastName.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.lastName.label)("placeholder", ctx_r0.formConfig.lastName.placeholder ?? "")("minLength", ctx_r0.formConfig.lastName.minLength)("maxLength", ctx_r0.formConfig.lastName.maxLength)("isRequired", ctx_r0.formConfig.lastName.isRequired);
} }
function PersonalInfoComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.preferredName.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.preferredName.label)("placeholder", ctx_r0.formConfig.preferredName.placeholder ?? "")("minLength", ctx_r0.formConfig.preferredName.minLength)("maxLength", ctx_r0.formConfig.preferredName.maxLength)("isRequired", ctx_r0.formConfig.preferredName.isRequired);
} }
function PersonalInfoComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeeId.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.employeeId.label)("placeholder", ctx_r0.formConfig.employeeId.placeholder ?? "")("minLength", ctx_r0.formConfig.employeeId.minLength)("maxLength", ctx_r0.formConfig.employeeId.maxLength)("isRequired", ctx_r0.formConfig.employeeId.isRequired);
} }
function PersonalInfoComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-calendar", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.dateOfBirth.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.dateOfBirth.label)("isRequired", ctx_r0.formConfig.dateOfBirth.isRequired);
} }
function PersonalInfoComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-calendar", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.dateOfJoining.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.dateOfJoining.label)("isRequired", ctx_r0.formConfig.dateOfJoining.isRequired);
} }
function PersonalInfoComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.gender.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.gender.label)("placeholder", ctx_r0.formConfig.gender.placeholder ?? "")("isRequired", ctx_r0.formConfig.gender.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.genderOptions$));
} }
function PersonalInfoComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.maritalStatus.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.maritalStatus.label)("placeholder", ctx_r0.formConfig.maritalStatus.placeholder ?? "")("isRequired", ctx_r0.formConfig.maritalStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.maritalStatusOptions$));
} }
function PersonalInfoComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.bloodGroup.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.bloodGroup.label)("placeholder", ctx_r0.formConfig.bloodGroup.placeholder ?? "")("isRequired", ctx_r0.formConfig.bloodGroup.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.bloodGroupOptions$));
} }
function PersonalInfoComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.nationality.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.nationality.label)("placeholder", ctx_r0.formConfig.nationality.placeholder ?? "")("isRequired", ctx_r0.formConfig.nationality.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.nationalityOptions$));
} }
function PersonalInfoComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.placeOfBirth.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.placeOfBirth.label)("placeholder", ctx_r0.formConfig.placeOfBirth.placeholder ?? "")("minLength", ctx_r0.formConfig.placeOfBirth.minLength)("maxLength", ctx_r0.formConfig.placeOfBirth.maxLength)("isRequired", ctx_r0.formConfig.placeOfBirth.isRequired);
} }
function PersonalInfoComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.religion.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.religion.label)("placeholder", ctx_r0.formConfig.religion.placeholder ?? "")("minLength", ctx_r0.formConfig.religion.minLength)("maxLength", ctx_r0.formConfig.religion.maxLength)("isRequired", ctx_r0.formConfig.religion.isRequired);
} }
function PersonalInfoComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 3);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.category.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.category.label)("placeholder", ctx_r0.formConfig.category.placeholder ?? "")("isRequired", ctx_r0.formConfig.category.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.categoryOptions$));
} }
function PersonalInfoComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-file-upload", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.employeePhoto.id)("parentFormGroup", ctx_r0.personalInfo)("label", ctx_r0.formConfig.employeePhoto.label)("placeholder", ctx_r0.formConfig.employeePhoto.placeholder ?? "")("isRequired", ctx_r0.formConfig.employeePhoto.isRequired);
} }
export class PersonalInfoComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = personalInfoForm;
    personalInfo;
    titleOptions$;
    genderOptions$;
    maritalStatusOptions$;
    bloodGroupOptions$;
    nationalityOptions$;
    categoryOptions$;
    ngOnInit() {
        this.titleOptions$ = this.dropdownService.getOptions('salutation');
        this.genderOptions$ = this.dropdownService.getOptions('gender');
        this.maritalStatusOptions$ =
            this.dropdownService.getOptions('maritalStatus');
        this.bloodGroupOptions$ = this.dropdownService.getOptions('bloodGroup');
        this.nationalityOptions$ = this.dropdownService.getOptions('nationality');
        this.categoryOptions$ = this.dropdownService.getOptions('category');
        this.personalInfo = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('personal-info');
        if (savedData) {
            this.personalInfo.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.personalInfo.valid);
        this.personalInfo.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function PersonalInfoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PersonalInfoComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PersonalInfoComponent, selectors: [["personal-info"]], decls: 18, vars: 16, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "grid", "grid-cols-3", "gap-[10px]"], [1, "form-group"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"]], template: function PersonalInfoComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, PersonalInfoComponent_Conditional_2_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(3, PersonalInfoComponent_Conditional_3_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(4, PersonalInfoComponent_Conditional_4_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(5, PersonalInfoComponent_Conditional_5_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(6, PersonalInfoComponent_Conditional_6_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(7, PersonalInfoComponent_Conditional_7_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(8, PersonalInfoComponent_Conditional_8_Template, 2, 4, "div", 2);
            i0.ɵɵconditionalCreate(9, PersonalInfoComponent_Conditional_9_Template, 2, 4, "div", 2);
            i0.ɵɵconditionalCreate(10, PersonalInfoComponent_Conditional_10_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(11, PersonalInfoComponent_Conditional_11_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(12, PersonalInfoComponent_Conditional_12_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(13, PersonalInfoComponent_Conditional_13_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(14, PersonalInfoComponent_Conditional_14_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(15, PersonalInfoComponent_Conditional_15_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(16, PersonalInfoComponent_Conditional_16_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(17, PersonalInfoComponent_Conditional_17_Template, 2, 5, "div", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.salutation.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.firstName.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.middleName.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.lastName.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.preferredName.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeeId.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.dateOfBirth.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.dateOfJoining.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.gender.isHide ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.maritalStatus.isHide ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.bloodGroup.isHide ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.nationality.isHide ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.placeOfBirth.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.religion.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.category.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.employeePhoto.isHide ? 17 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            CalendarComponent,
            DropdownComponent,
            FileUploadComponent, i1.AsyncPipe], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PersonalInfoComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'personal-info', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    CalendarComponent,
                    DropdownComponent,
                    FileUploadComponent,
                ], template: "<div\r\n  class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\"\r\n>\r\n  <div class=\"grid grid-cols-3 gap-[10px]\">\r\n    @if (!formConfig.salutation.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.salutation.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.salutation.label!\"\r\n          [placeholder]=\"formConfig.salutation.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.salutation.isRequired!\"\r\n          [options]=\"titleOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.firstName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.firstName.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.firstName.label!\"\r\n          [placeholder]=\"formConfig.firstName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.firstName.minLength\"\r\n          [maxLength]=\"formConfig.firstName.maxLength\"\r\n          [isRequired]=\"formConfig.firstName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.middleName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.middleName.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.middleName.label!\"\r\n          [placeholder]=\"formConfig.middleName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.middleName.minLength\"\r\n          [maxLength]=\"formConfig.middleName.maxLength\"\r\n          [isRequired]=\"formConfig.middleName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.lastName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.lastName.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.lastName.label!\"\r\n          [placeholder]=\"formConfig.lastName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.lastName.minLength\"\r\n          [maxLength]=\"formConfig.lastName.maxLength\"\r\n          [isRequired]=\"formConfig.lastName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.preferredName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.preferredName.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.preferredName.label!\"\r\n          [placeholder]=\"formConfig.preferredName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.preferredName.minLength\"\r\n          [maxLength]=\"formConfig.preferredName.maxLength\"\r\n          [isRequired]=\"formConfig.preferredName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.employeeId.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.employeeId.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.employeeId.label!\"\r\n          [placeholder]=\"formConfig.employeeId.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.employeeId.minLength\"\r\n          [maxLength]=\"formConfig.employeeId.maxLength\"\r\n          [isRequired]=\"formConfig.employeeId.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.dateOfBirth.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.dateOfBirth.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.dateOfBirth.label!\"\r\n          [isRequired]=\"formConfig.dateOfBirth.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.dateOfJoining.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-calendar\r\n          [id]=\"formConfig.dateOfJoining.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.dateOfJoining.label!\"\r\n          [isRequired]=\"formConfig.dateOfJoining.isRequired!\"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.gender.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.gender.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.gender.label!\"\r\n          [placeholder]=\"formConfig.gender.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.gender.isRequired!\"\r\n          [options]=\"genderOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.maritalStatus.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.maritalStatus.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.maritalStatus.label!\"\r\n          [placeholder]=\"formConfig.maritalStatus.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.maritalStatus.isRequired!\"\r\n          [options]=\"maritalStatusOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.bloodGroup.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.bloodGroup.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.bloodGroup.label!\"\r\n          [placeholder]=\"formConfig.bloodGroup.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.bloodGroup.isRequired!\"\r\n          [options]=\"bloodGroupOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.nationality.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.nationality.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.nationality.label!\"\r\n          [placeholder]=\"formConfig.nationality.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.nationality.isRequired!\"\r\n          [options]=\"nationalityOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.placeOfBirth.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.placeOfBirth.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.placeOfBirth.label!\"\r\n          [placeholder]=\"formConfig.placeOfBirth.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.placeOfBirth.minLength\"\r\n          [maxLength]=\"formConfig.placeOfBirth.maxLength\"\r\n          [isRequired]=\"formConfig.placeOfBirth.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.religion.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.religion.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.religion.label!\"\r\n          [placeholder]=\"formConfig.religion.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.religion.minLength\"\r\n          [maxLength]=\"formConfig.religion.maxLength\"\r\n          [isRequired]=\"formConfig.religion.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.category.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.category.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.category.label!\"\r\n          [placeholder]=\"formConfig.category.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.category.isRequired!\"\r\n          [options]=\"categoryOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.employeePhoto.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-file-upload\r\n          [id]=\"formConfig.employeePhoto.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.employeePhoto.label!\"\r\n          [placeholder]=\"formConfig.employeePhoto.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.employeePhoto.isRequired!\"\r\n        ></ui-file-upload>\r\n      </div>\r\n    }\r\n    \r\n    <!-- @if (!formConfig.uanNumber.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-number-box\r\n          [id]=\"formConfig.uanNumber.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.uanNumber.label!\"\r\n          [placeholder]=\"formConfig.uanNumber.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.uanNumber.isRequired!\"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.pfAccNo.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.pfAccNo.id\"\r\n          [parentFormGroup]=\"personalInfo\"\r\n          [label]=\"formConfig.pfAccNo.label!\"\r\n          [placeholder]=\"formConfig.pfAccNo.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.pfAccNo.minLength\"\r\n          [maxLength]=\"formConfig.pfAccNo.maxLength\"\r\n          [isRequired]=\"formConfig.pfAccNo.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    } -->\r\n  </div>\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PersonalInfoComponent, { className: "PersonalInfoComponent", filePath: "libs/modules/employees/src/lib/components/personal-info/personal-info.component.ts", lineNumber: 38 }); })();
//# sourceMappingURL=personal-info.component.js.map