import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [ReactiveFormsModule],
})
export class OtpComponent implements AfterViewInit {
  otpArray: string[] = Array(6).fill('');

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() label: string = 'Enter OTP here';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() otpLength: number = 6;

  @Output() otpChange = new EventEmitter<string>();

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['otpLength']) {
      const length = Math.floor(Number(this.otpLength));
      this.otpLength = Number.isFinite(length) && length > 0 ? length : 6;
      this.otpArray = Array(this.otpLength).fill('');
    }
  }

  ngAfterViewInit(): void {
    this.otpInputs.first.nativeElement.focus();
  }

  private emitOtp() {
    const otp = this.otpInputs
      .toArray()
      .map((input) => input.nativeElement.value)
      .join('');

    this.control?.setValue(otp);
    this.otpChange.emit(otp);
  }

  private blurIfComplete(): void {
    const allFilled = this.otpInputs
      .toArray()
      .every((input) => /^\d$/.test(input.nativeElement.value));

    if (allFilled && this.otpInputs.last) {
      this.otpInputs.last.nativeElement.blur();
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const pasteData = event.clipboardData?.getData('text/plain') || '';
    const otpRegex = new RegExp(`^\\d{${this.otpArray.length}}$`);

    if (otpRegex.test(pasteData)) {
      event.preventDefault();
      pasteData.split('').forEach((char, i) => {
        const input = this.otpInputs.get(i);
        if (input) {
          input.nativeElement.value = char;
        }
      });
      this.emitOtp();
      this.blurIfComplete();
    }
  }

  handleInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d$/.test(value) && value !== '') {
      input.value = '';
      return;
    }

    this.emitOtp();

    if (value && index < this.otpArray.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

    this.blurIfComplete();
  }

  handleKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (index > 0) {
        const previousInput = this.otpInputs.get(index - 1)?.nativeElement;
        previousInput?.focus();
        const previousLength = previousInput?.value.length ?? 0;
        previousInput?.setSelectionRange(previousLength, previousLength);
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (index < this.otpArray.length - 1) {
        const nextInput = this.otpInputs.get(index + 1)?.nativeElement;
        nextInput?.focus();
        const nextLength = nextInput?.value.length ?? 0;
        nextInput?.setSelectionRange(nextLength, nextLength);
      }
      return;
    }

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
      setTimeout(() => this.emitOtp());
    }

    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (
      !/^\d$/.test(event.key) &&
      !allowedKeys.includes(event.key) &&
      !(event.ctrlKey && event.key === 'v')
    ) {
      event.preventDefault();
    }
  }
}
