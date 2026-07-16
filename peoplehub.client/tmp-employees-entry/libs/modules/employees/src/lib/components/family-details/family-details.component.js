import { ChangeDetectionStrategy, Component, computed, inject, signal, } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, CheckboxComponent, DropdownComponent, TextAreaComponent, TextBoxComponent, TextButtonComponent, } from 'ui';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { familyMemberForm, dependentForm, } from '../../config/form-configs/family-details.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const index_r3 = i0.ɵɵnextContext().index; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.removeFamilyMember(index_r3)); });
    i0.ɵɵtext(1, " Remove ");
    i0.ɵɵelementEnd();
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-text-box", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberName.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberName.label)("placeholder", ctx_r3.familyMemberConfig.memberName.placeholder ?? "")("minLength", ctx_r3.familyMemberConfig.memberName.minLength)("maxLength", ctx_r3.familyMemberConfig.memberName.maxLength)("isRequired", ctx_r3.familyMemberConfig.memberName.isRequired);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-dropdown", 19);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberRelationship.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberRelationship.label)("placeholder", ctx_r3.familyMemberConfig.memberRelationship.placeholder ?? "")("isRequired", ctx_r3.familyMemberConfig.memberRelationship.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r3.relationOptions$));
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-dropdown", 19);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberGender.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberGender.label)("placeholder", ctx_r3.familyMemberConfig.memberGender.placeholder ?? "")("isRequired", ctx_r3.familyMemberConfig.memberGender.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r3.genderOptions$));
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-calendar", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberDateOfBirth.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberDateOfBirth.label)("isRequired", ctx_r3.familyMemberConfig.memberDateOfBirth.isRequired);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-dropdown", 19);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberMaritalStatus.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberMaritalStatus.label)("placeholder", ctx_r3.familyMemberConfig.memberMaritalStatus.placeholder ?? "")("isRequired", ctx_r3.familyMemberConfig.memberMaritalStatus.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r3.maritalStatusOptions$));
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-text-box", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberOccupation.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberOccupation.label)("placeholder", ctx_r3.familyMemberConfig.memberOccupation.placeholder ?? "")("minLength", ctx_r3.familyMemberConfig.memberOccupation.minLength)("maxLength", ctx_r3.familyMemberConfig.memberOccupation.maxLength)("isRequired", ctx_r3.familyMemberConfig.memberOccupation.isRequired);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-text-box", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberContactNumber.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberContactNumber.label)("placeholder", ctx_r3.familyMemberConfig.memberContactNumber.placeholder ?? "")("minLength", ctx_r3.familyMemberConfig.memberContactNumber.minLength)("maxLength", ctx_r3.familyMemberConfig.memberContactNumber.maxLength)("isRequired", ctx_r3.familyMemberConfig.memberContactNumber.isRequired);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "ui-checkbox", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.livesWithEmployee.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.livesWithEmployee.label);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "ui-text-area", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const entry_r6 = ctx_r4.$implicit;
    const index_r3 = ctx_r4.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.familyMemberConfig.memberNotes.id + "-" + (index_r3 + 1))("parentFormGroup", entry_r6)("label", ctx_r3.familyMemberConfig.memberNotes.label)("placeholder", ctx_r3.familyMemberConfig.memberNotes.placeholder ?? "")("maxLength", ctx_r3.familyMemberConfig.memberNotes.maxLength)("isRequired", ctx_r3.familyMemberConfig.memberNotes.isRequired);
} }
function FamilyDetailsComponent_Conditional_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 8)(2, "div", 9)(3, "div")(4, "p", 10);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 6);
    i0.ɵɵtext(7, " Enter one household member per card. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(8, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_8_Template, 2, 0, "button", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "form", 12)(10, "div", 13);
    i0.ɵɵconditionalCreate(11, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_11_Template, 2, 7, "div", 14);
    i0.ɵɵconditionalCreate(12, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_12_Template, 3, 8, "div", 14);
    i0.ɵɵconditionalCreate(13, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_13_Template, 3, 8, "div", 14);
    i0.ɵɵconditionalCreate(14, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_14_Template, 2, 4, "div", 14);
    i0.ɵɵconditionalCreate(15, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_15_Template, 3, 8, "div", 14);
    i0.ɵɵconditionalCreate(16, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_16_Template, 2, 7, "div", 14);
    i0.ɵɵconditionalCreate(17, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_17_Template, 2, 7, "div", 14);
    i0.ɵɵconditionalCreate(18, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_18_Template, 2, 3, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, FamilyDetailsComponent_Conditional_6_ng_container_1_Conditional_19_Template, 2, 6, "div", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const index_r3 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Family Member ", index_r3 + 1, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r3.familyMember.length > 1 ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", entry_r6);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberName.isHide ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberRelationship.isHide ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberGender.isHide ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberDateOfBirth.isHide ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberMaritalStatus.isHide ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberOccupation.isHide ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberContactNumber.isHide ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.livesWithEmployee.isHide ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.familyMemberConfig.memberNotes.isHide ? 19 : -1);
} }
function FamilyDetailsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, FamilyDetailsComponent_Conditional_6_ng_container_1_Template, 20, 12, "ng-container", 4);
    i0.ɵɵelementStart(2, "div", 5)(3, "p", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "ui-text-button", 7);
    i0.ɵɵlistener("buttonClick", function FamilyDetailsComponent_Conditional_6_Template_ui_text_button_buttonClick_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addFamilyMember()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.familyMember.controls)("ngForTrackBy", ctx_r3.trackByIndex);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r3.familyMember.length, " / ", ctx_r3.familyRepeatTimes, " family members ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r3.canAddFamilyMember());
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const index_r9 = i0.ɵɵnextContext().index; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.removeDependent(index_r9)); });
    i0.ɵɵtext(1, " Remove ");
    i0.ɵɵelementEnd();
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-text-box", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependentName.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependentName.label)("placeholder", ctx_r3.dependentConfig.dependentName.placeholder ?? "")("minLength", ctx_r3.dependentConfig.dependentName.minLength)("maxLength", ctx_r3.dependentConfig.dependentName.maxLength)("isRequired", ctx_r3.dependentConfig.dependentName.isRequired);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-dropdown", 19);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependentRelationship.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependentRelationship.label)("placeholder", ctx_r3.dependentConfig.dependentRelationship.placeholder ?? "")("isRequired", ctx_r3.dependentConfig.dependentRelationship.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r3.relationOptions$));
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-calendar", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependentDateOfBirth.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependentDateOfBirth.label)("isRequired", ctx_r3.dependentConfig.dependentDateOfBirth.isRequired);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-dropdown", 19);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependentGender.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependentGender.label)("placeholder", ctx_r3.dependentConfig.dependentGender.placeholder ?? "")("isRequired", ctx_r3.dependentConfig.dependentGender.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r3.genderOptions$));
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "ui-calendar", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependencyStartDate.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependencyStartDate.label)("isRequired", ctx_r3.dependentConfig.dependencyStartDate.isRequired);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-checkbox", 21);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.financiallyDependent.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.financiallyDependent.label);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-checkbox", 21);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.studentStatus.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.studentStatus.label);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-checkbox", 21);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.disabilityStatus.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.disabilityStatus.label);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-checkbox", 21);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.eligibleForBenefits.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.eligibleForBenefits.label);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "ui-text-area", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const entry_r11 = ctx_r9.$implicit;
    const index_r9 = ctx_r9.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r3.dependentConfig.dependentRemarks.id + "-" + (index_r9 + 1))("parentFormGroup", entry_r11)("label", ctx_r3.dependentConfig.dependentRemarks.label)("placeholder", ctx_r3.dependentConfig.dependentRemarks.placeholder ?? "")("maxLength", ctx_r3.dependentConfig.dependentRemarks.maxLength)("isRequired", ctx_r3.dependentConfig.dependentRemarks.isRequired);
} }
function FamilyDetailsComponent_Conditional_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 24)(2, "div", 9)(3, "div")(4, "p", 10);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 6);
    i0.ɵɵtext(7, " Enter one dependent per card. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(8, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_8_Template, 2, 0, "button", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "form", 12)(10, "div", 13);
    i0.ɵɵconditionalCreate(11, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_11_Template, 2, 7, "div", 14);
    i0.ɵɵconditionalCreate(12, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_12_Template, 3, 8, "div", 14);
    i0.ɵɵconditionalCreate(13, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_13_Template, 2, 4, "div", 14);
    i0.ɵɵconditionalCreate(14, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_14_Template, 3, 8, "div", 14);
    i0.ɵɵconditionalCreate(15, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_15_Template, 2, 4, "div", 14);
    i0.ɵɵelementStart(16, "div", 25);
    i0.ɵɵconditionalCreate(17, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_17_Template, 1, 3, "ui-checkbox", 21);
    i0.ɵɵconditionalCreate(18, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_18_Template, 1, 3, "ui-checkbox", 21);
    i0.ɵɵconditionalCreate(19, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_19_Template, 1, 3, "ui-checkbox", 21);
    i0.ɵɵconditionalCreate(20, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_20_Template, 1, 3, "ui-checkbox", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(21, FamilyDetailsComponent_Conditional_7_ng_container_1_Conditional_21_Template, 2, 6, "div", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const entry_r11 = ctx.$implicit;
    const index_r9 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Dependent ", index_r9 + 1, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r3.dependent.length > 1 ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", entry_r11);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependentName.isHide ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependentRelationship.isHide ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependentDateOfBirth.isHide ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependentGender.isHide ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependencyStartDate.isHide ? 15 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r3.dependentConfig.financiallyDependent.isHide ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.studentStatus.isHide ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.disabilityStatus.isHide ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.eligibleForBenefits.isHide ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r3.dependentConfig.dependentRemarks.isHide ? 21 : -1);
} }
function FamilyDetailsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, FamilyDetailsComponent_Conditional_7_ng_container_1_Template, 22, 13, "ng-container", 4);
    i0.ɵɵelementStart(2, "div", 5)(3, "p", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "ui-text-button", 23);
    i0.ɵɵlistener("buttonClick", function FamilyDetailsComponent_Conditional_7_Template_ui_text_button_buttonClick_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addDependent()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.dependent.controls)("ngForTrackBy", ctx_r3.trackByIndex);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r3.dependent.length, " / ", ctx_r3.dependentRepeatTimes, " dependents ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r3.canAddDependent());
} }
export class FamilyDetailsComponent {
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    familyMemberSequence = 0;
    dependentSequence = 0;
    familyRepeatTimes = 1;
    dependentRepeatTimes = 1;
    familyMemberConfig = familyMemberForm;
    dependentConfig = dependentForm;
    familyMember;
    dependent;
    activeTab = signal('family', ...(ngDevMode ? [{ debugName: "activeTab" }] : /* istanbul ignore next */ []));
    isFamilyTab = computed(() => this.activeTab() === 'family', ...(ngDevMode ? [{ debugName: "isFamilyTab" }] : /* istanbul ignore next */ []));
    relationOptions$;
    genderOptions$;
    maritalStatusOptions$;
    trackByIndex(index) {
        return index;
    }
    getActiveFormGroup() {
        return this.isFamilyTab() ? this.familyMember : this.dependent;
    }
    getValidationConfig() {
        const isFamily = this.isFamilyTab();
        const totalRows = isFamily
            ? this.familyMember.length
            : this.dependent.length;
        const labelPrefix = isFamily ? 'Family Member' : 'Dependent';
        return Array.from({ length: totalRows }).reduce((config, _, index) => {
            config[index] = {
                isHide: false,
                isRequired: true,
                label: `${labelPrefix} ${index + 1}`,
            };
            return config;
        }, {});
    }
    ngOnInit() {
        this.relationOptions$ = this.dropdownService.getOptions('relation');
        this.genderOptions$ = this.dropdownService.getOptions('gender');
        this.maritalStatusOptions$ =
            this.dropdownService.getOptions('maritalStatus');
        this.familyMember = this.buildRepeatableFormArray(this.familyMemberConfig, this.dataService.getDataByRoute('family-member'), this.familyRepeatTimes);
        this.dependent = this.buildRepeatableFormArray(this.dependentConfig, this.dataService.getDataByRoute('dependent'), this.dependentRepeatTimes);
        this.familyMember.statusChanges.subscribe((status) => {
            if (this.isFamilyTab()) {
                this.stepperService.setStepValidity(status === 'VALID' && this.dependent.valid);
            }
        });
        this.dependent.statusChanges.subscribe((status) => {
            if (!this.isFamilyTab()) {
                this.stepperService.setStepValidity(status === 'VALID' && this.familyMember.valid);
            }
        });
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    switchTab(tab) {
        this.persistActiveTabData();
        this.activeTab.set(tab);
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    addFamilyMember() {
        if (!this.canAddFamilyMember()) {
            return;
        }
        this.familyMember.push(this.createRepeatableForm(this.familyMemberConfig));
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    removeFamilyMember(index) {
        if (this.familyMember.length <= 1 ||
            index < 0 ||
            index >= this.familyMember.length) {
            return;
        }
        this.familyMember.removeAt(index);
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    canAddFamilyMember() {
        return this.familyMember.length < Math.max(1, this.familyRepeatTimes);
    }
    addDependent() {
        if (!this.canAddDependent()) {
            return;
        }
        this.dependent.push(this.createRepeatableForm(this.dependentConfig));
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    removeDependent(index) {
        if (this.dependent.length <= 1 ||
            index < 0 ||
            index >= this.dependent.length) {
            return;
        }
        this.dependent.removeAt(index);
        this.stepperService.setStepValidity(this.familyMember.valid && this.dependent.valid);
    }
    canAddDependent() {
        return this.dependent.length < Math.max(1, this.dependentRepeatTimes);
    }
    persistActiveTabData() {
        if (this.isFamilyTab()) {
            this.dataService.setDataByRoute('family-member', this.familyMember.value);
            return;
        }
        this.dataService.setDataByRoute('dependent', this.dependent.value);
    }
    buildRepeatableFormArray(config, savedData, repeatTimes) {
        const normalizedSavedData = this.normalizeSavedData(savedData);
        const initialCount = Math.min(Math.max(1, normalizedSavedData.length || 1), Math.max(1, repeatTimes));
        const formArray = new FormArray([]);
        for (let index = 0; index < initialCount; index++) {
            formArray.push(this.createRepeatableForm(config, normalizedSavedData[index]));
        }
        if (config === this.familyMemberConfig) {
            this.familyMemberSequence = initialCount;
        }
        else {
            this.dependentSequence = initialCount;
        }
        return formArray;
    }
    createRepeatableForm(config, savedValue) {
        const controls = {};
        Object.values(config).forEach((field) => {
            const validators = [];
            if (field.isRequired) {
                validators.push(Validators.required);
            }
            if (field.minLength && field.minLength > 0) {
                validators.push(Validators.minLength(field.minLength));
            }
            if (field.maxLength && field.maxLength > 0) {
                validators.push(Validators.maxLength(field.maxLength));
            }
            controls[field.id] = new FormControl(field.defaultValue ?? null, validators);
        });
        const formGroup = new FormGroup(controls);
        if (savedValue) {
            formGroup.patchValue(savedValue);
        }
        return formGroup;
    }
    normalizeSavedData(savedData) {
        if (!savedData) {
            return [];
        }
        if (Array.isArray(savedData)) {
            return savedData.filter((item) => !!item);
        }
        if (typeof savedData === 'object') {
            return [savedData];
        }
        return [];
    }
    static ɵfac = function FamilyDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FamilyDetailsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FamilyDetailsComponent, selectors: [["employees-family-details"]], decls: 8, vars: 18, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "flex", "gap-2", "border-b", "border-gray-200", "mb-6"], ["type", "button", 1, "px-5", "py-2", "text-sm", "font-medium", "rounded-t-lg", "transition-colors", "duration-150", 3, "click"], [1, "space-y-4"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "items-center", "justify-between", "pt-1"], [1, "text-xs", "text-slate-500"], ["text", "Add Family Member", "variant", "secondary", 3, "buttonClick", "disabled"], [1, "rounded-2xl", "border", "border-blue-100", "bg-blue-50/40", "p-4", "shadow-sm"], [1, "mb-4", "flex", "items-center", "justify-between", "gap-4"], [1, "text-sm", "font-semibold", "text-slate-700"], ["type", "button", 1, "text-sm", "font-medium", "text-red-600", "transition-colors", "duration-150", "hover:text-red-700"], [3, "formGroup"], [1, "grid", "grid-cols-3", "gap-[10px]"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [1, "mt-4"], ["type", "button", 1, "text-sm", "font-medium", "text-red-600", "transition-colors", "duration-150", "hover:text-red-700", 3, "click"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "isRequired"], [3, "id", "parentFormGroup", "label"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"], ["text", "Add Dependent", "variant", "secondary", 3, "buttonClick", "disabled"], [1, "rounded-2xl", "border", "border-blue-100", "bg-white", "p-4", "shadow-sm"], [1, "form-group", "flex", "flex-col", "gap-2", "pt-2"]], template: function FamilyDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function FamilyDetailsComponent_Template_button_click_2_listener() { return ctx.switchTab("family"); });
            i0.ɵɵtext(3, " Family Members ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 2);
            i0.ɵɵlistener("click", function FamilyDetailsComponent_Template_button_click_4_listener() { return ctx.switchTab("dependent"); });
            i0.ɵɵtext(5, " Dependents ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, FamilyDetailsComponent_Conditional_6_Template, 6, 5, "div", 3);
            i0.ɵɵconditionalCreate(7, FamilyDetailsComponent_Conditional_7_Template, 6, 5, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("text-blue-600", ctx.isFamilyTab())("border-b-2", ctx.isFamilyTab())("border-blue-600", ctx.isFamilyTab())("text-gray-500", !ctx.isFamilyTab());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("text-blue-600", !ctx.isFamilyTab())("border-b-2", !ctx.isFamilyTab())("border-blue-600", !ctx.isFamilyTab())("text-gray-500", ctx.isFamilyTab());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isFamilyTab() ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isFamilyTab() ? 7 : -1);
        } }, dependencies: [CommonModule, i1.NgForOf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgControlStatusGroup, i2.FormGroupDirective, TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            CalendarComponent,
            CheckboxComponent,
            TextButtonComponent, i1.AsyncPipe], styles: ["// Family Details component styles"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FamilyDetailsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-family-details', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    CalendarComponent,
                    CheckboxComponent,
                    TextButtonComponent,
                ], template: "<div\r\n  class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\"\r\n>\r\n  <!-- Tab Header -->\r\n  <div class=\"flex gap-2 border-b border-gray-200 mb-6\">\r\n    <button\r\n      type=\"button\"\r\n      class=\"px-5 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150\"\r\n      [class.text-blue-600]=\"isFamilyTab()\"\r\n      [class.border-b-2]=\"isFamilyTab()\"\r\n      [class.border-blue-600]=\"isFamilyTab()\"\r\n      [class.text-gray-500]=\"!isFamilyTab()\"\r\n      (click)=\"switchTab('family')\"\r\n    >\r\n      Family Members\r\n    </button>\r\n    <button\r\n      type=\"button\"\r\n      class=\"px-5 py-2 text-sm font-medium rounded-t-lg transition-colors duration-150\"\r\n      [class.text-blue-600]=\"!isFamilyTab()\"\r\n      [class.border-b-2]=\"!isFamilyTab()\"\r\n      [class.border-blue-600]=\"!isFamilyTab()\"\r\n      [class.text-gray-500]=\"isFamilyTab()\"\r\n      (click)=\"switchTab('dependent')\"\r\n    >\r\n      Dependents\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Tab A: Family Members -->\r\n  @if (isFamilyTab()) {\r\n    <div class=\"space-y-4\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let entry of familyMember.controls;\r\n          let index = index;\r\n          trackBy: trackByIndex\r\n        \"\r\n      >\r\n        <section\r\n          class=\"rounded-2xl border border-blue-100 bg-blue-50/40 p-4 shadow-sm\"\r\n        >\r\n          <div class=\"mb-4 flex items-center justify-between gap-4\">\r\n            <div>\r\n              <p class=\"text-sm font-semibold text-slate-700\">\r\n                Family Member {{ index + 1 }}\r\n              </p>\r\n              <p class=\"text-xs text-slate-500\">\r\n                Enter one household member per card.\r\n              </p>\r\n            </div>\r\n\r\n            @if (familyMember.length > 1) {\r\n              <button\r\n                type=\"button\"\r\n                class=\"text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-700\"\r\n                (click)=\"removeFamilyMember(index)\"\r\n              >\r\n                Remove\r\n              </button>\r\n            }\r\n          </div>\r\n\r\n          <form [formGroup]=\"entry\">\r\n            <div class=\"grid grid-cols-3 gap-[10px]\">\r\n              @if (!familyMemberConfig.memberName.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-text-box\r\n                    [id]=\"familyMemberConfig.memberName.id + '-' + (index + 1)\"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberName.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberName.placeholder ?? ''\r\n                    \"\r\n                    [minLength]=\"familyMemberConfig.memberName.minLength\"\r\n                    [maxLength]=\"familyMemberConfig.memberName.maxLength\"\r\n                    [isRequired]=\"familyMemberConfig.memberName.isRequired!\"\r\n                  ></ui-text-box>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberRelationship.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-dropdown\r\n                    [id]=\"\r\n                      familyMemberConfig.memberRelationship.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberRelationship.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberRelationship.placeholder ?? ''\r\n                    \"\r\n                    [isRequired]=\"\r\n                      familyMemberConfig.memberRelationship.isRequired!\r\n                    \"\r\n                    [options]=\"relationOptions$ | async\"\r\n                  ></ui-dropdown>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberGender.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-dropdown\r\n                    [id]=\"\r\n                      familyMemberConfig.memberGender.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberGender.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberGender.placeholder ?? ''\r\n                    \"\r\n                    [isRequired]=\"familyMemberConfig.memberGender.isRequired!\"\r\n                    [options]=\"genderOptions$ | async\"\r\n                  ></ui-dropdown>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberDateOfBirth.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-calendar\r\n                    [id]=\"\r\n                      familyMemberConfig.memberDateOfBirth.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberDateOfBirth.label!\"\r\n                    [isRequired]=\"\r\n                      familyMemberConfig.memberDateOfBirth.isRequired!\r\n                    \"\r\n                  ></ui-calendar>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberMaritalStatus.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-dropdown\r\n                    [id]=\"\r\n                      familyMemberConfig.memberMaritalStatus.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberMaritalStatus.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberMaritalStatus.placeholder ?? ''\r\n                    \"\r\n                    [isRequired]=\"\r\n                      familyMemberConfig.memberMaritalStatus.isRequired!\r\n                    \"\r\n                    [options]=\"maritalStatusOptions$ | async\"\r\n                  ></ui-dropdown>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberOccupation.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-text-box\r\n                    [id]=\"\r\n                      familyMemberConfig.memberOccupation.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberOccupation.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberOccupation.placeholder ?? ''\r\n                    \"\r\n                    [minLength]=\"familyMemberConfig.memberOccupation.minLength\"\r\n                    [maxLength]=\"familyMemberConfig.memberOccupation.maxLength\"\r\n                    [isRequired]=\"\r\n                      familyMemberConfig.memberOccupation.isRequired!\r\n                    \"\r\n                  ></ui-text-box>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.memberContactNumber.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-text-box\r\n                    [id]=\"\r\n                      familyMemberConfig.memberContactNumber.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.memberContactNumber.label!\"\r\n                    [placeholder]=\"\r\n                      familyMemberConfig.memberContactNumber.placeholder ?? ''\r\n                    \"\r\n                    [minLength]=\"\r\n                      familyMemberConfig.memberContactNumber.minLength\r\n                    \"\r\n                    [maxLength]=\"\r\n                      familyMemberConfig.memberContactNumber.maxLength\r\n                    \"\r\n                    [isRequired]=\"\r\n                      familyMemberConfig.memberContactNumber.isRequired!\r\n                    \"\r\n                  ></ui-text-box>\r\n                </div>\r\n              }\r\n\r\n              @if (!familyMemberConfig.livesWithEmployee.isHide) {\r\n                <div class=\"form-group flex items-end pb-2\">\r\n                  <ui-checkbox\r\n                    [id]=\"\r\n                      familyMemberConfig.livesWithEmployee.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"familyMemberConfig.livesWithEmployee.label!\"\r\n                  ></ui-checkbox>\r\n                </div>\r\n              }\r\n            </div>\r\n\r\n            @if (!familyMemberConfig.memberNotes.isHide) {\r\n              <div class=\"mt-4\">\r\n                <ui-text-area\r\n                  [id]=\"familyMemberConfig.memberNotes.id + '-' + (index + 1)\"\r\n                  [parentFormGroup]=\"entry\"\r\n                  [label]=\"familyMemberConfig.memberNotes.label!\"\r\n                  [placeholder]=\"\r\n                    familyMemberConfig.memberNotes.placeholder ?? ''\r\n                  \"\r\n                  [maxLength]=\"familyMemberConfig.memberNotes.maxLength\"\r\n                  [isRequired]=\"familyMemberConfig.memberNotes.isRequired!\"\r\n                ></ui-text-area>\r\n              </div>\r\n            }\r\n          </form>\r\n        </section>\r\n      </ng-container>\r\n\r\n      <div class=\"flex items-center justify-between pt-1\">\r\n        <p class=\"text-xs text-slate-500\">\r\n          {{ familyMember.length }} / {{ familyRepeatTimes }} family members\r\n        </p>\r\n        <ui-text-button\r\n          text=\"Add Family Member\"\r\n          variant=\"secondary\"\r\n          [disabled]=\"!canAddFamilyMember()\"\r\n          (buttonClick)=\"addFamilyMember()\"\r\n        ></ui-text-button>\r\n      </div>\r\n    </div>\r\n  }\r\n\r\n  <!-- Tab B: Dependents -->\r\n  @if (!isFamilyTab()) {\r\n    <div class=\"space-y-4\">\r\n      <ng-container\r\n        *ngFor=\"\r\n          let entry of dependent.controls;\r\n          let index = index;\r\n          trackBy: trackByIndex\r\n        \"\r\n      >\r\n        <section\r\n          class=\"rounded-2xl border border-blue-100 bg-white p-4 shadow-sm\"\r\n        >\r\n          <div class=\"mb-4 flex items-center justify-between gap-4\">\r\n            <div>\r\n              <p class=\"text-sm font-semibold text-slate-700\">\r\n                Dependent {{ index + 1 }}\r\n              </p>\r\n              <p class=\"text-xs text-slate-500\">\r\n                Enter one dependent per card.\r\n              </p>\r\n            </div>\r\n\r\n            @if (dependent.length > 1) {\r\n              <button\r\n                type=\"button\"\r\n                class=\"text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-700\"\r\n                (click)=\"removeDependent(index)\"\r\n              >\r\n                Remove\r\n              </button>\r\n            }\r\n          </div>\r\n\r\n          <form [formGroup]=\"entry\">\r\n            <div class=\"grid grid-cols-3 gap-[10px]\">\r\n              @if (!dependentConfig.dependentName.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-text-box\r\n                    [id]=\"dependentConfig.dependentName.id + '-' + (index + 1)\"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.dependentName.label!\"\r\n                    [placeholder]=\"\r\n                      dependentConfig.dependentName.placeholder ?? ''\r\n                    \"\r\n                    [minLength]=\"dependentConfig.dependentName.minLength\"\r\n                    [maxLength]=\"dependentConfig.dependentName.maxLength\"\r\n                    [isRequired]=\"dependentConfig.dependentName.isRequired!\"\r\n                  ></ui-text-box>\r\n                </div>\r\n              }\r\n\r\n              @if (!dependentConfig.dependentRelationship.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-dropdown\r\n                    [id]=\"\r\n                      dependentConfig.dependentRelationship.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.dependentRelationship.label!\"\r\n                    [placeholder]=\"\r\n                      dependentConfig.dependentRelationship.placeholder ?? ''\r\n                    \"\r\n                    [isRequired]=\"\r\n                      dependentConfig.dependentRelationship.isRequired!\r\n                    \"\r\n                    [options]=\"relationOptions$ | async\"\r\n                  ></ui-dropdown>\r\n                </div>\r\n              }\r\n\r\n              @if (!dependentConfig.dependentDateOfBirth.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-calendar\r\n                    [id]=\"\r\n                      dependentConfig.dependentDateOfBirth.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.dependentDateOfBirth.label!\"\r\n                    [isRequired]=\"\r\n                      dependentConfig.dependentDateOfBirth.isRequired!\r\n                    \"\r\n                  ></ui-calendar>\r\n                </div>\r\n              }\r\n\r\n              @if (!dependentConfig.dependentGender.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-dropdown\r\n                    [id]=\"\r\n                      dependentConfig.dependentGender.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.dependentGender.label!\"\r\n                    [placeholder]=\"\r\n                      dependentConfig.dependentGender.placeholder ?? ''\r\n                    \"\r\n                    [isRequired]=\"dependentConfig.dependentGender.isRequired!\"\r\n                    [options]=\"genderOptions$ | async\"\r\n                  ></ui-dropdown>\r\n                </div>\r\n              }\r\n\r\n              @if (!dependentConfig.dependencyStartDate.isHide) {\r\n                <div class=\"form-group\">\r\n                  <ui-calendar\r\n                    [id]=\"\r\n                      dependentConfig.dependencyStartDate.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.dependencyStartDate.label!\"\r\n                    [isRequired]=\"\r\n                      dependentConfig.dependencyStartDate.isRequired!\r\n                    \"\r\n                  ></ui-calendar>\r\n                </div>\r\n              }\r\n\r\n              <div class=\"form-group flex flex-col gap-2 pt-2\">\r\n                @if (!dependentConfig.financiallyDependent.isHide) {\r\n                  <ui-checkbox\r\n                    [id]=\"\r\n                      dependentConfig.financiallyDependent.id +\r\n                      '-' +\r\n                      (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.financiallyDependent.label!\"\r\n                  ></ui-checkbox>\r\n                }\r\n                @if (!dependentConfig.studentStatus.isHide) {\r\n                  <ui-checkbox\r\n                    [id]=\"dependentConfig.studentStatus.id + '-' + (index + 1)\"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.studentStatus.label!\"\r\n                  ></ui-checkbox>\r\n                }\r\n                @if (!dependentConfig.disabilityStatus.isHide) {\r\n                  <ui-checkbox\r\n                    [id]=\"\r\n                      dependentConfig.disabilityStatus.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.disabilityStatus.label!\"\r\n                  ></ui-checkbox>\r\n                }\r\n                @if (!dependentConfig.eligibleForBenefits.isHide) {\r\n                  <ui-checkbox\r\n                    [id]=\"\r\n                      dependentConfig.eligibleForBenefits.id + '-' + (index + 1)\r\n                    \"\r\n                    [parentFormGroup]=\"entry\"\r\n                    [label]=\"dependentConfig.eligibleForBenefits.label!\"\r\n                  ></ui-checkbox>\r\n                }\r\n              </div>\r\n            </div>\r\n\r\n            @if (!dependentConfig.dependentRemarks.isHide) {\r\n              <div class=\"mt-4\">\r\n                <ui-text-area\r\n                  [id]=\"dependentConfig.dependentRemarks.id + '-' + (index + 1)\"\r\n                  [parentFormGroup]=\"entry\"\r\n                  [label]=\"dependentConfig.dependentRemarks.label!\"\r\n                  [placeholder]=\"\r\n                    dependentConfig.dependentRemarks.placeholder ?? ''\r\n                  \"\r\n                  [maxLength]=\"dependentConfig.dependentRemarks.maxLength\"\r\n                  [isRequired]=\"dependentConfig.dependentRemarks.isRequired!\"\r\n                ></ui-text-area>\r\n              </div>\r\n            }\r\n          </form>\r\n        </section>\r\n      </ng-container>\r\n\r\n      <div class=\"flex items-center justify-between pt-1\">\r\n        <p class=\"text-xs text-slate-500\">\r\n          {{ dependent.length }} / {{ dependentRepeatTimes }} dependents\r\n        </p>\r\n        <ui-text-button\r\n          text=\"Add Dependent\"\r\n          variant=\"secondary\"\r\n          [disabled]=\"!canAddDependent()\"\r\n          (buttonClick)=\"addDependent()\"\r\n        ></ui-text-button>\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: ["// Family Details component styles\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FamilyDetailsComponent, { className: "FamilyDetailsComponent", filePath: "libs/modules/employees/src/lib/components/family-details/family-details.component.ts", lineNumber: 55 }); })();
//# sourceMappingURL=family-details.component.js.map