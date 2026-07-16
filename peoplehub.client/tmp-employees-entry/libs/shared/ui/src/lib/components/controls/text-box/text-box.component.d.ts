import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TextBoxComponent implements OnInit, OnChanges, OnDestroy {
    private cdr;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    showBorder: boolean;
    minLength: number;
    maxLength: number;
    showCharCount: boolean;
    parentFormGroup: FormGroup;
    id: string;
    isReadOnly: boolean;
    isAllowSpecialChars: boolean;
    tabindex?: number;
    value: string;
    isFocused: boolean;
    valueChange: EventEmitter<string>;
    currentCharCount: number;
    private destroy$;
    constructor(cdr: ChangeDetectorRef);
    get control(): FormControl;
    get isInvalid(): boolean;
    get hasValue(): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateCharCount;
    onInput(event: Event): void;
    onFocus(): void;
    onBlur(event: FocusEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextBoxComponent, "ui-text-box", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "isRequired": { "alias": "isRequired"; "required": false; }; "showBorder": { "alias": "showBorder"; "required": false; }; "minLength": { "alias": "minLength"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "showCharCount": { "alias": "showCharCount"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "isReadOnly": { "alias": "isReadOnly"; "required": false; }; "isAllowSpecialChars": { "alias": "isAllowSpecialChars"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "value": { "alias": "value"; "required": false; }; "isFocused": { "alias": "isFocused"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=text-box.component.d.ts.map