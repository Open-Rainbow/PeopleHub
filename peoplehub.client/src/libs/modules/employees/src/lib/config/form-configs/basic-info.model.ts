import { IFormFieldConfig } from 'common';

export interface IBasicInfoFormFields {
  title: IFormFieldConfig;
  firstName: IFormFieldConfig;
  lastName: IFormFieldConfig;
  employeeId: IFormFieldConfig;
  dateOfBirth: IFormFieldConfig;
  dateOfJoining: IFormFieldConfig;
  gender: IFormFieldConfig;
  maritalStatus: IFormFieldConfig;
  bloodGroup: IFormFieldConfig;
  uanNumber: IFormFieldConfig;
  pfAccNo: IFormFieldConfig;
}

export type { IBasicInfoForm } from './basic-info.types';
