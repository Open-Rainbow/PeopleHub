import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    enableCompOff: IFormFieldConfig;
    expiryPeriod: IFormFieldConfig;
    maxAccrualLimit: IFormFieldConfig;
}

export type { ICompensatoryOffForm } from './compensatory-leave.types';


