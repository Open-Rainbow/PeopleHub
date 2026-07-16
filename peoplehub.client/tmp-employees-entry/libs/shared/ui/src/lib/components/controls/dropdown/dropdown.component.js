import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR, } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
function DropdownComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function DropdownComponent_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 11);
    i0.ɵɵtext(1, "No options available");
    i0.ɵɵelementEnd();
} }
function DropdownComponent_Conditional_9_Conditional_3_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 14);
    i0.ɵɵlistener("click", function DropdownComponent_Conditional_9_Conditional_3_For_1_Template_li_click_0_listener() { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.selectOption(option_r2)); })("keydown", function DropdownComponent_Conditional_9_Conditional_3_For_1_Template_li_keydown_0_listener($event) { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onOptionKeydown($event, option_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r2.selectedValue === option_r2.value);
    i0.ɵɵattribute("aria-selected", ctx_r2.selectedValue === option_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r2.name, " ");
} }
function DropdownComponent_Conditional_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, DropdownComponent_Conditional_9_Conditional_3_For_1_Template, 2, 4, "li", 13, i0.ɵɵcomponentInstance().trackByOption, true);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r2.options);
} }
function DropdownComponent_Conditional_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "hr", 12);
} }
function DropdownComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "ul", 10);
    i0.ɵɵconditionalCreate(2, DropdownComponent_Conditional_9_Conditional_2_Template, 2, 0, "li", 11);
    i0.ɵɵconditionalCreate(3, DropdownComponent_Conditional_9_Conditional_3_Template, 2, 0);
    i0.ɵɵconditionalCreate(4, DropdownComponent_Conditional_9_Conditional_4_Template, 1, 0, "hr", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("open-up", ctx_r2.isOpenUp);
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r2.listboxId);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.optionLength === 0 ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.optionLength > 0 ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.draggable ? 4 : -1);
} }
function DropdownComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1, "Please select a valid option.");
    i0.ɵɵelementEnd();
} }
export class DropdownComponent {
    eRef;
    label = 'Gender';
    placeholder = 'Select Gender';
    isRequired = false;
    options = null;
    parentFormGroup;
    id;
    selectedChange = new EventEmitter();
    blurEvent = new EventEmitter();
    selectedValue = null;
    dropdownModel = '';
    draggable = false;
    uniqueId = '';
    isOpenUp = false;
    isOpen = false;
    isActive = false;
    get optionLength() {
        return this.options?.length ?? 0;
    }
    get hasValue() {
        return (this.selectedValue !== null &&
            this.selectedValue !== undefined &&
            this.selectedValue !== '');
    }
    constructor(eRef) {
        this.eRef = eRef;
    }
    ngOnInit() {
        const randomStr = Math.random().toString(36).substring(2, 9);
        const baseId = this.id || this.dropdownModel || 'field';
        this.uniqueId = `dropdown_${baseId}_${randomStr}`;
        this.syncStateFromControl();
    }
    ngOnChanges(changes) {
        if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
            this.isActive = this.hasValue;
        }
        if ((changes['parentFormGroup'] || changes['id']) &&
            !changes['id']?.firstChange) {
            this.syncStateFromControl();
        }
    }
    syncStateFromControl() {
        if (!this.control) {
            return;
        }
        this.selectedValue = this.control.value;
        this.isActive = this.hasValue;
    }
    get triggerId() {
        return `${this.uniqueId}_trigger`;
    }
    get labelId() {
        return `${this.uniqueId}_label`;
    }
    get valueId() {
        return `${this.uniqueId}_value`;
    }
    get listboxId() {
        return `${this.uniqueId}_listbox`;
    }
    get displayText() {
        if (!this.hasValue && !this.isOpen) {
            return '';
        }
        return this.getSelectedName() || this.placeholder || '';
    }
    get control() {
        if (!this.parentFormGroup) {
            return null;
        }
        const controlName = this.id || this.dropdownModel;
        return controlName ? this.parentFormGroup.get(controlName) : null;
    }
    get isInvalid() {
        return !!(this.control?.invalid &&
            (this.control?.dirty || this.control?.touched));
    }
    get isDisabled() {
        return this.disabled || !!this.control?.disabled;
    }
    onToggle(event) {
        this.toggleDropdown(event);
    }
    toggleDropdown(event) {
        if (this.isDisabled) {
            return;
        }
        event?.stopPropagation();
        this.hasInteracted = true;
        this.isOpen = !this.isOpen;
        this.isActive = true;
        if (this.isOpen) {
            setTimeout(() => this.decideDropdownDirection(), 0);
            return;
        }
        if (!this.hasValue) {
            this.isActive = false;
        }
    }
    getSelectedName() {
        if (!this.options ||
            this.selectedValue === null ||
            this.selectedValue === undefined) {
            return '';
        }
        const selectedOption = this.options.find((opt) => opt.value === this.selectedValue);
        return selectedOption ? selectedOption.name : '';
    }
    onChange = (_) => { };
    onTouched = () => { };
    disabled = false;
    writeValue(obj) {
        this.selectedValue = obj;
        this.isActive = this.hasValue;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    hasInteracted = false;
    selectOption(option) {
        if (this.isDisabled) {
            return;
        }
        this.selectedValue = option.value;
        this.isActive = true;
        this.onChange(this.selectedValue);
        if (this.control && this.control.value !== option.value) {
            this.control.setValue(option.value);
        }
        this.control?.markAsTouched();
        this.control?.markAsDirty();
        this.onTouched();
        this.selectedChange.emit(this.selectedValue);
        this.blurEvent.emit();
        this.closeDropdown();
    }
    onBlur() {
        this.control?.markAsTouched();
        this.onTouched();
        this.blurEvent.emit();
        if (!this.hasValue && !this.isOpen) {
            this.isActive = false;
        }
    }
    handleClickOutside(event) {
        const clickedNode = event.target;
        if (!clickedNode || !this.eRef.nativeElement.contains(clickedNode)) {
            this.closeDropdown();
            if (!this.hasValue) {
                this.isActive = false;
                this.control?.markAsTouched();
            }
            this.onTouched();
        }
    }
    handleEscape() {
        this.closeDropdown();
        if (!this.hasValue) {
            this.isActive = false;
        }
    }
    decideDropdownDirection() {
        const dropdown = this.eRef.nativeElement.querySelector('.dropdown-container');
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        if (!dropdown || !list)
            return;
        const itemCount = this.optionLength || 1;
        const listHeight = Math.min(itemCount * 40 + 12, 244);
        const rect = dropdown.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        this.isOpenUp = spaceBelow < listHeight && spaceAbove > spaceBelow;
        if (this.isOpenUp) {
            list.classList.add('open-up');
        }
        else {
            list.classList.remove('open-up');
        }
    }
    closeDropdown() {
        this.isOpen = false;
    }
    onTriggerKeydown(event) {
        if (this.isDisabled) {
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!this.isOpen) {
                this.toggleDropdown();
            }
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleDropdown();
            return;
        }
        if (event.key === 'Escape') {
            this.closeDropdown();
        }
    }
    onOptionKeydown(event, option) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.selectOption(option);
            return;
        }
        if (event.key === 'Escape') {
            this.closeDropdown();
            return;
        }
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }
        const currentOption = event.currentTarget;
        if (!currentOption) {
            return;
        }
        const nextOption = event.key === 'ArrowDown'
            ? currentOption.nextElementSibling
            : currentOption.previousElementSibling;
        if (!nextOption) {
            return;
        }
        event.preventDefault();
        nextOption.focus();
    }
    trackByOption(_, option) {
        return option.value;
    }
    static ɵfac = function DropdownComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DropdownComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DropdownComponent, selectors: [["ui-dropdown"]], hostBindings: function DropdownComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function DropdownComponent_click_HostBindingHandler($event) { return ctx.handleClickOutside($event); }, i0.ɵɵresolveDocument)("keydown.escape", function DropdownComponent_keydown_escape_HostBindingHandler() { return ctx.handleEscape(); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: "label", placeholder: "placeholder", isRequired: "isRequired", options: "options", parentFormGroup: "parentFormGroup", id: "id", selectedValue: "selectedValue", dropdownModel: "dropdownModel", draggable: "draggable" }, outputs: { selectedChange: "selectedChange", blurEvent: "blurEvent" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => DropdownComponent),
                    multi: true,
                },
            ]), i0.ɵɵNgOnChangesFeature], decls: 11, vars: 36, consts: [[1, "dropdown-container"], [1, "input-wrapper"], ["type", "button", 1, "dropdown-input", "inputBoxHeight", 3, "click", "blur", "keydown", "id", "disabled"], [1, "dropdown-value", 3, "id"], [1, "input-label", 3, "id"], [1, "required-asterisk"], [1, "dropdown-icon", 3, "name"], [1, "dropdown-popup", 3, "open-up"], [1, "dropdown-error"], [1, "dropdown-popup"], ["role", "listbox", "tabindex", "-1", 1, "custom-dropdown-list", 3, "id"], ["aria-disabled", "true", 1, "dropdown-empty"], [1, "resize-hr"], ["role", "option", "tabindex", "0", 3, "selected"], ["role", "option", "tabindex", "0", 3, "click", "keydown"]], template: function DropdownComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function DropdownComponent_Template_button_click_2_listener($event) { return ctx.toggleDropdown($event); })("blur", function DropdownComponent_Template_button_blur_2_listener() { return ctx.onBlur(); })("keydown", function DropdownComponent_Template_button_keydown_2_listener($event) { return ctx.onTriggerKeydown($event); });
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "label", 4);
            i0.ɵɵtext(6);
            i0.ɵɵconditionalCreate(7, DropdownComponent_Conditional_7_Template, 2, 0, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "ui-icon", 6);
            i0.ɵɵconditionalCreate(9, DropdownComponent_Conditional_9_Template, 5, 6, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, DropdownComponent_Conditional_10_Template, 2, 0, "p", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵattribute("data-width-text", ctx.label || ctx.placeholder || "");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-gray", !ctx.isOpen && !ctx.isInvalid)("border-blue", ctx.isOpen && !ctx.isInvalid)("border-red", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.triggerId)("disabled", ctx.isDisabled);
            i0.ɵɵattribute("aria-required", ctx.isRequired)("aria-invalid", ctx.isInvalid)("aria-expanded", ctx.isOpen)("aria-haspopup", "listbox")("aria-controls", ctx.listboxId)("aria-labelledby", ctx.labelId + " " + ctx.valueId);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("placeholder", !ctx.hasValue);
            i0.ɵɵproperty("id", ctx.valueId);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.displayText);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("floating", ctx.isOpen || ctx.hasValue)("blue", ctx.isOpen && !ctx.isInvalid)("gray", !ctx.isOpen && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.labelId);
            i0.ɵɵattribute("for", ctx.triggerId);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("rotated", ctx.isOpen);
            i0.ɵɵproperty("name", "arrow_down");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isOpen ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isInvalid ? 10 : -1);
        } }, dependencies: [CommonModule, IconComponent], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  min-width: 0;\r\n}\r\n\r\n.dropdown-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  align-self: stretch;\r\n  min-width: fit-content;\r\n  box-sizing: border-box;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 2.25rem 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  align-self: stretch;\r\n  min-width: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dropdown-input[_ngcontent-%COMP%] {\r\n  box-sizing: border-box;\r\n  display: block;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  min-width: 100%;\r\n  align-self: stretch;\r\n  height: 2.25rem;\r\n  font-size: 0.75rem;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n  text-align: left;\r\n  outline: none;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s,\r\n    background-color 0.2s;\r\n\r\n  &:disabled {\r\n    opacity: 0.7;\r\n    cursor: not-allowed;\r\n    background-color: #f8fafc;\r\n  }\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.dropdown-value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n}\r\n\r\n.dropdown-value.placeholder[_ngcontent-%COMP%] {\r\n  color: var(--color-text-muted);\r\n}\r\n\r\n.input-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--dropdown-label-bg, transparent);\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.dropdown-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  z-index: 10;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n  transition: transform 0.2s ease;\r\n\r\n  &.rotated {\r\n    transform: translateY(-50%) rotate(180deg);\r\n  }\r\n}\r\n\r\n.dropdown-popup[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: calc(100% + 0.25rem);\r\n  left: 0;\r\n  z-index: 50;\r\n  width: max-content;\r\n  inline-size: max-content;\r\n  min-width: max-content;\r\n  max-width: min(28rem, calc(100vw - 1.5rem));\r\n  box-sizing: border-box;\r\n\r\n  &.open-up {\r\n    top: auto;\r\n    bottom: calc(100% + 0.25rem);\r\n  }\r\n}\r\n\r\n.custom-dropdown-list[_ngcontent-%COMP%] {\r\n  box-sizing: border-box;\r\n  width: max-content;\r\n  inline-size: max-content;\r\n  min-width: max-content;\r\n  max-width: min(28rem, calc(100vw - 1.5rem));\r\n  margin: 0;\r\n  padding: 0.25rem 0;\r\n  list-style: none;\r\n  max-height: 15rem;\r\n  overflow-y: auto;\r\n  background-color: white;\r\n  border: 1px solid var(--color-border);\r\n  border-radius: 0.375rem;\r\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.custom-dropdown-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  padding: 0.45rem 0.75rem;\r\n  cursor: pointer;\r\n  font-size: 0.8125rem;\r\n  color: var(--color-text-primary);\r\n  transition: background-color 0.15s;\r\n\r\n  &:hover,\r\n  &:focus-visible {\r\n    background-color: var(--color-surface-muted);\r\n    outline: none;\r\n  }\r\n\r\n  &.selected {\r\n    background-color: var(--color-primary);\r\n    color: var(--color-surface);\r\n    font-weight: 500;\r\n  }\r\n}\r\n\r\n.custom-dropdown-list[_ngcontent-%COMP%]   .dropdown-empty[_ngcontent-%COMP%] {\r\n  cursor: default;\r\n  color: var(--color-text-muted);\r\n  font-style: italic;\r\n\r\n  &:hover,\r\n  &:focus-visible {\r\n    background-color: transparent;\r\n  }\r\n}\r\n\r\n.resize-hr[_ngcontent-%COMP%] {\r\n  margin: 0.25rem 0.5rem 0;\r\n  border: 0;\r\n  border-top: 1px solid var(--color-border);\r\n}\r\n\r\n.dropdown-error[_ngcontent-%COMP%] {\r\n  // margin: 0.3rem 0 0;\r\n  font-size: 0.75rem;\r\n  color: var(--color-danger);\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .dropdown-input[_ngcontent-%COMP%] {\r\n    height: 2.15rem;\r\n    padding: 0 2rem 0 0.7rem;\r\n  }\r\n\r\n  .input-label[_ngcontent-%COMP%] {\r\n    left: 0.7rem;\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DropdownComponent, [{
        type: Component,
        args: [{ selector: 'ui-dropdown', standalone: true, imports: [CommonModule, IconComponent], providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DropdownComponent),
                        multi: true,
                    },
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"dropdown-container\" [attr.data-width-text]=\"label || placeholder || ''\">\r\n  <div class=\"input-wrapper\">\r\n    <button\r\n      [id]=\"triggerId\"\r\n      type=\"button\"\r\n      class=\"dropdown-input inputBoxHeight\"\r\n      [disabled]=\"isDisabled\"\r\n      [class.border-gray]=\"!isOpen && !isInvalid\"\r\n      [class.border-blue]=\"isOpen && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n      [attr.aria-required]=\"isRequired\"\r\n      [attr.aria-invalid]=\"isInvalid\"\r\n      [attr.aria-expanded]=\"isOpen\"\r\n      [attr.aria-haspopup]=\"'listbox'\"\r\n      [attr.aria-controls]=\"listboxId\"\r\n      [attr.aria-labelledby]=\"labelId + ' ' + valueId\"\r\n      (click)=\"toggleDropdown($event)\"\r\n      (blur)=\"onBlur()\"\r\n      (keydown)=\"onTriggerKeydown($event)\">\r\n      <span [id]=\"valueId\" class=\"dropdown-value\" [class.placeholder]=\"!hasValue\">{{ displayText }}</span>\r\n    </button>\r\n\r\n    <label\r\n      [id]=\"labelId\"\r\n      [attr.for]=\"triggerId\"\r\n      class=\"input-label\"\r\n      [class.floating]=\"isOpen || hasValue\"\r\n      [class.blue]=\"isOpen && !isInvalid\"\r\n      [class.gray]=\"!isOpen && !isInvalid\"\r\n      [class.red]=\"isInvalid\">\r\n      {{ label }}\r\n      @if (isRequired) {\r\n        <span class=\"required-asterisk\">*</span>\r\n      }\r\n    </label>\r\n\r\n    <ui-icon [name]=\"'arrow_down'\" class=\"dropdown-icon\" [class.rotated]=\"isOpen\"></ui-icon>\r\n\r\n    @if (isOpen) {\r\n      <div class=\"dropdown-popup\" [class.open-up]=\"isOpenUp\">\r\n        <ul [id]=\"listboxId\" class=\"custom-dropdown-list\" role=\"listbox\" tabindex=\"-1\">\r\n          @if (optionLength === 0) {\r\n            <li class=\"dropdown-empty\" aria-disabled=\"true\">No options available</li>\r\n          }\r\n\r\n          @if (optionLength > 0) {\r\n            @for (option of options; track trackByOption($index, option)) {\r\n              <li\r\n                role=\"option\"\r\n                tabindex=\"0\"\r\n                [class.selected]=\"selectedValue === option.value\"\r\n                [attr.aria-selected]=\"selectedValue === option.value\"\r\n                (click)=\"selectOption(option)\"\r\n                (keydown)=\"onOptionKeydown($event, option)\">\r\n                {{ option.name }}\r\n              </li>\r\n            }\r\n          }\r\n\r\n          @if (draggable) {\r\n            <hr class=\"resize-hr\" />\r\n          }\r\n        </ul>\r\n      </div>\r\n    }\r\n  </div>\r\n\r\n  @if (isInvalid) {\r\n    <p class=\"dropdown-error\">Please select a valid option.</p>\r\n  }\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  min-width: 0;\r\n}\r\n\r\n.dropdown-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  align-self: stretch;\r\n  min-width: fit-content;\r\n  box-sizing: border-box;\r\n\r\n  &::before {\r\n    content: attr(data-width-text);\r\n    display: block;\r\n    width: fit-content;\r\n    max-width: 100%;\r\n    height: 0;\r\n    overflow: hidden;\r\n    visibility: hidden;\r\n    pointer-events: none;\r\n    white-space: nowrap;\r\n    font-size: 0.875rem;\r\n    font-weight: 500;\r\n    padding: 0 2.25rem 0 0.75rem;\r\n  }\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  flex: 1 1 auto;\r\n  align-self: stretch;\r\n  min-width: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dropdown-input {\r\n  box-sizing: border-box;\r\n  display: block;\r\n  width: 100%;\r\n  inline-size: 100%;\r\n  max-width: 100%;\r\n  min-width: 100%;\r\n  align-self: stretch;\r\n  height: 2.25rem;\r\n  font-size: 0.75rem;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  cursor: pointer;\r\n  text-align: left;\r\n  outline: none;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s,\r\n    background-color 0.2s;\r\n\r\n  &:disabled {\r\n    opacity: 0.7;\r\n    cursor: not-allowed;\r\n    background-color: #f8fafc;\r\n  }\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.dropdown-value {\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n}\r\n\r\n.dropdown-value.placeholder {\r\n  color: var(--color-text-muted);\r\n}\r\n\r\n.input-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--dropdown-label-bg, transparent);\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  .required-asterisk {\r\n    color: var(--color-danger);\r\n  }\r\n}\r\n\r\n.dropdown-icon {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  z-index: 10;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n  transition: transform 0.2s ease;\r\n\r\n  &.rotated {\r\n    transform: translateY(-50%) rotate(180deg);\r\n  }\r\n}\r\n\r\n.dropdown-popup {\r\n  position: absolute;\r\n  top: calc(100% + 0.25rem);\r\n  left: 0;\r\n  z-index: 50;\r\n  width: max-content;\r\n  inline-size: max-content;\r\n  min-width: max-content;\r\n  max-width: min(28rem, calc(100vw - 1.5rem));\r\n  box-sizing: border-box;\r\n\r\n  &.open-up {\r\n    top: auto;\r\n    bottom: calc(100% + 0.25rem);\r\n  }\r\n}\r\n\r\n.custom-dropdown-list {\r\n  box-sizing: border-box;\r\n  width: max-content;\r\n  inline-size: max-content;\r\n  min-width: max-content;\r\n  max-width: min(28rem, calc(100vw - 1.5rem));\r\n  margin: 0;\r\n  padding: 0.25rem 0;\r\n  list-style: none;\r\n  max-height: 15rem;\r\n  overflow-y: auto;\r\n  background-color: white;\r\n  border: 1px solid var(--color-border);\r\n  border-radius: 0.375rem;\r\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.custom-dropdown-list li {\r\n  padding: 0.45rem 0.75rem;\r\n  cursor: pointer;\r\n  font-size: 0.8125rem;\r\n  color: var(--color-text-primary);\r\n  transition: background-color 0.15s;\r\n\r\n  &:hover,\r\n  &:focus-visible {\r\n    background-color: var(--color-surface-muted);\r\n    outline: none;\r\n  }\r\n\r\n  &.selected {\r\n    background-color: var(--color-primary);\r\n    color: var(--color-surface);\r\n    font-weight: 500;\r\n  }\r\n}\r\n\r\n.custom-dropdown-list .dropdown-empty {\r\n  cursor: default;\r\n  color: var(--color-text-muted);\r\n  font-style: italic;\r\n\r\n  &:hover,\r\n  &:focus-visible {\r\n    background-color: transparent;\r\n  }\r\n}\r\n\r\n.resize-hr {\r\n  margin: 0.25rem 0.5rem 0;\r\n  border: 0;\r\n  border-top: 1px solid var(--color-border);\r\n}\r\n\r\n.dropdown-error {\r\n  // margin: 0.3rem 0 0;\r\n  font-size: 0.75rem;\r\n  color: var(--color-danger);\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .dropdown-input {\r\n    height: 2.15rem;\r\n    padding: 0 2rem 0 0.7rem;\r\n  }\r\n\r\n  .input-label {\r\n    left: 0.7rem;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i0.ElementRef }], { label: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], options: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], selectedChange: [{
            type: Output
        }], blurEvent: [{
            type: Output
        }], selectedValue: [{
            type: Input
        }], dropdownModel: [{
            type: Input
        }], draggable: [{
            type: Input
        }], handleClickOutside: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], handleEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DropdownComponent, { className: "DropdownComponent", filePath: "libs/shared/ui/src/lib/components/controls/dropdown/dropdown.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=dropdown.component.js.map