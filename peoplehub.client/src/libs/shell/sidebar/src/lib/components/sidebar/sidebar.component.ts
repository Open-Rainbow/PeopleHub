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

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveMenuByRoute(event.urlAfterRedirects);
      });
  }

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

