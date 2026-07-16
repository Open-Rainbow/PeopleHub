import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent, IconTextButtonComponent, NoticeBannerComponent, PasswordComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { tempLoginForm } from '../../config/form-configs/temp-login.config';
import * as i0 from "@angular/core";
function TempLoginCredentialsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "ui-text-box", 14);
    i0.ɵɵlistener("valueChange", function TempLoginCredentialsComponent_Conditional_9_Template_ui_text_box_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onUserNameInput($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r1.formConfig.temporaryUsername.id)("parentFormGroup", ctx_r1.tempLoginCredentials)("label", ctx_r1.formConfig.temporaryUsername.label)("placeholder", ctx_r1.formConfig.temporaryUsername.placeholder ?? "")("isRequired", ctx_r1.formConfig.temporaryUsername.isRequired)("value", ctx_r1.temporaryUsername());
} }
function TempLoginCredentialsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "ui-password", 15);
    i0.ɵɵlistener("valueChange", function TempLoginCredentialsComponent_Conditional_10_Template_ui_password_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPasswordInput($event)); })("keydown", function TempLoginCredentialsComponent_Conditional_10_Template_ui_password_keydown_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.preventInvalidKeys($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r1.formConfig.temporaryPassword.id)("parentFormGroup", ctx_r1.tempLoginCredentials)("label", ctx_r1.formConfig.temporaryPassword.label)("placeholder", ctx_r1.formConfig.temporaryPassword.placeholder ?? "")("isRequired", ctx_r1.formConfig.temporaryPassword.isRequired)("value", ctx_r1.temporaryPassword());
} }
function TempLoginCredentialsComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-notice-banner", 13);
} if (rf & 2) {
    i0.ɵɵproperty("contentInNextLine", true)("showIcon", false)("showBorder", true);
} }
export class TempLoginCredentialsComponent {
    commonService = inject(CommonService);
    stepperService = inject(StepperService);
    dataService = inject(EmployeeDataService);
    formConfig = tempLoginForm;
    tempLoginCredentials;
    temporaryPassword = signal('', ...(ngDevMode ? [{ debugName: "temporaryPassword" }] : /* istanbul ignore next */ []));
    temporaryUsername = signal('', ...(ngDevMode ? [{ debugName: "temporaryUsername" }] : /* istanbul ignore next */ []));
    hasUppercase = signal(false, ...(ngDevMode ? [{ debugName: "hasUppercase" }] : /* istanbul ignore next */ []));
    hasLowercase = signal(false, ...(ngDevMode ? [{ debugName: "hasLowercase" }] : /* istanbul ignore next */ []));
    hasNumber = signal(false, ...(ngDevMode ? [{ debugName: "hasNumber" }] : /* istanbul ignore next */ []));
    hasSpecialChar = signal(false, ...(ngDevMode ? [{ debugName: "hasSpecialChar" }] : /* istanbul ignore next */ []));
    isLengthValid = signal(false, ...(ngDevMode ? [{ debugName: "isLengthValid" }] : /* istanbul ignore next */ []));
    isAllRulesMet = false;
    ngOnInit() {
        this.tempLoginCredentials = this.commonService.createForm(this.formConfig);
        const savedData = this.dataService.getDataByRoute('temp-login-credentials');
        if (savedData) {
            this.tempLoginCredentials.patchValue(savedData);
        }
        this.tempLoginCredentials.statusChanges.subscribe(status => {
            const isValid = status === 'VALID' && this.isAllRulesMet;
            this.stepperService.setStepValidity(isValid);
        });
    }
    onUserNameInput(value) {
        this.temporaryUsername.set(value);
        this.updateFormValues();
    }
    onPasswordInput(value) {
        this.temporaryPassword.set(value);
        this.checkPasswordRules();
        this.updateFormValues();
    }
    preventInvalidKeys(event) {
        const allowed = /[A-Za-z0-9!@#$%&*]/;
        if (!allowed.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
            event.preventDefault();
        }
    }
    emailSplitting(email) {
        if (!email)
            return;
        const username = email.split('@')[0];
        this.temporaryUsername.set(username);
        this.generate();
    }
    generate() {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%&*';
        const required = upper[Math.floor(Math.random() * upper.length)] +
            lower[Math.floor(Math.random() * lower.length)] +
            numbers[Math.floor(Math.random() * numbers.length)] +
            special[Math.floor(Math.random() * special.length)];
        const allChars = upper + lower + numbers + special;
        let password = required;
        for (let i = required.length; i < 12; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        const shuffled = password.split('').sort(() => Math.random() - 0.5).join('');
        this.temporaryPassword.set(shuffled);
        this.checkPasswordRules();
        this.updateFormValues();
    }
    checkPasswordRules() {
        const pwd = this.temporaryPassword();
        this.isLengthValid.set(pwd.length >= 12);
        this.hasUppercase.set(/[A-Z]/.test(pwd));
        this.hasLowercase.set(/[a-z]/.test(pwd));
        this.hasNumber.set(/\d/.test(pwd));
        this.hasSpecialChar.set(/[!@#$%&*]/.test(pwd));
        this.isAllRulesMet =
            this.isLengthValid() &&
                this.hasUppercase() &&
                this.hasLowercase() &&
                this.hasNumber() &&
                this.hasSpecialChar();
    }
    updateFormValues() {
        this.tempLoginCredentials.patchValue({
            temporaryUsername: this.temporaryUsername(),
            temporaryPassword: this.temporaryPassword(),
        });
    }
    static ɵfac = function TempLoginCredentialsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TempLoginCredentialsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TempLoginCredentialsComponent, selectors: [["employees-temp-login-credentials"]], decls: 34, vars: 23, consts: [[1, "border", "border-blue-300/60", "bg-blue-50", "rounded-lg", "p-6", "w-full", "shadow-sm"], [1, "flex", "items-center", "mb-2"], [1, "text-[20px]", "text-blue-600", "mr-2"], ["name", "lucide:key"], [1, "text-[18px]", "text-slate-800", "m-0"], [1, "text-gray-500", "text-[15px]", "pb-6", "pr-0"], [1, "grid", "grid-cols-[30%_55%_15%]", "gap-2", "items-end"], [1, "pr-2"], [1, "pl-2"], ["text", "Generate", "variant", "primary", 3, "buttonClick"], [1, "mt-1", "mb-2", "text-[13px]", "text-gray-500", "list-disc", "pl-5"], [1, "font-medium", "transition-colors", "duration-200", "ease-in-out"], [1, "font-medium"], ["heading", "Temporary password generated successfully", "headingColor", "green", "contentColor", "green", "highlighterColor", "green", "bannerColor", "green-500", "content", "Make sure to securely share this password with the employee through official channels.", 3, "contentInNextLine", "showIcon", "showBorder"], [3, "valueChange", "id", "parentFormGroup", "label", "placeholder", "isRequired", "value"], [3, "valueChange", "keydown", "id", "parentFormGroup", "label", "placeholder", "isRequired", "value"]], template: function TempLoginCredentialsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵelement(3, "ui-icon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2", 4);
            i0.ɵɵtext(5, "Temporary Login Credentials");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7, " Generate a temporary password for the employee's first login. The employee will be required to change this password on first login. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6);
            i0.ɵɵconditionalCreate(9, TempLoginCredentialsComponent_Conditional_9_Template, 2, 6, "div", 7);
            i0.ɵɵconditionalCreate(10, TempLoginCredentialsComponent_Conditional_10_Template, 2, 6, "div");
            i0.ɵɵelementStart(11, "div", 8)(12, "ui-icon-text-button", 9);
            i0.ɵɵlistener("buttonClick", function TempLoginCredentialsComponent_Template_ui_icon_text_button_buttonClick_12_listener() { return ctx.generate(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "ul", 10)(14, "li", 11);
            i0.ɵɵtext(15, " Password should be ");
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17, "12 characters long");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "li", 11);
            i0.ɵɵtext(19, " Include ");
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "uppercase");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(22, ", ");
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "lowercase");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(25, ", ");
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(28, ", and ");
            i0.ɵɵelementStart(29, "span");
            i0.ɵɵtext(30, "special characters ( ! @ # $ % & * )");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "li", 12);
            i0.ɵɵtext(32, "Employee will be prompted to change password on first login");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(33, TempLoginCredentialsComponent_Conditional_33_Template, 1, 3, "ui-notice-banner", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(!ctx.formConfig.temporaryUsername.isHide ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.formConfig.temporaryPassword.isHide ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("text-green-600", ctx.isLengthValid())("text-gray-400", !ctx.isLengthValid());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("text-green-600", ctx.hasUppercase())("text-gray-400", !ctx.hasUppercase());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("text-green-600", ctx.hasLowercase())("text-gray-400", !ctx.hasLowercase());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("text-green-600", ctx.hasNumber())("text-gray-400", !ctx.hasNumber());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("text-green-600", ctx.hasSpecialChar())("text-gray-400", !ctx.hasSpecialChar());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.isAllRulesMet ? 33 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, TextBoxComponent, PasswordComponent, IconComponent, NoticeBannerComponent, IconTextButtonComponent], styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TempLoginCredentialsComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'employees-temp-login-credentials', standalone: true, imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, PasswordComponent, IconComponent, NoticeBannerComponent, IconTextButtonComponent], template: "<div class=\"border border-blue-300/60 bg-blue-50 rounded-lg p-6 w-full shadow-sm\">\r\n  <div class=\"flex items-center mb-2\">\r\n    <span class=\"text-[20px] text-blue-600 mr-2\">\r\n      <ui-icon name=\"lucide:key\"></ui-icon>\r\n    </span>\r\n    <h2 class=\"text-[18px] text-slate-800 m-0\">Temporary Login Credentials</h2>\r\n  </div>\r\n\r\n  <p class=\"text-gray-500 text-[15px] pb-6 pr-0\">\r\n    Generate a temporary password for the employee's first login. The employee will be required to change this\r\n    password on first login.\r\n  </p>\r\n\r\n  <div class=\"grid grid-cols-[30%_55%_15%] gap-2 items-end\">\r\n    @if (!formConfig.temporaryUsername.isHide) {\r\n      <div class=\"pr-2\">\r\n        <ui-text-box\r\n          [id]=\"formConfig.temporaryUsername.id\"\r\n          [parentFormGroup]=\"tempLoginCredentials\"\r\n          [label]=\"formConfig.temporaryUsername.label!\"\r\n          [placeholder]=\"formConfig.temporaryUsername.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.temporaryUsername.isRequired!\"\r\n          [value]=\"temporaryUsername()\"\r\n          (valueChange)=\"onUserNameInput($event)\"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.temporaryPassword.isHide) {\r\n      <div>\r\n        <ui-password\r\n          [id]=\"formConfig.temporaryPassword.id\"\r\n          [parentFormGroup]=\"tempLoginCredentials\"\r\n          [label]=\"formConfig.temporaryPassword.label!\"\r\n          [placeholder]=\"formConfig.temporaryPassword.placeholder ?? ''\"\r\n          [isRequired]=\"formConfig.temporaryPassword.isRequired!\"\r\n          [value]=\"temporaryPassword()\"\r\n          (valueChange)=\"onPasswordInput($event)\"\r\n          (keydown)=\"preventInvalidKeys($event)\"\r\n        ></ui-password>\r\n      </div>\r\n    }\r\n\r\n    <div class=\"pl-2\">\r\n      <ui-icon-text-button\r\n        text=\"Generate\"\r\n        variant=\"primary\"\r\n        (buttonClick)=\"generate()\"\r\n      ></ui-icon-text-button>\r\n    </div>\r\n  </div>\r\n\r\n  <ul class=\"mt-1 mb-2 text-[13px] text-gray-500 list-disc pl-5\">\r\n    <li class=\"font-medium transition-colors duration-200 ease-in-out\">\r\n      Password should be\r\n      <span [class.text-green-600]=\"isLengthValid()\" [class.text-gray-400]=\"!isLengthValid()\">12 characters long</span>\r\n    </li>\r\n    <li class=\"font-medium transition-colors duration-200 ease-in-out\">\r\n      Include\r\n      <span [class.text-green-600]=\"hasUppercase()\" [class.text-gray-400]=\"!hasUppercase()\">uppercase</span>,\r\n      <span [class.text-green-600]=\"hasLowercase()\" [class.text-gray-400]=\"!hasLowercase()\">lowercase</span>,\r\n      <span [class.text-green-600]=\"hasNumber()\" [class.text-gray-400]=\"!hasNumber()\">number</span>, and\r\n      <span [class.text-green-600]=\"hasSpecialChar()\" [class.text-gray-400]=\"!hasSpecialChar()\">special characters ( ! @ # $ % &amp; * )</span>\r\n    </li>\r\n    <li class=\"font-medium\">Employee will be prompted to change password on first login</li>\r\n  </ul>\r\n\r\n  @if (isAllRulesMet) {\r\n    <ui-notice-banner\r\n      heading=\"Temporary password generated successfully\"\r\n      headingColor=\"green\"\r\n      contentColor=\"green\"\r\n      highlighterColor=\"green\"\r\n      bannerColor=\"green-500\"\r\n      [contentInNextLine]=\"true\"\r\n      [showIcon]=\"false\"\r\n      [showBorder]=\"true\"\r\n      content=\"Make sure to securely share this password with the employee through official channels.\"\r\n    ></ui-notice-banner>\r\n  }\r\n</div>\r\n", styles: ["// Form controls inherit height from ui library definitions\r\n// No component-level styling needed\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TempLoginCredentialsComponent, { className: "TempLoginCredentialsComponent", filePath: "libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=temp-login-credentials.component.js.map