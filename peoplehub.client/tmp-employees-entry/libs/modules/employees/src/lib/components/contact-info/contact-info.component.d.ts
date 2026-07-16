import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class ContactInfoComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/contact-info.model").IContactInfoFormFields;
    contactInfo: FormGroup;
    relationOptions$: Observable<DropdownOption[]>;
    countryOptions$: Observable<DropdownOption[]>;
    addressTypeOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContactInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ContactInfoComponent, "employees-contact-info", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=contact-info.component.d.ts.map