import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class EmployeesService {
    http = inject(HttpClient);
    apiBase = '/api/employees';
    addEmployee(payload) {
        return this.http.post(this.apiBase, payload);
    }
    getEmployee(employeeId) {
        return this.http.get(`${this.apiBase}/${employeeId}`);
    }
    static ɵfac = function EmployeesService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeesService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EmployeesService, factory: EmployeesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=employees.service.js.map