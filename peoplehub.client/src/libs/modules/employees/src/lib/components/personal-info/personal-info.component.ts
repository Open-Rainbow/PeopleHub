import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CalendarComponent,
  DropdownComponent,
  TextBoxComponent,
  NumberBoxComponent,
  FileUploadComponent,
} from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { personalInfoForm } from '../../config/form-configs/personal-info.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    CalendarComponent,
    DropdownComponent,
    FileUploadComponent,
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = personalInfoForm;
  personalInfo!: FormGroup;

  titleOptions$!: Observable<DropdownOption[]>;
  genderOptions$!: Observable<DropdownOption[]>;
  maritalStatusOptions$!: Observable<DropdownOption[]>;
  bloodGroupOptions$!: Observable<DropdownOption[]>;
  nationalityOptions$!: Observable<DropdownOption[]>;
  categoryOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.titleOptions$ = this.dropdownService.getOptions('salutation');
    this.genderOptions$ = this.dropdownService.getOptions('gender');
    this.maritalStatusOptions$ =
      this.dropdownService.getOptions('maritalStatus');
    this.bloodGroupOptions$ = this.dropdownService.getOptions('bloodGroup');
    this.nationalityOptions$ = this.dropdownService.getOptions('nationality');
    this.categoryOptions$ = this.dropdownService.getOptions('category');

    this.personalInfo = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('personal-info');
    if (savedData) {
      this.personalInfo.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.personalInfo.valid);

    this.personalInfo.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
