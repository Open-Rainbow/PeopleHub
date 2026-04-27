
import { ISickLeaveForm } from "./sick-leave.model";

export const sickLeaveForm: ISickLeaveForm = 
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
        medicalCertificate: {
            id: 'medicalCertificate',
            isHide: false,
            readOnly: true,
            minLength: 0,
            maxLength: 50,
            isRequired: true,
            label: '',
            defaultValue: null,
            fieldValue: null,
            tabIndex: 4,
            isDisable: false
        },
        
    }