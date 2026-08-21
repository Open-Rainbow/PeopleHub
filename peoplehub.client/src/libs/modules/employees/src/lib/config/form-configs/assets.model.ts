// import { IFormFieldConfig } from 'common';

// export interface IAssetsFormFields {
//   assetType: IFormFieldConfig;
//   assetCategory: IFormFieldConfig;
//   assetName: IFormFieldConfig;
//   assetSerialNumber: IFormFieldConfig;
//   makeBrand: IFormFieldConfig;
//   model: IFormFieldConfig;
//   configurationDetails: IFormFieldConfig;
//   tagNumber: IFormFieldConfig;
//   ownershipType: IFormFieldConfig;
//   issuedDate: IFormFieldConfig;
//   employeeAcknowledgement: IFormFieldConfig;
//   acknowledgementDate: IFormFieldConfig;
//   assetConditionAtIssue: IFormFieldConfig;
//   warrantyStartDate: IFormFieldConfig;
//   warrantyEndDate: IFormFieldConfig;
//   assetValue: IFormFieldConfig;
//   returnRequired: IFormFieldConfig;
//   expectedReturnDate: IFormFieldConfig;
//   actualReturnDate: IFormFieldConfig;
//   returnCondition: IFormFieldConfig;
//   damageNotes: IFormFieldConfig;
//   recoveryRequired: IFormFieldConfig;
//   recoveryAmount: IFormFieldConfig;
//   recoveryStatus: IFormFieldConfig;
//   assetClosureStatus: IFormFieldConfig;
//   policyName: IFormFieldConfig;
//   acknowledgedFlag: IFormFieldConfig;
//   acknowledgedOn: IFormFieldConfig;
//   complianceTrainingName: IFormFieldConfig;
//   complianceStatus: IFormFieldConfig;
//   assetRemarks: IFormFieldConfig;
// }

// export type { IAssetsForm } from './assets.types';




import { IFormFieldConfig } from 'common';


export interface ISystemAccessFormFields {
  applicationOrSystemName: IFormFieldConfig;
  usernameOrLoginId: IFormFieldConfig;
  roleOrAccessProfile: IFormFieldConfig;
  accessStartDate: IFormFieldConfig;
  accessEndDate: IFormFieldConfig;
  accountStatus: IFormFieldConfig;
  passwordSetupRequired: IFormFieldConfig;
  temporaryPasswordIssuedFlag: IFormFieldConfig;
  passwordResetRequired: IFormFieldConfig;
  mfaEnabled: IFormFieldConfig;
  lastLogin: IFormFieldConfig;
  accessApprovalReference: IFormFieldConfig;
}

export type { ISystemAccessForm } from './assets.types';

export interface IAssetsFormFields {
  assetAssignmentId: IFormFieldConfig;
  assetType: IFormFieldConfig;
  assetCategory: IFormFieldConfig;
  assetName: IFormFieldConfig;
  assetSerialNumber: IFormFieldConfig;
  makeBrand: IFormFieldConfig;
  model: IFormFieldConfig;
  configurationDetails: IFormFieldConfig;
  tagNumber: IFormFieldConfig;
  ownershipType: IFormFieldConfig;
  issuedDate: IFormFieldConfig;
  issuedBy: IFormFieldConfig;
  issueLocation: IFormFieldConfig;
  employeeAcknowledgement: IFormFieldConfig;
  acknowledgementDate: IFormFieldConfig;
  assetConditionAtIssue: IFormFieldConfig;
  warrantyStartDate: IFormFieldConfig;
  warrantyEndDate: IFormFieldConfig;
  insuranceCovered: IFormFieldConfig;
  assetValue: IFormFieldConfig;
  securityDepositApplicable: IFormFieldConfig;
  depositAmount: IFormFieldConfig;
  assetRemarks: IFormFieldConfig;
}

export type { IAssetsForm } from './assets.types';
