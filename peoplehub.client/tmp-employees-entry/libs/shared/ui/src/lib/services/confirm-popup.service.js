import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ConfirmPopupService {
    showPopup$ = new Subject();
    resultEmitter;
    showOk(title, message, icon, color = 'blue') {
        const okButton = {
            text: 'OK',
            value: 'OK',
            bgColor: color,
            color: 'white',
            hoverBgColor: '#337ab7',
            hoverColor: 'white',
            borderColor: color,
            showBorder: true,
        };
        return this.show(title, message, [okButton], icon, color);
    }
    showValidation(formGroup, formConfig) {
        const invalidRequiredFields = Object.keys(formGroup.controls)
            .filter((key) => {
            const control = formGroup.get(key);
            const config = formConfig[key];
            return config?.isRequired && !config?.isHide && control?.invalid;
        })
            .map((key) => formConfig[key]?.label || key);
        if (invalidRequiredFields.length === 0) {
            return new EventEmitter();
        }
        const message = '<b>' + invalidRequiredFields.join(', ') + '</b>';
        const okButton = {
            text: 'OK',
            value: 'OK',
            bgColor: 'red',
            color: 'white',
            hoverBgColor: '#337ab7',
            hoverColor: 'white',
            borderColor: 'red',
            showBorder: true,
        };
        return this.show('Missing Required fields', 'Please fill in the required fields: ' + message, [okButton], 'warning', 'red');
    }
    showConfirm(title, message, icon, color = 'red') {
        const buttons = [
            { text: 'Yes', value: 'Yes', bgColor: 'green', color: 'white', hoverBgColor: 'darkgreen', hoverColor: 'white', borderColor: 'green', showBorder: true },
            { text: 'No', value: 'No', bgColor: color, color: 'white', hoverBgColor: 'darkred', hoverColor: 'white', borderColor: color, showBorder: true },
        ];
        return this.show(title, message, buttons, icon, color);
    }
    showMaybe(title, message, icon, color = 'orange') {
        const buttons = [
            { text: 'Yes', value: 'Yes', bgColor: 'green', color: 'white', hoverBgColor: 'darkgreen', hoverColor: 'white', borderColor: 'green', showBorder: true },
            { text: 'No', value: 'No', bgColor: 'red', color: 'white', hoverBgColor: 'darkred', hoverColor: 'white', borderColor: 'red', showBorder: true },
            { text: 'Maybe', value: 'Maybe', bgColor: color, color: 'white', hoverBgColor: 'darkorange', hoverColor: 'white', borderColor: color, showBorder: true },
        ];
        return this.show(title, message, buttons, icon, color);
    }
    showCustomButtons(title, message, buttons, icon, color = 'gray') {
        return this.show(title, message, buttons, icon, color);
    }
    show(title, label, buttons, changeIcon, borderColor) {
        this.resultEmitter = new EventEmitter();
        this.showPopup$.next({ title, label, changeIcon, borderColor, buttons });
        return this.resultEmitter;
    }
    buttonClicked(value) {
        if (this.resultEmitter) {
            this.resultEmitter.emit(value);
        }
    }
    hide() {
        this.showPopup$.next(null);
    }
    static ɵfac = function ConfirmPopupService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmPopupService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ConfirmPopupService, factory: ConfirmPopupService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmPopupService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=confirm-popup.service.js.map