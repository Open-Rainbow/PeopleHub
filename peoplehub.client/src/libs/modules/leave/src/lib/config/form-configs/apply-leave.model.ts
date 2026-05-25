import { IFormFieldConfig } from 'common';

export interface ILeaveFormFields {
    startDate: IFormFieldConfig;
    endDate: IFormFieldConfig;
    leaveType: IFormFieldConfig;
    reasonForLeave: IFormFieldConfig;
}

export type { IApplyLeaveForm } from './apply-leave.types';




