import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextBoxComponent, CalendarComponent } from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { jobDetailsForm } from '../../config/form-configs/job-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-job-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CalendarComponent],
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
  businessUnitOptions$!: Observable<DropdownOption[]>;
  employeeCategoryOptions$!: Observable<DropdownOption[]>;
  workScheduleOptions$!: Observable<DropdownOption[]>;
  dottedLineManagerOptions$!: Observable<DropdownOption[]>;
  costCenterOptions$!: Observable<DropdownOption[]>;
  hrOwnerOptions$!: Observable<DropdownOption[]>;
  employmentStatusOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.departmentOptions$ = this.dropdownService.getOptions('department');
    this.employeeTypeOptions$ = this.dropdownService.getOptions('employeeType');
    this.workLocationOptions$ = this.dropdownService.getOptions('workLocation');
    this.shiftTimingOptions$ = this.dropdownService.getOptions('shiftTiming');
    this.payLevelOptions$ = this.dropdownService.getOptions('payLevel');
    this.reportingManagerOptions$ = this.dropdownService.getOptions('reportingManager');
    this.businessUnitOptions$ = this.dropdownService.getOptions('businessUnit');
    this.employeeCategoryOptions$ = this.dropdownService.getOptions('employeeCategory');
    this.workScheduleOptions$ = this.dropdownService.getOptions('workSchedule');
    this.dottedLineManagerOptions$ = this.dropdownService.getOptions('dottedLineManager');
    this.costCenterOptions$ = this.dropdownService.getOptions('costCenter');
    this.hrOwnerOptions$ = this.dropdownService.getOptions('hrOwner');
    this.employmentStatusOptions$ = this.dropdownService.getOptions('employmentStatus');

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


