import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService, MenuItem } from '../../services/sidebar.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sidebar-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarExpanded = true;
  @Input() hoverEnabled = false;

  @Output() hoverEnter = new EventEmitter<void>();
  @Output() hoverLeave = new EventEmitter<void>();

  menuItems: MenuItem[] = [];
  activeIndex: number | null = null;
  viewSubMenu = false;
  activeSubRoute: string | null = null;

  constructor(private router: Router, private sidebarService: SidebarService) {
    const role = localStorage.getItem('userRole') as string || 'employee';
    this.menuItems = this.sidebarService.getMenuByRole(role);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
          this.setActiveMenuByRoute(event.urlAfterRedirects);
        });
    this.setActiveMenuByRoute(this.router.url);
  }

  onMouseEnter(): void {
    if (this.hoverEnabled) {
      this.hoverEnter.emit();
    }
  }

  onMouseLeave(): void {
    if (this.hoverEnabled) {
      this.hoverLeave.emit();
    }
  }

  onClick(index: number): void {
    const item = this.menuItems[index];
    if (!item) {
      return;
    }

    if (item.routes?.length) {
      if (this.activeIndex === index) {
        this.viewSubMenu = !this.viewSubMenu;
      } else {
        this.activeIndex = index;
        this.viewSubMenu = true;
        this.activeSubRoute = null;
      }

      return;
    }

    this.activeIndex = index;
    this.viewSubMenu = false;
    this.activeSubRoute = null;
  }

  onSubMenuClick(parentIndex: number, route: string): void {
    this.activeIndex = parentIndex;
    this.activeSubRoute = route;
    this.viewSubMenu = true;
  }

  onHoverSubMenuClick(parentIndex: number, route: string): void {
    this.activeIndex = parentIndex;
    this.activeSubRoute = route;
    this.viewSubMenu = true;
  }

  setActiveMenuByRoute(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];

    this.menuItems.forEach(
      (item, index) => {
     
        if (item.routes?.length) {
          const subRoute = item.routes.find((sub) => cleanUrl.includes(`/${sub.route}`));
          if (subRoute) {
            this.activeIndex = index;
            this.activeSubRoute = subRoute.route;
            this.viewSubMenu = true;
            return;
          }
        }

        if (item.route && cleanUrl.includes(`/${item.route}`)) {
          this.activeIndex = index;
          this.activeSubRoute = null;
          this.viewSubMenu = false;
        }
      });
  }
}

