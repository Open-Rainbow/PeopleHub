import { IEarnedLeaveForm } from "./earned-leave.model";


export const earnedLeaveForm: IEarnedLeaveForm = 
    {
          annualAllowance: {
            id: 'annualAllowance',
            isHide: false,
            readOnly: true,
            minLength: 0,
            maxLength: 50,
            isRequired: true,
            label: 'Annual Allowance',
            defaultValue: null,
            fieldValue: null,
            tabIndex: 2,
            isDisable: false
        },
        carryForward: {
            id: 'carryForward',
            isHide: false,
            readOnly: true,
            minLength: 0,
            maxLength: 50,
            isRequired: true,
            label: 'Carry Forward',
            defaultValue: null,
            fieldValue: null,
            tabIndex: 3,
            isDisable: false
        },
        encashmentAllowed: {
            id: 'encashmentAllowed',
            isHide: false,
            readOnly: true,
            minLength: 0,
            maxLength: 50,
            isRequired: true,
            label: 'Encashment Allowed',
            defaultValue: null,
            fieldValue: null,
            tabIndex: 4,
            isDisable: false
        },
        accuralMethod: {
        id:'accuralMethod',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Accural Method',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 5,
        isDisable: false
    },
     }