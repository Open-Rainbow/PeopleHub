import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'organization-config-root',
  standalone: true,
  imports: [],
  templateUrl: './organization-config.component.html',
  styleUrls: ['./organization-config.component.scss'],
})
export class OrganizationConfigComponent {

}

