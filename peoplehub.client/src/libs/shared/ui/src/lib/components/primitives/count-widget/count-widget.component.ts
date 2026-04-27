import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() labelSize: string = '14px';
  @Input() valueSize: string = '24px';
}
