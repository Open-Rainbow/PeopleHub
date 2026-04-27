import { IFormFieldConfig } from 'common';

export interface IDesignationOptionConfig {
    employmentType: IFormFieldConfig;
}

export interface IEarnedLeaveConfig {
    annualAllowance: IFormFieldConfig;
    carryForward: IFormFieldConfig;
    encashmentAllowed: IFormFieldConfig;
    accuralMethod: IFormFieldConfig;
}
export interface IMaternityLeaveConfig {
    totalDuration: IFormFieldConfig;
    paidDuration: IFormFieldConfig;
    extensionAllowed: IFormFieldConfig;
    additionalPolicyNotes: IFormFieldConfig;
}
export interface IPaternityLeaveConfig {
    totalDuration: IFormFieldConfig;
    paidDuration: IFormFieldConfig;
    mustbeTakenWithin: IFormFieldConfig;
    additionalPolicyNotes: IFormFieldConfig;
}
export interface ICompensatoryOffConfig {
    enableCompOff: IFormFieldConfig;
    expiryPeriod: IFormFieldConfig;
    maxAccrualLimit: IFormFieldConfig;
}
export interface ILossOfPayConfig {
    allowUnpaidLeave: IFormFieldConfig;
    maxConsecutiveDays: IFormFieldConfig;
    approvalRequired: IFormFieldConfig;
}

export interface ISickLeaveConfig {
    annualAllowance: IFormFieldConfig;
    carryForward: IFormFieldConfig;
    encashmentAllowed: IFormFieldConfig;
    medicalCertificate: IFormFieldConfig;
}

export interface ICasualLeaveConfig {
    annualAllowance: IFormFieldConfig;
    carryForward: IFormFieldConfig;
    encashmentAllowed: IFormFieldConfig;
    medicalCertificate: IFormFieldConfig;
}

export type { ILeaveManagementConfig } from './leave.types';

