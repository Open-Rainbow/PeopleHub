import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-number-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
})
export class NumberBoxComponent {
  @Input() label: string = 'Casual';
  @Input() isRequired: boolean = true;
  @Input() Placeholder: string = '0';
  @Input() parentFormGroup!: FormGroup;
  // @Input() id!: string;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() step: number = 1;
@Input() id: string = 'casual';

  @Output() numberBox = new EventEmitter<number>();
  @Output() blurEvent = new EventEmitter<void>();
ngOnInit() {
}
get activeForm(): FormGroup {
  return this.parentFormGroup ?? this.localForm;
}

  get control() {
      return this.activeForm.get(this.id);
  }
localForm = new FormGroup({
  casual: new FormControl(0),
});

  get isInvalid(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = Number(input.value);
    
    if (this.minValue !== undefined && value < this.minValue) {
      value = this.minValue;
      input.value = value.toString();
    }
    if (this.maxValue !== undefined && value > this.maxValue) {
      value = this.maxValue;
      input.value = value.toString();
    }
    
    this.control?.setValue(value, { emitEvent: false });
    this.numberBox.emit(value);
  }

  onBlur() {
    this.blurEvent.emit();
  }

  increment(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.control) return;

    const current = Number(this.control.value) || 0;
    let next = current + this.step;
    if (this.maxValue !== undefined && next > this.maxValue) {
      next = this.maxValue;
    }

    this.updateValue(next);
  }

  decrement(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.control) return;

    const current = Number(this.control.value) || 0;
    let next = current - this.step;
    if (this.minValue !== undefined && next < this.minValue) {
      next = this.minValue;
    }

    this.updateValue(next);
  }

  private updateValue(value: number) {
    if (!this.control) return;
    
    this.control.setValue(value);
    this.control.markAsDirty();
    this.control.markAsTouched();

    this.control.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    this.numberBox.emit(value);
    
    const inputElement = document.getElementById(this.id) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }
}