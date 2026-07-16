import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectionStrategy, Optional, SkipSelf } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "./accordion-group.component";
import * as i2 from "@angular/common";
const _c0 = ["content"];
function AccordionComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ui-icon", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-hidden", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r0.icon);
} }
function AccordionComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
function AccordionComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵlistener("click", function AccordionComponent_Conditional_9_Template_span_click_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onEditClick($event)); });
    i0.ɵɵelement(1, "ui-icon", 15);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Edit");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", "Edit " + ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-hidden", true);
} }
function AccordionComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
export class AccordionComponent {
    parentGroup;
    title = 'Accordion Item';
    subtitle;
    modalTemplate;
    sectionId = '';
    isOpen = false;
    variant = 'default';
    allowMultiple = false;
    icon;
    showEditButton = true;
    toggle = new EventEmitter();
    edit = new EventEmitter();
    content;
    contentHeight = 0;
    parentOpenItemsSignal = null;
    // Inject parent accordion group if available
    constructor(parentGroup) {
        this.parentGroup = parentGroup;
        // Capture parent's signal in constructor
        if (this.parentGroup) {
            this.parentOpenItemsSignal = this.parentGroup.getOpenItemsSignal();
        }
    }
    ngOnInit() {
        // Initialize any needed state
    }
    // Check if accordion is open - read from parent's signal directly
    isAccordionOpen() {
        if (this.parentOpenItemsSignal) {
            return this.parentOpenItemsSignal().has(this.sectionId);
        }
        return this.isOpen || false;
    }
    toggleSection() {
        if (this.parentGroup) {
            // Use parent group's toggle logic
            this.parentGroup.toggleAccordion(this.sectionId);
        }
        else {
            // Standalone: toggle own state
            this.isOpen = !this.isOpen;
        }
        this.toggle.emit(this.sectionId);
    }
    onKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleSection();
        }
    }
    onEditClick(event) {
        event.stopPropagation();
        this.edit.emit({
            sectionId: this.sectionId,
            title: this.title,
            template: this.modalTemplate,
        });
    }
    ngAfterViewInit() {
        this.contentHeight = this.content.nativeElement.scrollHeight;
    }
    static ɵfac = function AccordionComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccordionComponent)(i0.ɵɵdirectiveInject(i1.AccordionGroupComponent, 12)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccordionComponent, selectors: [["ui-accordion"]], viewQuery: function AccordionComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
        } }, inputs: { title: "title", subtitle: "subtitle", modalTemplate: "modalTemplate", sectionId: "sectionId", isOpen: "isOpen", variant: "variant", allowMultiple: "allowMultiple", icon: "icon", showEditButton: "showEditButton" }, outputs: { toggle: "toggle", edit: "edit" }, decls: 15, vars: 19, consts: [["content", ""], ["role", "button", "tabindex", "0", 1, "ui-accordion__header", 3, "click", "keydown", "id"], [1, "ui-accordion__header-content"], [1, "ui-accordion__icon"], [1, "ui-accordion__title-group"], [1, "ui-accordion__title"], [1, "ui-accordion__subtitle"], [1, "ui-accordion__controls"], ["role", "button", "tabindex", "-1", 1, "ui-accordion__edit-btn"], ["name", "material-symbols:keyboard-arrow-down-rounded", 1, "ui-accordion__toggle-icon"], ["role", "region", 1, "ui-accordion__content", 3, "id"], [1, "ui-accordion__body"], [4, "ngTemplateOutlet"], [3, "name"], ["role", "button", "tabindex", "-1", 1, "ui-accordion__edit-btn", 3, "click"], ["name", "edit"]], template: function AccordionComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "div", 1);
            i0.ɵɵlistener("click", function AccordionComponent_Template_div_click_1_listener() { return ctx.toggleSection(); })("keydown", function AccordionComponent_Template_div_keydown_1_listener($event) { return ctx.onKeyDown($event); });
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵconditionalCreate(3, AccordionComponent_Conditional_3_Template, 2, 2, "div", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "span", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(7, AccordionComponent_Conditional_7_Template, 2, 1, "span", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7);
            i0.ɵɵconditionalCreate(9, AccordionComponent_Conditional_9_Template, 4, 2, "span", 8);
            i0.ɵɵelement(10, "ui-icon", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 10, 0)(13, "div", 11);
            i0.ɵɵtemplate(14, AccordionComponent_ng_container_14_Template, 1, 0, "ng-container", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassMap("ui-accordion ui-accordion--" + ctx.variant);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ui-accordion__header--active", ctx.isAccordionOpen());
            i0.ɵɵproperty("id", "accordion-header-" + ctx.sectionId);
            i0.ɵɵattribute("aria-expanded", ctx.isAccordionOpen())("aria-controls", "accordion-content-" + ctx.sectionId);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.icon && ctx.variant === "with-icon" ? 3 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subtitle ? 7 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showEditButton && ctx.variant !== "flush" ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("ui-accordion__toggle-icon--rotated", ctx.isAccordionOpen());
            i0.ɵɵattribute("aria-hidden", true);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("max-height", ctx.isAccordionOpen() ? ctx.contentHeight + "px" : "0px");
            i0.ɵɵproperty("id", "accordion-content-" + ctx.sectionId);
            i0.ɵɵattribute("aria-labelledby", "accordion-header-" + ctx.sectionId);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngTemplateOutlet", ctx.modalTemplate);
        } }, dependencies: [IconComponent, CommonModule, i2.NgTemplateOutlet], styles: ["//[_ngcontent-%COMP%]   Accordion[_ngcontent-%COMP%]   Component[_ngcontent-%COMP%]   Styles\n//[_ngcontent-%COMP%]   Supports[_ngcontent-%COMP%]   multiple[_ngcontent-%COMP%]   variants[_ngcontent-%COMP%]:   default[_ngcontent-%COMP%], primary[_ngcontent-%COMP%], secondary[_ngcontent-%COMP%], flush[_ngcontent-%COMP%], with-icon\n\n.ui-accordion[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 6px;\n  overflow: hidden;\n\n  &__header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 15px;\n    cursor: pointer;\n    transition: all 250ms ease;\n    user-select: none;\n    position: relative;\n\n    &:focus-visible {\n      outline: 2px solid #3f4af8;\n      outline-offset: -2px;\n    }\n\n    &-content {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      flex: 1;\n    }\n  }\n\n  &__icon {\n    display: flex;\n    align-items: center;\n    font-size: 20px;\n    transition: transform 300ms ease;\n  }\n\n  &__title-group {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n  }\n\n  &__title {\n    font-size: 14px;\n    font-weight: 600;\n    line-height: 1.4;\n  }\n\n  &__subtitle {\n    font-size: 12px;\n    opacity: 0.7;\n  }\n\n  &__controls {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n\n  &__edit-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 8px;\n    cursor: pointer;\n    font-size: 12px;\n    border-bottom: 2px solid transparent;\n    transition: all 200ms ease;\n    border-radius: 2px;\n\n    &:hover {\n      border-bottom-color: currentColor;\n    }\n\n    &:focus-visible {\n      outline: 1px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  &__toggle-icon {\n    font-size: 20px;\n    transition: transform 300ms ease;\n\n    &--rotated {\n      transform: rotate(180deg);\n    }\n  }\n\n  &__content {\n    max-height: 0;\n    overflow: hidden;\n    transition: max-height 350ms cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  &__body {\n    padding: 20px;\n  }\n\n  // Default Variant\n  &--default {\n    border: 1px solid var(--color-border);\n\n    .ui-accordion__header {\n      background-color: var(--color-surface-muted);\n      color: var(--color-text-primary);\n\n      &:hover {\n        background-color: var(--color-surface-muted);\n      }\n\n      &--active {\n        background-color: var(--color-surface-muted);\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: 1px solid var(--color-border);\n    }\n  }\n\n  // Primary Variant (Accent color - typically blue)\n  &--primary {\n    border: 1px solid #3f4af8;\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background: linear-gradient(135deg, #eef3fe 0%, #f0f5ff 100%);\n      color: var(--color-text-primary);\n      border-bottom: 1px solid #e0e7ff;\n\n      &:hover {\n        background: linear-gradient(135deg, #e0ecff 0%, #e8f1ff 100%);\n\n        .ui-accordion__title,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: #3f4af8;\n        color: white;\n        border-bottom-color: #3f4af8;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: white;\n        }\n\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: none;\n    }\n  }\n\n  // Secondary Variant (Different accent color - typically teal/green)\n  &--secondary {\n    border: 1px solid #00a870;\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background: linear-gradient(135deg, #e8faf4 0%, #f0fcf8 100%);\n      color: var(--color-text-primary);\n      border-bottom: 1px solid #d4f5e8;\n\n      &:hover {\n        background: linear-gradient(135deg, #d4f5e8 0%, #e0f9f2 100%);\n\n        .ui-accordion__title,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: #00a870;\n        }\n      }\n\n      &--active {\n        background-color: #00a870;\n        color: white;\n        border-bottom-color: #00a870;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: white;\n        }\n\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: none;\n    }\n  }\n\n  // Flush Variant (No borders, clean look)\n  &--flush {\n    border: none;\n    border-radius: 0;\n\n    .ui-accordion__header {\n      background-color: transparent;\n      color: var(--color-text-primary);\n      border-bottom: 2px solid var(--color-surface-muted);\n      padding: 16px 0;\n      border-radius: 0;\n\n      &:hover {\n        background-color: transparent;\n\n        .ui-accordion__title {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: transparent;\n        border-bottom-color: #3f4af8;\n\n        .ui-accordion__title {\n          color: #3f4af8;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: transparent;\n      padding-top: 16px;\n      padding-bottom: 16px;\n      border: none;\n    }\n\n    .ui-accordion__controls {\n      display: flex;\n      align-items: center;\n\n      .ui-accordion__edit-btn {\n        display: none;\n      }\n    }\n  }\n\n  // With Icon Variant\n  &--with-icon {\n    border: 1px solid var(--color-border);\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background-color: var(--color-surface-elevated);\n      color: var(--color-text-primary);\n\n      &:hover {\n        background-color: var(--color-surface-muted);\n\n        .ui-accordion__icon {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: #3f4af8;\n        color: white;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__icon {\n      min-width: 24px;\n      text-align: center;\n      transition: color 250ms ease;\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: 1px solid var(--color-border);\n    }\n  }\n\n  // Dark Theme Support (optional)\n  @media (prefers-color-scheme: dark) {\n    &--default {\n      border-color: #404040;\n\n      .ui-accordion__header {\n        background-color: #2a2a2a;\n        color: var(--color-border);\n\n        &:hover {\n          background-color: var(--color-text-primary);\n        }\n\n        &--active {\n          background-color: #383838;\n        }\n      }\n\n      .ui-accordion__body {\n        background-color: #1a1a1a;\n        border-top-color: #404040;\n      }\n    }\n\n    &--flush {\n      .ui-accordion__header {\n        color: var(--color-border);\n        border-bottom-color: #404040;\n\n        &--active {\n          border-bottom-color: #5a67d8;\n\n          .ui-accordion__title {\n            color: #5a67d8;\n          }\n        }\n      }\n\n      .ui-accordion__body {\n        color: #b0b0b0;\n      }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   Accessibility\n.ui-accordion__header[_ngcontent-%COMP%] {\n  &:focus-visible {\n    outline: 2px solid #3f4af8;\n    outline-offset: -2px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Animation[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   smooth[_ngcontent-%COMP%]   opening/closing\n@media[_ngcontent-%COMP%]   (prefers-reduced-motion[_ngcontent-%COMP%]: reduce) {\n  .ui-accordion__content,\n  .ui-accordion__header,\n  .ui-accordion__toggle-icon,\n  .ui-accordion__icon {\n    transition: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccordionComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.Default, selector: 'ui-accordion', imports: [IconComponent, CommonModule], template: "<div [class]=\"'ui-accordion ui-accordion--' + variant\">\r\n  <div\r\n    [id]=\"'accordion-header-' + sectionId\"\r\n    class=\"ui-accordion__header\"\r\n    [class.ui-accordion__header--active]=\"isAccordionOpen()\"\r\n    role=\"button\"\r\n    [attr.aria-expanded]=\"isAccordionOpen()\"\r\n    [attr.aria-controls]=\"'accordion-content-' + sectionId\"\r\n    tabindex=\"0\"\r\n    (click)=\"toggleSection()\"\r\n    (keydown)=\"onKeyDown($event)\"\r\n  >\r\n    <div class=\"ui-accordion__header-content\">\r\n      @if (icon && variant === 'with-icon') {\r\n        <div class=\"ui-accordion__icon\" [attr.aria-hidden]=\"true\">\r\n          <ui-icon [name]=\"icon\"></ui-icon>\r\n        </div>\r\n      }\r\n      <div class=\"ui-accordion__title-group\">\r\n        <span class=\"ui-accordion__title\">{{ title }}</span>\r\n        @if (subtitle) {\r\n          <span class=\"ui-accordion__subtitle\">{{ subtitle }}</span>\r\n        }\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"ui-accordion__controls\">\r\n      @if (showEditButton && variant !== 'flush') {\r\n        <span\r\n          class=\"ui-accordion__edit-btn\"\r\n          role=\"button\"\r\n          tabindex=\"-1\"\r\n          [attr.aria-label]=\"'Edit ' + title\"\r\n          (click)=\"onEditClick($event)\"\r\n        >\r\n          <ui-icon name=\"edit\" [attr.aria-hidden]=\"true\"></ui-icon>\r\n          <span>Edit</span>\r\n        </span>\r\n      }\r\n\r\n      <ui-icon\r\n        class=\"ui-accordion__toggle-icon\"\r\n        [class.ui-accordion__toggle-icon--rotated]=\"isAccordionOpen()\"\r\n        name=\"material-symbols:keyboard-arrow-down-rounded\"\r\n        [attr.aria-hidden]=\"true\"\r\n      ></ui-icon>\r\n    </div>\r\n  </div>\r\n\r\n  <div\r\n    #content\r\n    [id]=\"'accordion-content-' + sectionId\"\r\n    class=\"ui-accordion__content\"\r\n    [style.maxHeight]=\"isAccordionOpen() ? contentHeight + 'px' : '0px'\"\r\n    role=\"region\"\r\n    [attr.aria-labelledby]=\"'accordion-header-' + sectionId\"\r\n  >\r\n    <div class=\"ui-accordion__body\">\r\n      <ng-container *ngTemplateOutlet=\"modalTemplate\"></ng-container>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: ["// Accordion Component Styles\n// Supports multiple variants: default, primary, secondary, flush, with-icon\n\n.ui-accordion {\n  width: 100%;\n  border-radius: 6px;\n  overflow: hidden;\n\n  &__header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 15px;\n    cursor: pointer;\n    transition: all 250ms ease;\n    user-select: none;\n    position: relative;\n\n    &:focus-visible {\n      outline: 2px solid #3f4af8;\n      outline-offset: -2px;\n    }\n\n    &-content {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      flex: 1;\n    }\n  }\n\n  &__icon {\n    display: flex;\n    align-items: center;\n    font-size: 20px;\n    transition: transform 300ms ease;\n  }\n\n  &__title-group {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n  }\n\n  &__title {\n    font-size: 14px;\n    font-weight: 600;\n    line-height: 1.4;\n  }\n\n  &__subtitle {\n    font-size: 12px;\n    opacity: 0.7;\n  }\n\n  &__controls {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n\n  &__edit-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 8px;\n    cursor: pointer;\n    font-size: 12px;\n    border-bottom: 2px solid transparent;\n    transition: all 200ms ease;\n    border-radius: 2px;\n\n    &:hover {\n      border-bottom-color: currentColor;\n    }\n\n    &:focus-visible {\n      outline: 1px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  &__toggle-icon {\n    font-size: 20px;\n    transition: transform 300ms ease;\n\n    &--rotated {\n      transform: rotate(180deg);\n    }\n  }\n\n  &__content {\n    max-height: 0;\n    overflow: hidden;\n    transition: max-height 350ms cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  &__body {\n    padding: 20px;\n  }\n\n  // Default Variant\n  &--default {\n    border: 1px solid var(--color-border);\n\n    .ui-accordion__header {\n      background-color: var(--color-surface-muted);\n      color: var(--color-text-primary);\n\n      &:hover {\n        background-color: var(--color-surface-muted);\n      }\n\n      &--active {\n        background-color: var(--color-surface-muted);\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: 1px solid var(--color-border);\n    }\n  }\n\n  // Primary Variant (Accent color - typically blue)\n  &--primary {\n    border: 1px solid #3f4af8;\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background: linear-gradient(135deg, #eef3fe 0%, #f0f5ff 100%);\n      color: var(--color-text-primary);\n      border-bottom: 1px solid #e0e7ff;\n\n      &:hover {\n        background: linear-gradient(135deg, #e0ecff 0%, #e8f1ff 100%);\n\n        .ui-accordion__title,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: #3f4af8;\n        color: white;\n        border-bottom-color: #3f4af8;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: white;\n        }\n\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: none;\n    }\n  }\n\n  // Secondary Variant (Different accent color - typically teal/green)\n  &--secondary {\n    border: 1px solid #00a870;\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background: linear-gradient(135deg, #e8faf4 0%, #f0fcf8 100%);\n      color: var(--color-text-primary);\n      border-bottom: 1px solid #d4f5e8;\n\n      &:hover {\n        background: linear-gradient(135deg, #d4f5e8 0%, #e0f9f2 100%);\n\n        .ui-accordion__title,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: #00a870;\n        }\n      }\n\n      &--active {\n        background-color: #00a870;\n        color: white;\n        border-bottom-color: #00a870;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__edit-btn {\n          color: white;\n        }\n\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: none;\n    }\n  }\n\n  // Flush Variant (No borders, clean look)\n  &--flush {\n    border: none;\n    border-radius: 0;\n\n    .ui-accordion__header {\n      background-color: transparent;\n      color: var(--color-text-primary);\n      border-bottom: 2px solid var(--color-surface-muted);\n      padding: 16px 0;\n      border-radius: 0;\n\n      &:hover {\n        background-color: transparent;\n\n        .ui-accordion__title {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: transparent;\n        border-bottom-color: #3f4af8;\n\n        .ui-accordion__title {\n          color: #3f4af8;\n        }\n      }\n    }\n\n    .ui-accordion__body {\n      background-color: transparent;\n      padding-top: 16px;\n      padding-bottom: 16px;\n      border: none;\n    }\n\n    .ui-accordion__controls {\n      display: flex;\n      align-items: center;\n\n      .ui-accordion__edit-btn {\n        display: none;\n      }\n    }\n  }\n\n  // With Icon Variant\n  &--with-icon {\n    border: 1px solid var(--color-border);\n    border-radius: 6px;\n\n    .ui-accordion__header {\n      background-color: var(--color-surface-elevated);\n      color: var(--color-text-primary);\n\n      &:hover {\n        background-color: var(--color-surface-muted);\n\n        .ui-accordion__icon {\n          color: #3f4af8;\n        }\n      }\n\n      &--active {\n        background-color: #3f4af8;\n        color: white;\n\n        .ui-accordion__title,\n        .ui-accordion__subtitle,\n        .ui-accordion__toggle-icon,\n        .ui-accordion__icon {\n          color: white;\n        }\n      }\n    }\n\n    .ui-accordion__icon {\n      min-width: 24px;\n      text-align: center;\n      transition: color 250ms ease;\n    }\n\n    .ui-accordion__body {\n      background-color: var(--color-surface);\n      border-top: 1px solid var(--color-border);\n    }\n  }\n\n  // Dark Theme Support (optional)\n  @media (prefers-color-scheme: dark) {\n    &--default {\n      border-color: #404040;\n\n      .ui-accordion__header {\n        background-color: #2a2a2a;\n        color: var(--color-border);\n\n        &:hover {\n          background-color: var(--color-text-primary);\n        }\n\n        &--active {\n          background-color: #383838;\n        }\n      }\n\n      .ui-accordion__body {\n        background-color: #1a1a1a;\n        border-top-color: #404040;\n      }\n    }\n\n    &--flush {\n      .ui-accordion__header {\n        color: var(--color-border);\n        border-bottom-color: #404040;\n\n        &--active {\n          border-bottom-color: #5a67d8;\n\n          .ui-accordion__title {\n            color: #5a67d8;\n          }\n        }\n      }\n\n      .ui-accordion__body {\n        color: #b0b0b0;\n      }\n    }\n  }\n}\n\n// Accessibility\n.ui-accordion__header {\n  &:focus-visible {\n    outline: 2px solid #3f4af8;\n    outline-offset: -2px;\n  }\n}\n\n// Animation for smooth opening/closing\n@media (prefers-reduced-motion: reduce) {\n  .ui-accordion__content,\n  .ui-accordion__header,\n  .ui-accordion__toggle-icon,\n  .ui-accordion__icon {\n    transition: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.AccordionGroupComponent, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }], { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], modalTemplate: [{
            type: Input
        }], sectionId: [{
            type: Input
        }], isOpen: [{
            type: Input
        }], variant: [{
            type: Input
        }], allowMultiple: [{
            type: Input
        }], icon: [{
            type: Input
        }], showEditButton: [{
            type: Input
        }], toggle: [{
            type: Output
        }], edit: [{
            type: Output
        }], content: [{
            type: ViewChild,
            args: ['content']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccordionComponent, { className: "AccordionComponent", filePath: "libs/shared/ui/src/lib/components/primitives/accordion/accordion.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=accordion.component.js.map