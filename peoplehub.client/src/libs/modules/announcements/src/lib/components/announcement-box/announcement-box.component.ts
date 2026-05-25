import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Announcements } from '../announcements/announcements';

@Component({
  selector: 'announcement-box-root',
  standalone: true,
  imports: [Announcements],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './announcement-box.component.html',
})
export class AnnouncementBoxComponent {}
