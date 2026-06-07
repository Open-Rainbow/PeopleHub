import { IFormFieldConfig } from 'common';

export interface IContactInfoFormFields {
  personalMail: IFormFieldConfig;
  alternateMail: IFormFieldConfig;
  mobileNumber: IFormFieldConfig;
  alternateMobile: IFormFieldConfig;
  landlineNumber: IFormFieldConfig;
  officialEmail: IFormFieldConfig;
  linkedinUrl: IFormFieldConfig;
  addressType: IFormFieldConfig;
  houseNumber: IFormFieldConfig;
  streetName: IFormFieldConfig;
  landmark: IFormFieldConfig;
  colony: IFormFieldConfig;
  area: IFormFieldConfig;
  city: IFormFieldConfig;
  district: IFormFieldConfig;
  stateProvince: IFormFieldConfig;
  country: IFormFieldConfig;
  pincode: IFormFieldConfig;
  permanentAddress: IFormFieldConfig;
  currentAddress: IFormFieldConfig;
  checkToggle: IFormFieldConfig;
  contactName: IFormFieldConfig;
  contactNumber: IFormFieldConfig;
  relation: IFormFieldConfig;
  emergencyAlternateNumber: IFormFieldConfig;
  emergencyEmail: IFormFieldConfig;
  primaryEmergencyContact: IFormFieldConfig;
}

export type { IContactInfoForm } from './contact-info.types';

