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
  TextAreaComponent,
  TextBoxComponent,
} from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { familyMemberForm, dependentForm } from '../../config/form-configs/family-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-family-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
    CheckboxComponent,
  ],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss'],
})
export class FamilyDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly familyMemberConfig = familyMemberForm;
  readonly dependentConfig = dependentForm;

  familyMember!: FormGroup;
  dependent!: FormGroup;

  readonly activeTab = signal<'family' | 'dependent'>('family');
  readonly isFamilyTab = computed(() => this.activeTab() === 'family');

  relationOptions$!: Observable<DropdownOption[]>;
  genderOptions$!: Observable<DropdownOption[]>;
  maritalStatusOptions$!: Observable<DropdownOption[]>;

  get formConfig(): FormGroup {
    return this.isFamilyTab() ? this.familyMember : this.dependent;
  }

  ngOnInit(): void {
    this.relationOptions$ = this.dropdownService.getOptions('relation');
    this.genderOptions$ = this.dropdownService.getOptions('gender');
    this.maritalStatusOptions$ = this.dropdownService.getOptions('maritalStatus');

    this.familyMember = this.commonService.createForm(this.familyMemberConfig);
    this.dependent = this.commonService.createForm(this.dependentConfig);

    const savedFamily = this.dataService.getDataByRoute('family-member');
    if (savedFamily) {
      this.familyMember.patchValue(savedFamily as Record<string, unknown>);
    }

    const savedDependent = this.dataService.getDataByRoute('dependent');
    if (savedDependent) {
      this.dependent.patchValue(savedDependent as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(true);
  }

  switchTab(tab: 'family' | 'dependent'): void {
    if (tab === 'family') {
      this.dataService.setDataByRoute('family-member', this.familyMember.value);
    } else {
      this.dataService.setDataByRoute('dependent', this.dependent.value);
    }
    this.activeTab.set(tab);
  }
}
