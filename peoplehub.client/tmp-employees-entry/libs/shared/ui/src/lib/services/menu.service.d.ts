import * as i0 from "@angular/core";
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
export declare class MenuService {
    getMenuByRole(role: 'employee' | 'admin' | 'hr' | null): MenuItem[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MenuService>;
}
//# sourceMappingURL=menu.service.d.ts.map