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
  CheckboxComponent,
  DropdownComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
} from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { separationForm } from '../../config/form-configs/separation.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-separation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
    CheckboxComponent,
    NumberBoxComponent,
  ],
  templateUrl: './separation.component.html',
  styleUrls: ['./separation.component.scss'],
})
export class SeparationComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = separationForm;
  separation!: FormGroup;

  separationTypeOptions$!: Observable<DropdownOption[]>;
  separationStatusOptions$!: Observable<DropdownOption[]>;
  attritionCategoryOptions$!: Observable<DropdownOption[]>;
  clearanceStatusOptions$!: Observable<DropdownOption[]>;
  interviewStatusOptions$!: Observable<DropdownOption[]>;
  settlementStatusOptions$!: Observable<DropdownOption[]>;
  revokeStatusOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.separationTypeOptions$ = this.dropdownService.getOptions('separationType');
    this.separationStatusOptions$ = this.dropdownService.getOptions('separationStatus');
    this.attritionCategoryOptions$ = this.dropdownService.getOptions('attritionCategory');
    this.clearanceStatusOptions$ = this.dropdownService.getOptions('clearanceStatus');
    this.interviewStatusOptions$ = this.dropdownService.getOptions('interviewStatus');
    this.settlementStatusOptions$ = this.dropdownService.getOptions('settlementStatus');
    this.revokeStatusOptions$ = this.dropdownService.getOptions('revokeStatus');

    this.separation = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('separation');
    if (savedData) {
      this.separation.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.separation.valid);

    this.separation.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
