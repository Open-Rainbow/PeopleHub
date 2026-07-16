import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class PasswordComponent {
    label: string;
    isRequired: boolean;
    placeholder: string;
    minLength: number;
    maxLength: number;
    passwordVisible: boolean;
    activeChange: EventEmitter<boolean>;
    value: string;
    isActive: boolean;
    parentFormGroup: FormGroup;
    id: string;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    get hasValue(): boolean;
    valueChange: EventEmitter<string>;
    togglePassword(): void;
    onFocus(): void;
    onBlur(): void;
    onInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PasswordComponent, "ui-password", never, { "label": { "alias": "label"; "required": false; }; "isRequired": { "alias": "isRequired"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "minLength": { "alias": "minLength"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "value": { "alias": "value"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, { "activeChange": "activeChange"; "valueChange": "valueChange"; }, never, never, true, never>;
}
//# sourceMappingURL=password.component.d.ts.map