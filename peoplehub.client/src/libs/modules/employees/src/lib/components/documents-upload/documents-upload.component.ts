import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { documentsUploadForm } from '../../config/form-configs/documents-upload.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-documents-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileUploadComponent, TextBoxComponent],
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss'],
})
export class DocumentsUploadComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = documentsUploadForm;
  documentsUpload!: FormGroup;

  ngOnInit(): void {
    this.documentsUpload = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('documents-upload');
    if (savedData) {
      this.documentsUpload.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.documentsUpload.valid);

    this.documentsUpload.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}


