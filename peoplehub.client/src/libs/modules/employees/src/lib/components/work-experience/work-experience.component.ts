import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  TextBoxComponent,
  CalendarComponent,
  DropdownComponent,
  TextAreaComponent,
  NumberBoxComponent,
  TextButtonComponent,
} from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { workExperienceForm } from '../../config/form-configs/work-experience.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-work-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    CalendarComponent,
    DropdownComponent,
    TextAreaComponent,
    NumberBoxComponent,
    TextButtonComponent,
  ],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = workExperienceForm;
  readonly workExperienceRepeatTimes = 3;
  workExperience!: FormArray<FormGroup>;

  ngOnInit(): void {
    const savedData = this.dataService.getDataByRoute('work-experience');
    this.workExperience = this.buildRepeatableFormArray(this.formConfig,savedData,this.workExperienceRepeatTimes);
    this.updateStepValidity();
    this.workExperience.statusChanges.subscribe(() => {this.updateStepValidity();});
  }
  trackByIndex(index: number): number {
    return index;
  }

  addWorkExperience(): void {
    if (!this.canAddWorkExperience()) {
      return;
    }

    this.workExperience.push(this.createRepeatableForm(this.formConfig));
    this.updateStepValidity();
  }

  removeWorkExperience(index: number): void {
    if (this.workExperience.length <= 1 || index < 0 || index >= this.workExperience.length) {
      return;
    }

    this.workExperience.removeAt(index);
    this.updateStepValidity();
  }

  canAddWorkExperience(): boolean {
    return ( this.workExperience.length < Math.max(1, this.workExperienceRepeatTimes) );
  }

  private updateStepValidity(): void {
    this.stepperService.setStepValidity(this.workExperience.valid);
  }

  private buildRepeatableFormArray(config: typeof workExperienceForm,savedData: unknown,repeatTimes: number): FormArray<FormGroup> {
    const normalizedSavedData =this.normalizeSavedData(savedData);
    const initialCount = Math.min(Math.max(1, normalizedSavedData.length || 1),Math.max(1, repeatTimes));
    const formArray = new FormArray<FormGroup>([]);
    for (let index = 0; index < initialCount; index++) {
      formArray.push(this.createRepeatableForm(config,normalizedSavedData[index]));
    }
    return formArray;
  }


  private createRepeatableForm(config: typeof workExperienceForm,savedValue?: Record<string, unknown>): FormGroup {
    const controls: Record<string, FormControl> = {};
    Object.values(
      config as unknown as Record<
        string,
        {
          id: string;
          defaultValue?: string | null;
          isRequired?: boolean;
          minLength?: number;
          maxLength?: number;
        }
      >
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

      controls[field.id] = new FormControl(field.defaultValue ?? null, validators);
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
      return savedData.filter(
        (item) => !!item
      ) as Record<string, unknown>[];
    }

    if (typeof savedData === 'object') {
      return [savedData as Record<string, unknown>,];
    }

    return [];
  }
}