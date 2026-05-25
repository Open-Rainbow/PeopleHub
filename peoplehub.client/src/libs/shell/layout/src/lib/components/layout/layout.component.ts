import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from 'sidebar';
import { HeaderComponent } from 'header';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isSidebarExpanded = true;
  isUserCollapsed = false;

  onSidebarToggleByUser() {
    this.isUserCollapsed = !this.isUserCollapsed;
    this.isSidebarExpanded = !this.isUserCollapsed;
  }

  onSidebarHoverEnter() {
    if (this.isUserCollapsed) {
      this.isSidebarExpanded = true;
    }
  }

  onSidebarHoverLeave() {
    if (this.isUserCollapsed) {
      this.isSidebarExpanded = false;
    }
  }
}

