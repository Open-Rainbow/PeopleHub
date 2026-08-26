import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CalendarComponent,
  ChipComponent,
  DropdownComponent,
  IconComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
} from 'ui';
import { ConfirmPopupService } from 'ui';
import {
  Announcement,
  AnnouncementInfo,
  CommonService,
  DropdownConfigService,
  DropdownOption,
  ExpireAnnouncement,
} from 'common';
//import { addEditAnnouncementForm } from '../../config/announcements/add-announcement.config';
import { SummaryComponent } from '../summary/summary.component';
import { addEditAnnouncementForm } from '../../config/announcements/add-announcement.config';

type AnnouncementMode = 'add' | 'edit' | 'view';

@Component({
  selector: 'announcements-add-announcement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
    ChipComponent,
    IconComponent,
    TextButtonComponent,
    SummaryComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
})
export class AddAnnouncementComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly confirmPopupService = inject(ConfirmPopupService);
  private readonly dropdownService = inject(DropdownConfigService);

  addEditAnnouncement!: FormGroup;
  formConfig = addEditAnnouncementForm;

  isModalOpen = false;
  isEditMode = false;
  isEditedClick = false;
  mode: AnnouncementMode = 'add';

  viewAnnouncementInfo: AnnouncementInfo[] = [];
  priorityOptions: DropdownOption[] = [];

  priorityOptions$: Observable<DropdownOption[]>;
  categoryOptions$: Observable<DropdownOption[]>;
  departmentOptions$: Observable<DropdownOption[]>;
  targetAudienceOptions$: Observable<DropdownOption[]>;

  announcements: Announcement[] = [];
  expireAnnouncements: ExpireAnnouncement[] = [];

  constructor() {
    this.priorityOptions$ = this.dropdownService.getOptions('severity');
    this.categoryOptions$ = this.dropdownService.getOptions('category');
    this.departmentOptions$ = this.dropdownService.getOptions('department');
    this.targetAudienceOptions$ =
      this.dropdownService.getOptions('targetAudience');
    this.priorityOptions$.subscribe((options) => {
      this.priorityOptions = options;
    });
  }

  ngOnInit(): void {
    this.addEditAnnouncement = this.commonService.createForm(this.formConfig);
    this.loadExpiredAnnouncements();
    this.loadAnnouncements();
  }

  loadExpiredAnnouncements(): void {
    this.commonService.getExpiredAnnouncements().subscribe((data) => {
      this.expireAnnouncements = data;
    });
  }

  loadAnnouncements(): void {
    this.commonService.getAddAnnouncements().subscribe((data) => {
      this.announcements = data;
    });
  }

  get postedBy(): string {
    return this.addEditAnnouncement.get('postedBy')?.value || '';
  }

  get otherAnnouncements(): Announcement[] {
    return this.announcements;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  toggleForm(): void {
    this.mode = 'add';
    this.addEditAnnouncement.reset();
    this.isModalOpen = true;
    this.addEditAnnouncement.enable();
  }

  openViewModal(data: Record<string, unknown>): void {
    this.mode = 'view';
    this.isModalOpen = true;
    this.populateForm(data);
    this.addEditAnnouncement.disable();
  }

  openEditModal(data: Record<string, unknown>): void {
    this.mode = 'edit';
    this.isModalOpen = true;
    this.populateForm(data);
    this.addEditAnnouncement.enable();
  }

  populateForm(data: Record<string, any>): void {
    this.priorityOptions$.subscribe((priorityOptions) => {
      const matchedPriority = priorityOptions.find(
        (opt) => opt.name === data['priorityDesc']?.toLowerCase(),
      );
      this.categoryOptions$.subscribe((categoryOptions) => {
        const matchedCategory = categoryOptions.find(
          (opt) => opt.name === data['category'],
        );
        this.departmentOptions$.subscribe((departmentOptions) => {
          const matchedDepartment = departmentOptions.find(
            (opt) => opt.name === data['department'],
          );
          this.targetAudienceOptions$.subscribe((targetOptions) => {
            const matchedTarget = targetOptions.find(
              (opt) => opt.name === data['targetAudience'],
            );
            this.addEditAnnouncement.patchValue({
              title: data['title'],
              description: data['description'],
              priority: matchedPriority?.value,
              category: matchedCategory?.value,
              department: matchedDepartment?.value,
              targetAudience: matchedTarget?.value,
              expiresOn: new Date(data['expireOn']),
              postedBy: data['postedBy'],
            });
            this.viewAnnouncementInfo = [
              {
                icon: 'calendar',
                label: 'PUBLISHED',
                value: this.formatDate(data['published']),
              },
              {
                icon: 'schedule',
                label: 'EXPIRES',
                value: this.formatDate(data['expireOn']),
              },
              {
                icon: 'group',
                label: 'AUDIENCE',
                value: data['targetAudience'],
              },
            ];
          });
        });
      });
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }

  getPriorityLabel(): string {
    const priorityValue = this.addEditAnnouncement.get('priority')?.value;
    const matched = this.priorityOptions.find(
      (opt) => opt.value === priorityValue,
    );
    return matched ? matched.name.toUpperCase() : '';
  }

  onSave(): void {
    this.isModalOpen = false;
    this.confirmPopupService
      .showConfirm(
        'Announcement Save',
        'Are you sure you want to save announcement?',
      )
      .subscribe((confirmed: string) => {
        if (confirmed === 'Yes') {
          const formValue = this.addEditAnnouncement.getRawValue();
          const model = {
            Title: formValue.title,
            Date: formValue.expiresOn,
            Priority: formValue.priority?.toString(),
            Description: formValue.description,
            OrgId: 1,
            Category: formValue.category?.toString(),
            Department: formValue.department?.toString(),
            TargetAudience: formValue.targetAudience?.toString(),
          };
          this.commonService.addAnnouncement(model).subscribe({
            next: () => this.closeModal(),
            error: (err: unknown) => console.error('Error:', err),
          });
        }
      });
  }

  onUpdate(): void {
    // update handler placeholder (parity with source)
  }

  onDelete(announcement: Announcement): void {
    this.confirmPopupService
      .showValidation(this.addEditAnnouncement, this.formConfig)
      .subscribe((confirmed: string) => {
        if (confirmed) {
          this.commonService.deleteAnnouncement(announcement).subscribe({
            next: () => {
              this.announcements = this.announcements.filter(
                (a) => a.announcementId !== announcement.announcementId,
              );
              this.expireAnnouncements = this.expireAnnouncements.filter(
                (a) => a.announcementId !== announcement.announcementId,
              );
            },
            error: (err: unknown) => console.error('Delete Error:', err),
          });
        }
      });
  }

  formatDate(value: string): string {
    if (!value) return '';
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      const date = new Date(year, month - 1, day);
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };
      return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    }
    return value;
  }
}

