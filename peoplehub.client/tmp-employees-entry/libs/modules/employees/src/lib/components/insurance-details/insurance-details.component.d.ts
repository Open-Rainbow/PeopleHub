import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class InsuranceDetailsComponent implements OnInit {
    private readonly commonService;
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    readonly insurancePolicyConfig: import("../../config/form-configs/insurance-details.model").IInsurancePolicyFormFields;
    readonly nomineeConfig: import("../../config/form-configs/insurance-details.model").INomineeFormFields;
    insurance: FormGroup;
    nominee: FormGroup;
    readonly activeTab: import("@angular/core").WritableSignal<"insurance" | "nominee">;
    readonly isInsuranceTab: import("@angular/core").Signal<boolean>;
    benefitTypeOptions$: Observable<DropdownOption[]>;
    premiumSharingOptions$: Observable<DropdownOption[]>;
    policyStatusOptions$: Observable<DropdownOption[]>;
    relationOptions$: Observable<DropdownOption[]>;
    ngOnInit(): void;
    switchTab(tab: 'insurance' | 'nominee'): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InsuranceDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InsuranceDetailsComponent, "employees-insurance-details", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=insurance-details.component.d.ts.map