import { IFormFieldConfig } from 'common';

export interface ISalaryStructureFormFields {
  payrollGroup: IFormFieldConfig;
  salaryStructure: IFormFieldConfig;
  salaryStructurePlan: IFormFieldConfig;
  payGrade: IFormFieldConfig;
  bankName: IFormFieldConfig;
  accountHolderName: IFormFieldConfig;
  bankAccountNumber: IFormFieldConfig;
  reEnterAccountNumber: IFormFieldConfig; // validation-only field; keep config so template type-checks
  branchName: IFormFieldConfig;
  ifscCode: IFormFieldConfig;
  micrNumber: IFormFieldConfig;
  accountType: IFormFieldConfig;
  bankAddress: IFormFieldConfig;
  salaryPaymentMode: IFormFieldConfig;
  taxRegime: IFormFieldConfig;
  payrollEffectiveFrom: IFormFieldConfig;
  bankProofLink: IFormFieldConfig;
}

export type { ISalaryStructureForm } from './salary-structure.types';
