import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { dropdownConfig } from '../models/value-configs/dropdown.config';
import * as i0 from "@angular/core";
export class DropdownConfigService {
    configSubject = new BehaviorSubject(dropdownConfig);
    config$ = this.configSubject.asObservable();
    getOptions(key) {
        return this.config$.pipe(map(config => config[key] ?? []));
    }
    static ɵfac = function DropdownConfigService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DropdownConfigService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DropdownConfigService, factory: DropdownConfigService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DropdownConfigService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=dropdown.service.js.map