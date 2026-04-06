import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import 'iconify-icon';

@Component({
  selector: 'ph-icon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<iconify-icon [attr.icon]="icon" [attr.width]="width" [attr.height]="height"></iconify-icon>`
})
export class IconifyIconComponent {
  @Input({ required: true }) icon!: string;
  @Input() width = '20';
  @Input() height = '20';
}
