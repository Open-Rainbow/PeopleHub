import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function SearchDropdownComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function SearchDropdownComponent_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSearch()); });
    i0.ɵɵelement(1, "ui-icon", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", "mdi:close");
} }
function SearchDropdownComponent_Conditional_7_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.getFieldValue(item_r4, ctx_r1.config.subtitleField));
} }
function SearchDropdownComponent_Conditional_7_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2022 ", ctx_r1.getFieldValue(item_r4, ctx_r1.config.descriptionField));
} }
function SearchDropdownComponent_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 10);
    i0.ɵɵlistener("mousedown", function SearchDropdownComponent_Conditional_7_For_2_Template_li_mousedown_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectItem(item_r4)); });
    i0.ɵɵelementStart(1, "div", 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 12);
    i0.ɵɵconditionalCreate(4, SearchDropdownComponent_Conditional_7_For_2_Conditional_4_Template, 2, 1, "span");
    i0.ɵɵconditionalCreate(5, SearchDropdownComponent_Conditional_7_For_2_Conditional_5_Template, 2, 1, "span");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.getFieldValue(item_r4, (ctx_r1.config == null ? null : ctx_r1.config.displayField) || "name"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((ctx_r1.config == null ? null : ctx_r1.config.subtitleField) ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.config == null ? null : ctx_r1.config.descriptionField) ? 5 : -1);
} }
function SearchDropdownComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 6);
    i0.ɵɵrepeaterCreate(1, SearchDropdownComponent_Conditional_7_For_2_Template, 6, 3, "li", 9, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.filteredList);
} }
function SearchDropdownComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 6)(1, "li", 13);
    i0.ɵɵtext(2, "No results found");
    i0.ɵɵelementEnd()();
} }
export class SearchDropdownComponent {
    cdr;
    label = 'Search';
    placeholderText = 'Search by name, email, position, or department...';
    showBorder = true;
    borderColor = '#2563eb';
    parentFormGroup;
    id;
    data = [];
    config;
    onSelect = new EventEmitter();
    isOpen = false;
    defaultConfig = {
        displayField: 'name',
        subtitleField: 'email',
        descriptionField: 'position',
        searchFields: ['name', 'email'],
    };
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return this.control?.invalid && (this.control?.dirty || this.control?.touched);
    }
    searchControl = new FormControl('');
    filteredList = [];
    destroy$ = new Subject();
    getConfig() {
        return this.config || this.defaultConfig;
    }
    getFieldValue(item, field) {
        return String(item?.[field] ?? '');
    }
    onInputFocus() {
        this.isOpen = true;
        this.filterList(this.searchControl.value);
        this.cdr.markForCheck();
    }
    onInputBlur() {
        setTimeout(() => {
            this.isOpen = false;
            this.cdr.markForCheck();
        }, 200);
    }
    selectItem(item) {
        const displayValue = this.getFieldValue(item, this.getConfig().displayField);
        this.searchControl.setValue(displayValue);
        this.onSelect.emit(item);
        this.isOpen = false;
        this.cdr.markForCheck();
    }
    clearSearch() {
        this.searchControl.setValue('');
        this.cdr.markForCheck();
    }
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngOnInit() {
        this.searchControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((query) => {
            this.filterList(query);
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        if (changes['data'] && !changes['data'].firstChange) {
            this.filterList(this.searchControl.value);
            this.cdr.markForCheck();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    filterList(query) {
        const searchQuery = (query ?? '').toLowerCase().trim();
        const config = this.getConfig();
        const fieldsToSearch = config.searchFields || Object.keys(this.data?.[0] || {}).filter((key) => typeof this.data?.[0]?.[key] === 'string');
        if (!searchQuery) {
            // Show all items when search is empty
            this.filteredList = this.data ?? [];
            return;
        }
        // Filter items based on search query
        this.filteredList = (this.data ?? []).filter((item) => fieldsToSearch.some((field) => String(item[field] ?? '').toLowerCase().includes(searchQuery)));
    }
    static ɵfac = function SearchDropdownComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SearchDropdownComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchDropdownComponent, selectors: [["ui-search-dropdown"]], inputs: { label: "label", placeholderText: "placeholderText", showBorder: "showBorder", borderColor: "borderColor", parentFormGroup: "parentFormGroup", id: "id", data: "data", config: "config" }, outputs: { onSelect: "onSelect" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 22, consts: [[1, "search-dropdown-container", 3, "formGroup"], [1, "input-wrapper"], [1, "search-input"], ["type", "text", 1, "input-field", 3, "focus", "blur", "formControl", "placeholder"], [1, "input-label"], ["type", "button", "aria-label", "Clear search", 1, "clear-button"], [1, "dropdown-list"], ["type", "button", "aria-label", "Clear search", 1, "clear-button", 3, "click"], [3, "name"], [1, "dropdown-item"], [1, "dropdown-item", 3, "mousedown"], [1, "item-display"], [1, "item-meta"], [1, "dropdown-empty"]], template: function SearchDropdownComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "input", 3);
            i0.ɵɵlistener("focus", function SearchDropdownComponent_Template_input_focus_3_listener() { return ctx.onInputFocus(); })("blur", function SearchDropdownComponent_Template_input_blur_3_listener() { return ctx.onInputBlur(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "label", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, SearchDropdownComponent_Conditional_6_Template, 2, 1, "button", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(7, SearchDropdownComponent_Conditional_7_Template, 3, 0, "ul", 6);
            i0.ɵɵconditionalCreate(8, SearchDropdownComponent_Conditional_8_Template, 3, 0, "ul", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵattribute("data-width-text", ctx.label || ctx.placeholderText || "");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-gray", !ctx.isOpen && !ctx.isInvalid)("border-blue", ctx.isOpen && !ctx.isInvalid)("border-red", ctx.isInvalid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formControl", ctx.searchControl)("placeholder", ctx.placeholderText);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("floating", ctx.isOpen || ctx.searchControl.value)("blue", ctx.isOpen && !ctx.isInvalid)("gray", !ctx.isOpen && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searchControl.value ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isOpen && ctx.filteredList.length > 0 ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isOpen && ctx.filteredList.length === 0 ? 8 : -1);
        } }, dependencies: [IconComponent, CommonModule, ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormControlDirective, i1.FormGroupDirective], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.search-dropdown-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 2.25rem 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 2.25rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.input-field[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.input-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--search-dropdown-label-bg, var(--input-bg, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.clear-button[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.5rem;\r\n  height: 100%;\r\n  margin-right: 0.75rem;\r\n  border: none;\r\n  background: none;\r\n  cursor: pointer;\r\n  color: var(--color-text-muted);\r\n  transition: color 0.2s;\r\n  padding: 0;\r\n  flex-shrink: 0;\r\n\r\n  &:hover {\r\n    color: var(--color-text-secondary);\r\n  }\r\n\r\n  ui-icon {\r\n    width: 20px;\r\n    height: 20px;\r\n  }\r\n}\r\n\r\n.dropdown-list[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  width: 100%;\r\n  margin-top: 0.375rem;\r\n  background-color: var(--color-surface);\r\n  border-radius: 0.375rem;\r\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\r\n  list-style: none;\r\n  padding: 0.5rem;\r\n  max-height: 60vh;\r\n  overflow-y: auto;\r\n  z-index: 1000;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dropdown-item[_ngcontent-%COMP%] {\r\n  padding: 0.625rem 1rem;\r\n  cursor: pointer;\r\n  border-radius: 0.375rem;\r\n  transition: background-color 0.2s;\r\n\r\n  &:hover {\r\n    background-color: var(--color-surface-muted);\r\n  }\r\n}\r\n\r\n.item-display[_ngcontent-%COMP%] {\r\n  font-weight: 500;\r\n  color: var(--color-text-primary);\r\n  font-size: 0.875rem;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.item-meta[_ngcontent-%COMP%] {\r\n  font-size: 0.75rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.dropdown-empty[_ngcontent-%COMP%] {\r\n  padding: 0.75rem 1rem;\r\n  text-align: center;\r\n  color: var(--color-text-muted);\r\n  font-size: 0.875rem;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchDropdownComponent, [{
        type: Component,
        args: [{ selector: 'ui-search-dropdown', imports: [IconComponent, CommonModule, ReactiveFormsModule], standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"search-dropdown-container\" [attr.data-width-text]=\"label || placeholderText || ''\" [formGroup]=\"parentFormGroup\">\r\n  <div class=\"input-wrapper\">\r\n    <div\r\n      class=\"search-input\"\r\n      [class.border-gray]=\"!isOpen && !isInvalid\"\r\n      [class.border-blue]=\"isOpen && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n    >\r\n      <input\r\n        type=\"text\"\r\n        class=\"input-field\"\r\n        [formControl]=\"searchControl\"\r\n        [placeholder]=\"placeholderText\"\r\n        (focus)=\"onInputFocus()\"\r\n        (blur)=\"onInputBlur()\"\r\n      />\r\n\r\n      <label\r\n        class=\"input-label\"\r\n        [class.floating]=\"isOpen || searchControl.value\"\r\n        [class.blue]=\"isOpen && !isInvalid\"\r\n        [class.gray]=\"!isOpen && !isInvalid\"\r\n        [class.red]=\"isInvalid\">\r\n        {{ label }}\r\n      </label>\r\n\r\n      @if (searchControl.value) {\r\n        <button\r\n          type=\"button\"\r\n          class=\"clear-button\"\r\n          (click)=\"clearSearch()\"\r\n          aria-label=\"Clear search\">\r\n          <ui-icon [name]=\"'mdi:close'\"></ui-icon>\r\n        </button>\r\n      }\r\n\r\n    </div>\r\n\r\n    @if (isOpen && filteredList.length > 0) {\r\n      <ul class=\"dropdown-list\">\r\n        @for (item of filteredList; track $index) {\r\n          <li\r\n            class=\"dropdown-item\"\r\n            (mousedown)=\"selectItem(item)\">\r\n            <div class=\"item-display\">{{ getFieldValue(item, config?.displayField || 'name') }}</div>\r\n            <div class=\"item-meta\">\r\n              @if (config?.subtitleField) {\r\n                <span>{{ getFieldValue(item, config!.subtitleField!) }}</span>\r\n              }\r\n              @if (config?.descriptionField) {\r\n                <span> \u2022 {{ getFieldValue(item, config!.descriptionField!) }}</span>\r\n              }\r\n            </div>\r\n          </li>\r\n        }\r\n      </ul>\r\n    }\r\n\r\n    @if (isOpen && filteredList.length === 0) {\r\n      <ul class=\"dropdown-list\">\r\n        <li class=\"dropdown-empty\">No results found</li>\r\n      </ul>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n}\r\n\r\n.search-dropdown-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 2.25rem 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.search-input {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 2.25rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  transition: border-color 0.2s, box-shadow 0.2s;\r\n  box-sizing: border-box;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.input-field {\r\n  width: 100%;\r\n  height: 100%;\r\n  border: none;\r\n  outline: none;\r\n  background-color: transparent;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n  box-sizing: border-box;\r\n\r\n  &::placeholder {\r\n    color: var(--color-text-muted);\r\n  }\r\n}\r\n\r\n.input-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--search-dropdown-label-bg, var(--input-bg, var(--color-surface)));\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.clear-button {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.5rem;\r\n  height: 100%;\r\n  margin-right: 0.75rem;\r\n  border: none;\r\n  background: none;\r\n  cursor: pointer;\r\n  color: var(--color-text-muted);\r\n  transition: color 0.2s;\r\n  padding: 0;\r\n  flex-shrink: 0;\r\n\r\n  &:hover {\r\n    color: var(--color-text-secondary);\r\n  }\r\n\r\n  ui-icon {\r\n    width: 20px;\r\n    height: 20px;\r\n  }\r\n}\r\n\r\n.dropdown-list {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  width: 100%;\r\n  margin-top: 0.375rem;\r\n  background-color: var(--color-surface);\r\n  border-radius: 0.375rem;\r\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\r\n  list-style: none;\r\n  padding: 0.5rem;\r\n  max-height: 60vh;\r\n  overflow-y: auto;\r\n  z-index: 1000;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dropdown-item {\r\n  padding: 0.625rem 1rem;\r\n  cursor: pointer;\r\n  border-radius: 0.375rem;\r\n  transition: background-color 0.2s;\r\n\r\n  &:hover {\r\n    background-color: var(--color-surface-muted);\r\n  }\r\n}\r\n\r\n.item-display {\r\n  font-weight: 500;\r\n  color: var(--color-text-primary);\r\n  font-size: 0.875rem;\r\n  margin-bottom: 0.25rem;\r\n}\r\n\r\n.item-meta {\r\n  font-size: 0.75rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.dropdown-empty {\r\n  padding: 0.75rem 1rem;\r\n  text-align: center;\r\n  color: var(--color-text-muted);\r\n  font-size: 0.875rem;\r\n}\r\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { label: [{
            type: Input
        }], placeholderText: [{
            type: Input
        }], showBorder: [{
            type: Input
        }], borderColor: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], data: [{
            type: Input
        }], config: [{
            type: Input
        }], onSelect: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SearchDropdownComponent, { className: "SearchDropdownComponent", filePath: "libs/shared/ui/src/lib/components/controls/search-dropdown/search-dropdown.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=search-dropdown.component.js.map