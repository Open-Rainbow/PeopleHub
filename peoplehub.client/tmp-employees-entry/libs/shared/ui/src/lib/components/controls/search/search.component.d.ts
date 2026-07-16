import { EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class SearchComponent implements OnInit {
    placeholderText?: string;
    showBorder?: boolean;
    borderColor?: string;
    showIcon?: boolean;
    parentFormGroup: FormGroup;
    id: string;
    displaySuggestions?: boolean;
    searchData?: string[];
    onSelect: EventEmitter<string>;
    suggestionsVisible: boolean;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    searchControl: FormControl<string | null>;
    filteredSuggestions: string[];
    ngOnInit(): void;
    filterData(query: string): void;
    selectSuggestion(value: string): void;
    hideSuggestionsWithDelay(): void;
    clearSearch(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchComponent, "ui-search", never, { "placeholderText": { "alias": "placeholderText"; "required": false; }; "showBorder": { "alias": "showBorder"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "showIcon": { "alias": "showIcon"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "displaySuggestions": { "alias": "displaySuggestions"; "required": false; }; "searchData": { "alias": "searchData"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}
//# sourceMappingURL=search.component.d.ts.map