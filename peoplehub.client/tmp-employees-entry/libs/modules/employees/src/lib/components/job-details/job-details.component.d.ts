import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class JobDetailsComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/job-details.model").IJobDetailsFormFields;
    jobDetails: FormGroup;
    departmentOptions$: Observable<DropdownOption[]>;
    employeeTypeOptions$: Observable<DropdownOption[]>;
    workLocationOptions$: Observable<DropdownOption[]>;
    shiftTimingOptions$: Observable<DropdownOption[]>;
    payLevelOptions$: Observable<DropdownOption[]>;
    reportingManagerOptions$: Observable<DropdownOption[]>;
    businessUnitOptions$: Observable<DropdownOption[]>;
    employeeCategoryOptions$: Observable<DropdownOption[]>;
    workScheduleOptions$: Observable<DropdownOption[]>;
    dottedLineManagerOptions$: Observable<DropdownOption[]>;
    costCenterOptions$: Observable<DropdownOption[]>;
    hrOwnerOptions$: Observable<DropdownOption[]>;
    employmentStatusOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JobDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JobDetailsComponent, "employees-job-details", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=job-details.component.d.ts.map