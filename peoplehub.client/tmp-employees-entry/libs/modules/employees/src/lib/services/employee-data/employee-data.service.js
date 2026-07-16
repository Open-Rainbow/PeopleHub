import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class EmployeeDataService {
    routeData = new Map();
    setDataByRoute(route, data) {
        if (!route) {
            return;
        }
        this.routeData.set(route, data);
    }
    getDataByRoute(route) {
        if (!route) {
            return null;
        }
        return this.routeData.get(route) ?? null;
    }
    clearDataByRoute(route) {
        if (!route) {
            return;
        }
        this.routeData.delete(route);
    }
    getAllData() {
        return Object.fromEntries(this.routeData.entries());
    }
    clearAll() {
        this.routeData.clear();
    }
    static ɵfac = function EmployeeDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EmployeeDataService, factory: EmployeeDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeDataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=employee-data.service.js.map