import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'ui-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
    imports: [ReactiveFormsModule]
})
export class OtpComponent implements AfterViewInit {
  otpArray = Array(6).fill('');

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  @Output() otpChange = new EventEmitter<string>();

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  ngAfterViewInit(): void {
    this.otpInputs.first.nativeElement.focus();
  }

  private emitOtp() {
    const otp = this.otpInputs
      .toArray()
      .map(input => input.nativeElement.value)
      .join('');

    this.otpChange.emit(otp);
  }

  handlePaste(event: ClipboardEvent): void {
    const pasteData = event.clipboardData?.getData('text/plain') || '';
    if (/^\d{6}$/.test(pasteData)) {
      event.preventDefault();
      pasteData.split('').forEach((char, i) => {
        const input = this.otpInputs.get(i);
        if (input) {
          input.nativeElement.value = char;
        }
      });
      this.emitOtp();
      this.otpInputs.last.nativeElement.focus();
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
  }

  handleKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
      setTimeout(() => this.emitOtp());
    }

    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key) && !(event.ctrlKey && event.key === 'v')) {
      event.preventDefault();
    }
  }
}