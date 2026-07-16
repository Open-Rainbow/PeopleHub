import { AfterViewInit, ElementRef, EventEmitter, QueryList, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class OtpComponent implements AfterViewInit {
    otpArray: string[];
    otpInputs: QueryList<ElementRef<HTMLInputElement>>;
    label: string;
    parentFormGroup: FormGroup;
    id: string;
    otpLength: number;
    otpChange: EventEmitter<string>;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    private emitOtp;
    private blurIfComplete;
    handlePaste(event: ClipboardEvent): void;
    handleInput(event: Event, index: number): void;
    handleKeyDown(event: KeyboardEvent, index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OtpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OtpComponent, "ui-otp", never, { "label": { "alias": "label"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "otpLength": { "alias": "otpLength"; "required": false; }; }, { "otpChange": "otpChange"; }, never, never, true, never>;
}
//# sourceMappingURL=otp.component.d.ts.map