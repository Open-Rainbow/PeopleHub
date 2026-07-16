import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LabelValueComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function LabelValueComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.value);
} }
function LabelValueComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 7);
    i0.ɵɵtwoWayListener("ngModelChange", function LabelValueComponent_Conditional_7_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.editableValue, $event) || (ctx_r0.editableValue = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LabelValueComponent_Conditional_7_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onValueChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.editableValue);
    i0.ɵɵproperty("formControlName", ctx_r0.id)("required", ctx_r0.isRequired);
} }
export class LabelValueComponent {
    label = 'Employee ID';
    value;
    isRequired = false;
    isEditMode = false;
    parentFormGroup;
    id;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    editableValue = '';
    ngOnChanges() {
        if (this.isEditMode) {
            this.editableValue = this.value || '';
        }
    }
    onValueChange(value) {
        this.editableValue = value;
    }
    static ɵfac = function LabelValueComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LabelValueComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LabelValueComponent, selectors: [["ui-label-value"]], inputs: { label: "label", value: "value", isRequired: "isRequired", isEditMode: "isEditMode", parentFormGroup: "parentFormGroup", id: "id" }, features: [i0.ɵɵNgOnChangesFeature], decls: 8, vars: 6, consts: [[1, "parent", 3, "formGroup"], [1, "w-full", "flex", "flex-col", "font-sans"], [1, "flex", "items-center", "gap-1"], [1, "text-sm", "text-gray-500", "font-medium", "mb-1"], [1, "text-red-600", "text-base", "font-semibold", "-mt-3"], [1, "text-base", "text-gray-900", "font-bold"], ["type", "text", 1, "edit-input", 3, "ngModel", "formControlName", "required"], ["type", "text", 1, "edit-input", 3, "ngModelChange", "ngModel", "formControlName", "required"]], template: function LabelValueComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, LabelValueComponent_Conditional_5_Template, 2, 0, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, LabelValueComponent_Conditional_6_Template, 2, 1, "div", 5)(7, LabelValueComponent_Conditional_7_Template, 1, 3, "input", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("error", ctx.isInvalid);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isEditMode ? 6 : 7);
        } }, dependencies: [FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LabelValueComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-label-value', imports: [FormsModule, ReactiveFormsModule], template: "<div class=\"parent\" [formGroup]=\"parentFormGroup\">\r\n  <div class=\"w-full flex flex-col font-sans\" [class.error]=\"isInvalid\">\r\n    \r\n    <div class=\"flex items-center gap-1\">\r\n      <div class=\"text-sm text-gray-500 font-medium mb-1\">{{ label }}</div>\r\n      @if (isRequired) {\r\n        <span class=\"text-red-600 text-base font-semibold -mt-3\">*</span>\r\n      }\r\n    </div>\r\n    \r\n    @if (!isEditMode) {\r\n      <div class=\"text-base text-gray-900 font-bold\">{{ value }}</div>\r\n    } @else {\r\n      <input \r\n       class=\"edit-input\" \r\n        type=\"text\"\r\n        [(ngModel)]=\"editableValue\"\r\n        [formControlName]=\"id\" \r\n        (ngModelChange)=\"onValueChange($event)\"\r\n        [required]=\"isRequired\">\r\n        \r\n    }\r\n  </div>\r\n</div>" }]
    }], null, { label: [{
            type: Input
        }], value: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], isEditMode: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LabelValueComponent, { className: "LabelValueComponent", filePath: "libs/shared/ui/src/lib/components/controls/label-value/label-value.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=label-value.component.js.map