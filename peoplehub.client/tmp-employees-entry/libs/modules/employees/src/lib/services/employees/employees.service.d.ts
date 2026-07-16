import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class EmployeesService {
    private readonly http;
    private readonly apiBase;
    addEmployee(payload: Record<string, unknown>): Observable<unknown>;
    getEmployee(employeeId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EmployeesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EmployeesService>;
}
//# sourceMappingURL=employees.service.d.ts.map