import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextButtonComponent } from '../../controls/text-button/text-button.component';
import { DropdownComponent } from '../../controls/dropdown/dropdown.component';
import { NumberBoxComponent } from '../../controls/number-box/number-box.component';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/dropdown.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
const _c0 = a0 => [a0];
function PaginationComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" Items ", ctx_r0.startEntry, "-", ctx_r0.endEntry, " of ", ctx_r0.totalItems, " ");
} }
function PaginationComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "p", 7);
    i0.ɵɵtext(2, "Per page:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 8)(4, "ui-dropdown", 9);
    i0.ɵɵpipe(5, "async");
    i0.ɵɵtwoWayListener("ngModelChange", function PaginationComponent_Conditional_3_Template_ui_dropdown_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.pageSize, $event) || (ctx_r0.pageSize = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("selectedChange", function PaginationComponent_Conditional_3_Template_ui_dropdown_selectedChange_4_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("label", "");
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.pageSize);
    i0.ɵɵproperty("options", i0.ɵɵpipeBind1(5, 4, ctx_r0.pageSizeOptions$))("isRequired", false);
} }
function PaginationComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "p", 7);
    i0.ɵɵtext(2, "Page:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 10)(4, "ui-number-box", 11);
    i0.ɵɵlistener("numberBox", function PaginationComponent_Conditional_5_Template_ui_number_box_numberBox_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onGoToInput($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "ui-text-button", 13);
    i0.ɵɵlistener("click", function PaginationComponent_Conditional_5_Template_ui_text_button_click_8_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToPage(ctx_r0.goToNumber)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("label", "")("isRequired", false)("placeholder", ctx_r0.currentPage.toString());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("/ ", ctx_r0.totalPages);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.isGoDisabled ? "ui-pagination__go-btn-wrapper ui-pagination__go-btn-wrapper--disabled" : "ui-pagination__go-btn-wrapper");
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", "Go")("variant", "info")("size", "small")("isExpanded", false)("disabled", ctx_r0.isGoDisabled);
} }
function PaginationComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "ui-button-group", 14);
    i0.ɵɵlistener("buttonClick", function PaginationComponent_Conditional_6_Template_ui_button_group_buttonClick_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPaginationClick($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("items", ctx_r0.paginationItems)("variant", "outlined")("size", "sm")("selectionMode", "single")("selectedValues", i0.ɵɵpureFunction1(6, _c0, ctx_r0.currentPage.toString()))("ariaLabel", "Page navigation");
} }
export class PaginationComponent {
    dropdownService;
    totalItems = 77;
    pageSize = 10;
    currentPage = 1;
    isDropCount = true;
    isPagination = true;
    isGoto = true;
    isShowingEntries = true;
    backgroundColor = '#fff4f4';
    pageChange = new EventEmitter();
    totalPages = 0;
    goToNumber = 0;
    isGoDisabled = true;
    paginationItems = [];
    pageSizeOptions$;
    constructor(dropdownService) {
        this.dropdownService = dropdownService;
        this.pageSizeOptions$ = this.dropdownService.getOptions('pageSize');
    }
    ngOnChanges() {
        this.updatePagination();
    }
    ngOnInit() {
        this.updatePagination();
    }
    updatePagination() {
        this.countTotalPage();
        if (this.totalPages === 0) {
            this.currentPage = 1;
            this.paginationItems = [];
            return;
        }
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }
        if (this.currentPage < 1) {
            this.currentPage = 1;
        }
        this.generateButtons();
    }
    countTotalPage() {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
    get shouldShowPagination() {
        return this.totalPages > 1;
    }
    get startEntry() {
        if (this.totalItems <= 0)
            return 0;
        return (this.currentPage - 1) * this.pageSize + 1;
    }
    get endEntry() {
        if (this.totalItems <= 0)
            return 0;
        return Math.min(this.currentPage * this.pageSize, this.totalItems);
    }
    generateButtons() {
        const pages = this.getDisplayedPages();
        this.paginationItems = [];
        if (this.totalPages > 3 && this.currentPage > 1) {
            this.paginationItems.push({ label: '', value: '-1', icon: 'double_arrow_left' }, { label: '', value: '-2', icon: 'arrow_left' });
        }
        pages.forEach((p) => {
            this.paginationItems.push({ label: p.toString(), value: p.toString() });
        });
        if (this.totalPages > 3 && this.currentPage < this.totalPages) {
            this.paginationItems.push({ label: '', value: '-3', icon: 'arrow_right' }, { label: '', value: '-4', icon: 'double_arrow_right' });
        }
    }
    onPaginationClick(item) {
        this.goToPage(parseInt(item.value, 10));
    }
    getDisplayedPages() {
        if (this.totalPages <= 3) {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
        if (this.currentPage >= this.totalPages - 2) {
            return [this.totalPages - 2, this.totalPages - 1, this.totalPages];
        }
        return [this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
    goToPage(id) {
        if (id === -1) {
            this.goToPage(1);
            return;
        }
        if (id === -2) {
            this.goToPage(this.currentPage - 1);
            return;
        }
        if (id === -3) {
            this.goToPage(this.currentPage + 1);
            return;
        }
        if (id === -4) {
            this.goToPage(this.totalPages);
            return;
        }
        if (id < 1 || id > this.totalPages)
            return;
        this.currentPage = id;
        this.pageChange.emit({
            page: this.currentPage,
            pageSize: this.pageSize,
        });
        this.generateButtons();
    }
    onPageSizeChange(value) {
        const newSize = Number(value);
        if (Number.isNaN(newSize) || newSize < 1) {
            this.pageSize = 10;
        }
        else {
            this.pageSize = Math.floor(newSize);
        }
        this.currentPage = 1;
        this.updatePagination();
        this.pageChange.emit({
            page: this.currentPage,
            pageSize: this.pageSize,
        });
    }
    onGoToInput(value) {
        this.goToNumber = Number(value);
        this.isGoDisabled =
            Number.isNaN(this.goToNumber) ||
                this.goToNumber < 1 ||
                this.goToNumber > this.totalPages;
    }
    static ɵfac = function PaginationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PaginationComponent)(i0.ɵɵdirectiveInject(i1.DropdownConfigService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationComponent, selectors: [["ui-pagination"]], inputs: { totalItems: "totalItems", pageSize: "pageSize", currentPage: "currentPage", isDropCount: "isDropCount", isPagination: "isPagination", isGoto: "isGoto", isShowingEntries: "isShowingEntries", backgroundColor: "backgroundColor" }, outputs: { pageChange: "pageChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 6, consts: [[1, "ui-pagination"], [1, "ui-pagination__meta"], [1, "ui-pagination__summary"], [1, "ui-pagination__chunk-size"], [1, "ui-pagination__actions"], [1, "ui-pagination__goto"], [1, "ui-pagination__page-nav"], [1, "ui-pagination__label"], [1, "ui-pagination__control", "ui-pagination__control--compact"], [3, "ngModelChange", "selectedChange", "label", "ngModel", "options", "isRequired"], [1, "ui-pagination__control", "ui-pagination__control--number"], [3, "numberBox", "label", "isRequired", "placeholder"], [1, "ui-pagination__hint"], [3, "click", "text", "variant", "size", "isExpanded", "disabled"], [3, "buttonClick", "items", "variant", "size", "selectionMode", "selectedValues", "ariaLabel"]], template: function PaginationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵconditionalCreate(2, PaginationComponent_Conditional_2_Template, 2, 3, "p", 2);
            i0.ɵɵconditionalCreate(3, PaginationComponent_Conditional_3_Template, 6, 6, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵconditionalCreate(5, PaginationComponent_Conditional_5_Template, 9, 11, "div", 5);
            i0.ɵɵconditionalCreate(6, PaginationComponent_Conditional_6_Template, 2, 8, "div", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--ui-pagination-bg", ctx.backgroundColor);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isShowingEntries ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isDropCount ? 3 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isGoto ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isPagination && ctx.shouldShowPagination ? 6 : -1);
        } }, dependencies: [CommonModule,
            DropdownComponent,
            FormsModule, i2.NgControlStatus, i2.NgModel, NumberBoxComponent,
            TextButtonComponent,
            ButtonGroupComponent, i3.AsyncPipe], styles: [".ui-pagination[_ngcontent-%COMP%] {\r\n\t--ui-pagination-bg: #fff4f4;\r\n\r\n\twidth: 100%;\r\n\tmin-width: 720px;\r\n\tpadding: 0.75rem 1rem;\r\n\tborder: 1px solid var(--color-border);\r\n\tborder-radius: 0.75rem;\r\n\tbackground: linear-gradient(180deg, color-mix(in srgb, var(--ui-pagination-bg) 82%, var(--color-surface)), var(--ui-pagination-bg));\r\n\tbox-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n\tgap: 1rem;\r\n\tcolor: #475569;\r\n}\r\n\r\n.ui-pagination__meta[_ngcontent-%COMP%], \r\n.ui-pagination__actions[_ngcontent-%COMP%] {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 1rem;\r\n}\r\n\r\n.ui-pagination__summary[_ngcontent-%COMP%] {\r\n\tmargin: 0;\r\n\tfont-size: 0.9rem;\r\n\tfont-weight: 500;\r\n\tcolor: #334155;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.ui-pagination__chunk-size[_ngcontent-%COMP%], \r\n.ui-pagination__goto[_ngcontent-%COMP%] {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 0.25rem;\r\n}\r\n\r\n.ui-pagination__label[_ngcontent-%COMP%] {\r\n\tmargin: 0;\r\n\tfont-size: 0.82rem;\r\n\tfont-weight: 600;\r\n\tcolor: #64748b;\r\n\twhite-space: nowrap;\r\n\ttext-transform: uppercase;\r\n\tletter-spacing: 0.04em;\r\n}\r\n\r\n.ui-pagination__hint[_ngcontent-%COMP%] {\r\n\tmargin: 0;\r\n\tfont-size: 0.82rem;\r\n\tcolor: #64748b;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.ui-pagination__control[_ngcontent-%COMP%] {\r\n\tmin-width: 48px;\r\n}\r\n\r\n.ui-pagination__control--compact[_ngcontent-%COMP%] {\r\n\tmin-width: 56px;\r\n}\r\n\r\n.ui-pagination__control--number[_ngcontent-%COMP%] {\r\n\tmin-width: 48px;\r\n}\r\n\r\n.ui-pagination__go-btn-wrapper[_ngcontent-%COMP%] {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\r\n\t&--disabled {\r\n\t\topacity: 0.55;\r\n\t\tpointer-events: none;\r\n\t}\r\n}\r\n\r\n.ui-pagination__page-nav[_ngcontent-%COMP%] {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tpadding: 0.125rem;\r\n\tborder-radius: 0.625rem;\r\n\tbackground-color: rgba(255, 255, 255, 0.78);\r\n\tborder: 1px solid rgba(148, 163, 184, 0.26);\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n\t.ui-pagination[_ngcontent-%COMP%] {\r\n\t\tmin-width: 100%;\r\n\t\tflex-direction: column;\r\n\t\talign-items: stretch;\r\n\t}\r\n\r\n\t.ui-pagination__meta[_ngcontent-%COMP%], \r\n\t.ui-pagination__actions[_ngcontent-%COMP%] {\r\n\t\twidth: 100%;\r\n\t\tjustify-content: space-between;\r\n\t\tflex-wrap: wrap;\r\n\t\trow-gap: 0.75rem;\r\n\t}\r\n\r\n\t.ui-pagination__summary[_ngcontent-%COMP%] {\r\n\t\twidth: 100%;\r\n\t}\r\n}\r\n\r\n@media (max-width: 640px) {\r\n\t.ui-pagination[_ngcontent-%COMP%] {\r\n\t\tpadding: 0.75rem;\r\n\t\tgap: 0.75rem;\r\n\t}\r\n\r\n\t.ui-pagination__chunk-size[_ngcontent-%COMP%], \r\n\t.ui-pagination__goto[_ngcontent-%COMP%] {\r\n\t\twidth: 100%;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\t.ui-pagination__actions[_ngcontent-%COMP%] {\r\n\t\tgap: 0.75rem;\r\n\t}\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-pagination', standalone: true, imports: [
                    CommonModule,
                    DropdownComponent,
                    FormsModule,
                    NumberBoxComponent,
                    TextButtonComponent,
                    ButtonGroupComponent,
                ], template: "<div class=\"ui-pagination\" [style.--ui-pagination-bg]=\"backgroundColor\">\r\n  <div class=\"ui-pagination__meta\">\r\n    @if (isShowingEntries) {\r\n      <p class=\"ui-pagination__summary\">\r\n        Items {{ startEntry }}-{{ endEntry }} of {{ totalItems }}\r\n      </p>\r\n    }\r\n\r\n    @if (isDropCount) {\r\n      <div class=\"ui-pagination__chunk-size\">\r\n        <p class=\"ui-pagination__label\">Per page:</p>\r\n        <div class=\"ui-pagination__control ui-pagination__control--compact\">\r\n          <ui-dropdown\r\n            [label]=\"''\"\r\n            [(ngModel)]=\"pageSize\"\r\n            [options]=\"pageSizeOptions$ | async\"\r\n            [isRequired]=\"false\"\r\n            (selectedChange)=\"onPageSizeChange($event)\">\r\n          </ui-dropdown>\r\n        </div>\r\n      </div>\r\n    }\r\n  </div>\r\n\r\n  <div class=\"ui-pagination__actions\">\r\n    @if (isGoto) {\r\n      <div class=\"ui-pagination__goto\">\r\n        <p class=\"ui-pagination__label\">Page:</p>\r\n        <div class=\"ui-pagination__control ui-pagination__control--number\">\r\n          <ui-number-box\r\n            [label]=\"''\"\r\n            [isRequired]=\"false\"\r\n            [placeholder]=\"currentPage.toString()\"\r\n            (numberBox)=\"onGoToInput($event)\">\r\n          </ui-number-box>\r\n        </div>\r\n        <p class=\"ui-pagination__hint\">/ {{ totalPages }}</p>\r\n        <div [class]=\"isGoDisabled ? 'ui-pagination__go-btn-wrapper ui-pagination__go-btn-wrapper--disabled' : 'ui-pagination__go-btn-wrapper'\">\r\n          <ui-text-button\r\n            [text]=\"'Go'\"\r\n            [variant]=\"'info'\"\r\n            [size]=\"'small'\"\r\n            [isExpanded]=\"false\"\r\n            [disabled]=\"isGoDisabled\"\r\n            (click)=\"goToPage(goToNumber)\">\r\n          </ui-text-button>\r\n        </div>\r\n      </div>\r\n    }\r\n\r\n    @if (isPagination && shouldShowPagination) {\r\n      <div class=\"ui-pagination__page-nav\">\r\n        <ui-button-group\r\n          [items]=\"paginationItems\"\r\n          [variant]=\"'outlined'\"\r\n          [size]=\"'sm'\"\r\n          [selectionMode]=\"'single'\"\r\n          [selectedValues]=\"[currentPage.toString()]\"\r\n          [ariaLabel]=\"'Page navigation'\"\r\n          (buttonClick)=\"onPaginationClick($event)\">\r\n        </ui-button-group>\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n", styles: [".ui-pagination {\r\n\t--ui-pagination-bg: #fff4f4;\r\n\r\n\twidth: 100%;\r\n\tmin-width: 720px;\r\n\tpadding: 0.75rem 1rem;\r\n\tborder: 1px solid var(--color-border);\r\n\tborder-radius: 0.75rem;\r\n\tbackground: linear-gradient(180deg, color-mix(in srgb, var(--ui-pagination-bg) 82%, var(--color-surface)), var(--ui-pagination-bg));\r\n\tbox-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: space-between;\r\n\tgap: 1rem;\r\n\tcolor: #475569;\r\n}\r\n\r\n.ui-pagination__meta,\r\n.ui-pagination__actions {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 1rem;\r\n}\r\n\r\n.ui-pagination__summary {\r\n\tmargin: 0;\r\n\tfont-size: 0.9rem;\r\n\tfont-weight: 500;\r\n\tcolor: #334155;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.ui-pagination__chunk-size,\r\n.ui-pagination__goto {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tgap: 0.25rem;\r\n}\r\n\r\n.ui-pagination__label {\r\n\tmargin: 0;\r\n\tfont-size: 0.82rem;\r\n\tfont-weight: 600;\r\n\tcolor: #64748b;\r\n\twhite-space: nowrap;\r\n\ttext-transform: uppercase;\r\n\tletter-spacing: 0.04em;\r\n}\r\n\r\n.ui-pagination__hint {\r\n\tmargin: 0;\r\n\tfont-size: 0.82rem;\r\n\tcolor: #64748b;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.ui-pagination__control {\r\n\tmin-width: 48px;\r\n}\r\n\r\n.ui-pagination__control--compact {\r\n\tmin-width: 56px;\r\n}\r\n\r\n.ui-pagination__control--number {\r\n\tmin-width: 48px;\r\n}\r\n\r\n.ui-pagination__go-btn-wrapper {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\r\n\t&--disabled {\r\n\t\topacity: 0.55;\r\n\t\tpointer-events: none;\r\n\t}\r\n}\r\n\r\n.ui-pagination__page-nav {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tpadding: 0.125rem;\r\n\tborder-radius: 0.625rem;\r\n\tbackground-color: rgba(255, 255, 255, 0.78);\r\n\tborder: 1px solid rgba(148, 163, 184, 0.26);\r\n}\r\n\r\n@media (max-width: 1024px) {\r\n\t.ui-pagination {\r\n\t\tmin-width: 100%;\r\n\t\tflex-direction: column;\r\n\t\talign-items: stretch;\r\n\t}\r\n\r\n\t.ui-pagination__meta,\r\n\t.ui-pagination__actions {\r\n\t\twidth: 100%;\r\n\t\tjustify-content: space-between;\r\n\t\tflex-wrap: wrap;\r\n\t\trow-gap: 0.75rem;\r\n\t}\r\n\r\n\t.ui-pagination__summary {\r\n\t\twidth: 100%;\r\n\t}\r\n}\r\n\r\n@media (max-width: 640px) {\r\n\t.ui-pagination {\r\n\t\tpadding: 0.75rem;\r\n\t\tgap: 0.75rem;\r\n\t}\r\n\r\n\t.ui-pagination__chunk-size,\r\n\t.ui-pagination__goto {\r\n\t\twidth: 100%;\r\n\t\tjustify-content: space-between;\r\n\t}\r\n\r\n\t.ui-pagination__actions {\r\n\t\tgap: 0.75rem;\r\n\t}\r\n}\r\n"] }]
    }], () => [{ type: i1.DropdownConfigService }], { totalItems: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], currentPage: [{
            type: Input
        }], isDropCount: [{
            type: Input
        }], isPagination: [{
            type: Input
        }], isGoto: [{
            type: Input
        }], isShowingEntries: [{
            type: Input
        }], backgroundColor: [{
            type: Input
        }], pageChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "libs/shared/ui/src/lib/components/primitives/pagination/pagination.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=pagination.component.js.map