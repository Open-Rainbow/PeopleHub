import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnChanges {

  @Input() text?: string = 'text';


  @Input() color: string = '#6b7280';

  
  @Input() bgColor?: string;

  @Input() activeBGColor: string = '#7c3aed';
  @Input() activeColor: string = 'white';
  @Input() borderRadius: string = '9999px';
  @Input() size: 'extrasmall' | 'small' | 'medium' | 'large' = 'extrasmall';
  @Input() usePointerCursor: boolean = true;

  height = '28px';
  width = 'auto';
  fontSize = '0.875rem';
  horizontalGap = '12px';
  isHovered: boolean = false;

 
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

 
  get finalBgColor(): string {
    if (this.bgColor) {
      return this.bgColor; 
    }

    return this.convertToOpacity(this.color, 0.1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) this.updateSize();
  }

  ngOnInit(): void {
    this.updateSize();
  }

  updateSize() {
    switch (this.size) {
      case 'large':
        this.height = '33px';
        this.fontSize = '1.1rem';
        this.horizontalGap = '22px';
        break;

      case 'medium':
      default:
        this.height = '28px';
        this.fontSize = '1rem';
        this.horizontalGap = '16px';
        break;

      case 'small':
        this.height = '22px';
        this.fontSize = '.8rem';
        this.horizontalGap = '10px';
        break;

      case 'extrasmall':
        this.height = '18px';
        this.fontSize = '.8rem';
        this.horizontalGap = '12px';
        break;
    }
  }


  private convertToOpacity(color: string, opacity: number): string {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');

      const bigint = parseInt(
        hex.length === 3
          ? hex.split('').map(x => x + x).join('')
          : hex,
        16
      );

      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return color;
  }
}
