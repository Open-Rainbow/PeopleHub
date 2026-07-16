import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, } from '@angular/core';
import { ReactiveFormsModule, Validators, } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["textareaField"];
const _c1 = ["textareaInput"];
function TextAreaComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function TextAreaComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("char-count-active", ctx_r0.isFocused || ctx_r0.hasValue)("char-count-invalid", ctx_r0.isInvalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.currentCharCount, " of ", ctx_r0.maxLength, " characters left ");
} }
export class TextAreaComponent {
    cdr;
    label = 'Text Area';
    placeholder = 'Enter text';
    isRequired = true;
    showBorder = true;
    borderColor = '#2563eb';
    maxLength = 500;
    minLength = 0;
    showCharCount = true;
    rows = 4;
    id;
    parentFormGroup;
    textValueChange = new EventEmitter();
    textareaField;
    textareaInput;
    isFocused = false;
    currentCharCount = 0;
    get isInvalid() {
        const ctrl = this.parentFormGroup?.get(this.id);
        return !!(ctrl?.invalid && (ctrl?.dirty || ctrl?.touched));
    }
    destroy$ = new Subject();
    resizeObserver;
    initialWidth = 0;
    initialHeight = 0;
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
    get hasValue() {
        return (this.control?.value ?? '').trim().length > 0;
    }
    ngAfterViewInit() {
        const el = this.textareaField.nativeElement;
        const wrapper = this.textareaInput.nativeElement;
        this.initialWidth = el.offsetWidth;
        this.initialHeight = el.offsetHeight;
        this.resizeObserver = new ResizeObserver(() => {
            const newWidth = el.offsetWidth;
            const newHeight = el.offsetHeight;
            if (newWidth !== this.initialWidth || newHeight !== this.initialHeight) {
                wrapper.style.width = newWidth + 'px';
                wrapper.style.height = newHeight + 'px';
            }
        });
        this.resizeObserver.observe(el);
    }
    ngOnInit() {
        const validators = [
            ...(this.isRequired ? [Validators.required] : []),
            ...(this.minLength && this.minLength > 0
                ? [Validators.minLength(this.minLength)]
                : []),
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
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.resizeObserver?.disconnect();
    }
    onInput(event) {
        const textarea = event.target;
        const value = textarea.value;
        this.control.setValue(value, { emitEvent: false });
        this.textValueChange.emit(value);
        this.updateCharCount();
        this.cdr.markForCheck();
    }
    onFocus() {
        this.isFocused = true;
        this.cdr.markForCheck();
    }
    onBlur() {
        this.isFocused = false;
        this.control.markAsTouched();
        this.cdr.markForCheck();
    }
    updateCharCount() {
        const value = this.control?.value ?? '';
        this.currentCharCount = Math.max((this.maxLength ?? 0) - value.length, 0);
    }
    static ɵfac = function TextAreaComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextAreaComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextAreaComponent, selectors: [["ui-text-area"]], viewQuery: function TextAreaComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.textareaField = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.textareaInput = _t.first);
        } }, inputs: { label: "label", placeholder: "placeholder", isRequired: "isRequired", showBorder: "showBorder", borderColor: "borderColor", maxLength: "maxLength", minLength: "minLength", showCharCount: "showCharCount", rows: "rows", id: "id", parentFormGroup: "parentFormGroup" }, outputs: { textValueChange: "textValueChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 11, vars: 27, consts: [["textareaInput", ""], ["textareaField", ""], [1, "textarea-container", 3, "formGroup"], [1, "input-wrapper"], [1, "textarea-input"], [1, "textarea-field", 3, "input", "focus", "blur", "id", "formControl", "placeholder", "rows"], [1, "textarea-label", 3, "for"], [1, "required-asterisk"], [1, "char-count", 3, "char-count-active", "char-count-invalid"], [1, "char-count"]], template: function TextAreaComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "div", 4, 0)(4, "textarea", 5, 1);
            i0.ɵɵlistener("input", function TextAreaComponent_Template_textarea_input_4_listener($event) { return ctx.onInput($event); })("focus", function TextAreaComponent_Template_textarea_focus_4_listener() { return ctx.onFocus(); })("blur", function TextAreaComponent_Template_textarea_blur_4_listener() { return ctx.onBlur(); });
            i0.ɵɵtext(6, "      ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "label", 6);
            i0.ɵɵtext(8);
            i0.ɵɵconditionalCreate(9, TextAreaComponent_Conditional_9_Template, 2, 0, "span", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, TextAreaComponent_Conditional_10_Template, 2, 6, "p", 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵattribute("data-width-text", ctx.label || ctx.placeholder || "");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("--border-color", ctx.borderColor);
            i0.ɵɵclassProp("border-gray", !ctx.isFocused && !ctx.isInvalid)("border-blue", ctx.isFocused && !ctx.isInvalid)("border-red", ctx.isInvalid);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("id", ctx.id)("formControl", ctx.control)("placeholder", ctx.placeholder)("rows", ctx.rows);
            i0.ɵɵattribute("maxlength", ctx.maxLength);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("floating", ctx.isFocused || ctx.hasValue)("blue", ctx.isFocused && !ctx.isInvalid)("gray", !ctx.isFocused && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵproperty("for", ctx.id);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCharCount && (ctx.isFocused || ctx.hasValue) ? 10 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormControlDirective, i1.FormGroupDirective], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.textarea-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.textarea-input[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: block;\r\n  width: 100%;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.textarea-field[_ngcontent-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0.75rem;\r\n  padding-top: 1.5rem;\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  color: var(--color-text-primary);\r\n  resize: both;\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n  }\r\n\r\n  &:focus {\r\n    outline: none;\r\n  }\r\n}\r\n\r\n.textarea-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--textarea-label-bg, var(--input-bg, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.5rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.char-count[_ngcontent-%COMP%] {\r\n  margin-top: 0.5rem;\r\n  font-size: 0.75rem;\r\n  font-weight: 400;\r\n  color: var(--color-text-secondary);\r\n  transition: opacity 0.2s;\r\n  opacity: 0;\r\n\r\n  &.char-count-active {\r\n    opacity: 1;\r\n  }\r\n\r\n  &.char-count-invalid {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.textarea-error[_ngcontent-%COMP%] {\r\n  margin-top: 0.5rem;\r\n  font-size: 0.75rem;\r\n  font-weight: 500;\r\n  color: var(--color-danger);\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextAreaComponent, [{
        type: Component,
        args: [{ selector: 'ui-text-area', standalone: true, imports: [CommonModule, ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"textarea-container\" [attr.data-width-text]=\"label || placeholder || ''\" [formGroup]=\"parentFormGroup\">\r\n  <div class=\"input-wrapper\">\r\n    <div\r\n      #textareaInput\r\n      class=\"textarea-input\"\r\n      [class.border-gray]=\"!isFocused && !isInvalid\"\r\n      [class.border-blue]=\"isFocused && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n      [style.--border-color]=\"borderColor\">\r\n      \r\n      <textarea\r\n        #textareaField\r\n        class=\"textarea-field\"\r\n        [id]=\"id\"\r\n        [formControl]=\"control\"\r\n        [placeholder]=\"placeholder\"\r\n        [attr.maxlength]=\"maxLength\"\r\n        [rows]=\"rows\"\r\n        (input)=\"onInput($event)\"\r\n        (focus)=\"onFocus()\"\r\n        (blur)=\"onBlur()\">\r\n      </textarea>\r\n\r\n      <label\r\n        class=\"textarea-label\"\r\n        [for]=\"id\"\r\n        [class.floating]=\"isFocused || hasValue\"\r\n        [class.blue]=\"isFocused && !isInvalid\"\r\n        [class.gray]=\"!isFocused && !isInvalid\"\r\n        [class.red]=\"isInvalid\">\r\n        {{ label }}\r\n        @if (isRequired) {\r\n          <span class=\"required-asterisk\">*</span>\r\n        }\r\n      </label>\r\n    </div>\r\n\r\n    @if (showCharCount && (isFocused || hasValue)) {\r\n      <p\r\n        class=\"char-count\"\r\n        [class.char-count-active]=\"isFocused || hasValue\"\r\n        [class.char-count-invalid]=\"isInvalid\">\r\n        {{ currentCharCount }} of {{ maxLength }} characters left\r\n      </p>\r\n    }\r\n  </div>\r\n</div>", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.textarea-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n}\r\n\r\n.textarea-input {\r\n  position: relative;\r\n  display: block;\r\n  width: 100%;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.textarea-field {\r\n  display: block;\r\n  width: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0.75rem;\r\n  padding-top: 1.5rem;\r\n  font-size: 0.875rem;\r\n  font-family: inherit;\r\n  color: var(--color-text-primary);\r\n  resize: both;\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n  }\r\n\r\n  &:focus {\r\n    outline: none;\r\n  }\r\n}\r\n\r\n.textarea-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--textarea-label-bg, var(--input-bg, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.5rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.char-count {\r\n  margin-top: 0.5rem;\r\n  font-size: 0.75rem;\r\n  font-weight: 400;\r\n  color: var(--color-text-secondary);\r\n  transition: opacity 0.2s;\r\n  opacity: 0;\r\n\r\n  &.char-count-active {\r\n    opacity: 1;\r\n  }\r\n\r\n  &.char-count-invalid {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.textarea-error {\r\n  margin-top: 0.5rem;\r\n  font-size: 0.75rem;\r\n  font-weight: 500;\r\n  color: var(--color-danger);\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { label: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], showBorder: [{
            type: Input
        }], borderColor: [{
            type: Input
        }], maxLength: [{
            type: Input
        }], minLength: [{
            type: Input
        }], showCharCount: [{
            type: Input
        }], rows: [{
            type: Input
        }], id: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], textValueChange: [{
            type: Output
        }], textareaField: [{
            type: ViewChild,
            args: ['textareaField']
        }], textareaInput: [{
            type: ViewChild,
            args: ['textareaInput']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextAreaComponent, { className: "TextAreaComponent", filePath: "libs/shared/ui/src/lib/components/controls/text-area/text-area.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=text-area.component.js.map