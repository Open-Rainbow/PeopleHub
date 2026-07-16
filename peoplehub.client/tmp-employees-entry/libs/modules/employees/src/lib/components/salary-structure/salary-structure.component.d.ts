import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class SalaryStructureComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/salary-structure.model").ISalaryStructureFormFields;
    salaryStructure: FormGroup;
    payrollGroupOptions$: Observable<DropdownOption[]>;
    salaryStructureOptions$: Observable<DropdownOption[]>;
    accountTypeOptions$: Observable<DropdownOption[]>;
    paymentModeOptions$: Observable<DropdownOption[]>;
    taxRegimeOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SalaryStructureComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SalaryStructureComponent, "employees-salary-structure", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=salary-structure.component.d.ts.map