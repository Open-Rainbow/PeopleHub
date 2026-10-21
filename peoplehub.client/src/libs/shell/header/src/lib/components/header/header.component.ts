import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Organization, OrganizationService } from 'common';
import { InitialsPipe } from 'pipes';
import { ThemeTokensService } from 'theme-tokens';
import { DropdownComponent, DropdownOption, IconComponent } from 'ui';
import { UserProfileModel } from '../../models/user-profile.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'header-root',
  standalone: true,
  imports: [CommonModule, InitialsPipe, IconComponent, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly isUserCollapsed = input(false);
  readonly sidebarToggle = output<void>();

  private readonly router = inject(Router);
  private readonly themeTokensService = inject(ThemeTokensService);
  private readonly organizations = inject(OrganizationService);

  readonly dropdownOpen = signal(false);
  readonly currentTheme = signal<'light' | 'dark'>('light');
  readonly userProfile = signal<UserProfileModel>({});

  // ---- Organization (Super Admin can switch) -------------------------------------------------
  readonly isSuperAdmin = signal(false);
  readonly orgs = signal<Organization[]>([]);
  readonly orgOptions = computed<DropdownOption[]>(() =>
    this.orgs().map((o) => ({ value: o.id, name: o.isActive ? o.name : `${o.name} (inactive)` })),
  );
  readonly orgName = computed(() => this.organizations.current()?.name ?? '');
  readonly orgForm = new FormGroup({ org: new FormControl<number | null>(null) });
  /** Bumped to re-create the dropdown once the list is loaded (it reads its value on init). */
  readonly orgKey = signal(0);

  ngOnInit(): void {
    this.currentTheme.set(this.themeTokensService.initTheme());

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    this.userProfile.set({
      userName: userName ?? 'User',
      userRole: userRole ?? 'employee',
      userId: localStorage.getItem('userEmail') ?? 'user@peoplehub.local',
    });

    this.isSuperAdmin.set((userRole ?? '').trim().toLowerCase() === 'superadmin');
    void this.loadOrganizations();
  }

  private async loadOrganizations(): Promise<void> {
    await this.organizations.loadCurrent();
    if (!this.isSuperAdmin()) return;
    try {
      const list = await this.organizations.list('', true);
      this.orgs.set(list);
      this.orgForm.controls.org.setValue(this.organizations.selectedId(), { emitEvent: false });
      this.orgKey.update((k) => k + 1);
    } catch {
      this.orgs.set([]);
    }
  }

  /** Super Admin picked another organization: the whole app reloads for it. */
  onOrgPicked(value: unknown): void {
    const org = this.orgs().find((o) => o.id === value);
    if (!org || org.id === this.organizations.selectedId()) return;
    if (!org.isActive) {
      this.orgForm.controls.org.setValue(this.organizations.selectedId(), { emitEvent: false });
      this.orgKey.update((k) => k + 1);
      return;
    }
    this.organizations.switchTo(org);
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
    const role = url.split('/').filter(Boolean)[0] ?? 'employee';
    this.router.navigate([`/${role}/showProfile`]);
  }
}
