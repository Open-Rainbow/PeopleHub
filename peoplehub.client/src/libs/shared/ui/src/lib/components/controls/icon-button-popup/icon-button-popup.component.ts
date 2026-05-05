import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import type { ButtonSize, ButtonVariant } from '../../../models/button-control.types';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-icon-button-popup',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './icon-button-popup.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class IconButtonPopupComponent {
 
  @Input() description?: string = 'Description text';
  @Input() popupPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  
 @Input() popupBgColor: string = '#1f2937'; 
  @Input() popupTxtColor: string = '#ffffff';
  @Input() iconName: string = 'info'; 
  @Input() iconAriaLabel: string = 'More information';
  @Input() variant: ButtonVariant = 'secondary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  
  isHovered: boolean = false;
  get positionClasses(): string {
    const base = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none';
    
    switch (this.popupPosition) {
      case 'top':
        return `${base} bottom-full left-1/2 -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${base} top-full left-1/2 -translate-x-1/2 mt-2`;
      case 'left':
        return `${base} right-full top-1/2 -translate-y-1/2 mr-2`;
      case 'right':
        return `${base} left-full top-1/2 -translate-y-1/2 ml-2`;
      default:
        return `${base} top-full left-1/2 -translate-x-1/2 mt-2`;
    }
  }

  get arrowClasses(): string {
    const base = 'absolute w-2 h-2 bg-gray-800 transform rotate-45';
    
    switch (this.popupPosition) {
      case 'top':
        return `${base} top-full left-1/2 -translate-x-1/2 -mt-1`;
      case 'bottom':
        return `${base} bottom-full left-1/2 -translate-x-1/2 -mb-1`;
      case 'left':
        return `${base} left-full top-1/2 -translate-y-1/2 -ml-1`;
      case 'right':
        return `${base} right-full top-1/2 -translate-y-1/2 -mr-1`;
      default:
        return '';
    }
  }
}