
import { ILossOfPayForm } from "./loss-of-pay-info.model";

export const lossOfPayForm: ILossOfPayForm = 
    {
    allowUnpaidLeave: {
     id:'allowUnpaidLeave',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Allow Unpaid Leave',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 14,
     isDisable: false
    },
    maxConsecutiveDays: {
     id:'maxConsecutiveDays',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Max Consecutive Days',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 15,
     isDisable: false
    },
    approvalRequired: {
     id:'approvalRequired',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Approval Required',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 16,
     isDisable: false
    },
    }