import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    totalDuration: IFormFieldConfig;
    paidDuration: IFormFieldConfig;
    extensionAllowed: IFormFieldConfig;
    additionalPolicyNotes: IFormFieldConfig;
}

export type { IMaternityLeaveForm } from './maternity-leave.types';


