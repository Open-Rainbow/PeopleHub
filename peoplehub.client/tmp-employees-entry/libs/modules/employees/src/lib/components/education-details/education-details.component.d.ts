import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class EducationDetailsComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/education-details.model").IEducationDetailsFormFields;
    educationDetails: FormGroup;
    yearOfPassingOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EducationDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EducationDetailsComponent, "employees-education-details", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=education-details.component.d.ts.map