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
  @Input() title!: string;
  @Input() data: TeamData[] = [];
  @Input() announcementInfo: AnnouncementInfo[] = [];
}