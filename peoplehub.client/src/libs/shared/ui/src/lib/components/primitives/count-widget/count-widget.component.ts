import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { CountWidgetLabelPosition } from '../../../models/component-models/count-widget.types';

/** Defaults are theme tokens (theme-tokens.css) so the widget follows light/dark. */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-count-widget',
  standalone: true,
  templateUrl: './count-widget.component.html',
  styleUrls: ['./count-widget.component.scss'],
  imports: [CommonModule],
})
export class CountWidgetComponent {
  @Input() label = 'Total';
  @Input() labelColor = 'var(--color-text-secondary)';
  @Input() value = 20;
  @Input() valueColor = 'var(--color-primary)';
  @Input() borderColor = 'var(--color-border)';
  @Input() backgroundColor = 'var(--color-surface)';
  @Input() showBorder = true;
  @Input() labelPosition: CountWidgetLabelPosition = 'top';
  @Input() labelSize = '14px';
  @Input() valueSize = '24px';
  @Input() locale = 'en-US';
  @Input() useGrouping = true;

  get isVertical(): boolean {
    return this.labelPosition === 'top' || this.labelPosition === 'bottom';
  }

  get isReverse(): boolean {
    return this.labelPosition === 'bottom' || this.labelPosition === 'after';
  }

  get formattedValue(): string {
    const safeValue = Number.isFinite(this.value) ? this.value : 0;
    return new Intl.NumberFormat(this.locale, { useGrouping: this.useGrouping }).format(safeValue);
  }
}
