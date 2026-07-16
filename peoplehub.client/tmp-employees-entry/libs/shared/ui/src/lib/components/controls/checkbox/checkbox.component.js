import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, HostBinding, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function CheckboxComponent_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function CheckboxComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 5);
    i0.ɵɵlistener("click", function CheckboxComponent_Conditional_1_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.labelClick ? ctx_r1.onLabelClick() : null); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, CheckboxComponent_Conditional_1_Conditional_3_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r1.disabled)("label-clickable", ctx_r1.labelClick);
    i0.ɵɵproperty("for", ctx_r1.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isRequired ? 3 : -1);
} }
function CheckboxComponent_Conditional_4_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function CheckboxComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 8);
    i0.ɵɵlistener("click", function CheckboxComponent_Conditional_4_Template_label_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.labelClick ? ctx_r1.onLabelClick() : null); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2);
    i0.ɵɵconditionalCreate(3, CheckboxComponent_Conditional_4_Conditional_3_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r1.disabled)("label-clickable", ctx_r1.labelClick);
    i0.ɵɵproperty("for", ctx_r1.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isRequired ? 3 : -1);
} }
export class CheckboxComponent {
    cdr;
    label = '';
    isRequired = false;
    disabled = false;
    color = '#2563eb';
    tickColor = '#ffffff';
    id; // MANDATORY - required for accessibility
    labelPosition = 'right'; // Label position relative to checkbox
    labelClick = true; // Whether label click toggles checkbox
    checkedInput = false;
    parentFormGroup;
    checkedChange = new EventEmitter();
    internalValue = false;
    onChange = (_value) => { };
    onTouched = () => { };
    constructor(cdr) {
        this.cdr = cdr;
    }
    get checked() {
        return this.internalValue;
    }
    set checked(value) {
        if (this.internalValue !== value) {
            this.internalValue = value;
            this.onChange(value);
            this.checkedChange.emit(value);
            this.cdr.markForCheck();
        }
    }
    ngOnChanges(changes) {
        if ('checkedInput' in changes) {
            const nextValue = this.coerceBoolean(changes['checkedInput'].currentValue);
            if (this.internalValue !== nextValue) {
                this.internalValue = nextValue;
                this.cdr.markForCheck();
            }
        }
        if ('disabled' in changes || 'parentFormGroup' in changes || 'id' in changes) {
            this.syncDisabledState();
        }
    }
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return ((this.control?.invalid &&
            (this.control?.dirty || this.control?.touched)) ??
            false);
    }
    writeValue(value) {
        this.internalValue = this.coerceBoolean(value);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.syncDisabledState();
        this.cdr.markForCheck();
    }
    onChange_internal(event) {
        const target = event.target;
        this.checked = target.checked;
        if (this.control) {
            this.control.setValue(this.checked);
            this.control.markAsTouched();
        }
    }
    onLabelClick() {
        if (!this.labelClick) {
            return;
        }
        this.checked = !this.checked;
        if (this.control) {
            this.control.setValue(this.checked);
            this.control.markAsTouched();
        }
    }
    handleBlur() {
        this.onTouched();
        if (this.control) {
            this.control.markAsTouched();
        }
    }
    get checkboxColor() {
        return this.color;
    }
    get tickColor_binding() {
        return this.tickColor;
    }
    coerceBoolean(value) {
        return value === true || value === 'true';
    }
    syncDisabledState() {
        const formControl = this.control;
        if (!formControl) {
            return;
        }
        if (this.disabled && formControl.enabled) {
            formControl.disable({ emitEvent: false });
            return;
        }
        if (!this.disabled && formControl.disabled) {
            formControl.enable({ emitEvent: false });
        }
    }
    static ɵfac = function CheckboxComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CheckboxComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CheckboxComponent, selectors: [["ui-checkbox"]], hostVars: 4, hostBindings: function CheckboxComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵstyleProp("--checkbox-color", ctx.checkboxColor)("--tick-color", ctx.tickColor_binding);
        } }, inputs: { label: "label", isRequired: "isRequired", disabled: "disabled", color: "color", tickColor: "tickColor", id: "id", labelPosition: "labelPosition", labelClick: "labelClick", checkedInput: [0, "checked", "checkedInput"], parentFormGroup: "parentFormGroup" }, outputs: { checkedChange: "checkedChange" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => CheckboxComponent),
                    multi: true,
                },
            ]), i0.ɵɵNgOnChangesFeature], decls: 5, vars: 8, consts: [[1, "checkbox-wrapper", 3, "formGroup"], [1, "checkbox-label", 3, "for", "disabled", "label-clickable"], ["type", "checkbox", "aria-role", "checkbox", 1, "checkbox-input", 3, "change", "blur", "id", "checked", "formControlName"], [1, "checkbox-visual"], [1, "checkbox-label", "checkbox-label-right", 3, "for", "disabled", "label-clickable"], [1, "checkbox-label", 3, "click", "for"], [1, "checkbox-label-text"], [1, "required-asterisk"], [1, "checkbox-label", "checkbox-label-right", 3, "click", "for"]], template: function CheckboxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, CheckboxComponent_Conditional_1_Template, 4, 7, "label", 1);
            i0.ɵɵelementStart(2, "input", 2);
            i0.ɵɵlistener("change", function CheckboxComponent_Template_input_change_2_listener($event) { return ctx.onChange_internal($event); })("blur", function CheckboxComponent_Template_input_blur_2_listener() { return ctx.handleBlur(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "span", 3);
            i0.ɵɵconditionalCreate(4, CheckboxComponent_Conditional_4_Template, 4, 7, "label", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.labelPosition === "left" ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("invalid", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.id)("checked", ctx.checked)("formControlName", ctx.id);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.labelPosition === "right" ? 4 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: ["//[_ngcontent-%COMP%]   Checkbox[_ngcontent-%COMP%]   Component[_ngcontent-%COMP%]   Scoped[_ngcontent-%COMP%]   Styles\r\n//[_ngcontent-%COMP%]   Following[_ngcontent-%COMP%]   Angular[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   Material[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   Guidelines\r\n\r\n.checkbox-wrapper[_ngcontent-%COMP%] {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  font-family: inherit;\r\n  position: relative;\r\n  height: 36px;\r\n}\r\n\r\n.checkbox-label[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  user-select: none;\r\n  padding: 0.25rem;\r\n  border-radius: 0.375rem;\r\n  transition: background-color 0.15s ease;\r\n\r\n  &.label-clickable:hover:not(.disabled) {\r\n    background-color: rgba(37, 99, 235, 0.05);\r\n  }\r\n\r\n  &:not(.label-clickable) {\r\n    cursor: default;\r\n  }\r\n\r\n  &.disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.6;\r\n  }\r\n}\r\n\r\n.checkbox-label-right[_ngcontent-%COMP%] {\r\n  // Right label renders after checkbox input and visual\r\n  // No special styling needed - flexbox handles the layout\r\n}\r\n\r\n.checkbox-input[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  opacity: 0;\r\n  cursor: pointer;\r\n\r\n  &:focus-visible ~ .checkbox-visual {\r\n    outline: 2px solid var(--checkbox-color, var(--color-primary));\r\n    outline-offset: 2px;\r\n  }\r\n\r\n  &:disabled {\r\n    cursor: not-allowed;\r\n  }\r\n\r\n  &:disabled ~ .checkbox-visual {\r\n    background-color: var(--color-surface-muted);\r\n    border-color: var(--color-border);\r\n    cursor: not-allowed;\r\n  }\r\n\r\n  &:disabled ~ .checkbox-label-text {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.checkbox-visual[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  border: 2px solid var(--color-border);\r\n  border-radius: 0.375rem;\r\n  background-color: white;\r\n  transition: all 0.2s ease;\r\n\r\n  .checkbox-input:not(:checked) ~ & {\r\n    background-color: white;\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  .checkbox-input:not(:checked):hover ~ & {\r\n    border-color: var(--color-text-muted);\r\n  }\r\n\r\n  .checkbox-input:checked ~ & {\r\n    background-color: var(--checkbox-color, var(--color-primary));\r\n    border-color: var(--checkbox-color, var(--color-primary));\r\n  }\r\n\r\n  .checkbox-input:checked:hover ~ & {\r\n    background-color: var(--checkbox-color, var(--color-primary));\r\n    border-color: var(--checkbox-color, var(--color-primary));\r\n    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);\r\n  }\r\n\r\n  &::after {\r\n    content: '';\r\n    position: absolute;\r\n    display: none;\r\n    width: 0.375rem;\r\n    height: 0.625rem;\r\n    border: solid var(--tick-color, var(--color-surface));\r\n    border-width: 0 2px 2px 0;\r\n    transform: rotate(45deg);\r\n    margin-top: -0.125rem;\r\n  }\r\n\r\n  .checkbox-input:checked ~ &::after {\r\n    display: block;\r\n  }\r\n}\r\n\r\n.checkbox-label-text[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.25rem;\r\n  font-size: 0.875rem;\r\n  line-height: 1.5;\r\n  color: var(--color-text-primary);\r\n  transition: color 0.15s ease;\r\n\r\n  .checkbox-input:not(:checked):hover ~ .checkbox-visual ~ & {\r\n    color: var(--color-text-primary);\r\n  }\r\n\r\n  .checkbox-input:checked ~ .checkbox-visual ~ & {\r\n    color: var(--checkbox-color, var(--color-primary));\r\n  }\r\n\r\n  .checkbox-label:disabled & {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.required-asterisk[_ngcontent-%COMP%] {\r\n  color: var(--color-danger);\r\n  font-weight: 600;\r\n  margin-left: 0.125rem;\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .checkbox-label[_ngcontent-%COMP%] {\r\n    gap: 0.625rem;\r\n    padding: 0.25rem 0.125rem;\r\n  }\r\n\r\n  .checkbox-visual[_ngcontent-%COMP%] {\r\n    width: 1.25rem;\r\n    height: 1.25rem;\r\n  }\r\n\r\n  .checkbox-label-text[_ngcontent-%COMP%] {\r\n    font-size: 0.875rem;\r\n  }\r\n}\r\n\r\n.checkbox-input.invalid[_ngcontent-%COMP%]:checked    ~ .checkbox-visual[_ngcontent-%COMP%] {\r\n  border-color: var(--color-danger);\r\n  background-color: var(--color-danger);\r\n}\r\n\r\n.checkbox-input.invalid[_ngcontent-%COMP%]    ~ .checkbox-visual[_ngcontent-%COMP%] {\r\n  border-color: var(--color-danger);\r\n}\r\n\r\n@media print {\r\n  .checkbox-label[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n\r\n    &:hover {\r\n      background-color: transparent;\r\n    }\r\n  }\r\n\r\n  .checkbox-visual[_ngcontent-%COMP%] {\r\n    border-width: 1px;\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CheckboxComponent, [{
        type: Component,
        args: [{ selector: 'ui-checkbox', standalone: true, imports: [CommonModule, ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => CheckboxComponent),
                        multi: true,
                    },
                ], template: "<div class=\"checkbox-wrapper\" [formGroup]=\"parentFormGroup\">\r\n  \r\n  <!-- Label on left -->\r\n  @if (labelPosition === 'left') {\r\n    <label \r\n      [for]=\"id\" \r\n      class=\"checkbox-label\" \r\n      [class.disabled]=\"disabled\"\r\n      [class.label-clickable]=\"labelClick\"\r\n      (click)=\"labelClick ? onLabelClick() : null\">\r\n      <span class=\"checkbox-label-text\">\r\n        {{ label }}\r\n        @if (isRequired) {\r\n          <span class=\"required-asterisk\">*</span>\r\n        }\r\n      </span>\r\n    </label>\r\n  }\r\n\r\n  <!-- Checkbox input (hidden, real checkbox) -->\r\n  <input\r\n    type=\"checkbox\"\r\n    [id]=\"id\"\r\n    [checked]=\"checked\"\r\n    [formControlName]=\"id\"\r\n    (change)=\"onChange_internal($event)\"\r\n    (blur)=\"handleBlur()\"\r\n    class=\"checkbox-input\"\r\n    [class.invalid]=\"isInvalid\"\r\n    aria-role=\"checkbox\"\r\n  />\r\n  \r\n  <!-- Visual checkbox representation -->\r\n  <span class=\"checkbox-visual\"></span>\r\n\r\n  <!-- Label on right -->\r\n  @if (labelPosition === 'right') {\r\n    <label \r\n      [for]=\"id\" \r\n      class=\"checkbox-label checkbox-label-right\" \r\n      [class.disabled]=\"disabled\"\r\n      [class.label-clickable]=\"labelClick\"\r\n      (click)=\"labelClick ? onLabelClick() : null\">\r\n      <span class=\"checkbox-label-text\">\r\n        {{ label }}\r\n        @if (isRequired) {\r\n          <span class=\"required-asterisk\">*</span>\r\n        }\r\n      </span>\r\n    </label>\r\n  }\r\n\r\n</div>\r\n", styles: ["// Checkbox Component Scoped Styles\r\n// Following Angular and Material Design Guidelines\r\n\r\n.checkbox-wrapper {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  font-family: inherit;\r\n  position: relative;\r\n  height: 36px;\r\n}\r\n\r\n.checkbox-label {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  user-select: none;\r\n  padding: 0.25rem;\r\n  border-radius: 0.375rem;\r\n  transition: background-color 0.15s ease;\r\n\r\n  &.label-clickable:hover:not(.disabled) {\r\n    background-color: rgba(37, 99, 235, 0.05);\r\n  }\r\n\r\n  &:not(.label-clickable) {\r\n    cursor: default;\r\n  }\r\n\r\n  &.disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.6;\r\n  }\r\n}\r\n\r\n.checkbox-label-right {\r\n  // Right label renders after checkbox input and visual\r\n  // No special styling needed - flexbox handles the layout\r\n}\r\n\r\n.checkbox-input {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  opacity: 0;\r\n  cursor: pointer;\r\n\r\n  &:focus-visible ~ .checkbox-visual {\r\n    outline: 2px solid var(--checkbox-color, var(--color-primary));\r\n    outline-offset: 2px;\r\n  }\r\n\r\n  &:disabled {\r\n    cursor: not-allowed;\r\n  }\r\n\r\n  &:disabled ~ .checkbox-visual {\r\n    background-color: var(--color-surface-muted);\r\n    border-color: var(--color-border);\r\n    cursor: not-allowed;\r\n  }\r\n\r\n  &:disabled ~ .checkbox-label-text {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.checkbox-visual {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  border: 2px solid var(--color-border);\r\n  border-radius: 0.375rem;\r\n  background-color: white;\r\n  transition: all 0.2s ease;\r\n\r\n  .checkbox-input:not(:checked) ~ & {\r\n    background-color: white;\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  .checkbox-input:not(:checked):hover ~ & {\r\n    border-color: var(--color-text-muted);\r\n  }\r\n\r\n  .checkbox-input:checked ~ & {\r\n    background-color: var(--checkbox-color, var(--color-primary));\r\n    border-color: var(--checkbox-color, var(--color-primary));\r\n  }\r\n\r\n  .checkbox-input:checked:hover ~ & {\r\n    background-color: var(--checkbox-color, var(--color-primary));\r\n    border-color: var(--checkbox-color, var(--color-primary));\r\n    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);\r\n  }\r\n\r\n  &::after {\r\n    content: '';\r\n    position: absolute;\r\n    display: none;\r\n    width: 0.375rem;\r\n    height: 0.625rem;\r\n    border: solid var(--tick-color, var(--color-surface));\r\n    border-width: 0 2px 2px 0;\r\n    transform: rotate(45deg);\r\n    margin-top: -0.125rem;\r\n  }\r\n\r\n  .checkbox-input:checked ~ &::after {\r\n    display: block;\r\n  }\r\n}\r\n\r\n.checkbox-label-text {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.25rem;\r\n  font-size: 0.875rem;\r\n  line-height: 1.5;\r\n  color: var(--color-text-primary);\r\n  transition: color 0.15s ease;\r\n\r\n  .checkbox-input:not(:checked):hover ~ .checkbox-visual ~ & {\r\n    color: var(--color-text-primary);\r\n  }\r\n\r\n  .checkbox-input:checked ~ .checkbox-visual ~ & {\r\n    color: var(--checkbox-color, var(--color-primary));\r\n  }\r\n\r\n  .checkbox-label:disabled & {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.required-asterisk {\r\n  color: var(--color-danger);\r\n  font-weight: 600;\r\n  margin-left: 0.125rem;\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .checkbox-label {\r\n    gap: 0.625rem;\r\n    padding: 0.25rem 0.125rem;\r\n  }\r\n\r\n  .checkbox-visual {\r\n    width: 1.25rem;\r\n    height: 1.25rem;\r\n  }\r\n\r\n  .checkbox-label-text {\r\n    font-size: 0.875rem;\r\n  }\r\n}\r\n\r\n.checkbox-input.invalid:checked ~ .checkbox-visual {\r\n  border-color: var(--color-danger);\r\n  background-color: var(--color-danger);\r\n}\r\n\r\n.checkbox-input.invalid ~ .checkbox-visual {\r\n  border-color: var(--color-danger);\r\n}\r\n\r\n@media print {\r\n  .checkbox-label {\r\n    padding: 0;\r\n\r\n    &:hover {\r\n      background-color: transparent;\r\n    }\r\n  }\r\n\r\n  .checkbox-visual {\r\n    border-width: 1px;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { label: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], disabled: [{
            type: Input
        }], color: [{
            type: Input
        }], tickColor: [{
            type: Input
        }], id: [{
            type: Input
        }], labelPosition: [{
            type: Input
        }], labelClick: [{
            type: Input
        }], checkedInput: [{
            type: Input,
            args: ['checked']
        }], parentFormGroup: [{
            type: Input
        }], checkedChange: [{
            type: Output
        }], checkboxColor: [{
            type: HostBinding,
            args: ['style.--checkbox-color']
        }], tickColor_binding: [{
            type: HostBinding,
            args: ['style.--tick-color']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CheckboxComponent, { className: "CheckboxComponent", filePath: "libs/shared/ui/src/lib/components/controls/checkbox/checkbox.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=checkbox.component.js.map