import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-count-widget',
    templateUrl: './count-widget.component.html',
    styleUrls: ['./count-widget.component.scss'],
    imports: [CommonModule]
})
export class CountWidgetComponent {
  @Input() label: string = 'Total';
  @Input() labelColor: string = 'gray';
  @Input() value: number = 20;
  @Input() valueColor: string = 'skyblue';
  @Input() borderColor: string = 'gray';
  @Input() backgroundColor: string = 'white';
  @Input() showBorder: boolean = true;
  @Input() labelPosition: 'top' | 'bottom' | 'before' | 'after' = 'top';
  @Input() lebelsize: string = '14px';
  @Input() valuesize: string = '24px';
}
