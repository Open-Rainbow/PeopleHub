import { OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { SearchDropdownOption } from '../../../models/value-configs/search-dropdown-option.model';
import * as i0 from "@angular/core";
export declare class SearchDropdownComponent implements OnInit, OnChanges, OnDestroy {
    private cdr;
    label?: string;
    placeholderText?: string;
    showBorder?: boolean;
    borderColor?: string;
    parentFormGroup: FormGroup;
    id: string;
    data?: any[];
    config?: SearchDropdownOption;
    onSelect: EventEmitter<any>;
    isOpen: boolean;
    private defaultConfig;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    searchControl: FormControl<string | null>;
    filteredList: any[];
    private destroy$;
    private getConfig;
    getFieldValue(item: any, field: string): string;
    onInputFocus(): void;
    onInputBlur(): void;
    selectItem(item: any): void;
    clearSearch(): void;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private filterList;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchDropdownComponent, "ui-search-dropdown", never, { "label": { "alias": "label"; "required": false; }; "placeholderText": { "alias": "placeholderText"; "required": false; }; "showBorder": { "alias": "showBorder"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "data": { "alias": "data"; "required": false; }; "config": { "alias": "config"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}
//# sourceMappingURL=search-dropdown.component.d.ts.map