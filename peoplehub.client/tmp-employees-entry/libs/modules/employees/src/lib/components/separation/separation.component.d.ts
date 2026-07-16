import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class SeparationComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/separation.model").ISeparationFormFields;
    separation: FormGroup;
    separationTypeOptions$: Observable<DropdownOption[]>;
    separationStatusOptions$: Observable<DropdownOption[]>;
    attritionCategoryOptions$: Observable<DropdownOption[]>;
    clearanceStatusOptions$: Observable<DropdownOption[]>;
    interviewStatusOptions$: Observable<DropdownOption[]>;
    settlementStatusOptions$: Observable<DropdownOption[]>;
    revokeStatusOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SeparationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SeparationComponent, "employees-separation", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=separation.component.d.ts.map