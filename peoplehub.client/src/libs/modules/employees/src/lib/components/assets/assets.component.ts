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
  CheckboxComponent,
  DropdownComponent,
  NumberBoxComponent,
  TextAreaComponent,
  TextBoxComponent,
} from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { assetsForm } from '../../config/form-configs/assets.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-assets',
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
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly dropdownService = inject(DropdownConfigService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = assetsForm;
  assets!: FormGroup;

  assetTypeOptions$!: Observable<DropdownOption[]>;
  assetCategoryOptions$!: Observable<DropdownOption[]>;
  ownershipTypeOptions$!: Observable<DropdownOption[]>;
  conditionOptions$!: Observable<DropdownOption[]>;
  recoveryStatusOptions$!: Observable<DropdownOption[]>;
  assetClosureStatusOptions$!: Observable<DropdownOption[]>;
  complianceStatusOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.assetTypeOptions$ = this.dropdownService.getOptions('assetType');
    this.assetCategoryOptions$ = this.dropdownService.getOptions('assetCategory');
    this.ownershipTypeOptions$ = this.dropdownService.getOptions('ownershipType');
    this.conditionOptions$ = this.dropdownService.getOptions('assetCondition');
    this.recoveryStatusOptions$ = this.dropdownService.getOptions('recoveryStatus');
    this.assetClosureStatusOptions$ = this.dropdownService.getOptions('assetClosureStatus');
    this.complianceStatusOptions$ = this.dropdownService.getOptions('complianceStatus');

    this.assets = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('assets');
    if (savedData) {
      this.assets.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.assets.valid);

    this.assets.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
