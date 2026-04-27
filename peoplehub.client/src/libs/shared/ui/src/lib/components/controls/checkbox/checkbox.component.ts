import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  HostBinding,
  SimpleChanges,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string = '';
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() color: string = '#2563eb';
  @Input() tickColor: string = '#ffffff';
  @Input() id!: string; // MANDATORY - required for accessibility
  @Input() labelPosition: 'left' | 'right' = 'right'; // Label position relative to checkbox
  @Input() labelClick: boolean = true; // Whether label click toggles checkbox
  @Input('checked') checkedInput: boolean = false;

  @Input() parentFormGroup!: FormGroup;

  @Output() checkedChange = new EventEmitter<boolean>();

  private internalValue: boolean = false;
  private onChange = (_value: boolean) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  get checked(): boolean {
    return this.internalValue;
  }

  set checked(value: boolean) {
    if (this.internalValue !== value) {
      this.internalValue = value;
      this.onChange(value);
      this.checkedChange.emit(value);
      this.cdr.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('checkedInput' in changes) {
      const nextValue = this.coerceBoolean(changes['checkedInput'].currentValue);
      if (this.internalValue !== nextValue) {
        this.internalValue = nextValue;
        this.cdr.markForCheck();
      }
    }
  }

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid(): boolean {
    return (
      (this.control?.invalid &&
        (this.control?.dirty || this.control?.touched)) ??
      false
    );
  }

  writeValue(value: any): void {
    this.internalValue = this.coerceBoolean(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onChange_internal(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    if (this.control) {
      this.control.setValue(this.checked);
      this.control.markAsTouched();
    }
  }

  onLabelClick(): void {
    if (!this.labelClick) {
      return;
    }
    this.checked = !this.checked;
    if (this.control) {
      this.control.setValue(this.checked);
      this.control.markAsTouched();
    }
  }

  handleBlur(): void {
    this.onTouched();
    if (this.control) {
      this.control.markAsTouched();
    }
  }

  @HostBinding('style.--checkbox-color')
  get checkboxColor(): string {
    return this.color;
  }

  @HostBinding('style.--tick-color')
  get tickColor_binding(): string {
    return this.tickColor;
  }

  private coerceBoolean(value: unknown): boolean {
    return value === true || value === 'true';
  }
}
