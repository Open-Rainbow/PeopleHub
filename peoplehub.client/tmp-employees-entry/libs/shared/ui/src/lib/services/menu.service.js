import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MenuService {
    getMenuByRole(role) {
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
    static ɵfac = function MenuService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MenuService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MenuService, factory: MenuService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=menu.service.js.map