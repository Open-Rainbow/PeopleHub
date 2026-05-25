import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InitialsPipe } from 'pipes';

export class UserProfile {
  userId?: string;
  userName?: string;
  userRole?: string;
  profileUrl?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'header-root',
  standalone: true,
  imports: [CommonModule, InitialsPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isUserCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  dropdownOpen = false;
  userProfile: UserProfile = new UserProfile();
  currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.body.classList.add(`${savedTheme}-theme`);
    }

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    this.userProfile.userName = userName ?? 'User';
    this.userProfile.userRole = userRole ?? 'employee';
    this.userProfile.userId = localStorage.getItem('userEmail') ?? 'user@peoplehub.local';
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${this.currentTheme}-theme`);
    localStorage.setItem('theme', this.currentTheme);
    this.cdr.detectChanges();
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
      this.dropdownOpen = false;
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
