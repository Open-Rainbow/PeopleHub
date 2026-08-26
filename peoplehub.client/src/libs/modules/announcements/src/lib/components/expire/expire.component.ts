import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ChipComponent,
  DropdownComponent,
  IconComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
  CalendarComponent,
} from 'ui';
import { Announcement, DropdownConfigService, DropdownOption } from 'common';
import { TooltipDirective } from 'directives';

@Component({
  selector: 'announcements-expire',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipComponent,
    DropdownComponent,
    IconComponent,
    TextAreaComponent,
    TextBoxComponent,
    TextButtonComponent,
    CalendarComponent,
    TooltipDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expire.component.html',
  styleUrls: ['./expire.component.scss'],
})
export class ExpireComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dropdownService = inject(DropdownConfigService);

  readonly severityOptions$: Observable<DropdownOption[]> =
    this.dropdownService.getOptions('severity');

  showForm = false;

  readonly form: FormGroup = this.fb.group({
    title: [''],
    priority: [null],
    expiresOn: [null],
    description: [''],
  });

  @Input() announcements: Announcement[] = [];

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  get otherAnnouncements(): Announcement[] {
    return this.announcements;
  }

  formatDate(value: string): string {
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

  isTruncated(text: string, limit: number): boolean {
    return !!text && text.length > limit;
  }

  leaveDescription(text: string, limit: number): string {
    if (!text) return '';
    if (text.length <= limit) return text;
    let trimmed = text.substring(0, limit);
    if (text.charAt(limit) !== ' ' && trimmed.lastIndexOf(' ') !== -1) {
      trimmed = trimmed.substring(0, trimmed.lastIndexOf(' '));
    }
    trimmed = trimmed.trim();
    return trimmed + '...';
  }
}

