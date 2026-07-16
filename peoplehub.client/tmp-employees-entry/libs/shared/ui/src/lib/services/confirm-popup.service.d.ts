import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConfirmPopup, PopupOptions } from '../models/confirm-popup.model';
import * as i0 from "@angular/core";
export type { ConfirmPopup, PopupOptions };
export declare class ConfirmPopupService {
    showPopup$: Subject<PopupOptions | null>;
    private resultEmitter;
    showOk(title: string, message: string, icon?: string, color?: string): EventEmitter<string>;
    showValidation(formGroup: FormGroup, formConfig: Record<string, any>): EventEmitter<string>;
    showConfirm(title: string, message: string, icon?: string, color?: string): EventEmitter<string>;
    showMaybe(title: string, message: string, icon?: string, color?: string): EventEmitter<string>;
    showCustomButtons(title: string, message: string, buttons: ConfirmPopup[], icon?: string, color?: string): EventEmitter<string>;
    private show;
    buttonClicked(value: string): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmPopupService>;
}
//# sourceMappingURL=confirm-popup.service.d.ts.map