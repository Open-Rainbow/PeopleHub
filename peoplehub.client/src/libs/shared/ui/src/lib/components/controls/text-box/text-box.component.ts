
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class TextBoxComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
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
  shouldShowCount = false;
  @Input() isFocused: boolean = false;
  currentValue = '';

  @Output() valueChange = new EventEmitter<string>();

  currentCharCount: number = 0;
  private valueChangesSubscription?: Subscription;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  ngOnInit(): void {
    this.control?.valueChanges.subscribe(() => {
      this.updateShowCount();
    });
    this.updateCharCount();
  }

  ngAfterViewInit(): void {
    this.setupSubscription();
  }
  private updateShowCount() {
    const hasValue = this.currentValue.trim().length > 0;


    this.shouldShowCount = hasValue || this.isFocused;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxLength']) {
      this.updateCharCount();
    }
    if (changes['parentFormGroup'] || changes['id']) {
      this.setupSubscription();
    }
    if (changes['value'] && !changes['value'].firstChange) {
      const control = this.control;
      if (control && control.value !== this.value) {
        control.setValue(this.value, { emitEvent: false });
        this.updateCharCount();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  private setupSubscription(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    const control = this.control;
    if (control) {
      this.updateCharCount();
      this.valueChangesSubscription = control.valueChanges.subscribe((newValue: string) => {
        this.value = newValue ?? '';
        this.valueChange.emit(this.value);
        this.updateCharCount();
      });
    } else {
      this.currentCharCount = this.maxLength;
    }
  }

  updateCharCount(): void {
    const controlValue = this.control?.value as string | null | undefined;
    const currentLength = controlValue?.length ?? 0;
    this.currentCharCount = this.maxLength - currentLength;
  }

  getInputStyle() {
    const baseStyle = {
      'background-color': 'white'
    };


    if (!this.showBorder) {
      return { baseStyle, 'border': 'none' };
    }

    if (this.isInvalid) {
      return {
        baseStyle,
        'border': '1px solid #dc2626',
      };
    }

    return baseStyle;
  }




  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentValue = target.value;
    this.valueChange.emit(this.currentValue);

    this.updateShowCount();
  }

  onFocus() {
    this.isFocused = true;
    this.updateShowCount();
  }

  onBlur(event: FocusEvent) {
    this.isFocused = false;
    const target = event.target as HTMLInputElement;
    this.currentValue = target.value;

    this.updateShowCount();
  }






} 
