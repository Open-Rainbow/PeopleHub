import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import type { MenuItem } from '../../../models/component-models/menu-item.model';
import { MenuService } from '../../../services/menu.service';
import { IconComponent } from "../icon/icon.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, IconComponent],
})
export class MenuBarComponent {

 @Input() isSidebarExpanded = true;
@Input() hoverEnabled = false;

@Output() hoverEnter = new EventEmitter<void>();
@Output() hoverLeave = new EventEmitter<void>();

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


  menuItems: MenuItem[] = [];
  activeIndex: number | null = null;
  viewSubMenu: boolean = false;
  activeSubRoute: string | null = null;

  constructor(private router: Router, private menuService: MenuService) {
    const role = localStorage.getItem('userRole') as 'employee' | 'admin' | 'hr';
    this.menuItems = this.menuService.getMenuByRole(role);
  }

  onSidebarHover(isHovering: boolean) {
    if (isHovering && !this.isSidebarExpanded) {
      this.isSidebarExpanded = true;
    } else if (!isHovering) {
      this.isSidebarExpanded = false;
    }
  }


  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveMenuByRoute(event.urlAfterRedirects);
      });
  }
  onClick(index: number) {
    this.activeIndex = index;
    this.viewSubMenu = !this.viewSubMenu;
  }

  onSubMenuClick(parentIndex: number, route: string) {
    this.activeIndex = parentIndex;
    this.activeSubRoute = route;
    this.viewSubMenu = true;
  }

  onHoverSubMenuClick(parentIndex: number, route: string) {
    this.activeIndex = parentIndex;
    this.activeSubRoute = route;
    this.viewSubMenu = true;
  }

  
  setActiveMenuByRoute(url: string) {
    const cleanUrl = url.split('?')[0];
    const lastSegment = cleanUrl.split('/').pop();

    this.menuItems.forEach((item, index) => {
      if (item.route && item.route.includes(lastSegment!)) {
        this.activeIndex = index;
        this.activeSubRoute = null;
        this.viewSubMenu = false;
        return;
      }

      if (item.routes) {
        const sub = item.routes.find(r => r.route.includes(lastSegment!));

        if (sub) {
          this.activeIndex = index;
          this.activeSubRoute = sub.route;
          this.viewSubMenu = true;
        }
      }
    });
  }


}
