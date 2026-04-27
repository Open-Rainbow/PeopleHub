import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    allowUnpaidLeave: IFormFieldConfig;
    maxConsecutiveDays: IFormFieldConfig;
    approvalRequired: IFormFieldConfig;
}

export type { ILossOfPayForm } from './loss-of-pay-info.types';


