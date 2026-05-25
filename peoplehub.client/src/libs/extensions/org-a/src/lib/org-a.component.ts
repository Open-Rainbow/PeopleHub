import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'org-a-root',
  standalone: true,
  imports: [],
  templateUrl: './org-a.component.html',
  styleUrls: ['./org-a.component.scss'],
})
export class OrgAComponent {

}

