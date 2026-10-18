import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InitialsPipe } from 'pipes';
import { ThemeTokensService } from 'theme-tokens';
import { IconComponent } from 'ui';
import { UserProfileModel } from '../../models/user-profile.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'header-root',
  standalone: true,
  imports: [CommonModule, InitialsPipe, IconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly isUserCollapsed = input(false);
  readonly sidebarToggle = output<void>();

  private readonly router = inject(Router);
  private readonly themeTokensService = inject(ThemeTokensService);

  readonly dropdownOpen = signal(false);
  readonly currentTheme = signal<'light' | 'dark'>('light');
  readonly userProfile = signal<UserProfileModel>({});

  ngOnInit(): void {
    this.currentTheme.set(this.themeTokensService.initTheme());

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    this.userProfile.set({
      userName: userName ?? 'User',
      userRole: userRole ?? 'employee',
      userId: localStorage.getItem('userEmail') ?? 'user@peoplehub.local',
    });
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownOpen.update(open => !open);
  }

  toggleTheme(): void {
    this.currentTheme.set(this.themeTokensService.toggleTheme());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const clickedInside =
      target.closest('.admin_details') ||
      target.closest('.dropdown-menu') ||
      target.closest('.brightness_icon');

    if (!clickedInside) {
      this.dropdownOpen.set(false);
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  profileOpen(): void {
    const url = this.router.url;

    if (url.startsWith('/admin')) {
      this.router.navigate(['/admin/showProfile']);
    } else if (url.startsWith('/hr')) {
      this.router.navigate(['/hr/showProfile']);
    } else {
      this.router.navigate(['/employee/showProfile']);
    }
  }
}
