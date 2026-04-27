import { IBasicInfoForm } from "./basic-info.model";

export const basicInfoForm: IBasicInfoForm =
{
    fullName: {
        id: 'fullName',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Full Name',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false,
        placeholder: 'Enter Full Name'
    },
    employeeId: {
        id: 'employeeId',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Employee ID',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false,
        placeholder:'EMP0042'
    },
    dateofBirth: {
        id: 'dateofBirth',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Date of Birth',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false
    },
    dateofJoining: {
        id: 'dateofJoining',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Date of Joining',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false
    },
    gender: {
        id: 'gender',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Gender',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 5,
        isDisable: false,
        placeholder:'Select Gender'
    },
    maritalStatus: {
        id: 'maritalStatus',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Marital Status',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 6,
        isDisable: false,
        placeholder:'Select Marital Status'
    },
}
