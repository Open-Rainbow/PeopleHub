import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { changeRequestsAuditForm } from '../../config/form-configs/change-requests-audit.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-change-requests-audit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, TextAreaComponent],
  templateUrl: './change-requests-audit.component.html',
  styleUrls: ['./change-requests-audit.component.scss'],
})
export class ChangeRequestsAuditComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = changeRequestsAuditForm;
  changeRequestsAudit!: FormGroup;

  ngOnInit(): void {
    this.changeRequestsAudit = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('change-requests-audit');
    if (savedData) {
      this.changeRequestsAudit.patchValue(savedData as Record<string, unknown>);
    }

    this.stepperService.setStepValidity(this.changeRequestsAudit.valid);

    this.changeRequestsAudit.statusChanges.subscribe(status => {
      this.stepperService.setStepValidity(status === 'VALID');
    });
  }
}
