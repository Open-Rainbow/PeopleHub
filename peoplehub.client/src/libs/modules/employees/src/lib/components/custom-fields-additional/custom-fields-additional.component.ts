import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { customFieldsAdditionalForm } from '../../config/form-configs/custom-fields-additional.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-custom-fields-additional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent],
  templateUrl: './custom-fields-additional.component.html',
  styleUrls: ['./custom-fields-additional.component.scss'],
})
export class CustomFieldsAdditionalComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = customFieldsAdditionalForm;
  customFieldsAdditional!: FormGroup;

  ngOnInit(): void {
    this.customFieldsAdditional = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('custom-fields-additional');
    if (savedData) {
      this.customFieldsAdditional.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.customFieldsAdditional.valid);

    this.customFieldsAdditional.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
