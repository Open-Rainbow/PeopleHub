import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { IconifyIconComponent } from './iconify-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconifyIconComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  readonly title = 'peoplehub.client';

  ngOnInit() {
  }
}
