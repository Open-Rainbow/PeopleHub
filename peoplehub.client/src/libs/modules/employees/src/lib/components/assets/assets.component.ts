import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
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
import {
  DropdownConfigService,
  CommonService,
  DropdownOption,
} from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import {
  assetsForm, systemAccessForm,
} from '../../config/form-configs/assets.config';
import { TabButtonComponent } from '../../../../../../shared/ui/src/lib/components/primitives/tab-button/tab-button';

@Component({
  selector: 'employees-assets',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    TextAreaComponent,
    DropdownComponent,
    CalendarComponent,
    CheckboxComponent,
    NumberBoxComponent,
    TextButtonComponent,
    TabButtonComponent
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
  readonly systemAccessConfig = systemAccessForm;
  assets!: FormGroup;
  systemAccessForm!: FormGroup;
  readonly maxSystemAccess = 3;
  readonly maxAssets = 3;
  readonly activeTab = signal<'systemAccess' | 'assetsCompliance'>('systemAccess');
  roleOptions$!: Observable<DropdownOption[]>;
  accountStatusOptions$!: Observable<DropdownOption[]>;
  assetTypeOptions$!: Observable<DropdownOption[]>;
  assetCategoryOptions$!: Observable<DropdownOption[]>;
  ownershipTypeOptions$!: Observable<DropdownOption[]>;
  conditionOptions$!: Observable<DropdownOption[]>;
  recoveryStatusOptions$!: Observable<DropdownOption[]>;
  assetClosureStatusOptions$!: Observable<DropdownOption[]>;
  complianceStatusOptions$!: Observable<DropdownOption[]>;


  readonly tabs = [
  {
    id: 'systemAccess',
    label: 'System Access'
  },
  {
    id: 'assetsCompliance',
    label: 'Assets and Compliance'
  }
];

  ngOnInit(): void {
    this.roleOptions$ = this.dropdownService.getOptions('role');
    this.accountStatusOptions$ = this.dropdownService.getOptions('accountStatus');
    this.assetTypeOptions$ = this.dropdownService.getOptions('assetType');
    this.assetCategoryOptions$ = this.dropdownService.getOptions('assetCategory');
    this.ownershipTypeOptions$ = this.dropdownService.getOptions('ownershipType');
    this.conditionOptions$ = this.dropdownService.getOptions('assetCondition');
    this.recoveryStatusOptions$ = this.dropdownService.getOptions('recoveryStatus');
    this.assetClosureStatusOptions$ = this.dropdownService.getOptions('assetClosureStatus');
    this.complianceStatusOptions$ = this.dropdownService.getOptions('complianceStatus');

    this.systemAccessForm = new FormGroup({systemAccess:new FormArray<FormGroup>([]),});
    this.assets = new FormGroup({assets:new FormArray<FormGroup>([]),});

    const savedData = this.dataService.getDataByRoute('assets');
    if (savedData) {
      this.loadSavedData(savedData);
    } else {
      this.systemAccessRecords.push(this.createSystemAccessForm());

      this.assetRecords.push(this.createAssetForm());
    }
    this.updateStepValidity();
    this.systemAccessForm.statusChanges.subscribe(() => {this.updateStepValidity();});
    this.assets.statusChanges.subscribe(() => {this.updateStepValidity();});
  }
  get systemAccessRecords(): FormArray<FormGroup> {
    return this.systemAccessForm.get('systemAccess') as FormArray<FormGroup>;
  }
  get assetRecords(): FormArray<FormGroup> {
    return this.assets.get('assets') as FormArray<FormGroup>;
  }
  private createSystemAccessForm(): FormGroup {
    return this.commonService.createForm(this.systemAccessConfig);
  }
  private createAssetForm(): FormGroup {
    return this.commonService.createForm(this.formConfig);
  }

  canAddSystemAccess(): boolean {
    return (this.systemAccessRecords.length < this.maxSystemAccess);
  }
  addSystemAccess(): void {
    if (!this.canAddSystemAccess()) {
      return;
    }
    this.systemAccessRecords.push(this.createSystemAccessForm());
  }
  removeSystemAccess(index: number): void {
    if (this.systemAccessRecords.length <= 1) {
      return;
    }
    this.systemAccessRecords.removeAt(index);
  }

  canAddAsset(): boolean {
    return (this.assetRecords.length < this.maxAssets);
  }

  addAsset(): void {
    if (!this.canAddAsset()) {
      return;
    }
    this.assetRecords.push(this.createAssetForm());
  }


  removeAsset(index: number): void {
    if (this.assetRecords.length <= 1) {
      return;
    }

    this.assetRecords.removeAt(index);
  }


  private loadSavedData(savedData: unknown): void {
    const data = savedData as Record<string, unknown>;

    const savedSystemAccess = data['systemAccess'];
    if (Array.isArray(savedSystemAccess)) {
      this.systemAccessRecords.clear();
      savedSystemAccess
        .slice(0, this.maxSystemAccess)
        .forEach((access: unknown) => {

          const accessForm = this.createSystemAccessForm();
          accessForm.patchValue(access as Record<string, unknown>);
          this.systemAccessRecords.push(accessForm);
        });
    }
    if (this.systemAccessRecords.length === 0) {
      this.systemAccessRecords.push(this.createSystemAccessForm());
    }

    const savedAssets = data['assets'];
    if (Array.isArray(savedAssets)) {
      this.assetRecords.clear();
      savedAssets
        .slice(0, this.maxAssets)
        .forEach((asset: unknown) => {
          const assetForm = this.createAssetForm();
          assetForm.patchValue(asset as Record<string, unknown>);
          this.assetRecords.push(assetForm);
        });
    }

    if (this.assetRecords.length === 0) {
      this.assetRecords.push(this.createAssetForm());
    }
  }

  private updateStepValidity(): void {
    const systemAccessValid = this.systemAccessForm?.valid ?? false;
    const assetsValid = this.assets?.valid ?? false;
    this.stepperService.setStepValidity(systemAccessValid && assetsValid);
  }

 switchTab(tab: string): void {
  if (tab === 'systemAccess' || tab === 'assetsCompliance') {
    this.activeTab.set(tab);
  }
}
}