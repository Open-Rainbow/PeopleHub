import type {
    IDesignationOptionConfig,
    ISickLeaveConfig,
    ICasualLeaveConfig,
    IEarnedLeaveConfig,
    IMaternityLeaveConfig,
    IPaternityLeaveConfig,
    ICompensatoryOffConfig,
    ILossOfPayConfig,
} from "./leave.model";

export type ILeaveManagementConfig = {
    designationOption: IDesignationOptionConfig;
    sickLeave: ISickLeaveConfig;
    casualLeave: ICasualLeaveConfig;
    earnedLeave: IEarnedLeaveConfig;
    maternityLeave: IMaternityLeaveConfig;
    paternityLeave: IPaternityLeaveConfig;
    compensatoryOff: ICompensatoryOffConfig;
    lossOfPay: ILossOfPayConfig;
};
