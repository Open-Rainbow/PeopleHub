
import { IPaternityLeaveForm } from "./paternity-leave.model";

export const paternityLeaveForm: IPaternityLeaveForm = 
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
   mustbeTakenWithin: {
     id:'mustbeTakenWithin',
     isHide: false,
     readOnly: true,
     minLength: 0,
     maxLength: 50,
     isRequired: true,
     label: 'Must be Taken Within',
     defaultValue: null,
     fieldValue: null,
     tabIndex: 10,
     isDisable: false
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
    }, 
    }