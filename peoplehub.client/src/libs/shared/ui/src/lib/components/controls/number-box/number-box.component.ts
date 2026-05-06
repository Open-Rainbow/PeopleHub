import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-number-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
})
export class NumberBoxComponent implements OnInit {
  @Input() label: string = 'Casual';
  @Input() isRequired: boolean = true;
  @Input() placeholder: string = '0';
  @Input() parentFormGroup!: FormGroup;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() set step(value: number) {
    this._step = value < 0 ? Math.abs(value) : value || 1;
  }
  get step(): number {
    return this._step;
  }
  private _step: number = 1;
  @Input() id: string = 'casual';

  @Output() numberBox = new EventEmitter<number>();
  @Output() blurEvent = new EventEmitter<void>();

  localForm: FormGroup = new FormGroup({});
  isFocused: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.parentFormGroup) {
      this.localForm = new FormGroup({
        [this.id]: new FormControl(''),
      });
    }
  }

  get activeForm(): FormGroup {
    return this.parentFormGroup ?? this.localForm;
  }

  get control() {
    return this.activeForm.get(this.id);
  }

  get hasValue(): boolean {
    const value = this.control?.value;
    return value !== null && value !== undefined && value !== '';
  }

  get isInvalid(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.trim();

    if (rawValue === '') {
      this.control?.setValue('', { emitEvent: false });
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      return;
    }

    let value = Number(rawValue);
    
    if (this.minValue !== undefined && value < this.minValue) {
      value = this.minValue;
      input.value = value.toString();
    }
    if (this.maxValue !== undefined && value > this.maxValue) {
      value = this.maxValue;
      input.value = value.toString();
    }
    
    this.control?.setValue(value, { emitEvent: false });
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.numberBox.emit(value);
  }

  onFocus() {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  onBlur() {
    this.isFocused = false;
    this.control?.markAsTouched();
    this.cdr.markForCheck();
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

    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.numberBox.emit(value);
    
    const inputElement = document.getElementById(this.id) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }
}