import { IFormFieldConfig } from 'common';

export interface IInsurancePolicyFormFields {
  benefitType: IFormFieldConfig;
  providerName: IFormFieldConfig;
  policyNumber: IFormFieldConfig;
  coverageStartDate: IFormFieldConfig;
  coverageEndDate: IFormFieldConfig;
  employeeCovered: IFormFieldConfig;
  premiumSharingType: IFormFieldConfig;
  coverageAmount: IFormFieldConfig;
  policyStatus: IFormFieldConfig;
  insuranceRemarks: IFormFieldConfig;
  coveredMemberName: IFormFieldConfig;
  coveredMemberRelationship: IFormFieldConfig;
  sumInsuredAllocation: IFormFieldConfig;
  memberCoverageFrom: IFormFieldConfig;
  memberCoverageTo: IFormFieldConfig;
  linkedFamilyOrDependentRecord: IFormFieldConfig;
  coveredUnderPolicy: IFormFieldConfig;
  insuranceCardProofLink: IFormFieldConfig;
}

export interface INomineeFormFields {
  nomineeBenefitType: IFormFieldConfig;
  nomineeName: IFormFieldConfig;
  nomineeRelationship: IFormFieldConfig;
  nomineeDateOfBirth: IFormFieldConfig;
  nomineeContactNumber: IFormFieldConfig;
  minorFlag: IFormFieldConfig;
  guardianName: IFormFieldConfig;
  sharePercentage: IFormFieldConfig;
  priorityOrder: IFormFieldConfig;
  nomineeActive: IFormFieldConfig;
  nomineeEffectiveFrom: IFormFieldConfig;
  nomineeEffectiveTo: IFormFieldConfig;
  nomineeBankName: IFormFieldConfig;
  nomineeAccountNumber: IFormFieldConfig;
  nomineeIfscCode: IFormFieldConfig;
  nomineeAadhaarNumber: IFormFieldConfig;
  nomineePanNumber: IFormFieldConfig;
  linkedFamilyOrDependentRecord: IFormFieldConfig;
  address: IFormFieldConfig;
  proofDocumentLink: IFormFieldConfig;
}

export type { IInsurancePolicyForm, INomineeForm } from './insurance-details.types';

