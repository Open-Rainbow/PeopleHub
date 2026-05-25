import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    annualAllowance: IFormFieldConfig;
    carryForward: IFormFieldConfig;
    encashmentAllowed: IFormFieldConfig;
    medicalCertificate: IFormFieldConfig;
}

export type { ICasualLeaveForm } from './casual-leave.types';




