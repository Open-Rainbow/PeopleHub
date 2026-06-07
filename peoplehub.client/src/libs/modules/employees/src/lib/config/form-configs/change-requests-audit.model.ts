import { IFormFieldConfig } from 'common';

export interface IChangeRequestsAuditFormFields {
  changeRequestType: IFormFieldConfig;
  requestedBy: IFormFieldConfig;
  auditReference: IFormFieldConfig;
  auditRemarks: IFormFieldConfig;
}
