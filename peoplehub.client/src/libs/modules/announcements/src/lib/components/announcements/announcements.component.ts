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
  @Input() announcements: Announcement[] = [
    {
      announcementId: 123,
      title: 'Holiday Schedule Update',
      priority: 'Medium',
      description:
        'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
      postedDate: '30/12/2024',
      postedBy: 'HR Department',
      expireDate: '24/12/2024',
      expireOn: new Date(),
      priorityDesc: '',
    },
    {
      announcementId: 124,
      title: 'New Security Policy',
      priority: 'Low',
      description:
        'All employees must update their passwords by end of week following the new security guidelines.',
      postedDate: '25/12/2024',
      postedBy: 'IT Security',
      expireDate: '24/12/2024',
      expireOn: new Date(),
      priorityDesc: '',
    },
    {
      announcementId: 125,
      title: 'Holiday Schedule Update 1',
      priority: 'High',
      description:
        'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
      postedDate: '29/12/2024',
      postedBy: 'HR Department',
      expireDate: '24/12/2024',
      expireOn: new Date(),
      priorityDesc: '',
    },
    {
      announcementId: 126,
      title: 'Holiday Schedule Update 2',
      priority: 'High',
      description:
        'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
      postedDate: '29/12/2024',
      postedBy: 'HR Department',
      expireDate: '24/12/2024',
      expireOn: new Date(),
      priorityDesc: '',
    },
  ];

  get highPriorityAnnouncements(): Announcement[] {
    return this.announcements
      .filter((a) => a.priority === 'High')
      .sort((a, b) => this.parseDate(b.postedDate) - this.parseDate(a.postedDate));
  }

  get otherAnnouncements(): Announcement[] {
    return this.announcements
      .filter((a) => a.priority !== 'High')
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
