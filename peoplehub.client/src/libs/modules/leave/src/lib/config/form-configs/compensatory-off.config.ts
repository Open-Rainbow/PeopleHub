import { ICompensatoryOffForm } from "./compensatory-leave.model";


export const compensatoryOffForm: ICompensatoryOffForm = 
    {
    enableCompOff: {
     id:'enableCompOff',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Enable Comp-Off',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 11,
     isDisable: false
    },
    expiryPeriod: {
     id:'expiryPeriod',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Expiry Period',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 12,
     isDisable: false
    },
    maxAccrualLimit: {
     id:'maxAccrualLimit',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Max Accrual Limit',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 13,
     isDisable: false
    }, }