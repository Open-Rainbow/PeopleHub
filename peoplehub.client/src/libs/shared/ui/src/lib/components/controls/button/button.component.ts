import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';


@Component({
    selector: 'ui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [CommonModule,IconComponent],
    standalone:true,
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() text?: string = 'text';
  @Input() bgColor?: string = 'white';
  @Input() color?: string = 'red';
  @Input() hoverBGColor?: string = 'red';
  @Input() hoverColor?: string = 'black';
  @Input() borderRadius?: number = 8;
  @Input() borderColor?: string = 'blue';
  @Input() showBorder?: boolean = true;
  @Input() disable?: boolean = false;
  @Input() isexpand?: boolean = false;
  @Input() iconName?: string = '';
  @Input() iconPosition?: 'left' | 'right' |  'both' = 'left';
  @Input() borderStyle: 'solid' | 'dashed' | 'dotted' = 'solid';
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
