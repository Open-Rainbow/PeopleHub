import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  PlainButtonSize,
  PlainButtonVariant,
} from '../../../models/plain-button.types';

@Component({
  selector: 'ui-plain-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plain-button.component.html',
  styleUrls: ['./plain-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainButtonComponent {
  text = input<string>('Button');
  variant = input<PlainButtonVariant>('primary');
  size = input<PlainButtonSize>('medium');
  disabled = input<boolean>(false);
  isExpanded = input<boolean>(false);

  buttonClick = output<MouseEvent>();

  buttonClass = computed(() => {
    const classes = [
      'ui-plain-button',
      `ui-plain-button--${this.variant()}`,
      `ui-plain-button--${this.size()}`,
    ];

    if (this.isExpanded()) {
      classes.push('ui-plain-button--expanded');
    }

    return classes.join(' ');
  });

  onButtonClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.buttonClick.emit(event);
  }
}
