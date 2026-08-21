import { IFormFieldConfig } from 'common';

export interface IFamilyMemberFormFields {
  memberName: IFormFieldConfig;
  memberRelationship: IFormFieldConfig;
  memberGender: IFormFieldConfig;
  memberDateOfBirth: IFormFieldConfig;
  memberMaritalStatus: IFormFieldConfig;
  memberOccupation: IFormFieldConfig;
  memberContactNumber: IFormFieldConfig;
  memberEmail: IFormFieldConfig;
  addressSameasEmployee: IFormFieldConfig;
  livesWithEmployee: IFormFieldConfig;
  memberNotes: IFormFieldConfig;
}

export interface IDependentFormFields {
  dependentName: IFormFieldConfig;
  dependentRelationship: IFormFieldConfig;
  dependentDateOfBirth: IFormFieldConfig;
  dependentGender: IFormFieldConfig;
  financiallyDependent: IFormFieldConfig;
  studentStatus: IFormFieldConfig;
  disabilityStatus: IFormFieldConfig;
  dependencyStartDate: IFormFieldConfig;
  eligibleForBenefits: IFormFieldConfig;
  dependentRemarks: IFormFieldConfig;

  linkedFamilyRecord: IFormFieldConfig;
  monthlyIncomeOrPension: IFormFieldConfig;
  dependencyEndDate: IFormFieldConfig;
  proofDocumentLink: IFormFieldConfig;
}

export type IFamilyMemberForm = IFamilyMemberFormFields;
export type IDependentForm = IDependentFormFields;
