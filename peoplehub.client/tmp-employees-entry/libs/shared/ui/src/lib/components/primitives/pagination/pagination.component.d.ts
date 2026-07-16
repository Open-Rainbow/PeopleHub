import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { DropdownConfigService } from '../../../services/dropdown.service';
import type { ButtonGroupItem } from '../../../models/component-models/button-list-item.model';
import * as i0 from "@angular/core";
export declare class PaginationComponent {
    private dropdownService;
    totalItems: number;
    pageSize: number;
    currentPage: number;
    isDropCount: boolean;
    isPagination: boolean;
    isGoto: boolean;
    isShowingEntries: boolean;
    backgroundColor: string;
    pageChange: EventEmitter<{
        page: number;
        pageSize: number;
    }>;
    totalPages: number;
    goToNumber: number;
    isGoDisabled: boolean;
    paginationItems: ButtonGroupItem[];
    pageSizeOptions$: Observable<DropdownOption[]>;
    constructor(dropdownService: DropdownConfigService);
    ngOnChanges(): void;
    ngOnInit(): void;
    updatePagination(): void;
    countTotalPage(): void;
    get shouldShowPagination(): boolean;
    get startEntry(): number;
    get endEntry(): number;
    generateButtons(): void;
    onPaginationClick(item: ButtonGroupItem): void;
    getDisplayedPages(): number[];
    goToPage(id: number): void;
    onPageSizeChange(value: any): void;
    onGoToInput(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "ui-pagination", never, { "totalItems": { "alias": "totalItems"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "isDropCount": { "alias": "isDropCount"; "required": false; }; "isPagination": { "alias": "isPagination"; "required": false; }; "isGoto": { "alias": "isGoto"; "required": false; }; "isShowingEntries": { "alias": "isShowingEntries"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}
//# sourceMappingURL=pagination.component.d.ts.map