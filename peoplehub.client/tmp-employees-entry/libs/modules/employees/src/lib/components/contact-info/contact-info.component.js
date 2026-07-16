import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, DropdownComponent, TextBoxComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { contactInfoForm } from '../../config/form-configs/contact-info.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ContactInfoComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.personalMail.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.personalMail.label)("placeholder", ctx_r0.formConfig.personalMail.placeholder ?? "")("minLength", ctx_r0.formConfig.personalMail.minLength)("maxLength", ctx_r0.formConfig.personalMail.maxLength)("isRequired", ctx_r0.formConfig.personalMail.isRequired);
} }
function ContactInfoComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.alternateMail.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.alternateMail.label)("placeholder", ctx_r0.formConfig.alternateMail.placeholder ?? "")("minLength", ctx_r0.formConfig.alternateMail.minLength)("maxLength", ctx_r0.formConfig.alternateMail.maxLength)("isRequired", ctx_r0.formConfig.alternateMail.isRequired);
} }
function ContactInfoComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.mobileNumber.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.mobileNumber.label)("placeholder", ctx_r0.formConfig.mobileNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.mobileNumber.minLength)("maxLength", ctx_r0.formConfig.mobileNumber.maxLength)("isRequired", ctx_r0.formConfig.mobileNumber.isRequired);
} }
function ContactInfoComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.alternateMobile.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.alternateMobile.label)("placeholder", ctx_r0.formConfig.alternateMobile.placeholder ?? "")("minLength", ctx_r0.formConfig.alternateMobile.minLength)("maxLength", ctx_r0.formConfig.alternateMobile.maxLength)("isRequired", ctx_r0.formConfig.alternateMobile.isRequired);
} }
function ContactInfoComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.landlineNumber.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.landlineNumber.label)("placeholder", ctx_r0.formConfig.landlineNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.landlineNumber.minLength)("maxLength", ctx_r0.formConfig.landlineNumber.maxLength)("isRequired", ctx_r0.formConfig.landlineNumber.isRequired);
} }
function ContactInfoComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.officialEmail.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.officialEmail.label)("placeholder", ctx_r0.formConfig.officialEmail.placeholder ?? "")("minLength", ctx_r0.formConfig.officialEmail.minLength)("maxLength", ctx_r0.formConfig.officialEmail.maxLength)("isRequired", ctx_r0.formConfig.officialEmail.isRequired);
} }
function ContactInfoComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.linkedinUrl.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.linkedinUrl.label)("placeholder", ctx_r0.formConfig.linkedinUrl.placeholder ?? "")("minLength", ctx_r0.formConfig.linkedinUrl.minLength)("maxLength", ctx_r0.formConfig.linkedinUrl.maxLength)("isRequired", ctx_r0.formConfig.linkedinUrl.isRequired);
} }
function ContactInfoComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.addressType.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.addressType.label)("placeholder", ctx_r0.formConfig.addressType.placeholder ?? "")("isRequired", ctx_r0.formConfig.addressType.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.addressTypeOptions$));
} }
function ContactInfoComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.houseNumber.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.houseNumber.label)("placeholder", ctx_r0.formConfig.houseNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.houseNumber.minLength)("maxLength", ctx_r0.formConfig.houseNumber.maxLength)("isRequired", ctx_r0.formConfig.houseNumber.isRequired);
} }
function ContactInfoComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.streetName.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.streetName.label)("placeholder", ctx_r0.formConfig.streetName.placeholder ?? "")("minLength", ctx_r0.formConfig.streetName.minLength)("maxLength", ctx_r0.formConfig.streetName.maxLength)("isRequired", ctx_r0.formConfig.streetName.isRequired);
} }
function ContactInfoComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.landmark.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.landmark.label)("placeholder", ctx_r0.formConfig.landmark.placeholder ?? "")("minLength", ctx_r0.formConfig.landmark.minLength)("maxLength", ctx_r0.formConfig.landmark.maxLength)("isRequired", ctx_r0.formConfig.landmark.isRequired);
} }
function ContactInfoComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.colony.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.colony.label)("placeholder", ctx_r0.formConfig.colony.placeholder ?? "")("minLength", ctx_r0.formConfig.colony.minLength)("maxLength", ctx_r0.formConfig.colony.maxLength)("isRequired", ctx_r0.formConfig.colony.isRequired);
} }
function ContactInfoComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.area.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.area.label)("placeholder", ctx_r0.formConfig.area.placeholder ?? "")("minLength", ctx_r0.formConfig.area.minLength)("maxLength", ctx_r0.formConfig.area.maxLength)("isRequired", ctx_r0.formConfig.area.isRequired);
} }
function ContactInfoComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.city.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.city.label)("placeholder", ctx_r0.formConfig.city.placeholder ?? "")("minLength", ctx_r0.formConfig.city.minLength)("maxLength", ctx_r0.formConfig.city.maxLength)("isRequired", ctx_r0.formConfig.city.isRequired);
} }
function ContactInfoComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.district.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.district.label)("placeholder", ctx_r0.formConfig.district.placeholder ?? "")("minLength", ctx_r0.formConfig.district.minLength)("maxLength", ctx_r0.formConfig.district.maxLength)("isRequired", ctx_r0.formConfig.district.isRequired);
} }
function ContactInfoComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.stateProvince.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.stateProvince.label)("placeholder", ctx_r0.formConfig.stateProvince.placeholder ?? "")("minLength", ctx_r0.formConfig.stateProvince.minLength)("maxLength", ctx_r0.formConfig.stateProvince.maxLength)("isRequired", ctx_r0.formConfig.stateProvince.isRequired);
} }
function ContactInfoComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.country.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.country.label)("placeholder", ctx_r0.formConfig.country.placeholder ?? "")("isRequired", ctx_r0.formConfig.country.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.countryOptions$));
} }
function ContactInfoComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.pincode.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.pincode.label)("placeholder", ctx_r0.formConfig.pincode.placeholder ?? "")("minLength", ctx_r0.formConfig.pincode.minLength)("maxLength", ctx_r0.formConfig.pincode.maxLength)("isRequired", ctx_r0.formConfig.pincode.isRequired);
} }
function ContactInfoComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.checkToggle.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.checkToggle.label);
} }
function ContactInfoComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.contactName.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.contactName.label)("placeholder", ctx_r0.formConfig.contactName.placeholder ?? "")("minLength", ctx_r0.formConfig.contactName.minLength)("maxLength", ctx_r0.formConfig.contactName.maxLength)("isRequired", ctx_r0.formConfig.contactName.isRequired);
} }
function ContactInfoComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-dropdown", 7);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.relation.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.relation.label)("placeholder", ctx_r0.formConfig.relation.placeholder ?? "")("isRequired", ctx_r0.formConfig.relation.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.relationOptions$));
} }
function ContactInfoComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.contactNumber.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.contactNumber.label)("placeholder", ctx_r0.formConfig.contactNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.contactNumber.minLength)("maxLength", ctx_r0.formConfig.contactNumber.maxLength)("isRequired", ctx_r0.formConfig.contactNumber.isRequired);
} }
function ContactInfoComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.emergencyAlternateNumber.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.emergencyAlternateNumber.label)("placeholder", ctx_r0.formConfig.emergencyAlternateNumber.placeholder ?? "")("minLength", ctx_r0.formConfig.emergencyAlternateNumber.minLength)("maxLength", ctx_r0.formConfig.emergencyAlternateNumber.maxLength)("isRequired", ctx_r0.formConfig.emergencyAlternateNumber.isRequired);
} }
function ContactInfoComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-text-box", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.emergencyEmail.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.emergencyEmail.label)("placeholder", ctx_r0.formConfig.emergencyEmail.placeholder ?? "")("minLength", ctx_r0.formConfig.emergencyEmail.minLength)("maxLength", ctx_r0.formConfig.emergencyEmail.maxLength)("isRequired", ctx_r0.formConfig.emergencyEmail.isRequired);
} }
function ContactInfoComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-checkbox", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.primaryEmergencyContact.id)("parentFormGroup", ctx_r0.contactInfo)("label", ctx_r0.formConfig.primaryEmergencyContact.label);
} }
export class ContactInfoComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = contactInfoForm;
    contactInfo;
    relationOptions$;
    countryOptions$;
    addressTypeOptions$;
    ngOnInit() {
        this.relationOptions$ = this.dropdownService.getOptions('relation');
        this.countryOptions$ = this.dropdownService.getOptions('country');
        this.addressTypeOptions$ = this.dropdownService.getOptions('addressType');
        this.contactInfo = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('contact-info');
        if (savedData) {
            this.contactInfo.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.contactInfo.valid);
        this.contactInfo.statusChanges.subscribe(status => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function ContactInfoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactInfoComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactInfoComponent, selectors: [["employees-contact-info"]], decls: 35, vars: 25, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "text-sm", "font-semibold", "text-gray-600", "mb-3", "uppercase", "tracking-wide"], [1, "grid", "grid-cols-3", "gap-[10px]", "mb-6"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [1, "grid", "grid-cols-3", "gap-[10px]"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label"]], template: function ContactInfoComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Contact Information");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵconditionalCreate(4, ContactInfoComponent_Conditional_4_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(5, ContactInfoComponent_Conditional_5_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(6, ContactInfoComponent_Conditional_6_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(7, ContactInfoComponent_Conditional_7_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(8, ContactInfoComponent_Conditional_8_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(9, ContactInfoComponent_Conditional_9_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(10, ContactInfoComponent_Conditional_10_Template, 2, 7, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p", 1);
            i0.ɵɵtext(12, "Address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 2);
            i0.ɵɵconditionalCreate(14, ContactInfoComponent_Conditional_14_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(15, ContactInfoComponent_Conditional_15_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(16, ContactInfoComponent_Conditional_16_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(17, ContactInfoComponent_Conditional_17_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(18, ContactInfoComponent_Conditional_18_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(19, ContactInfoComponent_Conditional_19_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(20, ContactInfoComponent_Conditional_20_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(21, ContactInfoComponent_Conditional_21_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(22, ContactInfoComponent_Conditional_22_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(23, ContactInfoComponent_Conditional_23_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(24, ContactInfoComponent_Conditional_24_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(25, ContactInfoComponent_Conditional_25_Template, 2, 3, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p", 1);
            i0.ɵɵtext(27, "Emergency Contact");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 5);
            i0.ɵɵconditionalCreate(29, ContactInfoComponent_Conditional_29_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(30, ContactInfoComponent_Conditional_30_Template, 3, 8, "div", 3);
            i0.ɵɵconditionalCreate(31, ContactInfoComponent_Conditional_31_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(32, ContactInfoComponent_Conditional_32_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(33, ContactInfoComponent_Conditional_33_Template, 2, 7, "div", 3);
            i0.ɵɵconditionalCreate(34, ContactInfoComponent_Conditional_34_Template, 2, 3, "div", 4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.personalMail.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.alternateMail.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.mobileNumber.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.alternateMobile.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.landlineNumber.isHide ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.officialEmail.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.linkedinUrl.isHide ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.addressType.isHide ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.houseNumber.isHide ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.streetName.isHide ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.landmark.isHide ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.colony.isHide ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.area.isHide ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.city.isHide ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.district.isHide ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.stateProvince.isHide ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.country.isHide ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.pincode.isHide ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.checkToggle.isHide ? 25 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.formConfig.contactName.isHide ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.relation.isHide ? 30 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.contactNumber.isHide ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.emergencyAlternateNumber.isHide ? 32 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.emergencyEmail.isHide ? 33 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.primaryEmergencyContact.isHide ? 34 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CheckboxComponent, i1.AsyncPipe], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactInfoComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-contact-info', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CheckboxComponent], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\n\n  <!-- Contact Information -->\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Contact Information</p>\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\n\n    @if (!formConfig.personalMail.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.personalMail.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.personalMail.label!\"\n          [placeholder]=\"formConfig.personalMail.placeholder ?? ''\"\n          [minLength]=\"formConfig.personalMail.minLength\"\n          [maxLength]=\"formConfig.personalMail.maxLength\"\n          [isRequired]=\"formConfig.personalMail.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.alternateMail.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.alternateMail.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.alternateMail.label!\"\n          [placeholder]=\"formConfig.alternateMail.placeholder ?? ''\"\n          [minLength]=\"formConfig.alternateMail.minLength\"\n          [maxLength]=\"formConfig.alternateMail.maxLength\"\n          [isRequired]=\"formConfig.alternateMail.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.mobileNumber.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.mobileNumber.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.mobileNumber.label!\"\n          [placeholder]=\"formConfig.mobileNumber.placeholder ?? ''\"\n          [minLength]=\"formConfig.mobileNumber.minLength\"\n          [maxLength]=\"formConfig.mobileNumber.maxLength\"\n          [isRequired]=\"formConfig.mobileNumber.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.alternateMobile.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.alternateMobile.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.alternateMobile.label!\"\n          [placeholder]=\"formConfig.alternateMobile.placeholder ?? ''\"\n          [minLength]=\"formConfig.alternateMobile.minLength\"\n          [maxLength]=\"formConfig.alternateMobile.maxLength\"\n          [isRequired]=\"formConfig.alternateMobile.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.landlineNumber.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.landlineNumber.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.landlineNumber.label!\"\n          [placeholder]=\"formConfig.landlineNumber.placeholder ?? ''\"\n          [minLength]=\"formConfig.landlineNumber.minLength\"\n          [maxLength]=\"formConfig.landlineNumber.maxLength\"\n          [isRequired]=\"formConfig.landlineNumber.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.officialEmail.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.officialEmail.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.officialEmail.label!\"\n          [placeholder]=\"formConfig.officialEmail.placeholder ?? ''\"\n          [minLength]=\"formConfig.officialEmail.minLength\"\n          [maxLength]=\"formConfig.officialEmail.maxLength\"\n          [isRequired]=\"formConfig.officialEmail.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.linkedinUrl.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.linkedinUrl.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.linkedinUrl.label!\"\n          [placeholder]=\"formConfig.linkedinUrl.placeholder ?? ''\"\n          [minLength]=\"formConfig.linkedinUrl.minLength\"\n          [maxLength]=\"formConfig.linkedinUrl.maxLength\"\n          [isRequired]=\"formConfig.linkedinUrl.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n  </div>\n\n  <!-- Address -->\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Address</p>\n  <div class=\"grid grid-cols-3 gap-[10px] mb-6\">\n\n    @if (!formConfig.addressType.isHide) {\n      <div class=\"form-group\">\n        <ui-dropdown\n          [id]=\"formConfig.addressType.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.addressType.label!\"\n          [placeholder]=\"formConfig.addressType.placeholder ?? ''\"\n          [isRequired]=\"formConfig.addressType.isRequired!\"\n          [options]=\"addressTypeOptions$ | async\"\n        ></ui-dropdown>\n      </div>\n    }\n\n    @if (!formConfig.houseNumber.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.houseNumber.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.houseNumber.label!\"\n          [placeholder]=\"formConfig.houseNumber.placeholder ?? ''\"\n          [minLength]=\"formConfig.houseNumber.minLength\"\n          [maxLength]=\"formConfig.houseNumber.maxLength\"\n          [isRequired]=\"formConfig.houseNumber.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.streetName.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.streetName.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.streetName.label!\"\n          [placeholder]=\"formConfig.streetName.placeholder ?? ''\"\n          [minLength]=\"formConfig.streetName.minLength\"\n          [maxLength]=\"formConfig.streetName.maxLength\"\n          [isRequired]=\"formConfig.streetName.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.landmark.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.landmark.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.landmark.label!\"\n          [placeholder]=\"formConfig.landmark.placeholder ?? ''\"\n          [minLength]=\"formConfig.landmark.minLength\"\n          [maxLength]=\"formConfig.landmark.maxLength\"\n          [isRequired]=\"formConfig.landmark.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.colony.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.colony.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.colony.label!\"\n          [placeholder]=\"formConfig.colony.placeholder ?? ''\"\n          [minLength]=\"formConfig.colony.minLength\"\n          [maxLength]=\"formConfig.colony.maxLength\"\n          [isRequired]=\"formConfig.colony.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.area.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.area.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.area.label!\"\n          [placeholder]=\"formConfig.area.placeholder ?? ''\"\n          [minLength]=\"formConfig.area.minLength\"\n          [maxLength]=\"formConfig.area.maxLength\"\n          [isRequired]=\"formConfig.area.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.city.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.city.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.city.label!\"\n          [placeholder]=\"formConfig.city.placeholder ?? ''\"\n          [minLength]=\"formConfig.city.minLength\"\n          [maxLength]=\"formConfig.city.maxLength\"\n          [isRequired]=\"formConfig.city.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.district.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.district.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.district.label!\"\n          [placeholder]=\"formConfig.district.placeholder ?? ''\"\n          [minLength]=\"formConfig.district.minLength\"\n          [maxLength]=\"formConfig.district.maxLength\"\n          [isRequired]=\"formConfig.district.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.stateProvince.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.stateProvince.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.stateProvince.label!\"\n          [placeholder]=\"formConfig.stateProvince.placeholder ?? ''\"\n          [minLength]=\"formConfig.stateProvince.minLength\"\n          [maxLength]=\"formConfig.stateProvince.maxLength\"\n          [isRequired]=\"formConfig.stateProvince.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.country.isHide) {\n      <div class=\"form-group\">\n        <ui-dropdown\n          [id]=\"formConfig.country.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.country.label!\"\n          [placeholder]=\"formConfig.country.placeholder ?? ''\"\n          [isRequired]=\"formConfig.country.isRequired!\"\n          [options]=\"countryOptions$ | async\"\n        ></ui-dropdown>\n      </div>\n    }\n\n    @if (!formConfig.pincode.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.pincode.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.pincode.label!\"\n          [placeholder]=\"formConfig.pincode.placeholder ?? ''\"\n          [minLength]=\"formConfig.pincode.minLength\"\n          [maxLength]=\"formConfig.pincode.maxLength\"\n          [isRequired]=\"formConfig.pincode.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.checkToggle.isHide) {\n      <div class=\"form-group flex items-end pb-2\">\n        <ui-checkbox\n          [id]=\"formConfig.checkToggle.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.checkToggle.label!\"\n        ></ui-checkbox>\n      </div>\n    }\n\n  </div>\n\n  <!-- Emergency Contact -->\n  <p class=\"text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide\">Emergency Contact</p>\n  <div class=\"grid grid-cols-3 gap-[10px]\">\n\n    @if (!formConfig.contactName.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.contactName.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.contactName.label!\"\n          [placeholder]=\"formConfig.contactName.placeholder ?? ''\"\n          [minLength]=\"formConfig.contactName.minLength\"\n          [maxLength]=\"formConfig.contactName.maxLength\"\n          [isRequired]=\"formConfig.contactName.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.relation.isHide) {\n      <div class=\"form-group\">\n        <ui-dropdown\n          [id]=\"formConfig.relation.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.relation.label!\"\n          [placeholder]=\"formConfig.relation.placeholder ?? ''\"\n          [isRequired]=\"formConfig.relation.isRequired!\"\n          [options]=\"relationOptions$ | async\"\n        ></ui-dropdown>\n      </div>\n    }\n\n    @if (!formConfig.contactNumber.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.contactNumber.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.contactNumber.label!\"\n          [placeholder]=\"formConfig.contactNumber.placeholder ?? ''\"\n          [minLength]=\"formConfig.contactNumber.minLength\"\n          [maxLength]=\"formConfig.contactNumber.maxLength\"\n          [isRequired]=\"formConfig.contactNumber.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.emergencyAlternateNumber.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.emergencyAlternateNumber.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.emergencyAlternateNumber.label!\"\n          [placeholder]=\"formConfig.emergencyAlternateNumber.placeholder ?? ''\"\n          [minLength]=\"formConfig.emergencyAlternateNumber.minLength\"\n          [maxLength]=\"formConfig.emergencyAlternateNumber.maxLength\"\n          [isRequired]=\"formConfig.emergencyAlternateNumber.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.emergencyEmail.isHide) {\n      <div class=\"form-group\">\n        <ui-text-box\n          [id]=\"formConfig.emergencyEmail.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.emergencyEmail.label!\"\n          [placeholder]=\"formConfig.emergencyEmail.placeholder ?? ''\"\n          [minLength]=\"formConfig.emergencyEmail.minLength\"\n          [maxLength]=\"formConfig.emergencyEmail.maxLength\"\n          [isRequired]=\"formConfig.emergencyEmail.isRequired!\"\n        ></ui-text-box>\n      </div>\n    }\n\n    @if (!formConfig.primaryEmergencyContact.isHide) {\n      <div class=\"form-group flex items-end pb-2\">\n        <ui-checkbox\n          [id]=\"formConfig.primaryEmergencyContact.id\"\n          [parentFormGroup]=\"contactInfo\"\n          [label]=\"formConfig.primaryEmergencyContact.label!\"\n        ></ui-checkbox>\n      </div>\n    }\n\n  </div>\n\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ContactInfoComponent, { className: "ContactInfoComponent", filePath: "libs/modules/employees/src/lib/components/contact-info/contact-info.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=contact-info.component.js.map