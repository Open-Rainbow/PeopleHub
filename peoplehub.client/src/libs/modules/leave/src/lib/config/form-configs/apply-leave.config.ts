import { IApplyLeaveForm } from "./apply-leave.model";

export const applyLeaveForm: IApplyLeaveForm = 
    {
    startDate: {
        id:'startDate',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Start Date',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false
    },
    endDate: {
        id:'endDate',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'End Date',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    leaveType: {
        id:'leaveType',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Leave Type',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false,
        placeholder: 'Select Leave type'
    },
    reasonForLeave: {
        id:'reasonForLeave',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Reason for Leave',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false,
        placeholder: 'Please provide a detailed reason for your leave request'
    },
    }
