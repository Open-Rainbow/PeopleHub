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
  CheckboxComponent,
  DropdownComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
} from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { skillsForm } from '../../config/form-configs/skills.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    NumberBoxComponent,
    CheckboxComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = skillsForm;
  skills!: FormGroup;

  skillCategoryOptions$!: Observable<DropdownOption[]>;
  proficiencyOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.skillCategoryOptions$ = this.dropdownService.getOptions('skillCategory');
    this.proficiencyOptions$ = this.dropdownService.getOptions('proficiency');

    this.skills = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('skills');
    if (savedData) {
      this.skills.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.skills.valid);

    this.skills.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
