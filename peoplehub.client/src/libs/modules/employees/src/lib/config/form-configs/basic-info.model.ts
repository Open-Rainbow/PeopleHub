import { IFormFieldConfig } from 'common';

export interface IBasicInfoFormFields {
  fullName: IFormFieldConfig;
  employeeId: IFormFieldConfig;
  dateofBirth: IFormFieldConfig;
  dateofJoining: IFormFieldConfig;
  gender: IFormFieldConfig;
  maritalStatus: IFormFieldConfig;
}

export type { IBasicInfoForm } from './basic-info.types';
