import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
  DropdownComponent,
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
    CalendarComponent,TextButtonComponent
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
  readonly maxIdentityDocuments = 3;
  readonly maxDocumentRepository = 3;


  ngOnInit(): void {
    this.documentTypeOptions$ = this.dropdownService.getOptions('documentType');
    this.verificationStatusOptions$ = this.dropdownService.getOptions('verificationStatus');
    this.countryOptions$ = this.dropdownService.getOptions('country');

    this.identityStatutory = this.commonService.createForm(this.formConfig);

    this.identityStatutory.setControl('identityDocuments', new FormArray<FormGroup>([]));
    this.identityStatutory.setControl('documentRepository', new FormArray<FormGroup>([]));

    const savedData = this.dataService.getDataByRoute('identity-statutory');
    if (savedData) {
      this.loadSavedData(savedData);
    } else {
      this.identityDocuments.push(this.createIdentityDocument());
      this.documentRepository.push(this.createDocumentRepository());
    }

    this.stepperService.setStepValidity(this.identityStatutory.valid);
    this.identityStatutory.statusChanges.subscribe((status) => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
  
  get identityDocuments(): FormArray<FormGroup> {
    return this.identityStatutory.get('identityDocuments') as FormArray<FormGroup>;
  }

  get identityDocumentForms(): FormGroup[] {
    return this.identityDocuments.controls;
  }

  private createIdentityDocument(): FormGroup {
    return this.commonService.createForm({
      documentType: this.formConfig.documentType,
      documentNumber: this.formConfig.documentNumber,
      nameOnDocument: this.formConfig.nameOnDocument,
      issuingAuthority:this.formConfig.issuingAuthority,
      issueDate:this.formConfig.issueDate,
      validFrom:this.formConfig.validFrom,
      validTo:this.formConfig.validTo,
      countryOfIssue:this.formConfig.countryOfIssue,
      placeOfIssue:this.formConfig.placeOfIssue,
      verificationStatus:this.formConfig.verificationStatus,
      verifiedBy:this.formConfig.verifiedBy,
      frontAttachLink:this.formConfig.frontAttachLink,
      backAttachLink:this.formConfig.backAttachLink,
      identificationDocumentRemarks:this.formConfig.identificationDocumentRemarks,
    });
  }

  canAddIdentityDocument(): boolean {
    return (this.identityDocuments.length < this.maxIdentityDocuments);
  }

  addIdentityDocument(): void {
    if (!this.canAddIdentityDocument()) {
      return;
    }

    this.identityDocuments.push(this.createIdentityDocument());
  }

  removeIdentityDocument(index: number): void {
    if (this.identityDocuments.length <= 1) {
      return;
    }

    this.identityDocuments.removeAt(index);
  }

  get documentRepository(): FormArray<FormGroup> {
    return this.identityStatutory.get('documentRepository') as FormArray<FormGroup>;
  }

  get documentRepositoryForms(): FormGroup[] {
    return this.documentRepository.controls;
  }

  private createDocumentRepository(): FormGroup {
    return this.commonService.createForm({
      genericDocumentCategory:this.formConfig.genericDocumentCategory,
      genericDocumentName:this.formConfig.genericDocumentName,
      genericRelatedSection:this.formConfig.genericRelatedSection,
      genericRelatedRecordID:this.formConfig.genericRelatedRecordID,
      genericFileUpload:this.formConfig.genericFileUpload,
      genericUploadDate:this.formConfig.genericUploadDate,
      genericValidFrom:this.formConfig.genericValidFrom,
      genericValidTo:this.formConfig.genericValidTo,
      genericVerificationStatus:this.formConfig.genericVerificationStatus,
      genericVerifiedBy:this.formConfig.genericVerifiedBy,
      genericRemarks:this.formConfig.genericRemarks,
    });
  }

  canAddDocumentRepository(): boolean {
    return (this.documentRepository.length < this.maxDocumentRepository);
  }


  addDocumentRepository(): void {
    if (!this.canAddDocumentRepository()) {
      return;
    }

    this.documentRepository.push(this.createDocumentRepository());
  }


  removeDocumentRepository(index: number): void {
    if (this.documentRepository.length <= 1) {
      return;
    }

    this.documentRepository.removeAt(index);
  }


  private loadSavedData(savedData: unknown): void {
    const data = savedData as Record<string, unknown>;

    this.identityStatutory.patchValue({
      panNumber: data['panNumber'],
      aadhaarNumber: data['aadhaarNumber'],
      uanNumber: data['uanNumber'],
      pfAccountNumber: data['pfAccountNumber'],
      esiNumber: data['esiNumber'],
    });

    const savedIdentityDocuments = data['identityDocuments'];

    if (Array.isArray(savedIdentityDocuments)) {
      this.identityDocuments.clear();

      savedIdentityDocuments.forEach((document: unknown) => {
          const documentForm = this.createIdentityDocument();
          documentForm.patchValue(document as Record<string, unknown>);
          this.identityDocuments.push(documentForm);
        }
      );
    }

    if (this.identityDocuments.length === 0) {
      this.identityDocuments.push(this.createIdentityDocument());
    }

    const savedDocumentRepository = data['documentRepository'];

    if (Array.isArray(savedDocumentRepository)) {
      this.documentRepository.clear();

      savedDocumentRepository.forEach((repository: unknown) => {
          const repositoryForm = this.createDocumentRepository();
          repositoryForm.patchValue(repository as Record<string, unknown>);
          this.documentRepository.push(repositoryForm);
        }
      );
    }


    if (this.documentRepository.length === 0) {
      this.documentRepository.push(this.createDocumentRepository());
    }
  }
}