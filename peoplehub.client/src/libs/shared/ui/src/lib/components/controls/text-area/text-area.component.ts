import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-text-area',
  standalone: true,
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class TextAreaComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() label?: string = 'Text Area';
  @Input() placeholder?: string = 'Enter text area';
  @Input() isRequired?: boolean = true;
  @Input() showBorder: boolean = true;
  @Input() maxLength: number = 20;
  @Input() minLength: number = 0;
  @Input() showCharCount: boolean = true;
  @Input() id!: string;
  @Input() parentFormGroup!: FormGroup;

  @Output() textValueChange = new EventEmitter<string>();

  currentCharCount = 0;
  currentValue = '';
  shouldShowCount = false;
  isFocused = false;

  private destroy$ = new Subject<void>();

  get control(): FormControl {
    const ctrl = this.parentFormGroup?.get(this.id);
    if (!ctrl) {
      throw new Error(`FormControl with name '${this.id}' not found`);
    }
    return ctrl as FormControl;
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  ngOnInit(): void {
  this.control.setValidators([
    ...(this.isRequired ? [Validators.required] : []),
    ...(this.minLength > 0 ? [Validators.minLength(this.minLength)] : []),
    ...(this.maxLength > 0 ? [Validators.maxLength(this.maxLength)] : [])
  ]);

  this.control.updateValueAndValidity();

  this.control.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value: string) => {
      this.currentValue = value ?? '';
      this.updateCharCount();
      this.updateShowCount();
    });

  this.currentValue = this.control.value ?? '';
  this.updateCharCount();
  this.updateShowCount();
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxLength']) {
      this.updateCharCount();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTextareaStyle() {
  if (this.isInvalid) {
    return {
      'border': this.showBorder ? '1px solid #dc2626' : 'none',
      'box-shadow': this.showBorder ? '0 0 0 1px #dc2626' : 'none'
    };
  }

  return {
    'background-color': 'white',
    'border': this.showBorder ? '' : 'none'
  };
}

  onInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  let value = textarea.value;
  if (value.length > this.maxLength) {
    value = value.substring(0, this.maxLength);
    textarea.value = value;
    this.control.setValue(value, { emitEvent: false });
  }

  this.currentValue = value;
  this.textValueChange.emit(value);
  this.updateCharCount();
  this.updateShowCount();
}

  onFocus() {
    this.isFocused = true;
    this.updateShowCount();
  }

  onBlur(event: FocusEvent) {
  this.isFocused = false;

  const textarea = event.target as HTMLTextAreaElement;
  this.currentValue = textarea.value;
  this.control.markAsTouched();
  this.control.updateValueAndValidity();

  this.updateShowCount();
}

  private updateCharCount() {
    const value = this.currentValue || '';
    this.currentCharCount = Math.max(this.maxLength - value.length, 0);
  }

  private updateShowCount() {
    const hasValue = this.currentValue.trim().length > 0;
    this.shouldShowCount = hasValue || this.isFocused;
  }
}
