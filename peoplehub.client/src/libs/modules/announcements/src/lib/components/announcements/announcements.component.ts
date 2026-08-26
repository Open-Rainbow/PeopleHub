import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'ui';
import { Announcement } from 'common';

@Component({
  selector: 'announcements-announcements',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent {
  @Input() announcements: Announcement[] = [];

  get highPriorityAnnouncements(): Announcement[] {
    return this.announcements
      .filter((announcement) => announcement.priority === 'High')
      .sort((a, b) => this.parseDate(b.postedDate) - this.parseDate(a.postedDate));
  }

  get otherAnnouncements(): Announcement[] {
    return this.announcements
      .filter((announcement) => announcement.priority !== 'High')
      .sort((a, b) => this.parseDate(b.postedDate) - this.parseDate(a.postedDate));
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

  private parseDate(value: string): number {
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day).getTime();
    }
    return 0;
  }
}
