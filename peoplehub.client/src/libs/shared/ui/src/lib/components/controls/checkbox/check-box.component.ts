import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-check-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckboxComponent implements OnChanges {

  @Input() checked = false;
  @Input() color = '#4CAF50';
  @Input() tickColor: string = '#fff';
  @Input() label: string = '';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() isRequired: boolean = false;
  @Input() labelClick: boolean = true;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() toggleChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {}

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.checked = value;

    this.checkedChange.emit(value);
    this.toggleChange.emit(value);
  }

  onLabelClick() {
    if (!this.labelClick) {
    return;
  }

    this.checked = !this.checked;

    this.checkedChange.emit(this.checked);
    this.toggleChange.emit(this.checked);

    const ctrl = this.parentFormGroup?.get(this.id);
    if (ctrl) ctrl.setValue(this.checked);
  }

  /* CSS variable bindings */
  @HostBinding('style.--checkbox-active-color')
  get checkboxColor() {
    return this.color;
  }

  @HostBinding('style.--tick-color')
  get tickClr() {
    return this.tickColor;
  }
}