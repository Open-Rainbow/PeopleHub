import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RequesterService {
    private http;
    constructor(http: HttpClient);
    buildParams(parameters: any): HttpParams;
    get(apiNames: string, parameters: any): Observable<any>;
    post(url: string, body: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequesterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequesterService>;
}
//# sourceMappingURL=requester.service.d.ts.map