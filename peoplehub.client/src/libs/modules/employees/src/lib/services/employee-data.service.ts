import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  private readonly routeData = new Map<string, unknown>();

  setDataByRoute(route: string, data: unknown): void {
    if (!route) {
      return;
    }
    this.routeData.set(route, data);
  }

  getDataByRoute(route: string): unknown {
    if (!route) {
      return null;
    }
    return this.routeData.get(route) ?? null;
  }

  clearDataByRoute(route: string): void {
    if (!route) {
      return;
    }
    this.routeData.delete(route);
  }

  clearAll(): void {
    this.routeData.clear();
  }
}
