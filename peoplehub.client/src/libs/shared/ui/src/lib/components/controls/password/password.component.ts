import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  imports: [IconComponent, ReactiveFormsModule]
})
export class PasswordComponent {
 

  @Input() label: string = 'Temporary Password';
  @Input() isRequired: boolean = true;
  @Input() placeholder: string = 'Enter Temporary password';

  passwordVisible: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() value: string = '';
  isActive: boolean = false;
  isLabelFloated = false;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  @Output() valueChange = new EventEmitter<string>();

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

onFocus() {
  this.isActive = true;
}

onBlur() {
  if (!this.value) {
    this.isActive = false;
  }
}

onInput(event: Event) {
  const v = (event.target as HTMLInputElement).value;
  this.value = v;
  this.valueChange.emit(this.value);

  
}


}
