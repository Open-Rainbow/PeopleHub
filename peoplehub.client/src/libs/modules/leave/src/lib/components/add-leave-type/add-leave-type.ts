import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CheckboxComponent,
  DropdownComponent,
  IconButtonComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
} from 'ui';
import { addLeaveTypeForm } from '../../config/form-configs/add-leave-type.config';
import { IAddLeaveTypeForm } from '../../config/form-configs/add-leave-type.model';

@Component({
  selector: 'leave-management-add-leave-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    NumberBoxComponent,
    DropdownComponent,
    TextButtonComponent,
    IconButtonComponent,
    CheckboxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-leave-type.html',
})
export class AddLeaveType implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Record<string, unknown>>();

  readonly formConfig = addLeaveTypeForm;
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.createForm(this.formConfig);
  }

  closeForm(): void {
    this.close.emit();
  }

  saveLeave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.getRawValue());
  }

  resetForm(): void {
    this.form.reset();
  }

  private createForm(config: IAddLeaveTypeForm): FormGroup {
    const controls: Record<string, FormControl> = {};
    Object.values(config).forEach((field) => {
      const validators: ValidatorFn[] = [];
      if (field.isRequired) {
        validators.push(Validators.required);
      }
      if (field.minLength && field.minLength > 0) {
        validators.push(Validators.minLength(field.minLength));
      }
      if (field.maxLength && field.maxLength > 0) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      controls[field.id] = new FormControl(field.defaultValue ?? null, validators);
    });
    return new FormGroup(controls);
  }
}
