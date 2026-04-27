import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
 
 
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() labelIsRequired: 'left' | 'right' = 'right';
 
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
  if (!this.isDualLabelMode) {
    return this.label;
  }
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
  if (!this.isDualLabelMode) {
    return this.label;
  }
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
 
  
@HostBinding('style.--toggle-active-color') get toggleActiveColor() {
  return this.color;
}
 
@HostBinding('style.--tick-color') get tickClr() {
  return this.tickColor;
}
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
