import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useFieldPolicy } from '../../../services/field-policy';

@Component({
  selector: 'ui-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() label?: string = 'Text Area';
  @Input() placeholder?: string = 'Enter text';
  @Input() isRequired?: boolean = true;
  @Input() showBorder?: boolean = true;
  @Input() borderColor?: string = '#2563eb';
  @Input() maxLength?: number = 500;
  @Input() minLength?: number = 0;
  @Input() showCharCount?: boolean = true;
  @Input() rows?: number = 4;
  @Input() id!: string;
  @Input() parentFormGroup!: FormGroup;

  @Output() textValueChange = new EventEmitter<string>();

  isFocused = false;
  currentCharCount = 0;

  private destroy$ = new Subject<void>();
  /** Field rules from the Setup page (hidden / read-only / required). */
  private readonly fieldPolicy = useFieldPolicy();

  constructor(private cdr: ChangeDetectorRef) {}

  get isInvalid(): boolean {
    const ctrl = this.parentFormGroup?.get(this.id);
    return !!(ctrl?.invalid && (ctrl?.dirty || ctrl?.touched));
  }

  get control(): FormControl {
    const ctrl = this.parentFormGroup?.get(this.id);
    if (!ctrl) {
      throw new Error(`FormControl with name '${this.id}' not found`);
    }
    return ctrl as FormControl;
  }

  get hasValue() {
    return (this.control?.value ?? '').trim().length > 0;
  }

  ngOnInit(): void {
    this.fieldPolicy(this);

    const validators = [
      ...(this.isRequired ? [Validators.required] : []),
      ...(this.minLength && this.minLength > 0
        ? [Validators.minLength(this.minLength)]
        : []),
      ...(this.maxLength ? [Validators.maxLength(this.maxLength)] : []),
    ];

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();

    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateCharCount();
      this.cdr.markForCheck();
    });

    this.updateCharCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxLength'] && !changes['maxLength'].firstChange) {
      this.updateCharCount();
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.textValueChange.emit(value);
    this.updateCharCount();
    this.cdr.markForCheck();
  }

  onFocus(): void {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  onBlur(): void {
    this.isFocused = false;
    this.control.markAsTouched();
    this.cdr.markForCheck();
  }

  private updateCharCount(): void {
    const value = this.control?.value ?? '';
    this.currentCharCount = Math.max((this.maxLength ?? 0) - value.length, 0);
  }
}
