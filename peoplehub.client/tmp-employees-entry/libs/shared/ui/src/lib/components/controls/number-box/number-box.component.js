import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function NumberBoxComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function NumberBoxComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "button", 5);
    i0.ɵɵlistener("click", function NumberBoxComponent_Conditional_5_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.increment($event)); });
    i0.ɵɵelement(2, "ui-icon", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 5);
    i0.ɵɵlistener("click", function NumberBoxComponent_Conditional_5_Template_button_click_3_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.decrement($event)); });
    i0.ɵɵelement(4, "ui-icon", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "fluent:caret-up-24-filled");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "fluent:caret-down-24-filled");
} }
export class NumberBoxComponent {
    cdr;
    label = 'Casual';
    isRequired = true;
    placeholder = '0';
    parentFormGroup;
    minValue;
    maxValue;
    set step(value) {
        this._step = value < 0 ? Math.abs(value) : value || 1;
    }
    get step() {
        return this._step;
    }
    _step = 1;
    id = 'casual';
    numberBox = new EventEmitter();
    blurEvent = new EventEmitter();
    localForm = new FormGroup({});
    isFocused = false;
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngOnInit() {
        if (!this.parentFormGroup) {
            this.localForm = new FormGroup({
                [this.id]: new FormControl(''),
            });
        }
    }
    get activeForm() {
        return this.parentFormGroup ?? this.localForm;
    }
    get control() {
        return this.activeForm.get(this.id);
    }
    get hasValue() {
        const value = this.control?.value;
        return value !== null && value !== undefined && value !== '';
    }
    get isInvalid() {
        return !!(this.control &&
            this.control.invalid &&
            (this.control.dirty || this.control.touched));
    }
    onInput(event) {
        const input = event.target;
        const rawValue = input.value.trim();
        if (rawValue === '') {
            this.control?.setValue('', { emitEvent: false });
            this.cdr.markForCheck();
            this.cdr.detectChanges();
            return;
        }
        let value = Number(rawValue);
        if (this.minValue !== undefined && value < this.minValue) {
            value = this.minValue;
            input.value = value.toString();
        }
        if (this.maxValue !== undefined && value > this.maxValue) {
            value = this.maxValue;
            input.value = value.toString();
        }
        this.control?.setValue(value, { emitEvent: false });
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.numberBox.emit(value);
    }
    onFocus() {
        this.isFocused = true;
        this.cdr.markForCheck();
    }
    onBlur() {
        this.isFocused = false;
        this.control?.markAsTouched();
        this.cdr.markForCheck();
        this.blurEvent.emit();
    }
    increment(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.control)
            return;
        const current = Number(this.control.value) || 0;
        let next = current + this.step;
        if (this.maxValue !== undefined && next > this.maxValue) {
            next = this.maxValue;
        }
        this.updateValue(next);
    }
    decrement(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.control)
            return;
        const current = Number(this.control.value) || 0;
        let next = current - this.step;
        if (this.minValue !== undefined && next < this.minValue) {
            next = this.minValue;
        }
        this.updateValue(next);
    }
    updateValue(value) {
        if (!this.control)
            return;
        this.control.setValue(value);
        this.control.markAsDirty();
        this.control.markAsTouched();
        this.control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.numberBox.emit(value);
        const inputElement = document.getElementById(this.id);
        if (inputElement) {
            inputElement.focus();
        }
    }
    static ɵfac = function NumberBoxComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NumberBoxComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NumberBoxComponent, selectors: [["ui-number-box"]], inputs: { label: "label", isRequired: "isRequired", placeholder: "placeholder", parentFormGroup: "parentFormGroup", minValue: "minValue", maxValue: "maxValue", step: "step", id: "id" }, outputs: { numberBox: "numberBox", blurEvent: "blurEvent" }, decls: 6, vars: 19, consts: [[1, "relative", "w-full", 3, "formGroup"], ["type", "number", 1, "peer", "w-full", "h-[36px]", "inputBoxHeight", "text-[14px]", "text-[#1f2937]", "rounded-[6px]", "outline-none", "transition", "bg-white", "px-3", "pr-[40px]", "pb-1", "border", "border-slate-300", "placeholder:text-gray-400", "focus:!border-[#2563eb]", "focus:shadow-none", "[&::-webkit-inner-spin-button]:appearance-none", "[&::-webkit-outer-spin-button]:appearance-none", 3, "focus", "input", "blur", "step", "id", "formControlName"], [1, "absolute", "left-3", "bg-white", "px-1", "transition-all", "duration-200", "ease-out", "pointer-events-none", "z-[2]", "font-medium", "whitespace-nowrap", 3, "for"], [1, "required", "text-red-600"], [1, "absolute", "right-[10px]", "top-1/2", "-translate-y-1/2", "flex", "flex-col", "gap-0", "z-[50]"], ["type", "button", "tabindex", "-1", 1, "w-[20px]", "h-[16px]", "flex", "items-center", "justify-center", "bg-transparent", "text-[#6b7280]", "cursor-pointer", "outline-none", "select-none", "hover:text-[#2563eb]", "hover:bg-[#f3f4f6]", "hover:rounded-[2px]", "active:scale-[0.95]", "active:bg-[#e5e7eb]", "relative", "z-[51]", 3, "click"], [1, "pointer-events-none", "w-[12px]", "h-[12px]", 3, "name"]], template: function NumberBoxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "input", 1);
            i0.ɵɵlistener("focus", function NumberBoxComponent_Template_input_focus_1_listener() { return ctx.onFocus(); })("input", function NumberBoxComponent_Template_input_input_1_listener($event) { return ctx.onInput($event); })("blur", function NumberBoxComponent_Template_input_blur_1_listener() { return ctx.onBlur(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 2);
            i0.ɵɵtext(3);
            i0.ɵɵconditionalCreate(4, NumberBoxComponent_Conditional_4_Template, 2, 0, "span", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, NumberBoxComponent_Conditional_5_Template, 5, 2, "div", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.activeForm);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("border-red-600", ctx.isInvalid);
            i0.ɵɵproperty("step", ctx.step)("id", ctx.id)("formControlName", ctx.id);
            i0.ɵɵattribute("placeholder", ctx.isFocused || ctx.hasValue ? ctx.placeholder : "");
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.isFocused || ctx.hasValue ? "-top-[7.5px] text-[12px]" : "top-[6px] text-[14px]");
            i0.ɵɵclassProp("text-blue-600", ctx.isFocused && !ctx.isInvalid)("text-gray-500", !ctx.isFocused && !ctx.isInvalid)("text-red-600", ctx.isInvalid);
            i0.ɵɵproperty("for", ctx.id);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isFocused || ctx.hasValue ? 5 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, IconComponent], styles: [".number-box-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NumberBoxComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-number-box', standalone: true, imports: [CommonModule, ReactiveFormsModule, IconComponent], template: "\r\n\r\n<div class=\"relative w-full\" [formGroup]=\"activeForm\">\r\n\r\n  <input\r\n    type=\"number\"\r\n    [step]=\"step\"\r\n    [id]=\"id\"\r\n    [formControlName]=\"id\"\r\n    [attr.placeholder]=\"isFocused || hasValue ? placeholder : ''\"\r\n    (focus)=\"onFocus()\"\r\n    (input)=\"onInput($event)\"\r\n    (blur)=\"onBlur()\"\r\n    [class.border-red-600]=\"isInvalid\"\r\n    class=\"peer w-full h-[36px] inputBoxHeight\r\n           text-[14px] text-[#1f2937]\r\n           rounded-[6px]\r\n           outline-none\r\n           transition\r\n           bg-white\r\n           px-3 pr-[40px] pb-1\r\n           border border-slate-300\r\n           placeholder:text-gray-400\r\n           focus:!border-[#2563eb]\r\n           focus:shadow-none\r\n           [&::-webkit-inner-spin-button]:appearance-none\r\n           [&::-webkit-outer-spin-button]:appearance-none\"\r\n  />\r\n\r\n  <label\r\n    [for]=\"id\"\r\n    class=\"absolute left-3 bg-white px-1\r\n           transition-all duration-200 ease-out\r\n           pointer-events-none z-[2]\r\n           font-medium whitespace-nowrap\"\r\n    [class]=\"(isFocused || hasValue) ? '-top-[7.5px] text-[12px]' : 'top-[6px] text-[14px]'\"\r\n    [class.text-blue-600]=\"isFocused && !isInvalid\"\r\n    [class.text-gray-500]=\"!isFocused && !isInvalid\"\r\n    [class.text-red-600]=\"isInvalid\">\r\n    {{ label }}\r\n    @if (isRequired) {\r\n      <span class=\"required text-red-600\">*</span>\r\n    }\r\n  </label>\r\n\r\n  @if (isFocused || hasValue) {\r\n    <div class=\"absolute right-[10px] top-1/2 -translate-y-1/2\r\n                flex flex-col gap-0 z-[50]\">\r\n\r\n      <button\r\n        type=\"button\"\r\n        (click)=\"increment($event)\"\r\n        tabindex=\"-1\"\r\n        class=\"w-[20px] h-[16px]\r\n               flex items-center justify-center\r\n               bg-transparent\r\n               text-[#6b7280]\r\n               cursor-pointer\r\n               outline-none\r\n               select-none\r\n               hover:text-[#2563eb]\r\n               hover:bg-[#f3f4f6]\r\n               hover:rounded-[2px]\r\n               active:scale-[0.95]\r\n               active:bg-[#e5e7eb]\r\n               relative z-[51]\">\r\n\r\n        <ui-icon\r\n          [name]=\"'fluent:caret-up-24-filled'\"\r\n          class=\"pointer-events-none w-[12px] h-[12px]\">\r\n        </ui-icon>\r\n\r\n      </button>\r\n\r\n      <button\r\n        type=\"button\"\r\n        (click)=\"decrement($event)\"\r\n        tabindex=\"-1\"\r\n        class=\"w-[20px] h-[16px]\r\n               flex items-center justify-center\r\n               bg-transparent\r\n               text-[#6b7280]\r\n               cursor-pointer\r\n               outline-none\r\n               select-none\r\n               hover:text-[#2563eb]\r\n               hover:bg-[#f3f4f6]\r\n               hover:rounded-[2px]\r\n               active:scale-[0.95]\r\n               active:bg-[#e5e7eb]\r\n               relative z-[51]\">\r\n\r\n        <ui-icon\r\n          [name]=\"'fluent:caret-down-24-filled'\"\r\n          class=\"pointer-events-none w-[12px] h-[12px]\">\r\n        </ui-icon>\r\n\r\n      </button>\r\n\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [".number-box-container {\r\n  height: 36px;\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { label: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], minValue: [{
            type: Input
        }], maxValue: [{
            type: Input
        }], step: [{
            type: Input
        }], id: [{
            type: Input
        }], numberBox: [{
            type: Output
        }], blurEvent: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NumberBoxComponent, { className: "NumberBoxComponent", filePath: "libs/shared/ui/src/lib/components/controls/number-box/number-box.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=number-box.component.js.map