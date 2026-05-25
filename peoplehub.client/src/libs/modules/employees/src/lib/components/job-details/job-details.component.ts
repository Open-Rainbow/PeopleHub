import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextBoxComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { jobDetailsForm } from '../../config/form-configs/job-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-job-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = jobDetailsForm;
  jobDetails!: FormGroup;

  departmentOptions$!: Observable<DropdownOption[]>;
  employeeTypeOptions$!: Observable<DropdownOption[]>;
  workLocationOptions$!: Observable<DropdownOption[]>;
  shiftTimingOptions$!: Observable<DropdownOption[]>;
  payLevelOptions$!: Observable<DropdownOption[]>;
  reportingManagerOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.departmentOptions$ = this.dropdownService.getOptions('department');
    this.employeeTypeOptions$ = this.dropdownService.getOptions('employeeType');
    this.workLocationOptions$ = this.dropdownService.getOptions('workLocation');
    this.shiftTimingOptions$ = this.dropdownService.getOptions('shiftTiming');
    this.payLevelOptions$ = this.dropdownService.getOptions('payLevel');
    this.reportingManagerOptions$ = this.dropdownService.getOptions('reportingManager');

    this.jobDetails = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('job-details');
    if (savedData) {
      this.jobDetails.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.jobDetails.valid);

    this.jobDetails.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}


