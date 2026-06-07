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
  TextAreaComponent,
  TextBoxComponent,
} from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { salaryStructureForm } from '../../config/form-configs/salary-structure.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-salary-structure',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
  ],
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.scss'],
})
export class SalaryStructureComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = salaryStructureForm;
  salaryStructure!: FormGroup;

  payrollGroupOptions$!: Observable<DropdownOption[]>;
  salaryStructureOptions$!: Observable<DropdownOption[]>;
  accountTypeOptions$!: Observable<DropdownOption[]>;
  paymentModeOptions$!: Observable<DropdownOption[]>;
  taxRegimeOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.payrollGroupOptions$ = this.dropdownService.getOptions('payrollGroup');
    this.salaryStructureOptions$ = this.dropdownService.getOptions('salaryStructure');
    this.accountTypeOptions$ = this.dropdownService.getOptions('accountType');
    this.paymentModeOptions$ = this.dropdownService.getOptions('paymentMode');
    this.taxRegimeOptions$ = this.dropdownService.getOptions('taxRegime');

    this.salaryStructure = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('salary-structure');
    if (savedData) {
      this.salaryStructure.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.salaryStructure.valid);

    this.salaryStructure.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
