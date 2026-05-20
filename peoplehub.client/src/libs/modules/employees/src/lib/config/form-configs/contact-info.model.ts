import { IFormFieldConfig } from 'common';

export interface IContactInfoFormFields {
    personalMail: IFormFieldConfig;
    linkedinUrl: IFormFieldConfig;
    contactNo: IFormFieldConfig;
    permanentAddress: IFormFieldConfig;
    currentAddress: IFormFieldConfig;
    checkToggle: IFormFieldConfig;
    contactName: IFormFieldConfig;
    contactNumber: IFormFieldConfig;
    relation: IFormFieldConfig;

}

export type { IContactInfoForm } from './contact-info.types';


