import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ChangeDetectionStrategy, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
function MultiSelectComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 2);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function MultiSelectComponent_For_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 16);
} if (rf & 2) {
    const option_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", option_r2.avatar, i0.ɵɵsanitizeUrl)("alt", option_r2.name);
} }
function MultiSelectComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵconditionalCreate(1, MultiSelectComponent_For_7_Conditional_1_Template, 1, 2, "img", 16);
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "ui-icon", 17);
    i0.ɵɵlistener("click", function MultiSelectComponent_For_7_Template_ui_icon_click_3_listener($event) { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); $event.preventDefault(); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.removeSelected(option_r2.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r2.avatar ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r2.name, " ");
} }
function MultiSelectComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 18);
    i0.ɵɵlistener("input", function MultiSelectComponent_Conditional_8_Template_input_input_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSearchTextChange($event)); })("click", function MultiSelectComponent_Conditional_8_Template_input_click_0_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formControl", ctx_r2.searchForm.controls["search"]);
} }
function MultiSelectComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.placeholder);
} }
function MultiSelectComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ui-icon", 19);
    i0.ɵɵlistener("click", function MultiSelectComponent_Conditional_11_Template_ui_icon_click_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); $event.preventDefault(); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.clearAll()); });
    i0.ɵɵelementEnd();
} }
function MultiSelectComponent_Conditional_14_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 22);
} }
function MultiSelectComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 20);
    i0.ɵɵlistener("click", function MultiSelectComponent_Conditional_14_Template_li_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleSelectAllClick()); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2, "Select All");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, MultiSelectComponent_Conditional_14_Conditional_3_Template, 1, 0, "ui-icon", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.areAllOptionsSelected ? 3 : -1);
} }
function MultiSelectComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 13);
    i0.ɵɵtext(1, "No results found");
    i0.ɵɵelementEnd();
} }
function MultiSelectComponent_For_18_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 24);
} if (rf & 2) {
    const option_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", option_r8.avatar, i0.ɵɵsanitizeUrl)("alt", option_r8.name);
} }
function MultiSelectComponent_For_18_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r8.email);
} }
function MultiSelectComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 23);
    i0.ɵɵlistener("click", function MultiSelectComponent_For_18_Template_li_click_0_listener() { const option_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectOption(option_r8)); });
    i0.ɵɵconditionalCreate(1, MultiSelectComponent_For_18_Conditional_1_Template, 1, 2, "img", 24);
    i0.ɵɵelementStart(2, "div", 25)(3, "div", 26);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, MultiSelectComponent_For_18_Conditional_5_Template, 2, 1, "div", 27);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r8.avatar ? 1 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", option_r8.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r8.email ? 5 : -1);
} }
export class MultiSelectComponent {
    eRef;
    renderer;
    cdr;
    label = 'Gender';
    placeholder = 'Select Gender';
    isRequired = false;
    set options(value) {
        this._options = value;
        this.filteredOptions = [...value];
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }
    get options() {
        return this._options;
    }
    parentFormGroup;
    id;
    selectedChange = new EventEmitter();
    blurEvent = new EventEmitter();
    _options = [];
    showSelectAll = true;
    filteredOptions = [];
    searchControlId = 'search';
    searchForm = new FormGroup({
        search: new FormControl(''),
    });
    get hasSelectedValues() {
        return this.selectedValues.length > 0;
    }
    get optionNames() {
        return this.options.map((option) => option.name);
    }
    get visibleOptionValues() {
        return this.filteredOptions.map((option) => option.value);
    }
    get areAllVisibleOptionsSelected() {
        return (this.visibleOptionValues.length > 0 &&
            this.visibleOptionValues.every((value) => this.selectedValues.includes(value)));
    }
    get areAllOptionsSelected() {
        return this.options.length > 0 && this.selectedValues.length === this.options.length;
    }
    get optionLength() {
        return this.filteredOptions?.length ?? 0;
    }
    get panelHeaderHeight() {
        let height = 56;
        if (this.showSelectAll && this.options.length > 0) {
            height += 46;
        }
        return height;
    }
    onToggle(event) {
        event.stopPropagation();
        this.hasInteracted = true;
        // onToggle is no longer needed with new structure
    }
    portalList;
    uniqueId = '';
    selectedValues = [];
    isOpenUp = false;
    isOpen = false;
    isActive = false;
    startY = 0;
    startHeight = 0;
    resizing = false;
    mouseMoveListener;
    mouseUpListener;
    constructor(eRef, renderer, cdr) {
        this.eRef = eRef;
        this.renderer = renderer;
        this.cdr = cdr;
        this.mouseMoveListener = this.handleMouseMove.bind(this);
        this.mouseUpListener = this.handleMouseUp.bind(this);
    }
    ngOnInit() {
        const randomStr = Math.random().toString(36).substring(2, 9);
        this.uniqueId = `dropdown_${this.id}_${randomStr}`;
        if (this.parentFormGroup && this.id) {
            this.selectedValues = this.parentFormGroup.get(this.id)?.value || [];
            this.isActive = this.selectedValues.length > 0;
        }
        this.searchControlId = `search_${this.id || randomStr}`;
    }
    onSearchTextChange(event) {
        const searchText = event.target.value;
        const query = searchText.toLowerCase().trim();
        if (!query) {
            this.filteredOptions = [...this.options];
        }
        else {
            this.filteredOptions = this.options.filter((option) => {
                const matchesName = option.name.toLowerCase().includes(query);
                const matchesEmail = option.email?.toLowerCase().includes(query) || false;
                return matchesName || matchesEmail;
            });
        }
        this.cdr.detectChanges();
    }
    onCheckboxChange(checked, option) {
        if (checked) {
            if (!this.selectedValues.includes(option.value)) {
                this.selectedValues.push(option.value);
            }
        }
        else {
            this.selectedValues = this.selectedValues.filter((v) => v !== option.value);
        }
        this.syncSelectionState();
    }
    removeSelected(value) {
        this.selectedValues = this.selectedValues.filter((v) => v !== value);
        // Update filteredOptions to show the removed item in dropdown
        this.filteredOptions = [...this.options];
        this.syncSelectionState();
        this.cdr.detectChanges();
    }
    getSelectedOptions() {
        return this.options.filter((opt) => this.selectedValues.includes(opt.value));
    }
    // Get only options that are NOT selected
    getAvailableOptions() {
        return this.filteredOptions.filter((option) => !this.selectedValues.includes(option.value));
    }
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return (this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    onChange = (_) => { };
    onTouched = () => { };
    disabled = false;
    writeValue(obj) {
        this.selectedValues = obj || [];
        this.isActive = this.selectedValues.length > 0;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    deleteOption(option) {
        this.filteredOptions = this.filteredOptions.filter((o) => o !== option);
        this.options = this.options.filter((o) => o !== option);
        this.selectedValues = this.selectedValues.filter((v) => v !== option.value);
        this.syncSelectionState();
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    hasInteracted = false;
    selectOption(option) {
        if (!this.selectedValues.includes(option.value)) {
            this.selectedValues.push(option.value);
        }
        this.searchForm.get('search')?.setValue('');
        this.filteredOptions = [...this.options];
        this.isActive = true;
        this.syncSelectionState(true);
    }
    clearAll() {
        this.selectedValues = [];
        this.filteredOptions = [...this.options];
        this.searchForm.get('search')?.setValue('');
        this.syncSelectionState();
        this.cdr.detectChanges();
    }
    toggleSelectAllClick() {
        const isAllSelected = this.selectedValues.length === this.options.length && this.options.length > 0;
        this.toggleSelectAll(!isAllSelected);
    }
    toggleSelectAll(checked) {
        if (checked) {
            // Select all options
            const allValues = this.options.map(opt => opt.value);
            this.selectedValues = [...new Set([...this.selectedValues, ...allValues])];
        }
        else {
            // Deselect all options
            this.selectedValues = [];
        }
        this.filteredOptions = [...this.options];
        this.searchForm.get('search')?.setValue('');
        this.syncSelectionState(true);
        this.cdr.detectChanges();
    }
    onBlur() {
        this.control?.markAsTouched();
        this.onTouched();
        this.blurEvent.emit();
        if (this.selectedValues.length === 0) {
            this.isActive = false;
        }
    }
    handleClickOutside(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
            if (this.selectedValues.length === 0) {
                this.isActive = false;
                this.control?.markAsTouched();
            }
        }
    }
    closeOverlay() {
        if (this.portalList) {
            this.portalList.remove();
            this.portalList = undefined;
        }
    }
    decideDropdownDirection() {
        const dropdown = this.eRef.nativeElement.querySelector('.custom-dropdown');
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        if (!dropdown || !list)
            return;
        list.style.visibility = 'hidden';
        list.style.display = 'block';
        const listHeight = list.offsetHeight || 150;
        list.style.display = '';
        list.style.visibility = '';
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
    setInitialHeight() {
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        if (list) {
            const optionHeight = 38;
            const buffer = 12 + this.panelHeaderHeight;
            const totalHeight = this.optionLength * optionHeight + buffer;
            const initialHeight = Math.min(244, totalHeight);
            const maxHeight = totalHeight;
            this.renderer.setStyle(list, 'height', `${initialHeight}px`);
            this.renderer.setStyle(list, 'max-height', `${maxHeight}px`);
            this.renderer.setStyle(list, 'overflow', 'hidden');
            this.renderer.setStyle(list, 'resize', 'none');
            this.renderer.setStyle(list, 'transform-origin', 'top');
            const optionsDiv = list.querySelector(':scope > div');
            if (optionsDiv) {
                const optionsDivHeight = Math.max(initialHeight - this.panelHeaderHeight, 0);
                this.renderer.setStyle(optionsDiv, 'max-height', `${optionsDivHeight}px`);
                this.renderer.setStyle(optionsDiv, 'overflow-y', 'auto');
            }
        }
    }
    closeDropdown() {
        const checkbox = this.eRef.nativeElement.querySelector('.dropdown-toggle');
        if (checkbox)
            checkbox.checked = false;
        this.isOpen = false;
        this.closeOverlay();
    }
    syncSelectionState(markControl = false) {
        const nextValues = [...this.selectedValues];
        this.selectedValues = nextValues;
        this.isActive = nextValues.length > 0;
        this.onChange(nextValues);
        if (markControl) {
            this.control?.markAsTouched();
            this.control?.markAsDirty();
        }
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.selectedChange.emit(nextValues);
    }
    ngAfterViewInit() {
        if (!this.draggable)
            return;
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        const handle = this.eRef.nativeElement.querySelector('.resize-hr');
        if (!list || !handle)
            return;
        handle.addEventListener('mousedown', (event) => {
            this.startY = event.clientY;
            this.startHeight = list.offsetHeight;
            this.resizing = true;
            handle.classList.add('dragging');
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            event.preventDefault();
            event.stopPropagation();
        });
        document.addEventListener('mousemove', this.mouseMoveListener, {
            passive: false,
        });
        document.addEventListener('mouseup', this.mouseUpListener, {
            passive: false,
        });
        document.addEventListener('contextmenu', this.preventContextMenu, {
            passive: false,
        });
    }
    handleMouseMove(event) {
        if (!this.resizing)
            return;
        event.preventDefault();
        event.stopPropagation();
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        if (!list)
            return;
        const diff = event.clientY - this.startY;
        let newHeight = this.startHeight + diff;
        const totalHeight = this.optionLength * 38;
        const minHeight = 80;
        newHeight = Math.min(newHeight, totalHeight);
        newHeight = Math.max(newHeight, minHeight);
        list.style.height = `${newHeight}px`;
        list.style.minHeight = `${newHeight}px`;
        list.style.maxHeight = `${Math.max(newHeight, totalHeight)}px`;
        const optionsDiv = list.querySelector(':scope > div');
        if (optionsDiv) {
            const optionsDivHeight = Math.max(newHeight - this.panelHeaderHeight, 0);
            this.renderer.setStyle(optionsDiv, 'max-height', `${optionsDivHeight}px`);
        }
        this.adjustDropdownPosition(list);
    }
    handleMouseUp(event) {
        if (!this.resizing)
            return;
        event.preventDefault();
        event.stopPropagation();
        this.resizing = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        const list = this.eRef.nativeElement.querySelector('.custom-dropdown-list');
        if (list) {
            const currentHeight = list.offsetHeight;
            list.style.height = `${currentHeight}px`;
            list.style.transition = 'none';
            list.style.cursor = 'default';
        }
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('contextmenu', this.preventContextMenu);
    }
    adjustDropdownPosition(list) {
        const dropdown = this.eRef.nativeElement.querySelector('.custom-dropdown');
        if (!dropdown || !list)
            return;
        const rect = dropdown.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < listRect.height && spaceAbove > spaceBelow) {
            list.classList.add('open-up');
        }
        else {
            list.classList.remove('open-up');
        }
    }
    preventContextMenu = (event) => {
        event.preventDefault();
    };
    ngOnDestroy() {
        if (this.mouseMoveListener) {
            document.removeEventListener('mousemove', this.mouseMoveListener);
        }
        if (this.mouseUpListener) {
            document.removeEventListener('mouseup', this.mouseUpListener);
        }
        document.removeEventListener('contextmenu', this.preventContextMenu);
    }
    draggable = false;
    static ɵfac = function MultiSelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MultiSelectComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MultiSelectComponent, selectors: [["ui-multi-select"]], hostBindings: function MultiSelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function MultiSelectComponent_click_HostBindingHandler($event) { return ctx.handleClickOutside($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { label: "label", placeholder: "placeholder", isRequired: "isRequired", options: "options", parentFormGroup: "parentFormGroup", id: "id", showSelectAll: "showSelectAll", draggable: "draggable" }, outputs: { selectedChange: "selectedChange", blurEvent: "blurEvent" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: MultiSelectComponent,
                    multi: true,
                },
            ])], decls: 19, vars: 31, consts: [[1, "custom-dropdown", "relative", "w-full", "bg-white", "rounded-lg", "multi-select", 3, "formGroup"], [1, "absolute", "left-3", "z-10", "font-medium", "px-1", "pointer-events-none", "transition-all", "duration-200", "ease-out"], [1, "ml-px", "inline", "text-[12px]", "text-red-600"], ["type", "hidden", 3, "formControlName", "value"], [1, "relative", "min-h-[48px]", "h-auto", "w-full", "rounded-lg", "border", "bg-white", "px-3", "pr-12", "py-2", "text-sm", "flex", "items-center", "gap-2", "transition-colors", "duration-200", "flex-wrap", "content-start", 3, "click", "blur"], [1, "inline-flex", "items-center", "gap-1.5", "whitespace-nowrap", "rounded-md", "bg-[#e8f2ff]", "px-2.5", "py-1", "text-[13px]", "text-[#2563eb]"], ["type", "text", "placeholder", "Type something...", 1, "flex-1", "min-w-[150px]", "border-none", "outline-none", "bg-transparent", "text-sm", 3, "formControl"], [1, "text-gray-500", "font-normal"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "flex", "items-center", "gap-1"], ["name", "delete", 1, "w-5", "h-5", "inline-flex", "items-center", "justify-center", "cursor-pointer", "text-red-500", "hover:text-red-600"], [1, "inline-flex", "h-5", "w-5", "items-center", "justify-center", "transition-transform", "duration-200", 3, "name"], [1, "custom-dropdown-list", "absolute", "left-0", "right-0", "z-[1000]", "hidden", "w-full", "max-w-full", "box-border", "rounded-lg", "border", "border-gray-300", "bg-white", "shadow-[0_4px_12px_rgba(0,0,0,0.1)]", 3, "click"], [1, "border-b", "border-gray-200", "px-3", "py-2.5", "cursor-pointer", "hover:bg-blue-50", "flex", "items-center", "justify-between"], [1, "px-3", "py-2", "text-sm", "text-gray-400", "italic"], [1, "overflow-y-auto", "max-h-64"], [1, "dropdown-option", "relative", "flex", "items-center", "gap-3", "px-3", "py-2.5", "cursor-pointer", "hover:bg-blue-50", "transition-colors"], [1, "inline-block", "w-5", "h-5", "rounded-full", "object-cover", 3, "src", "alt"], ["name", "cross_2", 1, "inline-flex", "h-4", "w-4", "items-center", "justify-center", "cursor-pointer", "hover:text-[#1d47a0]", 3, "click"], ["type", "text", "placeholder", "Type something...", 1, "flex-1", "min-w-[150px]", "border-none", "outline-none", "bg-transparent", "text-sm", 3, "input", "click", "formControl"], ["name", "delete", 1, "w-5", "h-5", "inline-flex", "items-center", "justify-center", "cursor-pointer", "text-red-500", "hover:text-red-600", 3, "click"], [1, "border-b", "border-gray-200", "px-3", "py-2.5", "cursor-pointer", "hover:bg-blue-50", "flex", "items-center", "justify-between", 3, "click"], [1, "text-sm", "font-medium"], ["name", "mdi:check", 1, "inline-flex", "h-4", "w-4", "items-center", "justify-center", "text-blue-600"], [1, "dropdown-option", "relative", "flex", "items-center", "gap-3", "px-3", "py-2.5", "cursor-pointer", "hover:bg-blue-50", "transition-colors", 3, "click"], [1, "w-8", "h-8", "rounded-full", "object-cover", "flex-shrink-0", 3, "src", "alt"], [1, "flex-1"], [1, "text-sm", "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-500"]], template: function MultiSelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵconditionalCreate(3, MultiSelectComponent_Conditional_3_Template, 2, 0, "span", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "input", 3);
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵlistener("click", function MultiSelectComponent_Template_div_click_5_listener() { ctx.isActive = true; return ctx.isOpen = true; })("blur", function MultiSelectComponent_Template_div_blur_5_listener() { return ctx.onBlur(); });
            i0.ɵɵrepeaterCreate(6, MultiSelectComponent_For_7_Template, 4, 2, "span", 5, _forTrack0);
            i0.ɵɵconditionalCreate(8, MultiSelectComponent_Conditional_8_Template, 1, 1, "input", 6);
            i0.ɵɵconditionalCreate(9, MultiSelectComponent_Conditional_9_Template, 2, 1, "span", 7);
            i0.ɵɵelementStart(10, "div", 8);
            i0.ɵɵconditionalCreate(11, MultiSelectComponent_Conditional_11_Template, 1, 0, "ui-icon", 9);
            i0.ɵɵelement(12, "ui-icon", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "ul", 11);
            i0.ɵɵlistener("click", function MultiSelectComponent_Template_ul_click_13_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵconditionalCreate(14, MultiSelectComponent_Conditional_14_Template, 4, 1, "li", 12);
            i0.ɵɵconditionalCreate(15, MultiSelectComponent_Conditional_15_Template, 2, 0, "li", 13);
            i0.ɵɵelementStart(16, "div", 14);
            i0.ɵɵrepeaterCreate(17, MultiSelectComponent_For_18_Template, 6, 3, "li", 15, _forTrack0);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("error", ctx.isInvalid);
            i0.ɵɵproperty("formGroup", ctx.parentFormGroup);
            i0.ɵɵadvance();
            i0.ɵɵclassMap(!ctx.isOpen && !ctx.hasSelectedValues ? "top-3 text-sm text-gray-500 bg-transparent" : "-top-2 text-xs text-gray-500 bg-white");
            i0.ɵɵclassProp("text-red-600", ctx.isInvalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formControlName", ctx.id)("value", ctx.selectedValues);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("border-red-600", ctx.isInvalid)("border-blue-600", !ctx.isInvalid && ctx.isOpen)("border-gray-300", !ctx.isInvalid && !ctx.isOpen);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.getSelectedOptions());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isOpen && !ctx.areAllOptionsSelected ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.hasSelectedValues && !ctx.isOpen ? 9 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedValues.length > 2 ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("rotate-180", ctx.isOpen);
            i0.ɵɵproperty("name", "arrow_down");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("hidden", !ctx.isOpen)("top-[calc(100%+4px)]", !ctx.isOpenUp)("bottom-[calc(100%+4px)]", ctx.isOpenUp);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.options.length > 0 ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.getAvailableOptions().length === 0 && ctx.selectedValues.length === 0 ? 15 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.getAvailableOptions());
        } }, dependencies: [CommonModule,
            IconComponent,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormControlDirective, i1.FormGroupDirective, i1.FormControlName], styles: [".multi-select-container[_ngcontent-%COMP%] {\n  height: 36px;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MultiSelectComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-multi-select', standalone: true, imports: [
                    CommonModule,
                    IconComponent,
                    FormsModule,
                    ReactiveFormsModule,
                ], providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: MultiSelectComponent,
                        multi: true,
                    },
                ], template: "<div\r\n  class=\"custom-dropdown relative w-full bg-white rounded-lg multi-select\"\r\n  [formGroup]=\"parentFormGroup\"\r\n  [class.error]=\"isInvalid\"\r\n>\r\n  <span\r\n    class=\"absolute left-3 z-10 font-medium px-1 pointer-events-none transition-all duration-200 ease-out\"\r\n    [class]=\"\r\n      !isOpen && !hasSelectedValues\r\n        ? 'top-3 text-sm text-gray-500 bg-transparent'\r\n        : '-top-2 text-xs text-gray-500 bg-white'\r\n    \"\r\n    [class.text-red-600]=\"isInvalid\"\r\n  >\r\n    {{ label }}\r\n    @if (isRequired) {\r\n      <span class=\"ml-px inline text-[12px] text-red-600\">*</span>\r\n    }\r\n  </span>\r\n\r\n  <input\r\n    type=\"hidden\"\r\n    [formControlName]=\"id\"\r\n    [value]=\"selectedValues\"\r\n  />\r\n\r\n  <div\r\n    class=\"relative min-h-[48px] h-auto w-full rounded-lg border bg-white px-3 pr-12 py-2 text-sm flex items-center gap-2 transition-colors duration-200 flex-wrap content-start\"\r\n    [class.border-red-600]=\"isInvalid\"\r\n    [class.border-blue-600]=\"!isInvalid && isOpen\"\r\n    [class.border-gray-300]=\"!isInvalid && !isOpen\"\r\n    (click)=\"isActive = true; isOpen = true\"\r\n    (blur)=\"onBlur()\"\r\n  >\r\n    <!-- Selected chips -->\r\n    @for (option of getSelectedOptions(); track option.value) {\r\n      <span\r\n        class=\"inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#e8f2ff] px-2.5 py-1 text-[13px] text-[#2563eb]\"\r\n      >\r\n        @if (option.avatar) {\r\n          <img\r\n            [src]=\"option.avatar\"\r\n            [alt]=\"option.name\"\r\n            class=\"inline-block w-5 h-5 rounded-full object-cover\"\r\n          />\r\n        }\r\n        {{ option.name }}\r\n        <ui-icon\r\n          name=\"cross_2\"\r\n          class=\"inline-flex h-4 w-4 items-center justify-center cursor-pointer hover:text-[#1d47a0]\"\r\n          (click)=\"\r\n            $event.preventDefault();\r\n            $event.stopPropagation();\r\n            removeSelected(option.value)\r\n          \"\r\n        >\r\n        </ui-icon>\r\n      </span>\r\n    }\r\n\r\n    <!-- Search input integrated -->\r\n    @if (isOpen && !areAllOptionsSelected) {\r\n      <input\r\n        type=\"text\"\r\n        placeholder=\"Type something...\"\r\n        class=\"flex-1 min-w-[150px] border-none outline-none bg-transparent text-sm\"\r\n        [formControl]=\"searchForm.controls['search']!\"\r\n        (input)=\"onSearchTextChange($event)\"\r\n        (click)=\"$event.stopPropagation()\"\r\n      />\r\n    }\r\n\r\n    @if (!hasSelectedValues && !isOpen) {\r\n      <span class=\"text-gray-500 font-normal\">{{ placeholder }}</span>\r\n    }\r\n\r\n    <div\r\n      class=\"absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1\"\r\n    >\r\n      @if (selectedValues.length > 2) {\r\n        <ui-icon\r\n          name=\"delete\"\r\n          class=\"w-5 h-5 inline-flex items-center justify-center cursor-pointer text-red-500 hover:text-red-600\"\r\n          (click)=\"\r\n            $event.preventDefault(); $event.stopPropagation(); clearAll()\r\n          \"\r\n        >\r\n        </ui-icon>\r\n      }\r\n\r\n      <ui-icon\r\n        [name]=\"'arrow_down'\"\r\n        class=\"inline-flex h-5 w-5 items-center justify-center transition-transform duration-200\"\r\n        [class.rotate-180]=\"isOpen\"\r\n      >\r\n      </ui-icon>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Dropdown list - only show unselected items -->\r\n  <ul\r\n    class=\"custom-dropdown-list absolute left-0 right-0 z-[1000] hidden w-full max-w-full box-border rounded-lg border border-gray-300 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]\"\r\n    [class.hidden]=\"!isOpen\"\r\n    [class.top-[calc(100%+4px)]]=\"!isOpenUp\"\r\n    [class.bottom-[calc(100%+4px)]]=\"isOpenUp\"\r\n    (click)=\"$event.stopPropagation()\"\r\n  >\r\n    <!-- Select All option -->\r\n    @if (options.length > 0) {\r\n      <li\r\n        class=\"border-b border-gray-200 px-3 py-2.5 cursor-pointer hover:bg-blue-50 flex items-center justify-between\"\r\n        (click)=\"toggleSelectAllClick()\"\r\n      >\r\n        <span class=\"text-sm font-medium\">Select All</span>\r\n        @if (areAllOptionsSelected) {\r\n          <ui-icon\r\n            name=\"mdi:check\"\r\n            class=\"inline-flex h-4 w-4 items-center justify-center text-blue-600\"\r\n          >\r\n          </ui-icon>\r\n        }\r\n      </li>\r\n    }\r\n\r\n    @if (getAvailableOptions().length === 0 && selectedValues.length === 0) {\r\n      <li class=\"px-3 py-2 text-sm text-gray-400 italic\">No results found</li>\r\n    }\r\n\r\n    <div class=\"overflow-y-auto max-h-64\">\r\n      @for (option of getAvailableOptions(); track option.value) {\r\n        <li\r\n          (click)=\"selectOption(option)\"\r\n          class=\"dropdown-option relative flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors\"\r\n        >\r\n          @if (option.avatar) {\r\n            <img\r\n              [src]=\"option.avatar\"\r\n              [alt]=\"option.name\"\r\n              class=\"w-8 h-8 rounded-full object-cover flex-shrink-0\"\r\n            />\r\n          }\r\n          <div class=\"flex-1\">\r\n            <div class=\"text-sm font-medium text-gray-900\">\r\n              {{ option.name }}\r\n            </div>\r\n            @if (option.email) {\r\n              <div class=\"text-xs text-gray-500\">{{ option.email }}</div>\r\n            }\r\n          </div>\r\n        </li>\r\n      }\r\n    </div>\r\n  </ul>\r\n</div>\r\n", styles: [".multi-select-container {\n  height: 36px;\n}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }], { label: [{
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
        }], showSelectAll: [{
            type: Input
        }], handleClickOutside: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], draggable: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MultiSelectComponent, { className: "MultiSelectComponent", filePath: "libs/shared/ui/src/lib/components/controls/multi-select/multi-select.component.ts", lineNumber: 48 }); })();
//# sourceMappingURL=multi-select.component.js.map