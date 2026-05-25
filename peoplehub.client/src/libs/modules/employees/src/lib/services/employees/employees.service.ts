import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly http = inject(HttpClient);

  private readonly apiBase = '/api/employees';

  addEmployee(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(this.apiBase, payload);
  }

  getEmployee(employeeId: string): Observable<unknown> {
    return this.http.get(`${this.apiBase}/${employeeId}`);
  }
}
