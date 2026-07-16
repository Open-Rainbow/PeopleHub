import { Component, EventEmitter, Input, Output, ViewChildren, ChangeDetectionStrategy, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["otpInput"];
function OtpComponent_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 4, 0);
    i0.ɵɵlistener("paste", function OtpComponent_For_4_Template_input_paste_0_listener($event) { const ɵ$index_6_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ɵ$index_6_r2 === 0 ? ctx_r2.handlePaste($event) : null); })("input", function OtpComponent_For_4_Template_input_input_0_listener($event) { const ɵ$index_6_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleInput($event, ɵ$index_6_r2)); })("keydown", function OtpComponent_For_4_Template_input_keydown_0_listener($event) { const ɵ$index_6_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleKeyDown($event, ɵ$index_6_r2)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ɵ$index_6_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵattribute("maxlength", ɵ$index_6_r2 === 0 ? ctx_r2.otpLength.toString() : "1");
} }
export class OtpComponent {
    otpArray = Array(6).fill('');
    otpInputs;
    label = 'Enter OTP here';
    parentFormGroup;
    id;
    otpLength = 6;
    otpChange = new EventEmitter();
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return (this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    ngOnChanges(changes) {
        if (changes['otpLength']) {
            const length = Math.floor(Number(this.otpLength));
            this.otpLength = Number.isFinite(length) && length > 0 ? length : 6;
            this.otpArray = Array(this.otpLength).fill('');
        }
    }
    ngAfterViewInit() {
        this.otpInputs.first.nativeElement.focus();
    }
    emitOtp() {
        const otp = this.otpInputs
            .toArray()
            .map((input) => input.nativeElement.value)
            .join('');
        this.control?.setValue(otp);
        this.otpChange.emit(otp);
    }
    blurIfComplete() {
        const allFilled = this.otpInputs
            .toArray()
            .every((input) => /^\d$/.test(input.nativeElement.value));
        if (allFilled && this.otpInputs.last) {
            this.otpInputs.last.nativeElement.blur();
        }
    }
    handlePaste(event) {
        const pasteData = event.clipboardData?.getData('text/plain') || '';
        const otpRegex = new RegExp(`^\\d{${this.otpArray.length}}$`);
        if (otpRegex.test(pasteData)) {
            event.preventDefault();
            pasteData.split('').forEach((char, i) => {
                const input = this.otpInputs.get(i);
                if (input) {
                    input.nativeElement.value = char;
                }
            });
            this.emitOtp();
            this.blurIfComplete();
        }
    }
    handleInput(event, index) {
        const input = event.target;
        const value = input.value;
        if (!/^\d$/.test(value) && value !== '') {
            input.value = '';
            return;
        }
        this.emitOtp();
        if (value && index < this.otpArray.length - 1) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }
        this.blurIfComplete();
    }
    handleKeyDown(event, index) {
        const input = event.target;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (index > 0) {
                const previousInput = this.otpInputs.get(index - 1)?.nativeElement;
                previousInput?.focus();
                const previousLength = previousInput?.value.length ?? 0;
                previousInput?.setSelectionRange(previousLength, previousLength);
            }
            return;
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (index < this.otpArray.length - 1) {
                const nextInput = this.otpInputs.get(index + 1)?.nativeElement;
                nextInput?.focus();
                const nextLength = nextInput?.value.length ?? 0;
                nextInput?.setSelectionRange(nextLength, nextLength);
            }
            return;
        }
        if (event.key === 'Backspace') {
            if (input.value === '' && index > 0) {
                this.otpInputs.get(index - 1)?.nativeElement.focus();
            }
            setTimeout(() => this.emitOtp());
        }
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!/^\d$/.test(event.key) &&
            !allowedKeys.includes(event.key) &&
            !(event.ctrlKey && event.key === 'v')) {
            event.preventDefault();
        }
    }
    static ɵfac = function OtpComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OtpComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OtpComponent, selectors: [["ui-otp"]], viewQuery: function OtpComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.otpInputs = _t);
        } }, inputs: { label: "label", parentFormGroup: "parentFormGroup", id: "id", otpLength: "otpLength" }, outputs: { otpChange: "otpChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 5, vars: 4, consts: [["otpInput", ""], [1, "block", "font-semibold", "mb-[10px]", "text-[#1E293B]", "!text-[#1E293B]", "text-left", "w-[300px]"], [1, "flex", "justify-between", "mb-[30px]", "w-[300px]", 3, "formGroup"], ["type", "text", "maxlength", "1", 1, "w-[40px]", "h-[40px]", "text-[18px]", "text-center", "border", "border-[#ccc]", "rounded-[6px]", "bg-[#f3f0ff]", "outline-none", "focus:!border-[#2563eb]", "focus:shadow-[0_0_0_3px_rgba(37,99,235,0.5)]"], ["type", "text", "maxlength", "1", 1, "w-[40px]", "h-[40px]", "text-[18px]", "text-center", "border", "border-[#ccc]", "rounded-[6px]", "bg-[#f3f0ff]", "outline-none", "focus:!border-[#2563eb]", "focus:shadow-[0_0_0_3px_rgba(37,99,235,0.5)]", 3, "paste", "input", "keydown"]], template: function OtpComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "label", 1);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵrepeaterCreate(3, OtpComponent_For_4_Template, 2, 1, "input", 3, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, "\n");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("error", ctx.isInvalid);
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.otpArray);
        } }, dependencies: [ReactiveFormsModule, i1.NgControlStatusGroup, i1.FormGroupDirective], styles: [".otp-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OtpComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-otp', imports: [ReactiveFormsModule], template: "<label\r\n  class=\"block font-semibold mb-[10px] text-[#1E293B] !text-[#1E293B] text-left w-[300px]\"\r\n>\r\n  {{ label }}\r\n</label>\r\n\r\n<div\r\n  class=\"flex justify-between mb-[30px] w-[300px]\"\r\n  [formGroup]=\"parentFormGroup\"\r\n  [class.error]=\"isInvalid\"\r\n>\r\n  @for (digit of otpArray; track $index; let i = $index) {\r\n    <input\r\n      type=\"text\"\r\n      maxlength=\"1\"\r\n      [attr.maxlength]=\"i === 0 ? otpLength.toString() : '1'\"\r\n      (paste)=\"i === 0 ? handlePaste($event) : null\"\r\n      (input)=\"handleInput($event, i)\"\r\n      (keydown)=\"handleKeyDown($event, i)\"\r\n      #otpInput\r\n      class=\"w-[40px] h-[40px] text-[18px] text-center border border-[#ccc] rounded-[6px] bg-[#f3f0ff] outline-none focus:!border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.5)]\"\r\n    />\r\n  }\r\n</div>\r\n", styles: [".otp-container {\r\n  height: 36px;\r\n}\r\n\r\n"] }]
    }], null, { otpInputs: [{
            type: ViewChildren,
            args: ['otpInput']
        }], label: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], otpLength: [{
            type: Input
        }], otpChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OtpComponent, { className: "OtpComponent", filePath: "libs/shared/ui/src/lib/components/controls/otp/otp.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=otp.component.js.map