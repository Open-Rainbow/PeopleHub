import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  imports: [IconComponent, ReactiveFormsModule]
})
export class PasswordComponent {
 

  @Input() label: string = 'Temporary Password';
  @Input() isRequired: boolean = true;
  @Input() placeholder: string = 'Enter Temporary password';
  @Input() minLength: number = 0;
  @Input() maxLength: number = 50;

  passwordVisible: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() value: string = '';
  isActive: boolean = false;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  get hasValue(): boolean {
    const currentValue = (this.control?.value ?? this.value ?? '').toString();
    return currentValue.length > 0;
  }

  @Output() valueChange = new EventEmitter<string>();

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

onFocus() {
  this.isActive = true;
}

onBlur() {
  if (!this.hasValue) {
    this.isActive = false;
  }

  this.control?.markAsTouched();
}

onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let v = input.value;

  if (v.length > this.maxLength) {
    v = v.slice(0, this.maxLength);
    input.value = v;
  }

  this.value = v;
  this.valueChange.emit(this.value);

  
}


}
