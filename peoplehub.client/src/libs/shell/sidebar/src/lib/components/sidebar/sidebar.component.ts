import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccessService, pageKeyOf } from 'common';
import { IconComponent } from 'ui';
import { SidebarService, MenuItem } from '../../services/sidebar.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sidebar-root',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarExpanded = true;
  @Input() hoverEnabled = false;

  @Output() hoverEnter = new EventEmitter<void>();
  @Output() hoverLeave = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly sidebarService = inject(SidebarService);
  private readonly access = inject(AccessService);
  private readonly cdr = inject(ChangeDetectorRef);

  menuItems: MenuItem[] = [];
  activeIndex: number | null = null;
  viewSubMenu = false;
  activeSubRoute: string | null = null;

  constructor() {
    const role = this.access.role() || 'employee';
    // Rebuild the menu whenever the role's access changes (login, Setup saves).
    effect(() => {
      this.access.version();
      this.menuItems = this.visibleMenu(this.sidebarService.getMenuByRole(role));
      this.setActiveMenuByRoute(this.router.url);
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    void this.access.load();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
          this.setActiveMenuByRoute(event.urlAfterRedirects);
          this.cdr.markForCheck();
        });
    this.setActiveMenuByRoute(this.router.url);
  }

  /** Drops pages the role cannot view; a group disappears when none of its pages are left. */
  private visibleMenu(items: MenuItem[]): MenuItem[] {
    const canSee = (route?: string) => {
      const key = pageKeyOf(route);
      return !key || this.access.can(key, 'view');
    };
    return items
      .map((item) => (item.routes?.length ? { ...item, routes: item.routes.filter((r) => canSee(r.route)) } : item))
      .filter((item) => (item.routes ? item.routes.length > 0 : canSee(item.route)));
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
