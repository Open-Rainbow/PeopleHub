import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function SearchComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 3);
} if (rf & 2) {
    i0.ɵɵproperty("name", "iconamoon:search");
} }
function SearchComponent_Conditional_6_Conditional_1_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 9);
    i0.ɵɵlistener("mousedown", function SearchComponent_Conditional_6_Conditional_1_For_1_Template_li_mousedown_0_listener() { const suggestion_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectSuggestion(suggestion_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const suggestion_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", suggestion_r2, " ");
} }
function SearchComponent_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, SearchComponent_Conditional_6_Conditional_1_For_1_Template, 2, 1, "li", 8, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r2.filteredSuggestions);
} }
function SearchComponent_Conditional_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵtext(1, " No such data is found ");
    i0.ɵɵelementEnd();
} }
function SearchComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 6);
    i0.ɵɵconditionalCreate(1, SearchComponent_Conditional_6_Conditional_1_Template, 2, 0)(2, SearchComponent_Conditional_6_Conditional_2_Template, 2, 0, "li", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.filteredSuggestions.length > 0 ? 1 : 2);
} }
export class SearchComponent {
    placeholderText = 'Search employees by name, email, position, or department...';
    showBorder = true;
    borderColor = '#2563eb';
    showIcon = true;
    parentFormGroup;
    id;
    displaySuggestions;
    searchData = [];
    onSelect = new EventEmitter();
    suggestionsVisible = false;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return (this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    searchControl = new FormControl('');
    filteredSuggestions = [];
    ngOnInit() {
        this.searchControl.valueChanges.subscribe((value) => {
            const query = value ?? '';
            if (query.length === 0) {
                this.filteredSuggestions = [];
                this.suggestionsVisible = false;
                this.onSelect.emit('');
                return;
            }
            this.filterData(query);
        });
    }
    filterData(query) {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) {
            this.filteredSuggestions = [];
            this.suggestionsVisible = false;
            return;
        }
        this.filteredSuggestions = (this.searchData ?? []).filter((item) => item.toLowerCase().includes(lowerQuery));
        this.suggestionsVisible = this.displaySuggestions !== false;
    }
    selectSuggestion(value) {
        this.searchControl.setValue(value, { emitEvent: false });
        this.suggestionsVisible = false;
        this.onSelect.emit(value);
    }
    hideSuggestionsWithDelay() {
        setTimeout(() => {
            this.suggestionsVisible = false;
        }, 200);
    }
    clearSearch() {
        this.searchControl.setValue('');
        this.filteredSuggestions = [];
        this.suggestionsVisible = false;
        this.onSelect.emit('');
    }
    static ɵfac = function SearchComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SearchComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchComponent, selectors: [["ui-search"]], inputs: { placeholderText: "placeholderText", showBorder: "showBorder", borderColor: "borderColor", showIcon: "showIcon", parentFormGroup: "parentFormGroup", id: "id", displaySuggestions: "displaySuggestions", searchData: "searchData" }, outputs: { onSelect: "onSelect" }, decls: 7, vars: 18, consts: [[1, "w-full", "h-full", "bg-white", "rounded-lg", "border-none", 3, "formGroup"], [1, "w-full", "relative", "flex", "flex-col"], [1, "h-9", "flex", "items-center", "bg-white", "rounded-lg", "px-3.5", "py-2.5", "transition-all", "duration-300", "ease-in-out"], [1, "text-gray-400", "min-w-[20px]", "flex", "items-center", "justify-center", "mr-2.5", 3, "name"], ["type", "text", 1, "w-full", "bg-transparent", "border-none", "outline-none", "text-[15px]", "text-gray-800", "placeholder:text-gray-400", 3, "focus", "blur", "formControl", "placeholder"], [1, "text-black", "cursor-pointer", 3, "click", "name"], [1, "absolute", "top-full", "left-0", "w-full", "mt-1.5", "bg-white", "rounded-lg", "shadow-md", "z-[1000]", "p-2", "max-h-[60vh]", "overflow-y-auto", "text-xs", "mb-2.5"], [1, "cursor-default", "text-gray-500", "italic", "px-4", "py-2.5"], [1, "px-4", "py-2.5", "cursor-pointer", "rounded-lg", "transition-colors", "duration-200", "hover:bg-gray-200"], [1, "px-4", "py-2.5", "cursor-pointer", "rounded-lg", "transition-colors", "duration-200", "hover:bg-gray-200", 3, "mousedown"]], template: function SearchComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵconditionalCreate(3, SearchComponent_Conditional_3_Template, 1, 1, "ui-icon", 3);
            i0.ɵɵelementStart(4, "input", 4);
            i0.ɵɵlistener("focus", function SearchComponent_Template_input_focus_4_listener() { return ctx.suggestionsVisible = !!ctx.searchControl.value && ctx.filteredSuggestions.length > 0; })("blur", function SearchComponent_Template_input_blur_4_listener() { return ctx.hideSuggestionsWithDelay(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "ui-icon", 5);
            i0.ɵɵlistener("click", function SearchComponent_Template_ui_icon_click_5_listener() { return ctx.clearSearch(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, SearchComponent_Conditional_6_Template, 3, 1, "ul", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("--border-color", ctx.borderColor);
            i0.ɵɵclassProp("shadow-[inset_0_0_0_1px_var(--border-color,#2563eb)]", ctx.showBorder)("focus-within:shadow-[0_0_0_1px_var(--border-color,#2563eb)]", ctx.showBorder)("ring-1", ctx.isInvalid && ctx.showBorder)("ring-red-500", ctx.isInvalid && ctx.showBorder);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showIcon ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formControl", ctx.searchControl)("placeholder", ctx.placeholderText);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("visibility", ctx.searchControl.value ? "visible" : "hidden");
            i0.ɵɵproperty("name", "cross_2");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.suggestionsVisible ? 6 : -1);
        } }, dependencies: [IconComponent, ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormControlDirective, i1.FormGroupDirective, CommonModule], styles: [".search-container[_ngcontent-%COMP%] {\r\n  height: 36px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-search', standalone: true, imports: [IconComponent, ReactiveFormsModule, CommonModule], template: "<div class=\"w-full h-full bg-white rounded-lg border-none\" [formGroup]=\"parentFormGroup\">\r\n  <div class=\"w-full relative flex flex-col\">\r\n\r\n    \r\n    <div\r\n      class=\"h-9 flex items-center bg-white rounded-lg px-3.5 py-2.5 transition-all duration-300 ease-in-out\"\r\n      [class.shadow-[inset_0_0_0_1px_var(--border-color,#2563eb)]]=\"showBorder\"\r\n      [class.focus-within:shadow-[0_0_0_1px_var(--border-color,#2563eb)]]=\"showBorder\"\r\n      [class.ring-1]=\"isInvalid && showBorder\"\r\n      [class.ring-red-500]=\"isInvalid && showBorder\"\r\n      [style.--border-color]=\"borderColor\"\r\n    >\r\n\r\n      @if (showIcon) {\r\n        <ui-icon\r\n          class=\"text-gray-400 min-w-[20px] flex items-center justify-center mr-2.5\"\r\n          [name]=\"'iconamoon:search'\">\r\n        </ui-icon>\r\n      }\r\n\r\n      <input\r\n        type=\"text\"\r\n        class=\"w-full bg-transparent border-none outline-none text-[15px] text-gray-800 placeholder:text-gray-400\"\r\n        [formControl]=\"searchControl\"\r\n        [placeholder]=\"placeholderText\"\r\n        (focus)=\"suggestionsVisible = !!searchControl.value && filteredSuggestions.length > 0\"\r\n        (blur)=\"hideSuggestionsWithDelay()\"\r\n      />\r\n\r\n      <ui-icon\r\n        class=\"text-black cursor-pointer\"\r\n        [style.visibility]=\"searchControl.value ? 'visible' : 'hidden'\"\r\n        [name]=\"'cross_2'\"\r\n        (click)=\"clearSearch()\">\r\n      </ui-icon>\r\n\r\n    </div>\r\n\r\n    \r\n    @if (suggestionsVisible) {\r\n      <ul class=\"absolute top-full left-0 w-full mt-1.5 bg-white rounded-lg shadow-md z-[1000] p-2 max-h-[60vh] overflow-y-auto text-xs mb-2.5\">\r\n\r\n        @if (filteredSuggestions.length > 0) {\r\n          @for (suggestion of filteredSuggestions; track suggestion) {\r\n            <li\r\n              class=\"px-4 py-2.5 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-200\"\r\n              (mousedown)=\"selectSuggestion(suggestion)\">\r\n              {{ suggestion }}\r\n            </li>\r\n          }\r\n        } @else {\r\n          <li class=\"cursor-default text-gray-500 italic px-4 py-2.5\">\r\n            No such data is found\r\n          </li>\r\n        }\r\n\r\n      </ul>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n", styles: [".search-container {\r\n  height: 36px;\r\n}\r\n"] }]
    }], null, { placeholderText: [{
            type: Input
        }], showBorder: [{
            type: Input
        }], borderColor: [{
            type: Input
        }], showIcon: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], displaySuggestions: [{
            type: Input
        }], searchData: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SearchComponent, { className: "SearchComponent", filePath: "libs/shared/ui/src/lib/components/controls/search/search.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=search.component.js.map