import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ui-dot',
    templateUrl: './dot.component.html',
    styleUrls: ['./dot.component.scss'],
    imports: [CommonModule]
})
export class DotComponent {
  @Input() label = "Text"
  @Input() labelColor: string = 'lightgreen'
  @Input() labelPosition: 'left' | 'right' = 'left';
  @Input() dotColor: string = "lightgreen"
  @Input() dotSize: 'small' | 'medium' | 'large' = 'small';

  getDotSize(dotSize: 'small' | 'medium' | 'large') {
    switch (dotSize) {
      case 'small':
        return { width: '8px', height: '8px' };
      case 'medium':
        return { width: '10px', height: '10px' };
      case 'large':
        return { width: '12px', height: '12px' };
      default:
        return { width: '8px', height: '8px' };
    }
  }
}
