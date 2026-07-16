import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function PasswordComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
export class PasswordComponent {
    label = 'Temporary Password';
    isRequired = true;
    placeholder = 'Enter Temporary password';
    minLength = 0;
    maxLength = 50;
    passwordVisible = false;
    activeChange = new EventEmitter();
    value = '';
    isActive = false;
    parentFormGroup;
    id;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    get hasValue() {
        const currentValue = (this.control?.value ?? this.value ?? '').toString();
        return currentValue.length > 0;
    }
    valueChange = new EventEmitter();
    togglePassword() {
        this.passwordVisible = !this.passwordVisible;
    }
    onFocus() {
        this.isActive = true;
    }
    onBlur() {
        if (!this.hasValue) {
            this.isActive = false;
        }
        this.control?.markAsTouched();
    }
    onInput(event) {
        const input = event.target;
        let v = input.value;
        if (v.length > this.maxLength) {
            v = v.slice(0, this.maxLength);
            input.value = v;
        }
        this.value = v;
        this.valueChange.emit(this.value);
    }
    static ɵfac = function PasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PasswordComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PasswordComponent, selectors: [["ui-password"]], inputs: { label: "label", isRequired: "isRequired", placeholder: "placeholder", minLength: "minLength", maxLength: "maxLength", value: "value", parentFormGroup: "parentFormGroup", id: "id" }, outputs: { activeChange: "activeChange", valueChange: "valueChange" }, decls: 8, vars: 34, consts: [[1, "flex", "w-full", "flex-col", "gap-1.5", 3, "formGroup"], [1, "relative", "h-[36px]", "w-full", "rounded-md", "border", "px-3", "transition-colors", "duration-200"], [1, "peer", "h-full", "w-full", "bg-transparent", "pr-8", "text-[14px]", "outline-none", "placeholder-transparent", "focus:placeholder-gray-400", 3, "input", "focus", "blur", "id", "type", "formControlName", "placeholder", "value"], [1, "pointer-events-none", "absolute", "left-2", "px-1", "transition-all", "duration-200", 3, "for"], [1, "text-red-600"], ["type", "button", "aria-label", "Toggle password visibility", 1, "absolute", "right-2", "top-1/2", "-translate-y-1/2", "text-gray-500", 3, "click"], [3, "name"]], template: function PasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "input", 2);
            i0.ɵɵlistener("input", function PasswordComponent_Template_input_input_2_listener($event) { return ctx.onInput($event); })("focus", function PasswordComponent_Template_input_focus_2_listener() { return ctx.onFocus(); })("blur", function PasswordComponent_Template_input_blur_2_listener() { return ctx.onBlur(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "label", 3);
            i0.ɵɵtext(4);
            i0.ɵɵconditionalCreate(5, PasswordComponent_Conditional_5_Template, 2, 0, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 5);
            i0.ɵɵlistener("click", function PasswordComponent_Template_button_click_6_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(7, "ui-icon", 6);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("border-red-500", ctx.isInvalid)("border-blue-600", ctx.isActive && !ctx.isInvalid)("border-slate-300", !ctx.isActive && !ctx.isInvalid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", ctx.id)("type", ctx.passwordVisible ? "text" : "password")("formControlName", ctx.id)("placeholder", ctx.placeholder)("value", ctx.value);
            i0.ɵɵattribute("minlength", ctx.minLength)("maxlength", ctx.maxLength);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("-top-2", ctx.isActive || ctx.hasValue)("top-1", !(ctx.isActive || ctx.hasValue))("text-xs", ctx.isActive || ctx.hasValue)("text-sm", !(ctx.isActive || ctx.hasValue))("text-red-500", ctx.isInvalid)("text-blue-600", !ctx.isInvalid && ctx.isActive)("text-gray-500", !ctx.isInvalid && !ctx.isActive)("bg-white", ctx.isActive || ctx.hasValue);
            i0.ɵɵproperty("for", ctx.id);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 5 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("name", ctx.passwordVisible ? "eye_off" : "eye");
        } }, dependencies: [IconComponent, ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: [".password-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PasswordComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-password', imports: [IconComponent, ReactiveFormsModule], template: "<div class=\"flex w-full flex-col gap-1.5\" [formGroup]=\"parentFormGroup\">\n  <div\n    class=\"relative h-[36px] w-full rounded-md border px-3 transition-colors duration-200\"\n    [class.border-red-500]=\"isInvalid\"\n    [class.border-blue-600]=\"isActive && !isInvalid\"\n    [class.border-slate-300]=\"!isActive && !isInvalid\"\n  >\n    <input\n      [id]=\"id\"\n      [type]=\"passwordVisible ? 'text' : 'password'\"\n      [formControlName]=\"id\"\n      [placeholder]=\"placeholder\"\n      [value]=\"value\"\n      [attr.minlength]=\"minLength\"\n      [attr.maxlength]=\"maxLength\"\n      (input)=\"onInput($event)\"\n      (focus)=\"onFocus()\"\n      (blur)=\"onBlur()\"\n      class=\"peer h-full w-full bg-transparent pr-8 text-[14px] outline-none placeholder-transparent focus:placeholder-gray-400\"\n    />\n\n    <label\n      [for]=\"id\"\n      class=\"pointer-events-none absolute left-2 px-1 transition-all duration-200\"\n      [class.-top-2]=\"isActive || hasValue\"\n      [class.top-1.5]=\"!(isActive || hasValue)\"\n      [class.text-xs]=\"isActive || hasValue\"\n      [class.text-sm]=\"!(isActive || hasValue)\"\n      [class.text-red-500]=\"isInvalid\"\n      [class.text-blue-600]=\"!isInvalid && isActive\"\n      [class.text-gray-500]=\"!isInvalid && !isActive\"\n      [class.bg-white]=\"isActive || hasValue\"\n    >\n      {{ label }}\n      @if (isRequired) {\n        <span class=\"text-red-600\">*</span>\n      }\n    </label>\n\n    <button\n      type=\"button\"\n      (click)=\"togglePassword()\"\n      class=\"absolute right-2 top-1/2 -translate-y-1/2 text-gray-500\"\n      aria-label=\"Toggle password visibility\"\n    >\n      <ui-icon [name]=\"passwordVisible ? 'eye_off' : 'eye'\"></ui-icon>\n    </button>\n  </div>\n</div>\n", styles: [".password-container {\r\n  height: 36px;\r\n}"] }]
    }], null, { label: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], minLength: [{
            type: Input
        }], maxLength: [{
            type: Input
        }], activeChange: [{
            type: Output
        }], value: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], valueChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PasswordComponent, { className: "PasswordComponent", filePath: "libs/shared/ui/src/lib/components/controls/password/password.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=password.component.js.map