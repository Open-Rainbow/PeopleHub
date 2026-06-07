import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
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
import { insurancePolicyForm, nomineeForm } from '../../config/form-configs/insurance-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-insurance-details',
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
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss'],
})
export class InsuranceDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly insurancePolicyConfig = insurancePolicyForm;
  readonly nomineeConfig = nomineeForm;

  insurance!: FormGroup;
  nominee!: FormGroup;

  readonly activeTab = signal<'insurance' | 'nominee'>('insurance');
  readonly isInsuranceTab = computed(() => this.activeTab() === 'insurance');

  benefitTypeOptions$!: Observable<DropdownOption[]>;
  premiumSharingOptions$!: Observable<DropdownOption[]>;
  policyStatusOptions$!: Observable<DropdownOption[]>;
  relationOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.benefitTypeOptions$ = this.dropdownService.getOptions('benefitType');
    this.premiumSharingOptions$ = this.dropdownService.getOptions('premiumSharing');
    this.policyStatusOptions$ = this.dropdownService.getOptions('policyStatus');
    this.relationOptions$ = this.dropdownService.getOptions('relation');

    this.insurance = this.commonService.createForm(this.insurancePolicyConfig);
    this.nominee = this.commonService.createForm(this.nomineeConfig);

    const savedInsurance = this.dataService.getDataByRoute('insurance-policy');
    if (savedInsurance) {
      this.insurance.patchValue(savedInsurance as Record<string, unknown>);
    }

    const savedNominee = this.dataService.getDataByRoute('insurance-nominee');
    if (savedNominee) {
      this.nominee.patchValue(savedNominee as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(true);
  }

  switchTab(tab: 'insurance' | 'nominee'): void {
    if (tab === 'insurance') {
      this.dataService.setDataByRoute('insurance-nominee', this.nominee.value);
    } else {
      this.dataService.setDataByRoute('insurance-policy', this.insurance.value);
    }
    this.activeTab.set(tab);
  }
}



