import { Injectable } from '@angular/core';

export interface MenuRoute {
  label: string;
  route: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  routes?: MenuRoute[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenuByRole(role: 'employee' | 'admin' | 'hr' | null): MenuItem[] {
    switch (role) {
      case 'admin':
        return [
          { label: 'Dashboard', icon: 'view_dashboard_outline', route: '/dashboard' },
          {
            label: 'Employees',
            icon: 'person',
            routes: [
              { label: 'All Employees', route: '/employees' },
              { label: 'Add Employee', route: '/employees/add' },
            ],
          },
        ];
      case 'hr':
        return [
          { label: 'Dashboard', icon: 'view_dashboard_outline', route: '/dashboard' },
          { label: 'Leave', icon: 'leave_user', route: '/leave' },
        ];
      default:
        return [
          { label: 'Dashboard', icon: 'view_dashboard_outline', route: '/dashboard' },
          { label: 'Profile', icon: 'person', route: '/profile' },
        ];
    }
  }
}
