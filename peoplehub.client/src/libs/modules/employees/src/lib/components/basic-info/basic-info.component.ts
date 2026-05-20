import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CalendarComponent, DropdownComponent, TextBoxComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';
import { basicInfoForm } from '../../config/form-configs/basic-info.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-basic-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, CalendarComponent, DropdownComponent],
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = basicInfoForm;
  basicInfo!: FormGroup;

  genderOptions$!: Observable<DropdownOption[]>;
  maritalStatusOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.genderOptions$ = this.dropdownService.getOptions('gender');
    this.maritalStatusOptions$ = this.dropdownService.getOptions('maritalStatus');

    this.basicInfo = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('basic-info');
    if (savedData) {
      this.basicInfo.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.basicInfo.valid);

    this.basicInfo.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
