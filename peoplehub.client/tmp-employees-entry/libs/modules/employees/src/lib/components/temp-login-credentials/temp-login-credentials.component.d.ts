import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TempLoginCredentialsComponent implements OnInit {
    private readonly commonService;
    private readonly stepperService;
    private readonly dataService;
    readonly formConfig: import("../../config/form-configs/temp-login.model").ITempLoginConfig;
    tempLoginCredentials: FormGroup;
    temporaryPassword: import("@angular/core").WritableSignal<string>;
    temporaryUsername: import("@angular/core").WritableSignal<string>;
    hasUppercase: import("@angular/core").WritableSignal<boolean>;
    hasLowercase: import("@angular/core").WritableSignal<boolean>;
    hasNumber: import("@angular/core").WritableSignal<boolean>;
    hasSpecialChar: import("@angular/core").WritableSignal<boolean>;
    isLengthValid: import("@angular/core").WritableSignal<boolean>;
    isAllRulesMet: boolean;
    ngOnInit(): void;
    onUserNameInput(value: string): void;
    onPasswordInput(value: string): void;
    preventInvalidKeys(event: KeyboardEvent): void;
    emailSplitting(email: string): void;
    generate(): void;
    private checkPasswordRules;
    private updateFormValues;
    static ɵfac: i0.ɵɵFactoryDeclaration<TempLoginCredentialsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TempLoginCredentialsComponent, "employees-temp-login-credentials", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=temp-login-credentials.component.d.ts.map