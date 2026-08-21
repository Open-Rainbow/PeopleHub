import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CalendarComponent, DropdownComponent, TextBoxComponent, TextButtonComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { educationDetailsForm } from '../../config/form-configs/education-details.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-education-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent,CalendarComponent,TextBoxComponent,TextButtonComponent],
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss'],
})
export class EducationDetailsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = educationDetailsForm;
  educationDetails!: FormGroup;

  yearOfPassingOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.yearOfPassingOptions$ = this.dropdownService.getOptions('yearOfPassing');

    this.educationDetails = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('education-details');
    if (savedData) {
      this.educationDetails.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.educationDetails.valid);

    this.educationDetails.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
    this.educationDetails.addControl('educations', new FormArray([this.createEducationForm()]));
    this.educationDetails.addControl('certifications', new FormArray([this.createCertificationForm()]));
  }
  readonly activeTab = signal<'education' | 'certification'>('education');
readonly isEducationTab = computed(() => this.activeTab() === 'education');
  readonly isCertificationTab = computed(() => this.activeTab() === 'certification');
switchTab(tab: 'education' | 'certification'): void {
  this.activeTab.set(tab);
}

  readonly maxEducations = 5;
  readonly maxCertifications = 5;


  get educations(): FormArray {
    return this.educationDetails.get('educations') as FormArray;
  }

  get educationForms(): FormGroup[] {
    return this.educations.controls as FormGroup[];
  } 

  private createEducationForm(): FormGroup {
    return this.commonService.createForm(this.formConfig);
  }

  canAddEducation(): boolean {
    return this.educations.length < this.maxEducations;
  }

  addEducation(): void {
    if (!this.canAddEducation()) {
      return;
    }

    this.educations.push(this.createEducationForm());
  }

  removeEducation(index: number): void {
    if (this.educations.length <= 1) {
      return;
    }

    this.educations.removeAt(index);
  }

  get certifications(): FormArray {
    return this.educationDetails.get('certifications') as FormArray;
  }

  get certificationForms(): FormGroup[] {
    return this.certifications.controls as FormGroup[];
  }

  private createCertificationForm(): FormGroup {
    return this.commonService.createForm(this.formConfig);
  }

  canAddCertification(): boolean {
    return this.certifications.length < this.maxCertifications;
  }

  addCertification(): void {
    if (!this.canAddCertification()) {
      return;
    }

    this.certifications.push(this.createCertificationForm());
  }

  removeCertification(index: number): void {
    if (this.certifications.length <= 1) {
      return;
    }

    this.certifications.removeAt(index);
  }

  private loadSavedData(savedData: unknown): void {
    const data = savedData as Record<string, unknown>;
    const savedEducations = data['educations'];
    if (Array.isArray(savedEducations)) {
      this.educations.clear();
      savedEducations.forEach(
        (education: unknown) => {

          const educationForm = this.createEducationForm();
          educationForm.patchValue(education as Record<string, unknown>);
          this.educations.push(educationForm);
        }
      );

if (this.educations.length === 0) {
        this.educations.push(this.createEducationForm());
      }
    }

    const savedCertifications = data['certifications'];
    if (Array.isArray(savedCertifications)) {
      this.certifications.clear();
      savedCertifications.forEach(
        (certification: unknown) => {

          const certificationForm = this.createCertificationForm();
          certificationForm.patchValue(certification as Record<string, unknown>);
          this.certifications.push(certificationForm);
        }
      );

      if (this.certifications.length === 0) {
        this.certifications.push(this.createCertificationForm());
      }
    }
  }
}


