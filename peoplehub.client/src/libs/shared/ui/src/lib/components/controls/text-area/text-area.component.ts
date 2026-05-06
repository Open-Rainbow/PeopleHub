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
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
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

  @ViewChild('textareaField') textareaField!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('textareaInput') textareaInput!: ElementRef<HTMLDivElement>;

  isFocused = false;
  currentCharCount = 0;
  private destroy$ = new Subject<void>();
  private resizeObserver?: ResizeObserver;
  private initialWidth = 0;
  private initialHeight = 0;

  constructor(private cdr: ChangeDetectorRef) {}

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

  ngAfterViewInit(): void {
    const el = this.textareaField.nativeElement;
    const wrapper = this.textareaInput.nativeElement;
    this.initialWidth = el.offsetWidth;
    this.initialHeight = el.offsetHeight;

    this.resizeObserver = new ResizeObserver(() => {
      const newWidth = el.offsetWidth;
      const newHeight = el.offsetHeight;
      if (newWidth !== this.initialWidth || newHeight !== this.initialHeight) {
        wrapper.style.width = newWidth + 'px';
        wrapper.style.height = newHeight + 'px';
      }
    });
    this.resizeObserver.observe(el);
  }

  ngOnInit(): void {
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
    this.resizeObserver?.disconnect();
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    this.control.setValue(value, { emitEvent: false });
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
