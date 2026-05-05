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
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-icon-button',
  imports: [CommonModule, IconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  iconName = input<string>('material-symbols:add-rounded');
  ariaLabel = input<string>('Icon button');
  title = input<string>('');
  variant = input<ButtonVariant>('secondary');
  size = input<ButtonSize>('medium');
  type = input<NativeButtonType>('button');
  disabled = input<boolean>(false);
  isExpanded = input<boolean>(false);
  buttonClick = output<MouseEvent>();

  buttonClass = computed(() =>
    buildButtonClassNames(
      'ui-icon-button',
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
