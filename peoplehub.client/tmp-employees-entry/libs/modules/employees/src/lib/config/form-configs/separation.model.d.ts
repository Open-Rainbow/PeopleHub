import { IFormFieldConfig } from 'common';
export interface ISeparationFormFields {
    separationType: IFormFieldConfig;
    initiationDate: IFormFieldConfig;
    resignationDate: IFormFieldConfig;
    noticeStartDate: IFormFieldConfig;
    noticeEndDate: IFormFieldConfig;
    proposedLastWorkingDay: IFormFieldConfig;
    finalLastWorkingDay: IFormFieldConfig;
    exitReason: IFormFieldConfig;
    detailedExitRemarks: IFormFieldConfig;
    rehireEligible: IFormFieldConfig;
    separationStatus: IFormFieldConfig;
    exitInterviewRequired: IFormFieldConfig;
    exitInterviewStatus: IFormFieldConfig;
    knowledgeTransferRequired: IFormFieldConfig;
    knowledgeTransferStatus: IFormFieldConfig;
    attritionCategory: IFormFieldConfig;
    managerClearanceStatus: IFormFieldConfig;
    hrClearanceStatus: IFormFieldConfig;
    leaveBalanceAtExit: IFormFieldConfig;
    gratuityEligible: IFormFieldConfig;
    finalSettlementStatus: IFormFieldConfig;
    officialEmailDisableDate: IFormFieldConfig;
    applicationAccessRevokeStatus: IFormFieldConfig;
}
export type { ISeparationForm } from './separation.types';
//# sourceMappingURL=separation.model.d.ts.map