import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.value;
function ButtonGroupComponent_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 3);
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("name", item_r2.icon);
} }
function ButtonGroupComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function ButtonGroupComponent_For_2_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleClick(item_r2)); });
    i0.ɵɵconditionalCreate(1, ButtonGroupComponent_For_2_Conditional_1_Template, 1, 1, "ui-icon", 3);
    i0.ɵɵelementStart(2, "span", 4);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r2.getButtonClasses(item_r2));
    i0.ɵɵstyleProp("--btn-color", item_r2.color);
    i0.ɵɵproperty("disabled", item_r2.disabled || false);
    i0.ɵɵattribute("aria-pressed", ctx_r2.selectionMode !== "none" ? ctx_r2.isSelected(item_r2.value) : null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r2.icon ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.label);
} }
export class ButtonGroupComponent {
    items = [];
    variant = 'default';
    size = 'md';
    orientation = 'horizontal';
    selectionMode = 'single';
    ariaLabel = 'Button group';
    selectedValues = [];
    selectionChange = new EventEmitter();
    buttonClick = new EventEmitter();
    _selected = signal(new Set(), ...(ngDevMode ? [{ debugName: "_selected" }] : /* istanbul ignore next */ []));
    ngOnChanges(changes) {
        if (changes['selectedValues']) {
            this._selected.set(new Set(this.selectedValues));
        }
    }
    isSelected(value) {
        return this._selected().has(value);
    }
    getContainerClasses() {
        const cls = ['ui-button-group', `ui-button-group--${this.variant}`, `ui-button-group--${this.size}`];
        if (this.orientation === 'vertical')
            cls.push('ui-button-group--vertical');
        return cls.join(' ');
    }
    getButtonClasses(item) {
        const cls = ['ui-button-group__btn'];
        if (this.isSelected(item.value))
            cls.push('ui-button-group__btn--active');
        if (item.disabled)
            cls.push('ui-button-group__btn--disabled');
        return cls.join(' ');
    }
    handleClick(item) {
        if (item.disabled)
            return;
        if (this.selectionMode === 'single') {
            this._selected.set(new Set([item.value]));
        }
        else if (this.selectionMode === 'multiple') {
            const next = new Set(this._selected());
            if (next.has(item.value)) {
                next.delete(item.value);
            }
            else {
                next.add(item.value);
            }
            this._selected.set(next);
        }
        this.selectionChange.emit(Array.from(this._selected()));
        this.buttonClick.emit(item);
    }
    static ɵfac = function ButtonGroupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ButtonGroupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ButtonGroupComponent, selectors: [["ui-button-group"]], inputs: { items: "items", variant: "variant", size: "size", orientation: "orientation", selectionMode: "selectionMode", ariaLabel: "ariaLabel", selectedValues: "selectedValues" }, outputs: { selectionChange: "selectionChange", buttonClick: "buttonClick" }, features: [i0.ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [["role", "group"], ["type", "button", 3, "class", "disabled", "--btn-color"], ["type", "button", 3, "click", "disabled"], [1, "ui-button-group__btn-icon", 3, "name"], [1, "ui-button-group__btn-label"]], template: function ButtonGroupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ButtonGroupComponent_For_2_Template, 4, 8, "button", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.getContainerClasses());
            i0.ɵɵattribute("aria-label", ctx.ariaLabel);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.items);
        } }, dependencies: [CommonModule, IconComponent], styles: [".ui-button-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: row;\n\n  &--vertical {\n    flex-direction: column;\n  }\n\n  // \u2500\u2500 Buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &__btn {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.375rem;\n    border: 1px solid var(--color-border);\n    background-color: var(--color-surface-elevated);\n    color: var(--color-text-primary);\n    font-weight: 500;\n    cursor: pointer;\n    white-space: nowrap;\n    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, z-index 0s;\n    outline: none;\n\n    // Collapse shared border between adjacent buttons\n    &:not(:first-child) {\n      margin-left: -1px;\n    }\n\n    .ui-button-group--vertical &:not(:first-child) {\n      margin-left: 0;\n      margin-top: -1px;\n    }\n\n    // Rounded ends \u2013 horizontal\n    &:first-child {\n      border-radius: 0.375rem 0 0 0.375rem;\n    }\n\n    &:last-child {\n      border-radius: 0 0.375rem 0.375rem 0;\n    }\n\n    &:only-child {\n      border-radius: 0.375rem;\n    }\n\n    // Rounded ends \u2013 vertical\n    .ui-button-group--vertical &:first-child {\n      border-radius: 0.375rem 0.375rem 0 0;\n    }\n\n    .ui-button-group--vertical &:last-child {\n      border-radius: 0 0 0.375rem 0.375rem;\n    }\n\n    // Bring hovered/active buttons to the front so their border renders on top\n    &:hover,\n    &:focus-visible,\n    &--active {\n      z-index: 1;\n    }\n\n    &:hover:not(&--disabled) {\n      background-color: var(--color-border);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);\n    }\n\n    // Active / selected state\n    &--active {\n      background-color: var(--color-primary-soft);\n      color: var(--color-surface);\n      border-color: var(--color-primary-soft);\n\n      &:hover:not(.ui-button-group__btn--disabled) {\n        background-color: var(--color-primary);\n        border-color: var(--color-primary);\n      }\n    }\n\n    // Disabled\n    &--disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &-icon {\n      flex-shrink: 0;\n      font-size: 1rem;\n    }\n  }\n\n  // \u2500\u2500 Sizes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &--sm &__btn {\n    padding: 0.25rem 0.625rem;\n    font-size: 0.75rem;\n    min-height: 1.75rem;\n  }\n\n  &--md &__btn {\n    padding: 0.4375rem 0.875rem;\n    font-size: 0.875rem;\n    min-height: 2.25rem;\n  }\n\n  &--lg &__btn {\n    padding: 0.625rem 1.125rem;\n    font-size: 1rem;\n    min-height: 2.75rem;\n  }\n\n  // \u2500\u2500 Outlined variant \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &--outlined &__btn {\n    background-color: transparent;\n    color: var(--color-text-primary);\n    border-color: var(--color-border);\n\n    &:hover:not(.ui-button-group__btn--disabled) {\n      background-color: var(--color-surface-muted);\n    }\n\n    &.ui-button-group__btn--active {\n      background-color: transparent;\n      color: var(--color-primary-soft);\n      border-color: var(--color-primary-soft);\n\n      &:hover:not(.ui-button-group__btn--disabled) {\n        background-color: rgba(59, 130, 246, 0.08);\n      }\n    }\n  }\n\n  // \u2500\u2500 Mixed variant \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  // Each button uses its own --btn-color CSS custom property\n  &--mixed &__btn {\n    background-color: var(--btn-color, var(--color-text-secondary));\n    color: var(--color-surface);\n    border-color: var(--btn-color, var(--color-text-secondary));\n\n    &:hover:not(.ui-button-group__btn--disabled) {\n      filter: brightness(0.88);\n    }\n\n    &.ui-button-group__btn--active {\n      filter: brightness(0.78);\n    }\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ButtonGroupComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-button-group', imports: [CommonModule, IconComponent], template: "<div [class]=\"getContainerClasses()\" role=\"group\" [attr.aria-label]=\"ariaLabel\">\n  @for (item of items; track item.value) {\n    <button\n      type=\"button\"\n      [class]=\"getButtonClasses(item)\"\n      [disabled]=\"item.disabled || false\"\n      [attr.aria-pressed]=\"selectionMode !== 'none' ? isSelected(item.value) : null\"\n      [style.--btn-color]=\"item.color\"\n      (click)=\"handleClick(item)\">\n      @if (item.icon) {\n        <ui-icon [name]=\"item.icon\" class=\"ui-button-group__btn-icon\"></ui-icon>\n      }\n      <span class=\"ui-button-group__btn-label\">{{ item.label }}</span>\n    </button>\n  }\n</div>\n", styles: [".ui-button-group {\n  display: inline-flex;\n  flex-direction: row;\n\n  &--vertical {\n    flex-direction: column;\n  }\n\n  // \u2500\u2500 Buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &__btn {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.375rem;\n    border: 1px solid var(--color-border);\n    background-color: var(--color-surface-elevated);\n    color: var(--color-text-primary);\n    font-weight: 500;\n    cursor: pointer;\n    white-space: nowrap;\n    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, z-index 0s;\n    outline: none;\n\n    // Collapse shared border between adjacent buttons\n    &:not(:first-child) {\n      margin-left: -1px;\n    }\n\n    .ui-button-group--vertical &:not(:first-child) {\n      margin-left: 0;\n      margin-top: -1px;\n    }\n\n    // Rounded ends \u2013 horizontal\n    &:first-child {\n      border-radius: 0.375rem 0 0 0.375rem;\n    }\n\n    &:last-child {\n      border-radius: 0 0.375rem 0.375rem 0;\n    }\n\n    &:only-child {\n      border-radius: 0.375rem;\n    }\n\n    // Rounded ends \u2013 vertical\n    .ui-button-group--vertical &:first-child {\n      border-radius: 0.375rem 0.375rem 0 0;\n    }\n\n    .ui-button-group--vertical &:last-child {\n      border-radius: 0 0 0.375rem 0.375rem;\n    }\n\n    // Bring hovered/active buttons to the front so their border renders on top\n    &:hover,\n    &:focus-visible,\n    &--active {\n      z-index: 1;\n    }\n\n    &:hover:not(&--disabled) {\n      background-color: var(--color-border);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);\n    }\n\n    // Active / selected state\n    &--active {\n      background-color: var(--color-primary-soft);\n      color: var(--color-surface);\n      border-color: var(--color-primary-soft);\n\n      &:hover:not(.ui-button-group__btn--disabled) {\n        background-color: var(--color-primary);\n        border-color: var(--color-primary);\n      }\n    }\n\n    // Disabled\n    &--disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &-icon {\n      flex-shrink: 0;\n      font-size: 1rem;\n    }\n  }\n\n  // \u2500\u2500 Sizes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &--sm &__btn {\n    padding: 0.25rem 0.625rem;\n    font-size: 0.75rem;\n    min-height: 1.75rem;\n  }\n\n  &--md &__btn {\n    padding: 0.4375rem 0.875rem;\n    font-size: 0.875rem;\n    min-height: 2.25rem;\n  }\n\n  &--lg &__btn {\n    padding: 0.625rem 1.125rem;\n    font-size: 1rem;\n    min-height: 2.75rem;\n  }\n\n  // \u2500\u2500 Outlined variant \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  &--outlined &__btn {\n    background-color: transparent;\n    color: var(--color-text-primary);\n    border-color: var(--color-border);\n\n    &:hover:not(.ui-button-group__btn--disabled) {\n      background-color: var(--color-surface-muted);\n    }\n\n    &.ui-button-group__btn--active {\n      background-color: transparent;\n      color: var(--color-primary-soft);\n      border-color: var(--color-primary-soft);\n\n      &:hover:not(.ui-button-group__btn--disabled) {\n        background-color: rgba(59, 130, 246, 0.08);\n      }\n    }\n  }\n\n  // \u2500\u2500 Mixed variant \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n  // Each button uses its own --btn-color CSS custom property\n  &--mixed &__btn {\n    background-color: var(--btn-color, var(--color-text-secondary));\n    color: var(--color-surface);\n    border-color: var(--btn-color, var(--color-text-secondary));\n\n    &:hover:not(.ui-button-group__btn--disabled) {\n      filter: brightness(0.88);\n    }\n\n    &.ui-button-group__btn--active {\n      filter: brightness(0.78);\n    }\n  }\n}\n"] }]
    }], null, { items: [{
            type: Input
        }], variant: [{
            type: Input
        }], size: [{
            type: Input
        }], orientation: [{
            type: Input
        }], selectionMode: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], selectedValues: [{
            type: Input
        }], selectionChange: [{
            type: Output
        }], buttonClick: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ButtonGroupComponent, { className: "ButtonGroupComponent", filePath: "libs/shared/ui/src/lib/components/primitives/button-group/button-group.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=button-group.component.js.map