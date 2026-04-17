import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ButtonListItem } from '../../../models/component-models/button-list-item.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-button-list',
  imports: [CommonModule, IconComponent],
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss'],
})
export class ButtonListComponent {
  @Input() buttons: ButtonListItem[] = [];
  @Input() textColor?: string = '#ffffff';
  @Input() bgColor?: string = '#79b2f3';
  @Input() selectedBgColor?: string = '#3b82f6';
  @Input() selectedTextColor?: string = '#ffffff';
  @Input() hoverBgColor?: string = 'red';
  @Input() hoverTextColor?: string = '#ffffff';
  @Output() buttonClick = new EventEmitter<ButtonListItem>();

  @Input() selectedId!: number;
  hoverId: number | null = null;

  selectButton(btn: ButtonListItem) {
    this.buttonClick.emit(btn);
  }


  createRipple(event: MouseEvent) {

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
  ngOnInit() {
    if (!this.selectedId) {
      this.selectedId = 1;
    }
  }
}