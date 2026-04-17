import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { iconRegistry } from 'common';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconComponent {
  private readonly _iconRegistry = iconRegistry;
  @Input() name: string = '';
  @Input() color: string = '';
  @Input() hoverColor: string = '';

  isHovering = false;
}
