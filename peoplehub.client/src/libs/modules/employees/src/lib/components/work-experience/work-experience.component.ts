import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextBoxComponent, CalendarComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { workExperienceForm } from '../../config/form-configs/work-experience.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-work-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, CalendarComponent],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = workExperienceForm;
  workExperience!: FormGroup;

  ngOnInit(): void {
    this.workExperience = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('work-experience');
    if (savedData) {
      this.workExperience.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.workExperience.valid);

    this.workExperience.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}


