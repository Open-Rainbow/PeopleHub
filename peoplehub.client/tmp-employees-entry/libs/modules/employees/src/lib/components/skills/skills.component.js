import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, DropdownComponent, NumberBoxComponent, TextAreaComponent, TextBoxComponent, } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { skillsForm } from '../../config/form-configs/skills.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SkillsComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.skillName.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.skillName.label)("placeholder", ctx_r0.formConfig.skillName.placeholder ?? "")("minLength", ctx_r0.formConfig.skillName.minLength)("maxLength", ctx_r0.formConfig.skillName.maxLength)("isRequired", ctx_r0.formConfig.skillName.isRequired);
} }
function SkillsComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.skillCategory.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.skillCategory.label)("placeholder", ctx_r0.formConfig.skillCategory.placeholder ?? "")("isRequired", ctx_r0.formConfig.skillCategory.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.skillCategoryOptions$));
} }
function SkillsComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-dropdown", 6);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.proficiencyLevel.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.proficiencyLevel.label)("placeholder", ctx_r0.formConfig.proficiencyLevel.placeholder ?? "")("isRequired", ctx_r0.formConfig.proficiencyLevel.isRequired)("options", i0.ɵɵpipeBind1(2, 6, ctx_r0.proficiencyOptions$));
} }
function SkillsComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-number-box", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.yearsOfExperience.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.yearsOfExperience.label)("placeholder", ctx_r0.formConfig.yearsOfExperience.placeholder ?? "")("isRequired", ctx_r0.formConfig.yearsOfExperience.isRequired);
} }
function SkillsComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ui-text-box", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.lastUsedYear.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.lastUsedYear.label)("placeholder", ctx_r0.formConfig.lastUsedYear.placeholder ?? "")("minLength", ctx_r0.formConfig.lastUsedYear.minLength)("maxLength", ctx_r0.formConfig.lastUsedYear.maxLength)("isRequired", ctx_r0.formConfig.lastUsedYear.isRequired);
} }
function SkillsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-checkbox", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.primarySkill.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.primarySkill.label);
} }
function SkillsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ui-text-area", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r0.formConfig.remarks.id)("parentFormGroup", ctx_r0.skills)("label", ctx_r0.formConfig.remarks.label)("placeholder", ctx_r0.formConfig.remarks.placeholder ?? "")("maxLength", ctx_r0.formConfig.remarks.maxLength)("isRequired", ctx_r0.formConfig.remarks.isRequired);
} }
export class SkillsComponent {
    commonService = inject(CommonService);
    dropdownService = inject(DropdownConfigService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = skillsForm;
    skills;
    skillCategoryOptions$;
    proficiencyOptions$;
    ngOnInit() {
        this.skillCategoryOptions$ = this.dropdownService.getOptions('skillCategory');
        this.proficiencyOptions$ = this.dropdownService.getOptions('proficiency');
        this.skills = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('skills');
        if (savedData) {
            this.skills.patchValue(savedData);
        }
        this.stepperService.setStepValidity(this.skills.valid);
        this.skills.statusChanges.subscribe((status) => {
            this.stepperService.setStepValidity(status === 'VALID');
        });
    }
    static ɵfac = function SkillsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SkillsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SkillsComponent, selectors: [["employees-skills"]], decls: 9, vars: 7, consts: [[1, "bg-white", "rounded-2xl", "border", "border-blue-100", "shadow-[0_4px_10px_rgba(0,0,0,0.05)]", "transition-shadow", "duration-200", "ease-in", "pt-8", "px-6", "pb-7", "h-full", "hover:shadow-md"], [1, "grid", "grid-cols-3", "gap-[10px]"], [1, "form-group"], [1, "form-group", "flex", "items-end", "pb-2"], [1, "mt-4"], [3, "id", "parentFormGroup", "label", "placeholder", "minLength", "maxLength", "isRequired"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired", "options"], [3, "id", "parentFormGroup", "label", "placeholder", "isRequired"], [3, "id", "parentFormGroup", "label"], [3, "id", "parentFormGroup", "label", "placeholder", "maxLength", "isRequired"]], template: function SkillsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, SkillsComponent_Conditional_2_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(3, SkillsComponent_Conditional_3_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(4, SkillsComponent_Conditional_4_Template, 3, 8, "div", 2);
            i0.ɵɵconditionalCreate(5, SkillsComponent_Conditional_5_Template, 2, 5, "div", 2);
            i0.ɵɵconditionalCreate(6, SkillsComponent_Conditional_6_Template, 2, 7, "div", 2);
            i0.ɵɵconditionalCreate(7, SkillsComponent_Conditional_7_Template, 2, 3, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(8, SkillsComponent_Conditional_8_Template, 2, 6, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.formConfig.skillName.isHide ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.skillCategory.isHide ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.proficiencyLevel.isHide ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.yearsOfExperience.isHide ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.lastUsedYear.isHide ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.primarySkill.isHide ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.remarks.isHide ? 8 : -1);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule,
            TextBoxComponent,
            TextAreaComponent,
            DropdownComponent,
            NumberBoxComponent,
            CheckboxComponent, i1.AsyncPipe], styles: ["// Skills component styles"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SkillsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-skills', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    TextBoxComponent,
                    TextAreaComponent,
                    DropdownComponent,
                    NumberBoxComponent,
                    CheckboxComponent,
                ], template: "<div class=\"bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md\">\r\n  <div class=\"grid grid-cols-3 gap-[10px]\">\r\n\r\n    @if (!formConfig.skillName.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.skillName.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.skillName.label!\"\r\n          [placeholder]=\"formConfig.skillName.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.skillName.minLength\"\r\n          [maxLength]=\"formConfig.skillName.maxLength\"\r\n          [isRequired]=\"formConfig.skillName.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.skillCategory.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.skillCategory.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.skillCategory.label!\"\r\n          [placeholder]=\"formConfig.skillCategory.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.skillCategory.isRequired!\"\r\n          [options]=\"skillCategoryOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.proficiencyLevel.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-dropdown\r\n          [id]=\"formConfig.proficiencyLevel.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.proficiencyLevel.label!\"\r\n          [placeholder]=\"formConfig.proficiencyLevel.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.proficiencyLevel.isRequired!\"\r\n          [options]=\"proficiencyOptions$ | async\"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.yearsOfExperience.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-number-box\r\n          [id]=\"formConfig.yearsOfExperience.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.yearsOfExperience.label!\"\r\n          [placeholder]=\"formConfig.yearsOfExperience.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.yearsOfExperience.isRequired!\"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.lastUsedYear.isHide) {\r\n      <div class=\"form-group\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.lastUsedYear.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.lastUsedYear.label!\"\r\n          [placeholder]=\"formConfig.lastUsedYear.placeholder ?? ''\"\r\n          [minLength]=\"formConfig.lastUsedYear.minLength\"\r\n          [maxLength]=\"formConfig.lastUsedYear.maxLength\"\r\n          [isRequired]=\"formConfig.lastUsedYear.isRequired!\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.primarySkill.isHide) {\r\n      <div class=\"form-group flex items-end pb-2\">\r\n        <ui-checkbox\r\n          [id]=\"formConfig.primarySkill.id\"\r\n          [parentFormGroup]=\"skills\"\r\n          [label]=\"formConfig.primarySkill.label!\"\r\n        ></ui-checkbox>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n\r\n  @if (!formConfig.remarks.isHide) {\r\n    <div class=\"mt-4\">\r\n      <ui-text-area\r\n        [id]=\"formConfig.remarks.id\"\r\n        [parentFormGroup]=\"skills\"\r\n        [label]=\"formConfig.remarks.label!\"\r\n        [placeholder]=\"formConfig.remarks.placeholder ?? ''\"\r\n        [maxLength]=\"formConfig.remarks.maxLength\"\r\n        [isRequired]=\"formConfig.remarks.isRequired!\"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: ["// Skills component styles\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SkillsComponent, { className: "SkillsComponent", filePath: "libs/modules/employees/src/lib/components/skills/skills.component.ts", lineNumber: 38 }); })();
//# sourceMappingURL=skills.component.js.map