import { IFormFieldConfig } from 'common';

export interface ILeaveManagementFormFields {
  policyYear: IFormFieldConfig;
  employmentType: IFormFieldConfig;
  status: IFormFieldConfig;
}

export interface ILeaveManagementForm
  extends ILeaveManagementFormFields {}