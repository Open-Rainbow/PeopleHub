import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["selectedYearRef"];
const _c1 = ["ripple"];
function ValueSelectComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("rotate-180", ctx_r0.isOpen);
} }
function ValueSelectComponent_Conditional_9_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "button", 10);
    i0.ɵɵlistener("click", function ValueSelectComponent_Conditional_9_For_3_Template_button_click_1_listener() { const value_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectYear(value_r3.value)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const value_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", value_r3.value === ctx_r0.selectedYear ? ctx_r0.activeTextColor : value_r3.textColor)("background-color", value_r3.value === ctx_r0.selectedYear ? value_r3.backgroundColor : null);
    i0.ɵɵclassProp("opacity-30", value_r3.isDisabled)("cursor-not-allowed", value_r3.isDisabled);
    i0.ɵɵproperty("disabled", value_r3.isDisabled);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", value_r3.value, " ");
} }
function ValueSelectComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, ValueSelectComponent_Conditional_9_For_3_Template, 3, 10, "div", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.dropdownValues);
} }
export class ValueSelectComponent {
    renderer;
    dropdownValues = [];
    defaultSelected = null;
    textColor = '#111';
    backgroundColor = 'white';
    activeBackgroundColor = '#eaf0ff';
    borderColor = 'lightgray';
    activeTextColor = '#316aff';
    parentFormGroup;
    id;
    showIcon = true;
    onSelect = new EventEmitter();
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return (this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    selectedYearRef;
    rippleRef;
    selectedYear = null;
    isOpen = false;
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngOnInit() {
        if (this.defaultSelected !== null && this.defaultSelected !== undefined) {
            this.selectedYear = this.defaultSelected;
        }
        else {
            const defaultOption = this.dropdownValues?.find((x) => x.isDefault);
            this.selectedYear = defaultOption ? defaultOption.value : null;
        }
    }
    toggleDropdown(event) {
        this.isOpen = !this.isOpen;
        const btn = this.selectedYearRef.nativeElement;
        const ripple = this.rippleRef.nativeElement;
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.renderer.setStyle(ripple, 'top', `${y}px`);
        this.renderer.setStyle(ripple, 'left', `${x}px`);
        this.renderer.removeClass(ripple, 'ripple-active');
        void ripple.offsetWidth;
        this.renderer.addClass(ripple, 'ripple-active');
    }
    selectYear(value) {
        this.selectedYear = value;
        this.isOpen = false;
        this.onSelect.emit(value);
    }
    handleClickOutside(event) {
        const clickedInside = this.selectedYearRef.nativeElement
            .closest('.relative')
            ?.contains(event.target);
        if (!clickedInside) {
            this.isOpen = false;
        }
    }
    static ɵfac = function ValueSelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ValueSelectComponent)(i0.ɵɵdirectiveInject(i0.Renderer2)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ValueSelectComponent, selectors: [["ui-value-select"]], viewQuery: function ValueSelectComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7)(_c1, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.selectedYearRef = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.rippleRef = _t.first);
        } }, hostBindings: function ValueSelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function ValueSelectComponent_click_HostBindingHandler($event) { return ctx.handleClickOutside($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { dropdownValues: "dropdownValues", defaultSelected: "defaultSelected", textColor: "textColor", backgroundColor: "backgroundColor", activeBackgroundColor: "activeBackgroundColor", borderColor: "borderColor", activeTextColor: "activeTextColor", parentFormGroup: "parentFormGroup", id: "id", showIcon: "showIcon" }, outputs: { onSelect: "onSelect" }, decls: 10, vars: 12, consts: [["selectedYearRef", ""], ["ripple", ""], [1, "relative", "inline-block", "w-full", 3, "formGroup"], ["type", "button", "id", "selected-year", 1, "relative", "overflow-hidden", "py-[0.35rem]", "px-[0.7rem]", "text-[0.8125rem]", "min-h-[36px]", "w-full", "flex", "items-left", "justify-between", "border", "rounded-lg", "transition-colors", "duration-200", 3, "click"], [1, "flex", "items-center", "gap-2"], ["name", "icon_park_outline_down", 1, "text-[0.8125rem]", "transition-transform", "duration-200", 3, "rotate-180"], [1, "absolute", "rounded-full", "scale-0", "pointer-events-none", "w-5", "h-5", "bg-[rgba(64,118,255,0.35)]"], [1, "absolute", "right-0", "top-full", "mt-2", "z-50", "bg-white", "shadow-lg", "rounded-lg", "py-[0.35rem]", "px-[0.7rem]", "text-[0.8125rem]", "min-h-[36px]", "min-w-full", "w-max", "p-2"], ["name", "icon_park_outline_down", 1, "text-[0.8125rem]", "transition-transform", "duration-200"], [1, "flex", "flex-col", "gap-1"], ["type", "button", 1, "w-full", "text-left", "px-2", "py-1", "rounded-md", "whitespace-nowrap", "transition-all", "duration-200", "hover:bg-gray-100", 3, "click", "disabled"]], template: function ValueSelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "button", 3, 0);
            i0.ɵɵlistener("click", function ValueSelectComponent_Template_button_click_1_listener($event) { return ctx.toggleDropdown($event); });
            i0.ɵɵelementStart(3, "div", 4)(4, "span");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, ValueSelectComponent_Conditional_6_Template, 1, 2, "ui-icon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "span", 6, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(9, ValueSelectComponent_Conditional_9_Template, 4, 0, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("border-red-500", ctx.isInvalid);
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("color", ctx.isOpen ? ctx.activeTextColor : ctx.textColor)("background-color", ctx.isOpen ? ctx.activeBackgroundColor : ctx.backgroundColor)("border-color", ctx.borderColor);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.selectedYear);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showIcon === true ? 6 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.isOpen ? 9 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.NgControlStatusGroup, i1.FormGroupDirective, IconComponent], styles: [".value-select-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ValueSelectComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-value-select', imports: [CommonModule, ReactiveFormsModule, IconComponent], template: "<div\r\n  class=\"relative inline-block w-full\"\r\n  [formGroup]=\"parentFormGroup\"\r\n  [class.border-red-500]=\"isInvalid\"\r\n>\r\n\r\n  \r\n  <button\r\n    type=\"button\"\r\n    #selectedYearRef\r\n    id=\"selected-year\"\r\n    (click)=\"toggleDropdown($event)\"\r\n    class=\"relative overflow-hidden py-[0.35rem] px-[0.7rem] text-[0.8125rem] min-h-[36px] w-full\r\n           flex items-left justify-between\r\n           border rounded-lg transition-colors duration-200\"\r\n    [style.color]=\"isOpen ? activeTextColor : textColor\"\r\n    [style.background-color]=\"isOpen ? activeBackgroundColor : backgroundColor\"\r\n    [style.border-color]=\"borderColor\"\r\n  >\r\n    <div class=\"flex items-center gap-2\">\r\n      <span>{{ selectedYear }}</span>\r\n\r\n      @if (showIcon === true) {\r\n      <ui-icon\r\n        name=\"icon_park_outline_down\"\r\n        class=\"text-[0.8125rem] transition-transform duration-200\"\r\n        [class.rotate-180]=\"isOpen\">\r\n      </ui-icon>\r\n\r\n      }\r\n    </div>\r\n\r\n\r\n    \r\n    <span\r\n      #ripple\r\n      class=\"absolute rounded-full scale-0 pointer-events-none\r\n             w-5 h-5 bg-[rgba(64,118,255,0.35)]\">\r\n    </span>\r\n  </button>\r\n\r\n  \r\n  @if(isOpen){\r\n    <div class=\"absolute right-0 top-full mt-2 z-50\r\n               bg-white shadow-lg rounded-lg\r\n               py-[0.35rem] px-[0.7rem] text-[0.8125rem] min-h-[36px] min-w-full w-max p-2\">\r\n      <div class=\"flex flex-col gap-1\">\r\n    \r\n        @for (value of dropdownValues; track value) {\r\n        <div>\r\n          <button type=\"button\" class=\"w-full text-left px-2 py-1\r\n                      rounded-md whitespace-nowrap\r\n                      transition-all duration-200\r\n                      hover:bg-gray-100\" [class.opacity-30]=\"value.isDisabled\"\r\n            [class.cursor-not-allowed]=\"value.isDisabled\" [style.color]=\"\r\n                  value.value === selectedYear \r\n                    ? activeTextColor \r\n                    : value.textColor\r\n                \" [style.backgroundColor]=\"\r\n                  value.value === selectedYear \r\n                    ? value.backgroundColor \r\n                    : null\r\n                \" (click)=\"selectYear(value.value)\" [disabled]=\"value.isDisabled\">\r\n            {{ value.value }}\r\n          </button>\r\n    \r\n        </div>\r\n        }\r\n    \r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [".value-select-container {\r\n  height: 36px;\r\n}\r\n"] }]
    }], () => [{ type: i0.Renderer2 }], { dropdownValues: [{
            type: Input
        }], defaultSelected: [{
            type: Input
        }], textColor: [{
            type: Input
        }], backgroundColor: [{
            type: Input
        }], activeBackgroundColor: [{
            type: Input
        }], borderColor: [{
            type: Input
        }], activeTextColor: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], showIcon: [{
            type: Input
        }], onSelect: [{
            type: Output
        }], selectedYearRef: [{
            type: ViewChild,
            args: ['selectedYearRef', { static: true }]
        }], rippleRef: [{
            type: ViewChild,
            args: ['ripple', { static: true }]
        }], handleClickOutside: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ValueSelectComponent, { className: "ValueSelectComponent", filePath: "libs/shared/ui/src/lib/components/controls/value-select/value-select.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=value-select.component.js.map