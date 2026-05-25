import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DropdownComponent, TextAreaComponent, TextBoxComponent, ToggleComponent } from 'ui';
import { DropdownConfigService, CommonService } from 'common';
import { DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { contactInfoForm } from '../../config/form-configs/contact-info.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent, DropdownComponent, ToggleComponent],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = contactInfoForm;
  contactInfo!: FormGroup;

  relationOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.relationOptions$ = this.dropdownService.getOptions('relation');

    this.contactInfo = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('contact-info');
    if (savedData) {
      this.contactInfo.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.contactInfo.valid);

    this.contactInfo.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}


