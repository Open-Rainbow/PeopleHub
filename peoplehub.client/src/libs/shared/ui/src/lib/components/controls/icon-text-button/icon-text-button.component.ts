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
  IconPosition,
  NativeButtonType,
} from '../../../models/button-control.types';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-icon-text-button',
  templateUrl: './icon-text-button.component.html',
  styleUrls: ['./icon-text-button.component.scss'],
  imports: [CommonModule, IconComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTextButtonComponent {
  text = input<string>('Button');
  iconName = input<string>('material-symbols:add-rounded');
  iconPosition = input<IconPosition>('left');
  iconAriaHidden = input<boolean>(true);
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  type = input<NativeButtonType>('button');
  disabled = input<boolean>(false);
  isExpanded = input<boolean>(false);
  buttonClick = output<MouseEvent>();

  buttonClass = computed(() =>
    buildButtonClassNames(
      'ui-icon-text-button',
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
