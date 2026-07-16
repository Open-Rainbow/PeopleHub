import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';
import * as i0 from "@angular/core";
const _c0 = ["fileInput"];
function FileUploadComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function FileUploadComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.helperId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorNote, " ");
} }
export class FileUploadComponent {
    label = 'Government ID';
    isRequired = true;
    errorNote = 'Please upload jpg, png, mp3 formats only';
    parentFormGroup;
    id = 'fileUpload';
    placeholder = 'Upload the file';
    accept = '.jpg,.jpeg,.png,.pdf,.mp3';
    multiple = false;
    showRemoveAction = true;
    fileSelectionChange = new EventEmitter();
    fileInputRef;
    selectedFiles = [];
    isFocused = false;
    isFileDialogOpen = false;
    disabled = false;
    onChange = () => { };
    onTouched = () => { };
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
    }
    get hasValue() {
        return this.selectedFiles.length > 0;
    }
    get displayValue() {
        if (this.selectedFiles.length === 0) {
            return this.placeholder;
        }
        if (this.selectedFiles.length === 1) {
            return this.selectedFiles[0].name;
        }
        return `${this.selectedFiles.length} files selected`;
    }
    get triggerId() {
        return `${this.id}-trigger`;
    }
    get inputId() {
        return `${this.id}-native`;
    }
    get helperId() {
        return `${this.id}-helper`;
    }
    get isDisabled() {
        return this.disabled || !!this.control?.disabled;
    }
    onAreaClick() {
        if (this.isDisabled) {
            return;
        }
        this.isFileDialogOpen = true;
        this.fileInputRef.nativeElement.click();
    }
    onWindowFocus() {
        setTimeout(() => {
            this.isFileDialogOpen = false;
        }, 200);
    }
    async onFileSelected(event) {
        const input = event.target;
        const fileList = input.files;
        if (!fileList || fileList.length === 0) {
            return;
        }
        const selectedNativeFiles = this.multiple ? Array.from(fileList) : [fileList[0]];
        const mappedFiles = await Promise.all(selectedNativeFiles.map((file) => this.mapToUploadedFile(file)));
        this.selectedFiles = mappedFiles;
        const nextValue = this.multiple ? mappedFiles : mappedFiles[0] ?? null;
        this.applyValue(nextValue, 'user');
    }
    clearFiles(event) {
        event?.stopPropagation();
        if (this.isDisabled) {
            return;
        }
        this.selectedFiles = [];
        if (this.fileInputRef?.nativeElement) {
            this.fileInputRef.nativeElement.value = '';
        }
        this.applyValue(null, 'user');
    }
    onFocus() {
        this.isFocused = true;
        this.control?.markAsTouched();
    }
    onBlur() {
        this.isFocused = false;
        this.onTouched();
        this.control?.markAsTouched();
    }
    writeValue(value) {
        if (!value) {
            this.selectedFiles = [];
            if (this.fileInputRef?.nativeElement) {
                this.fileInputRef.nativeElement.value = '';
            }
            return;
        }
        const files = Array.isArray(value) ? value : [value];
        this.selectedFiles = files;
        this.fileSelectionChange.emit({ files, source: 'writeValue' });
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
    applyValue(value, source) {
        this.onChange(value);
        this.onTouched();
        if (this.control) {
            this.control.setValue(value);
            this.control.markAsDirty();
            this.control.markAsTouched();
        }
        this.fileSelectionChange.emit({ files: this.selectedFiles, source });
    }
    mapToUploadedFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    lastModified: file.lastModified,
                    data: reader.result
                });
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsDataURL(file);
        });
    }
    static ɵfac = function FileUploadComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FileUploadComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FileUploadComponent, selectors: [["ui-file-upload"]], viewQuery: function FileUploadComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileInputRef = _t.first);
        } }, hostBindings: function FileUploadComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("focus", function FileUploadComponent_focus_HostBindingHandler() { return ctx.onWindowFocus(); }, i0.ɵɵresolveWindow);
        } }, inputs: { label: "label", isRequired: "isRequired", errorNote: "errorNote", parentFormGroup: "parentFormGroup", id: "id", placeholder: "placeholder", accept: "accept", multiple: "multiple", showRemoveAction: "showRemoveAction" }, outputs: { fileSelectionChange: "fileSelectionChange" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => FileUploadComponent),
                    multi: true
                }
            ])], decls: 12, vars: 36, consts: [["fileInput", ""], [1, "file-upload-container"], [1, "input-wrapper"], ["type", "button", 1, "file-upload-input", "inputBoxHeight", 3, "click", "focus", "blur", "id", "disabled"], [1, "file-upload-value"], [1, "upload-icon", 3, "click", "name"], ["type", "file", 1, "native-file-input", 3, "change", "click", "id", "disabled"], [1, "input-label", 3, "id"], [1, "required-asterisk"], [1, "helper-text", "error-text", 3, "id"]], template: function FileUploadComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
            i0.ɵɵlistener("click", function FileUploadComponent_Template_button_click_2_listener() { return ctx.onAreaClick(); })("focus", function FileUploadComponent_Template_button_focus_2_listener() { return ctx.onFocus(); })("blur", function FileUploadComponent_Template_button_blur_2_listener() { return ctx.onBlur(); });
            i0.ɵɵelementStart(3, "span", 4);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "ui-icon", 5);
            i0.ɵɵlistener("click", function FileUploadComponent_Template_ui_icon_click_5_listener($event) { return ctx.hasValue && !ctx.isDisabled ? ctx.clearFiles($event) : null; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "input", 6, 0);
            i0.ɵɵlistener("change", function FileUploadComponent_Template_input_change_6_listener($event) { return ctx.onFileSelected($event); })("click", function FileUploadComponent_Template_input_click_6_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "label", 7);
            i0.ɵɵtext(9);
            i0.ɵɵconditionalCreate(10, FileUploadComponent_Conditional_10_Template, 2, 0, "span", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, FileUploadComponent_Conditional_11_Template, 2, 2, "span", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-gray", !ctx.isFocused && !ctx.isFileDialogOpen && !ctx.isInvalid)("border-blue", (ctx.isFocused || ctx.isFileDialogOpen) && !ctx.isInvalid)("border-red", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.triggerId)("disabled", ctx.isDisabled);
            i0.ɵɵattribute("aria-required", ctx.isRequired)("aria-invalid", ctx.isInvalid)("aria-describedby", ctx.helperId)("aria-labelledby", ctx.id + "-label " + ctx.triggerId);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("placeholder", !ctx.hasValue);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.displayValue);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("actionable", ctx.hasValue && !ctx.isDisabled);
            i0.ɵɵproperty("name", ctx.hasValue ? "material-symbols:close-rounded" : "material-symbols:upload-rounded");
            i0.ɵɵattribute("aria-label", ctx.hasValue ? "Remove selected file" : "Upload file");
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", ctx.inputId)("disabled", ctx.isDisabled);
            i0.ɵɵattribute("accept", ctx.accept)("multiple", ctx.multiple ? "" : null);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("floating", ctx.isFocused || ctx.isFileDialogOpen || ctx.hasValue)("blue", (ctx.isFocused || ctx.isFileDialogOpen) && !ctx.isInvalid)("gray", !(ctx.isFocused || ctx.isFileDialogOpen) && !ctx.isInvalid)("red", ctx.isInvalid);
            i0.ɵɵproperty("id", ctx.id + "-label");
            i0.ɵɵattribute("for", ctx.triggerId);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.label, " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isRequired ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isInvalid ? 11 : -1);
        } }, dependencies: [CommonModule, IconComponent], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n  width: 100%;\r\n  min-width: 0;\r\n}\r\n\r\n.file-upload-container[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  min-width: 0;\r\n}\r\n\r\n.input-wrapper[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.file-upload-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  min-height: 2.25rem;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s,\r\n    background-color 0.2s;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n\r\n  &:disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.7;\r\n    background-color: #f8fafc;\r\n  }\r\n}\r\n\r\n.file-upload-value[_ngcontent-%COMP%] {\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n}\r\n\r\n.file-upload-value.placeholder[_ngcontent-%COMP%] {\r\n  color: var(--color-text-muted);\r\n}\r\n\r\n.upload-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n\r\n  &.actionable {\r\n    pointer-events: auto;\r\n    cursor: pointer;\r\n    color: var(--color-text-secondary);\r\n\r\n    &:hover {\r\n      color: var(--color-text-primary);\r\n    }\r\n  }\r\n}\r\n\r\n.native-file-input[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  margin: -1px;\r\n  padding: 0;\r\n  border: 0;\r\n  clip: rect(0 0 0 0);\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n.input-label[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--file-upload-label-bg, transparent);\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.required-asterisk[_ngcontent-%COMP%] {\r\n  color: var(--color-danger);\r\n}\r\n\r\n.helper-text[_ngcontent-%COMP%] {\r\n  margin-top: 0.3rem;\r\n  font-size: 0.75rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.helper-text.error-text[_ngcontent-%COMP%] {\r\n  color: var(--color-danger);\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .file-upload-input[_ngcontent-%COMP%] {\r\n    min-height: 2.15rem;\r\n    padding: 0 2rem 0 0.7rem;\r\n  }\r\n\r\n  .input-label[_ngcontent-%COMP%] {\r\n    left: 0.7rem;\r\n  }\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FileUploadComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-file-upload', imports: [CommonModule, IconComponent], standalone: true, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => FileUploadComponent),
                        multi: true
                    }
                ], template: "<div class=\"file-upload-container\">\r\n  <div class=\"input-wrapper\">\r\n    <button\r\n      [id]=\"triggerId\"\r\n      type=\"button\"\r\n      class=\"file-upload-input inputBoxHeight\"\r\n      [disabled]=\"isDisabled\"\r\n      [class.border-gray]=\"!isFocused && !isFileDialogOpen && !isInvalid\"\r\n      [class.border-blue]=\"(isFocused || isFileDialogOpen) && !isInvalid\"\r\n      [class.border-red]=\"isInvalid\"\r\n      [attr.aria-required]=\"isRequired\"\r\n      [attr.aria-invalid]=\"isInvalid\"\r\n      [attr.aria-describedby]=\"helperId\"\r\n      [attr.aria-labelledby]=\"id + '-label ' + triggerId\"\r\n      (click)=\"onAreaClick()\"\r\n      (focus)=\"onFocus()\"\r\n      (blur)=\"onBlur()\"\r\n    >\r\n      <span class=\"file-upload-value\" [class.placeholder]=\"!hasValue\">{{\r\n        displayValue\r\n      }}</span>\r\n      <ui-icon\r\n        [name]=\"\r\n          hasValue\r\n            ? 'material-symbols:close-rounded'\r\n            : 'material-symbols:upload-rounded'\r\n        \"\r\n        class=\"upload-icon\"\r\n        [class.actionable]=\"hasValue && !isDisabled\"\r\n        [attr.aria-label]=\"hasValue ? 'Remove selected file' : 'Upload file'\"\r\n        (click)=\"hasValue && !isDisabled ? clearFiles($event) : null\"\r\n      ></ui-icon>\r\n    </button>\r\n\r\n    <input\r\n      #fileInput\r\n      [id]=\"inputId\"\r\n      type=\"file\"\r\n      class=\"native-file-input\"\r\n      [attr.accept]=\"accept\"\r\n      [attr.multiple]=\"multiple ? '' : null\"\r\n      [disabled]=\"isDisabled\"\r\n      (change)=\"onFileSelected($event)\"\r\n      (click)=\"$event.stopPropagation()\"\r\n    />\r\n\r\n    <label\r\n      [id]=\"id + '-label'\"\r\n      [attr.for]=\"triggerId\"\r\n      class=\"input-label\"\r\n      [class.floating]=\"isFocused || isFileDialogOpen || hasValue\"\r\n      [class.blue]=\"(isFocused || isFileDialogOpen) && !isInvalid\"\r\n      [class.gray]=\"!(isFocused || isFileDialogOpen) && !isInvalid\"\r\n      [class.red]=\"isInvalid\"\r\n    >\r\n      {{ label }}\r\n      @if (isRequired) {\r\n        <span class=\"required-asterisk\">*</span>\r\n      }\r\n    </label>\r\n  </div>\r\n\r\n  @if (isInvalid) {\r\n    <span [id]=\"helperId\" class=\"helper-text error-text\">\r\n      {{ errorNote }}\r\n    </span>\r\n  }\r\n</div>\r\n", styles: [":host {\r\n  display: block;\r\n  width: 100%;\r\n  min-width: 0;\r\n}\r\n\r\n.file-upload-container {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  min-width: 0;\r\n}\r\n\r\n.input-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.file-upload-input {\r\n  width: 100%;\r\n  min-height: 2.25rem;\r\n  padding: 0 2.25rem 0 0.75rem;\r\n  border: 1px solid;\r\n  border-radius: 0.375rem;\r\n  background-color: transparent;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition:\r\n    border-color 0.2s,\r\n    box-shadow 0.2s,\r\n    background-color 0.2s;\r\n\r\n  &.border-gray {\r\n    border-color: var(--color-border);\r\n  }\r\n\r\n  &.border-blue {\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 1px var(--color-primary);\r\n  }\r\n\r\n  &.border-red {\r\n    border-color: var(--color-danger);\r\n  }\r\n\r\n  &:disabled {\r\n    cursor: not-allowed;\r\n    opacity: 0.7;\r\n    background-color: #f8fafc;\r\n  }\r\n}\r\n\r\n.file-upload-value {\r\n  display: block;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 0.875rem;\r\n  color: var(--color-text-primary);\r\n}\r\n\r\n.file-upload-value.placeholder {\r\n  color: var(--color-text-muted);\r\n}\r\n\r\n.upload-icon {\r\n  position: absolute;\r\n  right: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  pointer-events: none;\r\n  width: 1.25rem;\r\n  height: 1.25rem;\r\n  color: var(--color-text-secondary);\r\n\r\n  &.actionable {\r\n    pointer-events: auto;\r\n    cursor: pointer;\r\n    color: var(--color-text-secondary);\r\n\r\n    &:hover {\r\n      color: var(--color-text-primary);\r\n    }\r\n  }\r\n}\r\n\r\n.native-file-input {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  margin: -1px;\r\n  padding: 0;\r\n  border: 0;\r\n  clip: rect(0 0 0 0);\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n}\r\n\r\n.input-label {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  padding: 0 0.25rem;\r\n  background-color: var(--file-upload-label-bg, transparent);\r\n  font-weight: 500;\r\n  white-space: nowrap;\r\n  pointer-events: none;\r\n  transition: all 0.2s ease-out;\r\n  z-index: 10;\r\n\r\n  &.floating {\r\n    top: -0.5rem;\r\n    font-size: 0.75rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n\r\n  &:not(.floating) {\r\n    top: 0.375rem;\r\n    font-size: 0.875rem;\r\n\r\n    &.blue {\r\n      color: var(--color-primary);\r\n    }\r\n\r\n    &.gray {\r\n      color: var(--color-text-secondary);\r\n    }\r\n\r\n    &.red {\r\n      color: var(--color-danger);\r\n    }\r\n  }\r\n}\r\n\r\n.required-asterisk {\r\n  color: var(--color-danger);\r\n}\r\n\r\n.helper-text {\r\n  margin-top: 0.3rem;\r\n  font-size: 0.75rem;\r\n  color: var(--color-text-secondary);\r\n}\r\n\r\n.helper-text.error-text {\r\n  color: var(--color-danger);\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .file-upload-input {\r\n    min-height: 2.15rem;\r\n    padding: 0 2rem 0 0.7rem;\r\n  }\r\n\r\n  .input-label {\r\n    left: 0.7rem;\r\n  }\r\n}\r\n"] }]
    }], null, { label: [{
            type: Input
        }], isRequired: [{
            type: Input
        }], errorNote: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], accept: [{
            type: Input
        }], multiple: [{
            type: Input
        }], showRemoveAction: [{
            type: Input
        }], fileSelectionChange: [{
            type: Output
        }], fileInputRef: [{
            type: ViewChild,
            args: ['fileInput', { static: false }]
        }], onWindowFocus: [{
            type: HostListener,
            args: ['window:focus']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FileUploadComponent, { className: "FileUploadComponent", filePath: "libs/shared/ui/src/lib/components/controls/file-upload/file-upload.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=file-upload.component.js.map