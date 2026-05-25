import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent, FileUploadComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { insuranceDetailsForm } from '../../config/form-configs/insurance-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-insurance-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, FileUploadComponent, CalendarComponent],
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss'],
})
export class InsuranceDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = insuranceDetailsForm;
  insuranceDetails!: FormGroup;

  ngOnInit(): void {
    this.insuranceDetails = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('insurance-details');
    if (savedData) {
      this.insuranceDetails.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.insuranceDetails.valid);

    this.insuranceDetails.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}


