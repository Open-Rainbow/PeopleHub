import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarComponent, DropdownComponent, TextAreaComponent, TextBoxComponent, TextButtonComponent } from 'ui';
import { CommonService } from 'common';

@Component({
  selector: 'add-edit-announcement-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent, DropdownComponent, CalendarComponent, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-edit-announcement.component.html',
})
export class AddEditAnnouncementComponent {
  private readonly fb = inject(FormBuilder);
  private readonly commonService = inject(CommonService);

  readonly form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    date: ['', Validators.required],
    priority: [1, Validators.required],
    category: [1, Validators.required],
    department: [1, Validators.required],
    targetAudience: [1, Validators.required],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });

  readonly priorityOptions = [
    { value: 1, name: 'High' },
    { value: 2, name: 'Medium' },
    { value: 3, name: 'Low' },
  ];

  readonly categoryOptions = [
    { value: 1, name: 'General' },
    { value: 2, name: 'Policy' },
    { value: 3, name: 'Security' },
  ];

  readonly departmentOptions = [
    { value: 1, name: 'IT' },
    { value: 2, name: 'HR' },
    { value: 3, name: 'Operations' },
  ];

  readonly audienceOptions = [
    { value: 1, name: 'All Employees' },
    { value: 2, name: 'Managers' },
    { value: 3, name: 'Admins' },
  ];

  onClear(): void {
    this.form.reset({ priority: 1, category: 1, department: 1, targetAudience: 1 });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.commonService.addAnnouncement({
      Title: raw.title,
      Date: new Date(raw.date),
      Priority: this.priorityOptions.find(x => x.value === raw.priority)?.name ?? 'Medium',
      Description: raw.description,
      OrgId: 1,
      Category: this.categoryOptions.find(x => x.value === raw.category)?.name ?? 'General',
      Department: this.departmentOptions.find(x => x.value === raw.department)?.name ?? 'IT',
      TargetAudience: this.audienceOptions.find(x => x.value === raw.targetAudience)?.name ?? 'All Employees',
    }).subscribe();

    this.onClear();
  }
}


