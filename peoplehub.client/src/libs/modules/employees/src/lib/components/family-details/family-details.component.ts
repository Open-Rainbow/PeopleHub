import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CalendarComponent,
  CheckboxComponent,
  DropdownComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
} from 'ui';
import { DropdownConfigService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import {
  familyMemberForm,
  dependentForm,
} from '../../config/form-configs/family-details.config';
import type {
  IFamilyMemberForm,
  IDependentForm,
} from '../../config/form-configs/family-details.model';

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
    TextButtonComponent,
    NumberBoxComponent
  ],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss'],
})
export class FamilyDetailsComponent implements OnInit {
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  private familyMemberSequence = 0;
  private dependentSequence = 0;

  readonly familyRepeatTimes = 3;
  readonly dependentRepeatTimes = 2;

  readonly familyMemberConfig = familyMemberForm;
  readonly dependentConfig = dependentForm;

  familyMember!: FormArray<FormGroup>;
  dependent!: FormArray<FormGroup>;

  readonly activeTab = signal<'family' | 'dependent'>('family');
  readonly isFamilyTab = computed(() => this.activeTab() === 'family');

  relationOptions$!: Observable<DropdownOption[]>;
  genderOptions$!: Observable<DropdownOption[]>;
  maritalStatusOptions$!: Observable<DropdownOption[]>;

  trackByIndex(index: number): number {
    return index;
  }

  getActiveFormGroup(): FormArray<FormGroup> {
    return this.isFamilyTab() ? this.familyMember : this.dependent;
  }

  getValidationConfig(): Record<
    string,
    { isHide: boolean; isRequired: boolean; label: string }
  > {
    const isFamily = this.isFamilyTab();
    const totalRows = isFamily
      ? this.familyMember.length
      : this.dependent.length;
    const labelPrefix = isFamily ? 'Family Member' : 'Dependent';

    return Array.from({ length: totalRows }).reduce<
      Record<string, { isHide: boolean; isRequired: boolean; label: string }>
    >((config, _, index) => {
      config[index] = {
        isHide: false,
        isRequired: true,
        label: `${labelPrefix} ${index + 1}`,
      };
      return config;
    }, {});
  }

  ngOnInit(): void {
    this.relationOptions$ = this.dropdownService.getOptions('relation');
    this.genderOptions$ = this.dropdownService.getOptions('gender');
    this.maritalStatusOptions$ =
      this.dropdownService.getOptions('maritalStatus');

    this.familyMember = this.buildRepeatableFormArray(
      this.familyMemberConfig,
      this.dataService.getDataByRoute('family-member'),
      this.familyRepeatTimes,
    );
    this.dependent = this.buildRepeatableFormArray(
      this.dependentConfig,
      this.dataService.getDataByRoute('dependent'),
      this.dependentRepeatTimes,
    );

    this.familyMember.statusChanges.subscribe((status) => {
      if (this.isFamilyTab()) {
        this.stepperService.setStepValidity(
          status === 'VALID' && this.dependent.valid,
        );
      }
    });

    this.dependent.statusChanges.subscribe((status) => {
      if (!this.isFamilyTab()) {
        this.stepperService.setStepValidity(
          status === 'VALID' && this.familyMember.valid,
        );
      }
    });

    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  switchTab(tab: 'family' | 'dependent'): void {
    this.persistActiveTabData();
    this.activeTab.set(tab);
    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  addFamilyMember(): void {
    if (!this.canAddFamilyMember()) {
      return;
    }

    this.familyMember.push(this.createRepeatableForm(this.familyMemberConfig));
    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  removeFamilyMember(index: number): void {
    if (
      this.familyMember.length <= 1 ||
      index < 0 ||
      index >= this.familyMember.length
    ) {
      return;
    }

    this.familyMember.removeAt(index);
    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  canAddFamilyMember(): boolean {
    return this.familyMember.length < Math.max(1, this.familyRepeatTimes);
  }

  addDependent(): void {
    if (!this.canAddDependent()) {
      return;
    }

    this.dependent.push(this.createRepeatableForm(this.dependentConfig));
    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  removeDependent(index: number): void {
    if (
      this.dependent.length <= 1 ||
      index < 0 ||
      index >= this.dependent.length
    ) {
      return;
    }

    this.dependent.removeAt(index);
    this.stepperService.setStepValidity(
      this.familyMember.valid && this.dependent.valid,
    );
  }

  canAddDependent(): boolean {
    return this.dependent.length < Math.max(1, this.dependentRepeatTimes);
  }

  private persistActiveTabData(): void {
    if (this.isFamilyTab()) {
      this.dataService.setDataByRoute('family-member', this.familyMember.value);
      return;
    }

    this.dataService.setDataByRoute('dependent', this.dependent.value);
  }

  private buildRepeatableFormArray(
    config: IFamilyMemberForm | IDependentForm,
    savedData: unknown,
    repeatTimes: number,
  ): FormArray<FormGroup> {
    const normalizedSavedData = this.normalizeSavedData(savedData);
    const initialCount = Math.min(
      Math.max(1, normalizedSavedData.length || 1),
      Math.max(1, repeatTimes),
    );

    const formArray = new FormArray<FormGroup>([]);

    for (let index = 0; index < initialCount; index++) {
      formArray.push(
        this.createRepeatableForm(config, normalizedSavedData[index]),
      );
    }

    if (config === this.familyMemberConfig) {
      this.familyMemberSequence = initialCount;
    } else {
      this.dependentSequence = initialCount;
    }

    return formArray;
  }

  private createRepeatableForm(
    config: IFamilyMemberForm | IDependentForm,
    savedValue?: Record<string, unknown>,
  ): FormGroup {
    const controls: Record<string, FormControl> = {};

    Object.values(
      config as unknown as Record<
        string,
        {
          id: string;
          defaultValue?: string | null;
          isRequired?: boolean;
          minLength: number;
          maxLength: number;
        }
      >,
    ).forEach((field) => {
      const validators = [];

      if (field.isRequired) {
        validators.push(Validators.required);
      }

      if (field.minLength && field.minLength > 0) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength && field.maxLength > 0) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      controls[field.id] = new FormControl(
        field.defaultValue ?? null,
        validators,
      );
    });

    const formGroup = new FormGroup(controls);

    if (savedValue) {
      formGroup.patchValue(savedValue);
    }

    return formGroup;
  }

  private normalizeSavedData(savedData: unknown): Record<string, unknown>[] {
    if (!savedData) {
      return [];
    }

    if (Array.isArray(savedData)) {
      return savedData.filter((item) => !!item) as Record<string, unknown>[];
    }

    if (typeof savedData === 'object') {
      return [savedData as Record<string, unknown>];
    }

    return [];
  }
}
