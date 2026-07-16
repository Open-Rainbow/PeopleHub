import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NumberBoxComponent implements OnInit {
    private cdr;
    label: string;
    isRequired: boolean;
    placeholder: string;
    parentFormGroup: FormGroup;
    minValue?: number;
    maxValue?: number;
    set step(value: number);
    get step(): number;
    private _step;
    id: string;
    numberBox: EventEmitter<number>;
    blurEvent: EventEmitter<void>;
    localForm: FormGroup;
    isFocused: boolean;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    get activeForm(): FormGroup;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get hasValue(): boolean;
    get isInvalid(): boolean;
    onInput(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    increment(event: Event): void;
    decrement(event: Event): void;
    private updateValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberBoxComponent, "ui-number-box", never, { "label": { "alias": "label"; "required": false; }; "isRequired": { "alias": "isRequired"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "minValue": { "alias": "minValue"; "required": false; }; "maxValue": { "alias": "maxValue"; "required": false; }; "step": { "alias": "step"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, { "numberBox": "numberBox"; "blurEvent": "blurEvent"; }, never, never, true, never>;
}
//# sourceMappingURL=number-box.component.d.ts.map