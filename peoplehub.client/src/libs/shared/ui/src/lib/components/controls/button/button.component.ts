import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule, IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  text = input<string>('text');
  bgColor = input<string>('white');
  color = input<string>('red');
  hoverBgColor = input<string>('red');
  hoverColor = input<string>('black');
  borderRadius = input<number>(8);
  borderColor = input<string>('blue');
  showBorder = input<boolean>(true);
  disable = input<boolean>(false);
  isExpanded = input<boolean>(false);
  iconName = input<string>('');
  iconPosition = input<'left' | 'right' | 'both'>('left');
  borderStyle = input<'solid' | 'dashed' | 'dotted'>('solid');
  parentFormGroup = input<FormGroup | undefined>(undefined);
  id = input<string>('');

  isHovered = signal<boolean>(false);

  control = computed(() => this.parentFormGroup()?.get(this.id()));
  isInvalid = computed(
    () =>
      !!(
        this.control()?.invalid &&
        (this.control()?.dirty || this.control()?.touched)
      ),
  );

  getBackgroundColor(): string {
    if (this.disable()) {
      return '#e5e7eb';
    }

    return this.isHovered() ? this.hoverBgColor() : this.bgColor();
  }

  getTextColor(): string {
    if (this.disable()) {
      return '#9ca3af';
    }

    return this.isHovered() ? this.hoverColor() : this.color();
  }

  onMouseEnter(): void {
    if (!this.disable()) {
      this.isHovered.set(true);
    }
  }

  onMouseLeave(): void {
    if (!this.disable()) {
      this.isHovered.set(false);
    }
  }

  createRipple(event: MouseEvent) {
    if (this.disable()) return;

    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  }
}
