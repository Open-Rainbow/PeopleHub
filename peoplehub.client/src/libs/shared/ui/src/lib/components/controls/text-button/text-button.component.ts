import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  buildButtonClassNames,
  ButtonSize,
  ButtonVariant,
  NativeButtonType,
} from '../../../models/button-control.types';

@Component({
  selector: 'ui-text-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextButtonComponent {
  text = input<string>('Button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  type = input<NativeButtonType>('button');
  disabled = input<boolean>(false);
  isExpanded = input<boolean>(false);
  backgroundColor = input<string>('');
  textColor = input<string>('');
  borderColor = input<string>('');
  hoverBackgroundColor = input<string>('');
  hoverTextColor = input<string>('');

  buttonClick = output<MouseEvent>();

  hasCustomColors = computed(
    () =>
      !!(
        this.backgroundColor() ||
        this.textColor() ||
        this.borderColor() ||
        this.hoverBackgroundColor() ||
        this.hoverTextColor()
      ),
  );

  buttonClass = computed(() =>
    buildButtonClassNames(
      'ui-text-button',
      this.variant(),
      this.size(),
      this.isExpanded(),
    ),
  );

  onButtonClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.buttonClick.emit(event);
  }
}
