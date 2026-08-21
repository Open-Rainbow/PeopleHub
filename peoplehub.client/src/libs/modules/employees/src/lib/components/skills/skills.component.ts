import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CheckboxComponent,
  DropdownComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
} from 'ui';
import {
  CommonService,
  DropdownConfigService,
  DropdownOption,
} from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { skillsForm } from '../../config/form-configs/skills.config';

@Component({
  selector: 'employees-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    NumberBoxComponent,
    CheckboxComponent,
    TextButtonComponent,
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
  linkedCertificationOptions$!: Observable<DropdownOption[]>;
  readonly maxSkills = 5;

  ngOnInit(): void {
    this.skillCategoryOptions$ =this.dropdownService.getOptions('skillCategory');
    this.proficiencyOptions$ =this.dropdownService.getOptions('proficiency');

    this.linkedCertificationOptions$ =this.dropdownService.getOptions('linkedCertification');
    this.skills = new FormGroup({skills: new FormArray<FormGroup>([]),});
    const savedData =this.dataService.getDataByRoute('skills');
  
    if (savedData) {
      this.loadSavedData(savedData);
    } else {
     this.skillRecords.push(this.createSkillForm());
    }

    this.stepperService.setStepValidity(this.skills.valid);

    this.skills.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
  get skillRecords(): FormArray<FormGroup> {
    return this.skills.get('skills') as FormArray<FormGroup>;
  }

  get skillForms(): FormGroup[] {
    return this.skillRecords.controls;
  }


  private createSkillForm(): FormGroup {
    const skillForm = this.commonService.createForm(this.formConfig);
    return skillForm;
  }



  canAddSkill(): boolean {
    return this.skillRecords.length < this.maxSkills;
  }

  addSkill(): void {
  if (!this.canAddSkill()) {
    return;
  }

  const newSkill = this.createSkillForm();
  const firstSkill = this.skillRecords.at(0);
  this.skillRecords.push(newSkill);
}


  removeSkill(index: number): void {
    if (this.skillRecords.length <= 1) {
      return;
    }

    this.skillRecords.removeAt(index);
  }


  private loadSavedData(savedData: unknown): void {
    const data = savedData as Record<string, unknown>;
    const savedSkills = data['skills'];


    if (Array.isArray(savedSkills)) {

      this.skillRecords.clear();

      savedSkills.forEach((skill: unknown) => {
        const skillForm = this.createSkillForm();
        skillForm.patchValue(skill as Record<string, unknown>);

        this.skillRecords.push(skillForm);
      });

      if (this.skillRecords.length === 0) {
        this.skillRecords.push(this.createSkillForm());
      }
    } else {
      if (this.skillRecords.length === 0) {
        this.skillRecords.push(this.createSkillForm());
      }
    }
  }
}