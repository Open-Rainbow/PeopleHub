import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    annualAllowance: IFormFieldConfig;
    carryForward: IFormFieldConfig;
    encashmentAllowed: IFormFieldConfig;
    medicalCertificate: IFormFieldConfig;
}

export type { ISickLeaveForm } from './sick-leave.types';


