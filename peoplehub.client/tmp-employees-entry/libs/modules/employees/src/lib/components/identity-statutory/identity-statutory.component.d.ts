import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class IdentityStatutoryComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/identity-statutory.model").IIdentityStatutoryFormFields;
    identityStatutory: FormGroup;
    documentTypeOptions$: Observable<DropdownOption[]>;
    verificationStatusOptions$: Observable<DropdownOption[]>;
    countryOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IdentityStatutoryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IdentityStatutoryComponent, "employees-identity-statutory", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=identity-statutory.component.d.ts.map