// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'ui-toggle',
//   standalone: true,
//   imports: [CommonModule],               
//   templateUrl: './toggle.component.html',
//   styleUrls: ['./toggle.component.scss'] 
// })
// export class ToggleComponent {
//   @Input() checked = false;
//   @Input() color = '#4CAF50';            
//   @Output() checkedChange = new EventEmitter<boolean>(); 
//   @Output() toggleChange = new EventEmitter<boolean>();
//   @Input() label: string = '';
//   @Input() labelPosition: 'left' | 'right' = 'right';
//   @Input() labelColor: string = '#333';   

  

//   onToggle(event: Event) {
//     const input = event.target as HTMLInputElement;
//     this.checked = input.checked;                
//     this.checkedChange.emit(this.checked);      
//     this.toggleChange.emit(this.checked);       
//   }
// }



// import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'ui-toggle',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './toggle.component.html',
//   styleUrls: ['./toggle.component.scss']
// })
// export class ToggleComponent implements OnChanges {
//   @Input() checked = false;
//   @Input() color = '#4CAF50';
//   @Output() checkedChange = new EventEmitter<boolean>();
//   @Output() toggleChange = new EventEmitter<boolean>();
//   @Input() label: string = '';
//   @Input() labelPosition: 'left' | 'right' = 'right';
//   @Input() labelColor: string = '#333';
//   @Input() size: 'large' | 'medium' | 'small' = 'small';


//   toggleWidth = '20px';
//   toggleHeight = '10px';
//   knobSize = '8px';
//   knobTranslate = '10px';

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['size']) this.updateSize();
//   }

//   ngOnInit(): void {
//     this.updateSize();
//   }


//   updateSize() {
//     switch (this.size) {
//       case 'large':
//         this.toggleWidth = '60px';
//         this.toggleHeight = '40px';
//         this.knobSize = '5px';
//         this.knobTranslate = '20px';
//         break;
//       case 'medium':
//         this.toggleWidth = '40px';
//         this.toggleHeight = '20px';
//         this.knobSize = '12px';
//         this.knobTranslate = '20px';
//         break;
//       case 'small':
//       default:
//         this.toggleWidth = '30px';
//         this.toggleHeight = '15px';
//         this.knobSize = '10px';
//         this.knobTranslate = '12px';
//         break;
//     }
//   }

//   onToggle(event: Event) {
//     const input = event.target as HTMLInputElement;
//     this.checked = input.checked;
//     this.checkedChange.emit(this.checked);
//     this.toggleChange.emit(this.checked);
//   }
// }

import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
 
 
@Component({
    selector: 'ui-toggle',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './toggle.component.html',
    standalone:true
})
export class ToggleComponent implements OnChanges {
  @Input() checked = false;
  @Input() color = '#4CAF50';
  @Input() tickColor: string = '#fff';
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() toggleChange = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() labelPosition: 'left' | 'right' | 'both' = 'right';
  @Input() labelisRequired: 'left' | 'right' = 'right';
 
  @Input() isRequired: boolean = true;
  @Input() labelColor: string = '#333';
  @Input() size: 'large' | 'medium' | 'small' = 'small';
  @Input() useCheckbox: boolean = false;
  @Input() toggleOnlyMode: boolean = true;
  @Input() offLabel: string = '';
  @Input() onLabel: string = '';
  @Input() manualToggle: boolean = false;
 
 
 
 
   @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  onChange(event: Event): void {
  const value = (event.target as HTMLInputElement).checked;
 
  this.checked = value;
 
  if (this.parentFormGroup?.get(this.id)) {
    this.parentFormGroup.get(this.id)?.setValue(value);
  }
  this.checkedChange.emit(value);
  this.toggleChange.emit(value);
}
 
  // ADD these 2 getters
  get control() {
    return this.parentFormGroup?.get(this.id);
  }
 
  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }
  toggleWidth = '40px';
  toggleHeight = '20px';
  knobSize = '16px';
  knobTranslate = '20px';
 
get dynamicLeftLabel(): string {
 
  // ✅ If no off/on labels provided → behave like OLD component
  if (!this.isDualLabelMode) {
    return this.label;
  }
 
  // ✅ Manual mode should not auto change text
  if (this.manualToggle) {
    return this.offLabel || this.label;
  }
 
  if (this.labelPosition === 'left') {
    return this.checked ? 'YES' : 'NO';
  }
 
  if (this.labelPosition === 'both') {
    return this.offLabel;
  }
 
  return this.offLabel || this.label;
}
 
 
get dynamicRightLabel(): string {
 
  // ✅ If no off/on labels provided → behave like OLD component
  if (!this.isDualLabelMode) {
    return this.label;
  }
 
  // ✅ Manual mode should not auto change text
  if (this.manualToggle) {
    return this.onLabel || this.label;
  }
 
  if (this.labelPosition === 'right') {
    return this.checked ? 'YES' : 'NO';
  }
 
  if (this.labelPosition === 'both') {
    return this.onLabel;
  }
 
  return this.onLabel || this.label;
}
 
get isDualLabelMode(): boolean {
  return !!this.offLabel || !!this.onLabel;
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
        this.toggleWidth = '60px';
        this.toggleHeight = '34px';
        this.knobSize = '26px';
        this.knobTranslate = '26px';
        break;
      case 'medium':
        this.toggleWidth = '44px';
        this.toggleHeight = '24px';
        this.knobSize = '18px';
        this.knobTranslate = '20px';
        break;
      case 'small':
      default:
        this.toggleWidth = '34px';
        this.toggleHeight = '18px';
        this.knobSize = '14px';
        this.knobTranslate = '16px';
        break;
    }
  }
 
  onToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
    this.toggleChange.emit(this.checked);
  }
 
  /* NEW: expose CSS variables to component host */
@HostBinding('style.--toggle-active-color') get toggleActiveColor() {
  return this.color;
}
 
@HostBinding('style.--tick-color') get tickClr() {
  return this.tickColor;
}
 
 
  // NEW METHOD → called when label is clicked
onLabelClick(forceValue?: boolean) {
  if (this.toggleOnlyMode) return;
 
  if (forceValue !== undefined) {
    this.checked = forceValue;
  } else {
    this.checked = !this.checked;
  }
 
  this.parentFormGroup?.get(this.id)?.setValue(this.checked);
 
  this.checkedChange.emit(this.checked);
  this.toggleChange.emit(this. checked);
}
 
}
