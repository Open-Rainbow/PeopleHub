import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly http = inject(HttpClient);

  private readonly apiBase = 'https://localhost:7252' + '/api/employees';

  savePersonalInfo(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.apiBase}/personal-info`, payload);
  }

  addEmployee(payload: Record<string, unknown>): Observable<unknown> {
    return this.http.post(this.apiBase, payload);
  }

  getEmployee(employeeId: string): Observable<unknown> {
    return this.http.get(`${this.apiBase}/${employeeId}`);
  }
}
