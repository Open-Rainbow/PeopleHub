import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextAreaComponent, TextBoxComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';
import { educationDetailsForm } from '../../config/form-configs/education-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-education-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent, DropdownComponent],
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss'],
})
export class EducationDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = educationDetailsForm;
  educationDetails!: FormGroup;

  yearOfPassingOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.yearOfPassingOptions$ = this.dropdownService.getOptions('yearOfPassing');

    this.educationDetails = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('education-details');
    if (savedData) {
      this.educationDetails.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.educationDetails.valid);

    this.educationDetails.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
