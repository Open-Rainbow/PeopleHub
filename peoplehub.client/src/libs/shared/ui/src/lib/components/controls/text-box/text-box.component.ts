
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useFieldPolicy } from '../../../services/field-policy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class TextBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() label?: string = 'Text Box';
  @Input() placeholder?: string = 'Enter here...';
  @Input() isRequired?: boolean = true;

  @Input() showBorder: boolean = true;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 50;
  @Input() showCharCount: boolean = true;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() isReadOnly: boolean = false;
  @Input() isAllowSpecialChars: boolean = true;
  @Input() tabindex?: number;
  @Input() value: string = '';
  @Input() isFocused: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  currentCharCount: number = 0;
  private destroy$ = new Subject<void>();
  /** Field rules from the Setup page (hidden / read-only / required). */
  private readonly fieldPolicy = useFieldPolicy();

  constructor(private cdr: ChangeDetectorRef) {}

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

  get hasValue(): boolean {
    return (this.control?.value ?? '').trim().length > 0;
  }

  ngOnInit(): void {
    this.fieldPolicy(this);

    const validators = [
      ...(this.isRequired ? [Validators.required] : []),
      ...(this.minLength && this.minLength > 0 ? [Validators.minLength(this.minLength)] : []),
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
    if (changes['value'] && !changes['value'].firstChange) {
      const isEditingThisInput =
        this.isFocused && (document.activeElement as HTMLElement | null)?.id === this.id;
      if (!isEditingThisInput && this.control.value !== this.value) {
        this.control.setValue(this.value, { emitEvent: false });
        this.updateCharCount();
        this.cdr.markForCheck();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCharCount(): void {
    const controlValue = this.control?.value as string | null | undefined;
    const currentLength = controlValue?.length ?? 0;
    this.currentCharCount = Math.max((this.maxLength ?? 0) - currentLength, 0);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;
    this.value = nextValue;
    this.valueChange.emit(nextValue);
    this.updateCharCount();
    this.cdr.markForCheck();
  }

  onFocus(): void {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  onBlur(event: FocusEvent): void {
    this.isFocused = false;
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.control.markAsTouched();
    this.cdr.markForCheck();
  }

} 
