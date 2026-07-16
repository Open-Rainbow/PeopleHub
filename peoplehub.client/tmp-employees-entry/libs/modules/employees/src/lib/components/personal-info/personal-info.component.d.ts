import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class PersonalInfoComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/personal-info.model").IPersonalInfoFormFields;
    personalInfo: FormGroup;
    titleOptions$: Observable<DropdownOption[]>;
    genderOptions$: Observable<DropdownOption[]>;
    maritalStatusOptions$: Observable<DropdownOption[]>;
    bloodGroupOptions$: Observable<DropdownOption[]>;
    nationalityOptions$: Observable<DropdownOption[]>;
    categoryOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PersonalInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PersonalInfoComponent, "personal-info", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=personal-info.component.d.ts.map