import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    totalDuration: IFormFieldConfig;
    paidDuration: IFormFieldConfig;
    mustbeTakenWithin: IFormFieldConfig;
    additionalPolicyNotes: IFormFieldConfig;
}

export type { IPaternityLeaveForm } from './paternity-leave.types';




