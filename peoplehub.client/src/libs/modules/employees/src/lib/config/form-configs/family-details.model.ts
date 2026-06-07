import { IFormFieldConfig } from 'common';

export interface IFamilyMemberFormFields {
  memberName: IFormFieldConfig;
  memberRelationship: IFormFieldConfig;
  memberGender: IFormFieldConfig;
  memberDateOfBirth: IFormFieldConfig;
  memberMaritalStatus: IFormFieldConfig;
  memberOccupation: IFormFieldConfig;
  memberContactNumber: IFormFieldConfig;
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
}

export type { IFamilyMemberForm, IDependentForm } from './family-details.types';
