import { IFormFieldConfig } from 'common';

export interface IBasicInfoFormFields {
  title: IFormFieldConfig;
  firstName: IFormFieldConfig;
  middleName: IFormFieldConfig;
  lastName: IFormFieldConfig;
  preferredName: IFormFieldConfig;
  employeeId: IFormFieldConfig;
  dateOfBirth: IFormFieldConfig;
  dateOfJoining: IFormFieldConfig;
  gender: IFormFieldConfig;
  maritalStatus: IFormFieldConfig;
  bloodGroup: IFormFieldConfig;
  nationality: IFormFieldConfig;
  placeOfBirth: IFormFieldConfig;
  religion: IFormFieldConfig;
  category: IFormFieldConfig;
  uanNumber: IFormFieldConfig;
  pfAccNo: IFormFieldConfig;
}

export type { IBasicInfoForm } from './basic-info.types';
