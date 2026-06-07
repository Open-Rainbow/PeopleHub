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
import { identityStatutoryForm } from '../../config/form-configs/identity-statutory.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-identity-statutory',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
  ],
  templateUrl: './identity-statutory.component.html',
  styleUrls: ['./identity-statutory.component.scss'],
})
export class IdentityStatutoryComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = identityStatutoryForm;
  identityStatutory!: FormGroup;

  documentTypeOptions$!: Observable<DropdownOption[]>;
  verificationStatusOptions$!: Observable<DropdownOption[]>;
  countryOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.documentTypeOptions$ = this.dropdownService.getOptions('documentType');
    this.verificationStatusOptions$ = this.dropdownService.getOptions('verificationStatus');
    this.countryOptions$ = this.dropdownService.getOptions('country');

    this.identityStatutory = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('identity-statutory');
    if (savedData) {
      this.identityStatutory.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.identityStatutory.valid);

    this.identityStatutory.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
