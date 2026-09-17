import { IFormFieldConfig } from 'common';

export interface IAddLeaveTypeFormFields {
  leaveName: IFormFieldConfig;
  description: IFormFieldConfig;
  annualAllowance: IFormFieldConfig;
  carryForwardDays: IFormFieldConfig;
  enhancementAllowed: IFormFieldConfig;
  paidLeave: IFormFieldConfig;
  mustBeTakenWithinMonths: IFormFieldConfig;
  allowanceBasedOn: IFormFieldConfig;
  employmentTypes: IFormFieldConfig;
  approvalRequired: IFormFieldConfig;
  anyCertificates: IFormFieldConfig;
  certificateRequiredAfterDays: IFormFieldConfig;
}

export interface IAddLeaveTypeForm
  extends IAddLeaveTypeFormFields {}