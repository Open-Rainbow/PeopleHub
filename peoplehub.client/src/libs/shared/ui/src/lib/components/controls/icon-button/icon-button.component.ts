import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-icon-button',
  imports: [CommonModule,IconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone:true,
  encapsulation: ViewEncapsulation.None
})
export class IconButtonComponent {
  @Input() bgColor?: string = 'white';
  @Input() color?: string = 'red';
  @Input() hoverBgColor?: string = 'red';
  @Input() hoverColor?: string = 'black';
  @Input() borderRadius?: number = 6;
  @Input() borderColor?: string = 'blue';
  @Input() showBorder?: boolean = true;
  @Input() disable?: boolean = false;
  @Input() isExpand?: boolean = false;
  @Input() iconName?: string = 'home';
  isHovered: boolean = false;

 @Input() parentFormGroup!: FormGroup;
@Input() id!: string;

  get control() { return this.parentFormGroup?.get(this.id); }
  get isInvalid() { return this.control?.invalid && (this.control?.dirty || this.control?.touched); }


  createRipple(event: MouseEvent) {
    if (this.disable) return;

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
