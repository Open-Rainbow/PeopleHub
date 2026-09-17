import { ILeaveManagementForm } from './leave-management.model';


export const leaveManagementForm: ILeaveManagementForm = {

  policyYear: {
    id: 'policyYear',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 4,
    isRequired: true,
    label: 'Policy Year',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 1,
    isDisable: false,
    placeholder: 'Select year',
  },


  employmentType: {
    id: 'employmentType',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Employment Type',
    defaultValue: 'Full-Time',
    fieldValue: null,
    tabIndex: 2,
    isDisable: false,
    placeholder: 'Select employment type',
  },


  status: {
    id: 'status',
    isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 20,
    isRequired: false,
    label: 'Status',
    defaultValue: 'Active',
    fieldValue: null,
    tabIndex: 3,
    isDisable: true,
    placeholder: '',
  },
};