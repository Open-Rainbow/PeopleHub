import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconComponent {
  @Input() name: string = '';
  @Input() color: string = 'currentColor';
  @Input() hoverColor: string = '';
  @Input() size: string = '1em';
}
