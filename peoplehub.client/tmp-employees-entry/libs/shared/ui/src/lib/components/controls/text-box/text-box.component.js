import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TextBoxComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function TextBoxComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("char-count-active", ctx_r0.isFocused || ctx_r0.hasValue)("char-count-invalid", ctx_r0.isInvalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.currentCharCount, " of ", ctx_r0.maxLength, " characters left ");
} }
export class TextBoxComponent {
    cdr;
    label = 'Text Box';
    placeholder = 'Enter here...';
    isRequired = true;
    showBorder = true;
    minLength = 0;
    maxLength = 50;
    showCharCount = true;
    parentFormGroup;
    id;
    isReadOnly = false;
    isAllowSpecialChars = true;
    tabindex;
    value = '';
    isFocused = false;
    valueChange = new EventEmitter();
    currentCharCount = 0;
    destroy$ = new Subject();
    constructor(cdr) {
        this.cdr = cdr;
    }
    get control() {
        const ctrl = this.parentFormGroup?.get(this.id);
        if (!ctrl) {
            throw new Error(`FormControl with name '${this.id}' not found`);
        }
        return ctrl;
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    get hasValue() {
        return (this.control?.value ?? '').trim().length > 0;
    }
    ngOnInit() {
        const validators = [
            ...(this.isRequired ? [Validators.required] : []),
            ...(this.minLength && this.minLength > 0 ? [Validators.minLength(this.minLength)] : []),
            ...(this.maxLength ? [Validators.maxLength(this.maxLength)] : []),
        ];
        this.control.setValidators(validators);
        this.control.updateValueAndValidity();
        this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateCharCount();
            this.cdr.markForCheck();
        });
        this.updateCharCount();
    }
    ngOnChanges(changes) {
        if (changes['maxLength'] && !changes['maxLength'].firstChange) {
            this.updateCharCount();
            this.cdr.markForCheck();
        }
        if (changes['value'] && !changes['value'].firstChange) {
            const isEditingThisInput = this.isFocused && document.activeElement?.id === this.id;
            if (!isEditingThisInput && this.control.value !== this.value) {
                this.control.setValue(this.value, { emitEvent: false });
                this.updateCharCount();
                this.cdr.markForCheck();
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateCharCount() {
        const controlValue = this.control?.value;
        const currentLength = controlValue?.length ?? 0;
        this.currentCharCount = Math.max((this.maxLength ?? 0) - currentLength, 0);
    }
    onInput(event) {
        const target = event.target;
        const nextValue = target.value;
        this.value = nextValue;
        this.valueChange.emit(nextValue);
        this.updateCharCount();
        this.cdr.markForCheck();
    }
    onFocus() {
        this.isFocused = true;
        this.cdr.markForCheck();
    }
    onBlur(event) {
        this.isFocused = false;
        const target = event.target;
        this.value = target.value;
        this.control.markAsTouched();
        this.cdr.markForCheck();
    }
    static ɵfac = function TextBoxComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextBoxComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextBoxComponent, selectors: [["ui-text-box"]], inputs: { label: "label", placeholder: "placeholder", isRequired: "isRequired", showBorder: "showBorder", minLength: "minLength", maxLength: "maxLength", showCharCount: "showCharCount", parentFormGroup: "parentFormGroup", id: "id", isReadOnly: "isReadOnly", isAllowSpecialChars: "isAllowSpecialChars", tabindex: "tabindex", value: "value", isFocused: "isFocused" }, outputs: { valueChange: "valueChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 8, vars: 29, consts: [[1, "textbox-container", 3, "formGroup"], [1, "input-wrapper"], [1, "textbox-input"], ["type", "text", 1, "textbox-field", 3, "focus", "blur", "input", "id", "formControlName", "placeholder", "readonly", "tabindex"], [1, "textbox-label", 3, "for"], [1, "required-asterisk"], [1, "char-count", 3, "char-count-active", "char-count-invalid"], [1, "char-count"]], template: function TextBoxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "input", 3);
            i0.ɵɵlistener("focus", function TextBoxComponent_Template_input_focus_3_listener() { return ctx.onFocus(); })("blur", function TextBoxComponent_Template_input_blur_3_listener($event) { return ctx.onBlur($event); })("input", function TextBoxComponent_Template_input_input_3_listener($event) { return ctx.onInput($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "label", 4);
            i0.ɵɵtext(5);
            i0.ɵɵconditionalCreate(6, TextBoxComponent_Conditional_6_Template, 2, 0, "span", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, TextBoxComponent_Conditional_7_Template, 2, 6, "p", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-gray", !ctx.isFocused && !ctx.isInvalid)("border-blue", ctx.isFocused && !ctx.isInvalid)("border-red", ctx.isInvalid)("no-border", !ctx.showBorder);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("has-value", ctx.hasValue);
            i0.ɵɵproperty("id", ctx.id)("formControlName", ctx.id)("placeholder", ctx.isFocused || ctx.hasValue ? ctx.placeholder ?? "" : "")("readonly", ctx.isReadOnly)("tabindex", ctx.tabindex);
            i0.ɵɵattribute("maxlength", ctx.maxLength);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("floating", ctx.isFocused || ctx.hasValue)("blue", ctx.isFocused && !ctx.isInvalid)("gray", !ctx.isFocused && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵproperty("for", ctx.id);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCharCount && (ctx.isFocused || ctx.hasValue) ? 7 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.textbox-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  gap: 0;\r\n}\r\n\r\n.textbox-input[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 36px;\r\n  min-height: 36px;\r\n  max-height: 36px;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  color: var(--color-text-primary);\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  z-index: 1;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n\r\n    &:hover {\r\n      border-color: var(--color-border-strong);\r\n    }\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n\r\n    &:hover {\r\n      border-color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &.no-border {\r\n    border: none;\r\n  }\r\n}\r\n\r\n.textbox-field[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0.5rem 0.75rem;\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  color: var(--color-text-primary);\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n    opacity: 1;\r\n    transition: opacity 0.2s;\r\n  }\r\n\r\n  &:not(:focus):not(.has-value)::placeholder {\r\n    opacity: 0;\r\n  }\r\n\r\n  &:focus {\r\n    outline: none;\r\n  }\r\n}\r\n\r\n.textbox-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--input-bg, var(--bg-color, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 2;\r\n\r\n  &.floating {\r\n    top: -0.55rem;\r\n    font-size: 0.75rem;\r\n    line-height: 1;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    font-size: 0.875rem;\r\n    line-height: 1.25rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.char-count[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  font-size: 0.75rem;\r\n  font-weight: 400;\r\n  color: var(--color-text-secondary);\r\n  transition: opacity 0.2s;\r\n  opacity: 0;\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  box-sizing: border-box;\r\n\r\n  &.char-count-active {\r\n    opacity: 1;\r\n  }\r\n\r\n  &.char-count-invalid {\r\n    color: var(--color-danger);\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextBoxComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-text-box', imports: [CommonModule, FormsModule, ReactiveFormsModule], template: "<div class=\"textbox-container\" [formGroup]=\"parentFormGroup\">\r\n  <div class=\"input-wrapper\">\r\n    <div\r\n      class=\"textbox-input\"\r\n      [class.border-gray]=\"!isFocused && !isInvalid\"\r\n      [class.border-blue]=\"isFocused && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n      [class.no-border]=\"!showBorder\"\r\n    >\r\n      <input\r\n        type=\"text\"\r\n        class=\"textbox-field\"\r\n        [class.has-value]=\"hasValue\"\r\n        [id]=\"id\"\r\n        [formControlName]=\"id\"\r\n        [placeholder]=\"isFocused || hasValue ? (placeholder ?? '') : ''\"\r\n        [attr.maxlength]=\"maxLength\"\r\n        [readonly]=\"isReadOnly\"\r\n        [tabindex]=\"tabindex\"\r\n        (focus)=\"onFocus()\"\r\n        (blur)=\"onBlur($event)\"\r\n        (input)=\"onInput($event)\"\r\n      />\r\n\r\n      <label\r\n        class=\"textbox-label\"\r\n        [for]=\"id\"\r\n        [class.floating]=\"isFocused || hasValue\"\r\n        [class.blue]=\"isFocused && !isInvalid\"\r\n        [class.gray]=\"!isFocused && !isInvalid\"\r\n        [class.red]=\"isInvalid\"\r\n      >\r\n        {{ label }}\r\n        @if (isRequired) {\r\n          <span class=\"required-asterisk\">*</span>\r\n        }\r\n      </label>\r\n    </div>\r\n\r\n    @if (showCharCount && (isFocused || hasValue)) {\r\n      <p\r\n        class=\"char-count\"\r\n        [class.char-count-active]=\"isFocused || hasValue\"\r\n        [class.char-count-invalid]=\"isInvalid\"\r\n      >\r\n        {{ currentCharCount }} of {{ maxLength }} characters left\r\n      </p>\r\n    }\r\n  </div>\r\n</div>", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.textbox-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  gap: 0;\r\n}\r\n\r\n.textbox-input {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 36px;\r\n  min-height: 36px;\r\n  max-height: 36px;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  color: var(--color-text-primary);\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  z-index: 1;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n\r\n    &:hover {\r\n      border-color: var(--color-border-strong);\r\n    }\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n\r\n    &:hover {\r\n      border-color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &.no-border {\r\n    border: none;\r\n  }\r\n}\r\n\r\n.textbox-field {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0.5rem 0.75rem;\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  color: var(--color-text-primary);\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n    opacity: 1;\r\n    transition: opacity 0.2s;\r\n  }\r\n\r\n  &:not(:focus):not(.has-value)::placeholder {\r\n    opacity: 0;\r\n  }\r\n\r\n  &:focus {\r\n    outline: none;\r\n  }\r\n}\r\n\r\n.textbox-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--input-bg, var(--bg-color, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 2;\r\n\r\n  &.floating {\r\n    top: -0.55rem;\r\n    font-size: 0.75rem;\r\n    line-height: 1;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n    font-size: 0.875rem;\r\n    line-height: 1.25rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.char-count {\r\n  width: 100%;\r\n  font-size: 0.75rem;\r\n  font-weight: 400;\r\n  color: var(--color-text-secondary);\r\n  transition: opacity 0.2s;\r\n  opacity: 0;\r\n  text-align: left;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  box-sizing: border-box;\r\n\r\n  &.char-count-active {\r\n    opacity: 1;\r\n  }\r\n\r\n  &.char-count-invalid {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { label: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], showBorder: [{
            type: Input
        }], minLength: [{
            type: Input
        }], maxLength: [{
            type: Input
        }], showCharCount: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], isReadOnly: [{
            type: Input
        }], isAllowSpecialChars: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], value: [{
            type: Input
        }], isFocused: [{
            type: Input
        }], valueChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextBoxComponent, { className: "TextBoxComponent", filePath: "libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=text-box.component.js.map