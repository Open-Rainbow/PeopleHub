import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, TextAreaComponent } from 'ui';
import { AnnouncementInfo, TeamData } from 'common';

@Component({
  selector: 'announcements-view-announcement',
  standalone: true,
  imports: [CommonModule, IconComponent, TextAreaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss'],
})
export class ViewAnnouncementComponent {
  @Input() title = 'Annual Company Retreat - Registration Open';

  @Input() data: TeamData[] = [
    {
      name: 'Ganesh',
      designation: 'UI/UX Designer',
      empID: 'CECO_10111',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=735',
      priority: 'High',
    },
  ];

  @Input() announcementInfo: AnnouncementInfo[] = [
    { icon: 'calendar', label: 'PUBLISHED', value: '10 Feb 2026' },
    { icon: 'edit', label: 'EXPIRES', value: '15 Mar 2026' },
    { icon: 'delete', label: 'AUDIENCE', value: 'All Employees' },
  ];
}
