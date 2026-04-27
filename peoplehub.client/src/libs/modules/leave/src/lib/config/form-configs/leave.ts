import { casualLeaveForm } from "./casual-leave.config";
import { compensatoryOffForm } from "./compensatory-off.config";
import { designationOptionForm } from "./designation-options.config";
import { earnedLeaveForm } from "./earned-leave.config";
import { ILeaveManagementConfig } from "./leave.model";
import { lossOfPayForm } from "./loss-of-pay.config";
import { maternityLeaveForm } from "./maternity-leave.config";
import { paternityLeaveForm } from "./paternity-leave.config";
import { sickLeaveForm } from "./sick-leave.config";

export const leaveManagementConfig: ILeaveManagementConfig = {
    designationOption : designationOptionForm,
    sickLeave: sickLeaveForm,
    casualLeave: casualLeaveForm,
    earnedLeave: earnedLeaveForm,
    maternityLeave: maternityLeaveForm,
    paternityLeave: paternityLeaveForm,
    compensatoryOff: compensatoryOffForm,
    lossOfPay: lossOfPayForm
} 