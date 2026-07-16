import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import type { MenuItem } from '../../../models/component-models/menu-item.model';
import { MenuService } from '../../../services/menu.service';
import * as i0 from "@angular/core";
export declare class MenuBarComponent {
    private router;
    private menuService;
    isSidebarExpanded: boolean;
    hoverEnabled: boolean;
    hoverEnter: EventEmitter<void>;
    hoverLeave: EventEmitter<void>;
    onMouseEnter(): void;
    onMouseLeave(): void;
    menuItems: MenuItem[];
    activeIndex: number | null;
    viewSubMenu: boolean;
    activeSubRoute: string | null;
    constructor(router: Router, menuService: MenuService);
    onSidebarHover(isHovering: boolean): void;
    ngOnInit(): void;
    onClick(index: number): void;
    onSubMenuClick(parentIndex: number, route: string): void;
    onHoverSubMenuClick(parentIndex: number, route: string): void;
    setActiveMenuByRoute(url: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuBarComponent, "ui-menu-bar", never, { "isSidebarExpanded": { "alias": "isSidebarExpanded"; "required": false; }; "hoverEnabled": { "alias": "hoverEnabled"; "required": false; }; }, { "hoverEnter": "hoverEnter"; "hoverLeave": "hoverLeave"; }, never, never, true, never>;
}
//# sourceMappingURL=menu-bar.component.d.ts.map