import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'ui-label-value',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './label-value.component.html',
    styleUrls: ['./label-value.component.scss']
})
export class LabelValueComponent {
  @Input() label?: string = 'Employee ID';
  @Input() value!: string;  // Already bound data
  @Input() isRequired: boolean = false;
  @Input() isEditMode: boolean = false;

   @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  


  // ADD these 2 getters
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  
  // Local editable copy
  editableValue: string = '';

  ngOnChanges() {
    // Initialize editable value when entering edit mode or data changes
    if (this.isEditMode) {
      this.editableValue = this.value || '';
    }
  }

  onValueChange(value: string) {
    this.editableValue = value;
    // Emit change if needed, or update parent via @ViewChild/service
  }
}
