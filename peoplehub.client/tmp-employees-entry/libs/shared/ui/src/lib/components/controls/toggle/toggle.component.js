import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ToggleComponent_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function ToggleComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵlistener("click", function ToggleComponent_Conditional_1_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.canToggleFromLabel && ctx_r1.onLabelClick(false)); });
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, ToggleComponent_Conditional_1_Conditional_2_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("text-black", !ctx_r1.checked || ctx_r1.labelPosition === "left" && ctx_r1.checked && !ctx_r1.hasSeparateOnOffLabels)("text-gray-400", ctx_r1.checked && !(ctx_r1.labelPosition === "left" && !ctx_r1.hasSeparateOnOffLabels));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.leftLabelText, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isRequired && ctx_r1.labelPosition !== "both" ? 2 : -1);
} }
function ToggleComponent_Conditional_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function ToggleComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵlistener("click", function ToggleComponent_Conditional_6_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.canToggleFromLabel && ctx_r1.onLabelClick(true)); });
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, ToggleComponent_Conditional_6_Conditional_2_Template, 2, 0, "span", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("text-black", ctx_r1.checked || ctx_r1.labelPosition === "right" && !ctx_r1.checked && !ctx_r1.hasSeparateOnOffLabels)("text-gray-400", !ctx_r1.checked && !(ctx_r1.labelPosition === "right" && !ctx_r1.hasSeparateOnOffLabels));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.rightLabelText, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isRequired ? 2 : -1);
} }
export class ToggleComponent {
    checked = false;
    color = '#4CAF50';
    checkedChange = new EventEmitter();
    toggleChange = new EventEmitter();
    label = '';
    labelPosition = 'right';
    isRequired = true;
    labelColor = '#333';
    size = 'small';
    enableLabelClick = false;
    toggleOnlyMode = true;
    offLabel = '';
    onLabel = '';
    parentFormGroup;
    id;
    onToggleChange(event) {
        const value = event.target.checked;
        this.checked = value;
        if (this.parentFormGroup?.get(this.id)) {
            this.parentFormGroup.get(this.id)?.setValue(value);
        }
        this.checkedChange.emit(value);
        this.toggleChange.emit(value);
    }
    get formControl() {
        return this.parentFormGroup?.get(this.id);
    }
    get leftLabelText() {
        if (!this.hasSeparateOnOffLabels) {
            return this.label ?? '';
        }
        // When custom labels are provided, use them
        return this.offLabel || this.label || '';
    }
    get rightLabelText() {
        if (!this.hasSeparateOnOffLabels) {
            return this.label ?? '';
        }
        // When custom labels are provided, use them
        return this.onLabel || this.label || '';
    }
    get hasSeparateOnOffLabels() {
        return !!this.offLabel || !!this.onLabel;
    }
    get canToggleFromLabel() {
        if (this.enableLabelClick !== undefined) {
            return this.enableLabelClick;
        }
        return !(this.toggleOnlyMode ?? true);
    }
    ngOnInit() {
        this.checked = !!this.formControl?.value;
    }
    get toggleActiveColor() {
        return this.color;
    }
    get hostToggleLabelColor() {
        return this.labelColor;
    }
    onLabelClick(forceValue) {
        if (!this.canToggleFromLabel)
            return;
        if (forceValue !== undefined) {
            this.checked = forceValue;
        }
        else {
            this.checked = !this.checked;
        }
        this.parentFormGroup?.get(this.id)?.setValue(this.checked);
        this.checkedChange.emit(this.checked);
        this.toggleChange.emit(this.checked);
    }
    static ɵfac = function ToggleComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToggleComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToggleComponent, selectors: [["ui-toggle"]], hostVars: 4, hostBindings: function ToggleComponent_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵstyleProp("--toggle-active-color", ctx.toggleActiveColor)("--toggle-label-color", ctx.hostToggleLabelColor);
        } }, inputs: { checked: "checked", color: "color", label: "label", labelPosition: "labelPosition", isRequired: "isRequired", labelColor: "labelColor", size: "size", enableLabelClick: "enableLabelClick", toggleOnlyMode: "toggleOnlyMode", offLabel: "offLabel", onLabel: "onLabel", parentFormGroup: "parentFormGroup", id: "id" }, outputs: { checkedChange: "checkedChange", toggleChange: "toggleChange" }, decls: 7, vars: 4, consts: [[1, "toggle-container"], [1, "toggle-label", 3, "text-black", "text-gray-400"], [1, "toggle-wrapper", 3, "ngClass"], ["type", "checkbox", 1, "toggle-input", 3, "change", "checked"], [1, "toggle-track"], [1, "toggle-knob"], [1, "toggle-label", 3, "click"], [1, "required-asterisk"]], template: function ToggleComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, ToggleComponent_Conditional_1_Template, 3, 6, "span", 1);
            i0.ɵɵelementStart(2, "label", 2)(3, "input", 3);
            i0.ɵɵlistener("change", function ToggleComponent_Template_input_change_3_listener($event) { return ctx.onToggleChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "div", 4)(5, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, ToggleComponent_Conditional_6_Template, 3, 6, "span", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.labelPosition === "left" || ctx.labelPosition === "both" ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", "size-" + ctx.size);
            i0.ɵɵadvance();
            i0.ɵɵproperty("checked", ctx.checked);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.labelPosition === "right" || ctx.labelPosition === "both" ? 6 : -1);
        } }, dependencies: [CommonModule, i1.NgClass, ReactiveFormsModule], styles: ["[_nghost-%COMP%] {\r\n  display: inline-block;\r\n  --toggle-active-color: #4caf50;\r\n  --toggle-label-color: var(--color-text-primary);\r\n}\r\n\r\n.toggle-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 0.5rem;\r\n  height: 36px;\r\n}\r\n\r\n.toggle-label[_ngcontent-%COMP%] {\r\n  font-size: 0.875rem;\r\n  line-height: 1.25rem;\r\n  color: var(--toggle-label-color);\r\n  transition: color 0.2s;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.required-asterisk[_ngcontent-%COMP%] {\r\n  color: var(--color-danger);\r\n  margin-left: 0.125rem;\r\n}\r\n\r\n.toggle-wrapper[_ngcontent-%COMP%] {\r\n  --toggle-width: 34px;\r\n  --toggle-height: 18px;\r\n  --toggle-knob-size: 14px;\r\n  --toggle-knob-translate: 16px;\r\n  position: relative;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  width: var(--toggle-width);\r\n  height: var(--toggle-height);\r\n  cursor: pointer;\r\n}\r\n\r\n.toggle-wrapper.size-medium[_ngcontent-%COMP%] {\r\n  --toggle-width: 44px;\r\n  --toggle-height: 24px;\r\n  --toggle-knob-size: 18px;\r\n  --toggle-knob-translate: 20px;\r\n}\r\n\r\n.toggle-wrapper.size-large[_ngcontent-%COMP%] {\r\n  --toggle-width: 60px;\r\n  --toggle-height: 34px;\r\n  --toggle-knob-size: 26px;\r\n  --toggle-knob-translate: 26px;\r\n}\r\n\r\n.toggle-input[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  padding: 0;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  white-space: nowrap;\r\n  border: 0;\r\n}\r\n\r\n.toggle-track[_ngcontent-%COMP%] {\r\n  width: var(--toggle-width);\r\n  height: var(--toggle-height);\r\n  border-radius: 9999px;\r\n  background: var(--color-border);\r\n  transition:\r\n    background-color 0.2s,\r\n    box-shadow 0.2s;\r\n}\r\n\r\n.toggle-knob[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 2px;\r\n  top: 50%;\r\n  width: var(--toggle-knob-size);\r\n  height: var(--toggle-knob-size);\r\n  border-radius: 9999px;\r\n  background: var(--color-text-primary);\r\n  transform: translateY(-50%);\r\n  transition:\r\n    transform 0.2s,\r\n    background-color 0.2s;\r\n}\r\n\r\n.toggle-input[_ngcontent-%COMP%]:checked    + .toggle-track[_ngcontent-%COMP%] {\r\n  background: var(--toggle-active-color);\r\n}\r\n\r\n.toggle-input[_ngcontent-%COMP%]:checked    + .toggle-track[_ngcontent-%COMP%]    + .toggle-knob[_ngcontent-%COMP%] {\r\n  transform: translate(var(--toggle-knob-translate), -50%);\r\n  background: white;\r\n}\r\n\r\n.toggle-input[_ngcontent-%COMP%]:focus-visible    + .toggle-track[_ngcontent-%COMP%] {\r\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToggleComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-toggle', imports: [CommonModule, ReactiveFormsModule], standalone: true, template: "<div class=\"toggle-container\">\r\n  @if (labelPosition === \"left\" || labelPosition === \"both\") {\r\n    <span\r\n      class=\"toggle-label\"\r\n      [class.text-black]=\"\r\n        !checked ||\r\n        (labelPosition === 'left' &&\r\n          checked &&\r\n          !hasSeparateOnOffLabels)\r\n      \"\r\n      [class.text-gray-400]=\"\r\n        checked &&\r\n        !(labelPosition === 'left' && !hasSeparateOnOffLabels)\r\n      \"\r\n      (click)=\"canToggleFromLabel && onLabelClick(false)\"\r\n    >\r\n      {{ leftLabelText }}\r\n      @if (isRequired && labelPosition !== 'both') {\r\n        <span class=\"required-asterisk\">*</span>\r\n      }\r\n    </span>\r\n  }\r\n\r\n  <label class=\"toggle-wrapper\" [ngClass]=\"'size-' + size\">\r\n    <input\r\n      type=\"checkbox\"\r\n      [checked]=\"checked\"\r\n      (change)=\"onToggleChange($event)\"\r\n      class=\"toggle-input\"\r\n    />\r\n\r\n    <div class=\"toggle-track\"></div>\r\n\r\n    <div class=\"toggle-knob\"></div>\r\n  </label>\r\n\r\n  @if (labelPosition === \"right\" || labelPosition === \"both\") {\r\n    <span\r\n      class=\"toggle-label\"\r\n      [class.text-black]=\"\r\n        checked ||\r\n        (labelPosition === 'right' &&\r\n          !checked &&\r\n          !hasSeparateOnOffLabels)\r\n      \"\r\n      [class.text-gray-400]=\"\r\n        !checked &&\r\n        !(labelPosition === 'right' && !hasSeparateOnOffLabels)\r\n      \"\r\n      (click)=\"canToggleFromLabel && onLabelClick(true)\"\r\n    >\r\n      {{ rightLabelText }}\r\n      @if (isRequired) {\r\n        <span class=\"required-asterisk\">*</span>\r\n      }\r\n    </span>\r\n  }\r\n</div>\r\n", styles: [":host {\r\n  display: inline-block;\r\n  --toggle-active-color: #4caf50;\r\n  --toggle-label-color: var(--color-text-primary);\r\n}\r\n\r\n.toggle-container {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 0.5rem;\r\n  height: 36px;\r\n}\r\n\r\n.toggle-label {\r\n  font-size: 0.875rem;\r\n  line-height: 1.25rem;\r\n  color: var(--toggle-label-color);\r\n  transition: color 0.2s;\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.required-asterisk {\r\n  color: var(--color-danger);\r\n  margin-left: 0.125rem;\r\n}\r\n\r\n.toggle-wrapper {\r\n  --toggle-width: 34px;\r\n  --toggle-height: 18px;\r\n  --toggle-knob-size: 14px;\r\n  --toggle-knob-translate: 16px;\r\n  position: relative;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  width: var(--toggle-width);\r\n  height: var(--toggle-height);\r\n  cursor: pointer;\r\n}\r\n\r\n.toggle-wrapper.size-medium {\r\n  --toggle-width: 44px;\r\n  --toggle-height: 24px;\r\n  --toggle-knob-size: 18px;\r\n  --toggle-knob-translate: 20px;\r\n}\r\n\r\n.toggle-wrapper.size-large {\r\n  --toggle-width: 60px;\r\n  --toggle-height: 34px;\r\n  --toggle-knob-size: 26px;\r\n  --toggle-knob-translate: 26px;\r\n}\r\n\r\n.toggle-input {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  padding: 0;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  white-space: nowrap;\r\n  border: 0;\r\n}\r\n\r\n.toggle-track {\r\n  width: var(--toggle-width);\r\n  height: var(--toggle-height);\r\n  border-radius: 9999px;\r\n  background: var(--color-border);\r\n  transition:\r\n    background-color 0.2s,\r\n    box-shadow 0.2s;\r\n}\r\n\r\n.toggle-knob {\r\n  position: absolute;\r\n  left: 2px;\r\n  top: 50%;\r\n  width: var(--toggle-knob-size);\r\n  height: var(--toggle-knob-size);\r\n  border-radius: 9999px;\r\n  background: var(--color-text-primary);\r\n  transform: translateY(-50%);\r\n  transition:\r\n    transform 0.2s,\r\n    background-color 0.2s;\r\n}\r\n\r\n.toggle-input:checked + .toggle-track {\r\n  background: var(--toggle-active-color);\r\n}\r\n\r\n.toggle-input:checked + .toggle-track + .toggle-knob {\r\n  transform: translate(var(--toggle-knob-translate), -50%);\r\n  background: white;\r\n}\r\n\r\n.toggle-input:focus-visible + .toggle-track {\r\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);\r\n}"] }]
    }], null, { checked: [{
            type: Input
        }], color: [{
            type: Input
        }], checkedChange: [{
            type: Output
        }], toggleChange: [{
            type: Output
        }], label: [{
            type: Input
        }], labelPosition: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], labelColor: [{
            type: Input
        }], size: [{
            type: Input
        }], enableLabelClick: [{
            type: Input
        }], toggleOnlyMode: [{
            type: Input
        }], offLabel: [{
            type: Input
        }], onLabel: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], toggleActiveColor: [{
            type: HostBinding,
            args: ['style.--toggle-active-color']
        }], hostToggleLabelColor: [{
            type: HostBinding,
            args: ['style.--toggle-label-color']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToggleComponent, { className: "ToggleComponent", filePath: "libs/shared/ui/src/lib/components/controls/toggle/toggle.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=toggle.component.js.map