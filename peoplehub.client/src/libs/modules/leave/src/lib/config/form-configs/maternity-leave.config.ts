
import { IMaternityLeaveForm } from "./maternity-leave.model";

export const maternityLeaveForm: IMaternityLeaveForm = 
    {
        totalDuration: {
        id:'totalDuration',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Total Duration',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 6,
        isDisable: false
    },
    paidDuration: {
        id:'paidDuration',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Paid Duration',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 7,
        isDisable: false
    },
    extensionAllowed: {
        id:'extensionAllowed',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Extension Allowed',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 8,
        isDisable: false,
    }, 
    additionalPolicyNotes: {
     id:'additionalPolicyNotes',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Additional Policy Notes',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 9,
     isDisable: false
    },  }