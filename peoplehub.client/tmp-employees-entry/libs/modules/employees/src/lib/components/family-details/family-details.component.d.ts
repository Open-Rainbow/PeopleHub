import { OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from 'common';
import * as i0 from "@angular/core";
export declare class FamilyDetailsComponent implements OnInit {
    private readonly dropdownService;
    private readonly stepperService;
    private readonly dataService;
    private familyMemberSequence;
    private dependentSequence;
    readonly familyRepeatTimes = 1;
    readonly dependentRepeatTimes = 1;
    readonly familyMemberConfig: import("../../config/form-configs/family-details.model").IFamilyMemberFormFields;
    readonly dependentConfig: import("../../config/form-configs/family-details.model").IDependentFormFields;
    familyMember: FormArray<FormGroup>;
    dependent: FormArray<FormGroup>;
    readonly activeTab: import("@angular/core").WritableSignal<"family" | "dependent">;
    readonly isFamilyTab: import("@angular/core").Signal<boolean>;
    relationOptions$: Observable<DropdownOption[]>;
    genderOptions$: Observable<DropdownOption[]>;
    maritalStatusOptions$: Observable<DropdownOption[]>;
    trackByIndex(index: number): number;
    getActiveFormGroup(): FormArray<FormGroup>;
    getValidationConfig(): Record<string, {
        isHide: boolean;
        isRequired: boolean;
        label: string;
    }>;
    ngOnInit(): void;
    switchTab(tab: 'family' | 'dependent'): void;
    addFamilyMember(): void;
    removeFamilyMember(index: number): void;
    canAddFamilyMember(): boolean;
    addDependent(): void;
    removeDependent(index: number): void;
    canAddDependent(): boolean;
    private persistActiveTabData;
    private buildRepeatableFormArray;
    private createRepeatableForm;
    private normalizeSavedData;
    static ɵfac: i0.ɵɵFactoryDeclaration<FamilyDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FamilyDetailsComponent, "employees-family-details", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=family-details.component.d.ts.map