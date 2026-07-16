import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class RequesterService {
    http;
    constructor(http) {
        this.http = http;
    }
    buildParams(parameters) {
        let params = new HttpParams();
        for (const key in parameters) {
            if (parameters[key] != null) {
                params = params.set(key, parameters[key]);
            }
        }
        return params;
    }
    get(apiNames, parameters) {
        const params = this.buildParams(parameters);
        return this.http.get(apiNames, { params });
    }
    post(url, body) {
        return this.http.post(url, body);
    }
    static ɵfac = function RequesterService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequesterService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RequesterService, factory: RequesterService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequesterService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=requester.service.js.map