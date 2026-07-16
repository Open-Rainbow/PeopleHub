import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class AssetsComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/assets.model").IAssetsFormFields;
    assets: FormGroup;
    assetTypeOptions$: Observable<DropdownOption[]>;
    assetCategoryOptions$: Observable<DropdownOption[]>;
    ownershipTypeOptions$: Observable<DropdownOption[]>;
    conditionOptions$: Observable<DropdownOption[]>;
    recoveryStatusOptions$: Observable<DropdownOption[]>;
    assetClosureStatusOptions$: Observable<DropdownOption[]>;
    complianceStatusOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssetsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AssetsComponent, "employees-assets", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=assets.component.d.ts.map