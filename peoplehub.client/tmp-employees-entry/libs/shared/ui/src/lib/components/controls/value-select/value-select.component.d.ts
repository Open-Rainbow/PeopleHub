import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownValues } from '../../../models/common.model';
import * as i0 from "@angular/core";
export declare class ValueSelectComponent implements OnInit {
    private renderer;
    dropdownValues?: DropdownValues[];
    defaultSelected?: string | number | null;
    textColor?: string;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    borderColor?: string;
    activeTextColor?: string;
    parentFormGroup: FormGroup;
    id: string;
    showIcon?: boolean;
    onSelect: EventEmitter<string | number>;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    selectedYearRef: ElementRef<HTMLButtonElement>;
    rippleRef: ElementRef<HTMLSpanElement>;
    selectedYear: string | number | null;
    isOpen: boolean;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    toggleDropdown(event: MouseEvent): void;
    selectYear(value: string | number): void;
    handleClickOutside(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValueSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ValueSelectComponent, "ui-value-select", never, { "dropdownValues": { "alias": "dropdownValues"; "required": false; }; "defaultSelected": { "alias": "defaultSelected"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "activeBackgroundColor": { "alias": "activeBackgroundColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "activeTextColor": { "alias": "activeTextColor"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "showIcon": { "alias": "showIcon"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}
//# sourceMappingURL=value-select.component.d.ts.map