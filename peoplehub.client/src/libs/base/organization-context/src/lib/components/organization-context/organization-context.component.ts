import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'organization-context-root',
  standalone: true,
  imports: [],
  templateUrl: './organization-context.component.html',
  styleUrls: ['./organization-context.component.scss'],
})
export class OrganizationContextComponent {

}

