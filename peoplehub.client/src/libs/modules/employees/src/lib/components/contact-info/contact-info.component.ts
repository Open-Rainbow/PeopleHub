import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, DropdownComponent, TextBoxComponent, TextButtonComponent } from 'ui';
import { DropdownConfigService, CommonService, DropdownOption } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { contactInfoForm } from '../../config/form-configs/contact-info.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, DropdownComponent, CheckboxComponent,TextButtonComponent],
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
  countryOptions$!: Observable<DropdownOption[]>;
  addressTypeOptions$!: Observable<DropdownOption[]>;

  ngOnInit(): void {
    this.relationOptions$ = this.dropdownService.getOptions('relation');
    this.countryOptions$ = this.dropdownService.getOptions('country');
    this.addressTypeOptions$ = this.dropdownService.getOptions('addressType');

    this.contactInfo = this.commonService.createForm(this.formConfig);

    this.contactInfo.addControl(
    'addresses',
    new FormArray([
      this.commonService.createForm(this.formConfig)
    ])
  );

  this.contactInfo.addControl(
    'emergencyContacts',
    new FormArray([
      this.commonService.createForm(this.formConfig)
    ])
  );
    const savedData = this.dataService.getDataByRoute('contact-info');
    if (savedData) {
      this.contactInfo.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.contactInfo.valid);

    this.contactInfo.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
  get addresses(): FormArray {
  return this.contactInfo.get('addresses') as FormArray;
}
get addressForms(): FormGroup[] {
  return this.addresses.controls as FormGroup[];
}

get emergencyContacts(): FormArray {
  return this.contactInfo.get('emergencyContacts') as FormArray;
}
get emergencyForms(): FormGroup[] {
  return this.emergencyContacts.controls as FormGroup[];
}

readonly maxAddresses = 3;
canAddAddress(): boolean {
  return this.addresses.length < this.maxAddresses;
}

readonly maxEmergencyContacts = 3;
canAddEmergencyContact(): boolean {
  return this.emergencyContacts.length < this.maxEmergencyContacts;
}
addAddress(): void {
  if (!this.canAddAddress()) {
    return;
  }
  this.addresses.push(
    this.commonService.createForm(this.formConfig)
  );
}

removeAddress(index: number): void {
  this.addresses.removeAt(index);
}

addEmergencyContact(): void {
   if (!this.canAddEmergencyContact()) {
    return;
  }
  this.emergencyContacts.push(
    this.commonService.createForm(this.formConfig)
  );
}

removeEmergencyContact(index: number): void {
  this.emergencyContacts.removeAt(index);
}

  switchTab(tab: 'Contact' | 'Emergency'): void {
  this.activeTab.set(tab);
}

  readonly activeTab = signal<'Contact' | 'Emergency'>('Contact');
  readonly isContactTab = computed(() => this.activeTab() === 'Contact');
  readonly isEmergencyTab = computed(() => this.activeTab() === 'Emergency');  
}



