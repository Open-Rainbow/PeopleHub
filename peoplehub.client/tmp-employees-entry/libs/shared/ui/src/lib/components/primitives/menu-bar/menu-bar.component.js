import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IconComponent } from "../icon/icon.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../../services/menu.service";
function MenuBarComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "span", 6);
    i0.ɵɵtext(2, " Open Rainbow ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 7);
    i0.ɵɵtext(4, " Employee Management System ");
    i0.ɵɵelementEnd()();
} }
function MenuBarComponent_For_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4.label);
} }
function MenuBarComponent_For_6_Conditional_5_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ui-icon", 13);
} if (rf & 2) {
    const ɵ$index_18_r2 = i0.ɵɵnextContext(2).$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("name", ctx_r2.viewSubMenu && ctx_r2.activeIndex === ɵ$index_18_r2 ? "arrow_down" : "arrow_right");
} }
function MenuBarComponent_For_6_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, MenuBarComponent_For_6_Conditional_5_Conditional_0_Template, 1, 1, "ui-icon", 13);
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(item_r4.routes && ctx_r2.isSidebarExpanded ? 0 : -1);
} }
function MenuBarComponent_For_6_Conditional_6_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵlistener("click", function MenuBarComponent_For_6_Conditional_6_For_1_Template_div_click_0_listener() { const route_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ɵ$index_18_r2 = i0.ɵɵnextContext(2).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSubMenuClick(ɵ$index_18_r2, route_r6.route)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const route_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active-submenu", ctx_r2.activeSubRoute === route_r6.route);
    i0.ɵɵproperty("routerLink", route_r6.route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", route_r6.label, " One ");
} }
function MenuBarComponent_For_6_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, MenuBarComponent_For_6_Conditional_6_For_1_Template, 2, 4, "div", 14, i0.ɵɵrepeaterTrackByIndex);
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵrepeater(item_r4.routes);
} }
function MenuBarComponent_For_6_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵlistener("click", function MenuBarComponent_For_6_Conditional_7_For_2_Template_div_click_0_listener() { const route_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ɵ$index_18_r2 = i0.ɵɵnextContext(2).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onHoverSubMenuClick(ɵ$index_18_r2, route_r8.route)); })("click", function MenuBarComponent_For_6_Conditional_7_For_2_Template_div_click_0_listener() { const route_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ɵ$index_18_r2 = i0.ɵɵnextContext(2).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSubMenuClick(ɵ$index_18_r2, route_r8.route)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const route_r8 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", route_r8.route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", route_r8.label, " ");
} }
function MenuBarComponent_For_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵrepeaterCreate(1, MenuBarComponent_For_6_Conditional_7_For_2_Template, 2, 2, "div", 16, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(item_r4.routes);
} }
function MenuBarComponent_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9);
    i0.ɵɵlistener("click", function MenuBarComponent_For_6_Template_div_click_1_listener() { const ɵ$index_18_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onClick(ɵ$index_18_r2)); });
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵelement(3, "ui-icon", 11);
    i0.ɵɵconditionalCreate(4, MenuBarComponent_For_6_Conditional_4_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, MenuBarComponent_For_6_Conditional_5_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, MenuBarComponent_For_6_Conditional_6_Template, 2, 0);
    i0.ɵɵconditionalCreate(7, MenuBarComponent_For_6_Conditional_7_Template, 3, 0, "div", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ɵ$index_18_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("menu-item", ctx_r2.isSidebarExpanded)("menu-item-small", !ctx_r2.isSidebarExpanded);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-blue-600", ctx_r2.activeIndex === ɵ$index_18_r2)("text-white", ctx_r2.activeIndex === ɵ$index_18_r2);
    i0.ɵɵproperty("routerLink", item_r4.route);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", item_r4.icon);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.isSidebarExpanded ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r4.routes && item_r4.routes.length > 0 ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.viewSubMenu && ctx_r2.activeIndex === ɵ$index_18_r2 && ctx_r2.isSidebarExpanded ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r4.routes && item_r4.routes.length > 0 && !(ctx_r2.viewSubMenu && ctx_r2.activeIndex === ɵ$index_18_r2) ? 7 : -1);
} }
export class MenuBarComponent {
    router;
    menuService;
    isSidebarExpanded = true;
    hoverEnabled = false;
    hoverEnter = new EventEmitter();
    hoverLeave = new EventEmitter();
    onMouseEnter() {
        if (this.hoverEnabled) {
            this.hoverEnter.emit();
        }
    }
    onMouseLeave() {
        if (this.hoverEnabled) {
            this.hoverLeave.emit();
        }
    }
    menuItems = [];
    activeIndex = null;
    viewSubMenu = false;
    activeSubRoute = null;
    constructor(router, menuService) {
        this.router = router;
        this.menuService = menuService;
        const role = localStorage.getItem('userRole');
        this.menuItems = this.menuService.getMenuByRole(role);
    }
    onSidebarHover(isHovering) {
        if (isHovering && !this.isSidebarExpanded) {
            this.isSidebarExpanded = true;
        }
        else if (!isHovering) {
            this.isSidebarExpanded = false;
        }
    }
    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) => {
            this.setActiveMenuByRoute(event.urlAfterRedirects);
        });
    }
    onClick(index) {
        this.activeIndex = index;
        this.viewSubMenu = !this.viewSubMenu;
    }
    onSubMenuClick(parentIndex, route) {
        this.activeIndex = parentIndex;
        this.activeSubRoute = route;
        this.viewSubMenu = true;
    }
    onHoverSubMenuClick(parentIndex, route) {
        this.activeIndex = parentIndex;
        this.activeSubRoute = route;
        this.viewSubMenu = true;
    }
    setActiveMenuByRoute(url) {
        const cleanUrl = url.split('?')[0];
        const lastSegment = cleanUrl.split('/').pop();
        this.menuItems.forEach((item, index) => {
            if (item.route && item.route.includes(lastSegment)) {
                this.activeIndex = index;
                this.activeSubRoute = null;
                this.viewSubMenu = false;
                return;
            }
            if (item.routes) {
                const sub = item.routes.find(r => r.route.includes(lastSegment));
                if (sub) {
                    this.activeIndex = index;
                    this.activeSubRoute = sub.route;
                    this.viewSubMenu = true;
                }
            }
        });
    }
    static ɵfac = function MenuBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MenuBarComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.MenuService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MenuBarComponent, selectors: [["ui-menu-bar"]], inputs: { isSidebarExpanded: "isSidebarExpanded", hoverEnabled: "hoverEnabled" }, outputs: { hoverEnter: "hoverEnter", hoverLeave: "hoverLeave" }, decls: 7, vars: 3, consts: [[1, "h-screen", "sticky", "top-0", "z-[3000]", "transition-[width]", "duration-300", "ease-in-out", 3, "mouseenter", "mouseleave"], [1, "bg-[var(--bg-color)]", "h-full", "p-4", "w-[250px]", "overflow-visible", "flex-shrink-0"], [1, "flex", "items-center", "gap-[10px]", "p-[10px]"], ["src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtV5o8uP07w1WZBt1RhCfk6qtv37V3HpzkQ&s", 1, "w-[32px]"], [1, "flex", "flex-col", "gap-[2px]"], [1, "mt-2", "relative", 3, "menu-item", "menu-item-small"], [1, "text-[var(--text-color)]", "font-medium"], [1, "text-[9px]", "text-[var(--text-color)]"], [1, "mt-2", "relative"], [1, "flex", "items-center", "p-[10px]", "px-[14px]", "rounded-[10px]", "text-[var(--text-color)]", "transition-colors", "duration-200", "ease-in-out", "justify-between", "gap-3", "cursor-pointer", "hover:bg-blue-600", "hover:text-white", 3, "click", "routerLink"], [1, "flex", "items-center", "gap-2"], [3, "name"], [1, "w-[200px]", "rounded-[10px]", "p-[10px]", "shadow-[0_5px_20px_rgba(0,0,0,0.15)]", "z-[9999]", "opacity-0", "invisible", "-translate-x-[10px]", "transition-all", "duration-300", "ease-in-out", "absolute", "left-full", "top-0", "ml-2", "bg-white", "shadow-lg", "rounded-lg", "overflow-hidden", "z-50"], [1, "text-[18px]", 3, "name"], [1, "p-2", "px-6", "mt-1", "rounded-lg", "cursor-pointer", "transition-all", "hover:text-blue-600", 3, "active-submenu", "routerLink"], [1, "p-2", "px-6", "mt-1", "rounded-lg", "cursor-pointer", "transition-all", "hover:text-blue-600", 3, "click", "routerLink"], [1, "px-4", "py-2", "whitespace-nowrap", "hover:bg-blue-600", "cursor-pointer", 3, "routerLink"], [1, "px-4", "py-2", "whitespace-nowrap", "hover:bg-blue-600", "cursor-pointer", 3, "click", "routerLink"]], template: function MenuBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("mouseenter", function MenuBarComponent_Template_div_mouseenter_0_listener() { return ctx.onMouseEnter(); })("mouseleave", function MenuBarComponent_Template_div_mouseleave_0_listener() { return ctx.onMouseLeave(); });
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2);
            i0.ɵɵelement(3, "img", 3);
            i0.ɵɵconditionalCreate(4, MenuBarComponent_Conditional_4_Template, 5, 0, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(5, MenuBarComponent_For_6_Template, 8, 14, "div", 5, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.isSidebarExpanded ? "w-[240px] overflow-hidden" : "w-[64px] bg-transparent overflow-hidden");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.isSidebarExpanded ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.menuItems);
        } }, dependencies: [CommonModule, RouterLink, RouterModule, IconComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MenuBarComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-menu-bar', standalone: true, imports: [CommonModule, RouterLink, RouterModule, IconComponent], template: "<div class=\"w-[240px] h-screen bg-[#e5e7eb] transition-[width] duration-300 ease-in-out sticky top-0 overflow-hidden z-[3000]\"\r\n   class=\"h-screen sticky top-0 z-[3000] transition-[width] duration-300 ease-in-out\"\r\n  [class]=\"isSidebarExpanded \r\n    ? 'w-[240px] overflow-hidden' \r\n    : 'w-[64px] bg-transparent overflow-hidden'\"\r\n  (mouseenter)=\"onMouseEnter()\"\r\n  (mouseleave)=\"onMouseLeave()\">\r\n\r\n\r\n  <div class=\"bg-[var(--bg-color)] h-full p-4 w-[250px] overflow-visible flex-shrink-0\">\r\n    <div class=\"flex items-center gap-[10px] p-[10px]\">\r\n\r\n  <img\r\n    class=\"w-[32px]\"\r\n    src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtV5o8uP07w1WZBt1RhCfk6qtv37V3HpzkQ&s\"\r\n  />\r\n\r\n  @if(isSidebarExpanded){\r\n    <div class=\"flex flex-col gap-[2px]\">\r\n      <span class=\"text-[var(--text-color)] font-medium\">\r\n        Open Rainbow\r\n      </span>\r\n      <span class=\"text-[9px] text-[var(--text-color)]\">\r\n        Employee Management System\r\n      </span>\r\n    </div>\r\n  }\r\n\r\n</div>\r\n    @for (item of menuItems; track item; let i = $index) {\r\n\r\n    <div class=\"mt-2 relative\" [class.menu-item]=\"isSidebarExpanded\" [class.menu-item-small]=\"!isSidebarExpanded\">\r\n      <div class=\"flex items-center  p-[10px] px-[14px] rounded-[10px] text-[var(--text-color)] transition-colors duration-200 ease-in-out  \r\n      justify-between gap-3 cursor-pointer   hover:bg-blue-600 hover:text-white\" \r\n       [class.bg-blue-600]=\"activeIndex === i\"\r\n       [class.text-white]=\"activeIndex === i\"\r\n        (click)=\"onClick(i)\" [routerLink]=\"item.route\">\r\n\r\n        <div class=\"flex items-center gap-2\">\r\n          <ui-icon [name]=\"item.icon\"></ui-icon>\r\n          @if(isSidebarExpanded){\r\n            <span >{{ item.label }}</span>\r\n          }\r\n        </div>\r\n\r\n        @if (item.routes && item.routes.length > 0) {\r\n          @if(item.routes && isSidebarExpanded){\r\n            <ui-icon class=\"text-[18px]\" [name]=\"viewSubMenu && activeIndex === i ? 'arrow_down' : 'arrow_right'\"></ui-icon>\r\n          }\r\n        }\r\n      </div>\r\n      @if (viewSubMenu && activeIndex === i && isSidebarExpanded) {\r\n        @for (route of item.routes; track $index) {\r\n        <div class=\"p-2 px-6 mt-1 rounded-lg cursor-pointer transition-all hover:text-blue-600\"\r\n          [class.active-submenu]=\"activeSubRoute === route.route\" (click)=\"onSubMenuClick(i, route.route)\" [routerLink]=\"route.route\">\r\n          {{ route.label }} One\r\n        </div>\r\n        }\r\n      }\r\n      @if (item.routes && item.routes.length > 0 && !(viewSubMenu && activeIndex === i)) {\r\n      <div class=\" w-[200px] rounded-[10px] p-[10px] shadow-[0_5px_20px_rgba(0,0,0,0.15)] z-[9999] opacity-0 invisible -translate-x-[10px] transition-all duration-300 ease-in-out \r\n      absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg overflow-hidden z-50\">\r\n        @for (route of item.routes; track $index) {\r\n        <div class=\" px-4 py-2 whitespace-nowrap hover:bg-blue-600 cursor-pointer\"\r\n          [routerLink]=\"route.route\" (click)=\"onHoverSubMenuClick(i, route.route)\"\r\n          (click)=\"onSubMenuClick(i, route.route)\">\r\n          {{ route.label }} \r\n        </div>\r\n        }\r\n      </div>\r\n      }\r\n\r\n    </div>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n" }]
    }], () => [{ type: i1.Router }, { type: i2.MenuService }], { isSidebarExpanded: [{
            type: Input
        }], hoverEnabled: [{
            type: Input
        }], hoverEnter: [{
            type: Output
        }], hoverLeave: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MenuBarComponent, { className: "MenuBarComponent", filePath: "libs/shared/ui/src/lib/components/primitives/menu-bar/menu-bar.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=menu-bar.component.js.map