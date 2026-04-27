import { IJobDetailsForm } from "./job-details.model";

export const jobDetailsForm: IJobDetailsForm = {
  officeEmail: {
    id: 'officeEmail',
     isHide: false,
    readOnly: true,
    minLength: 5,
    maxLength: 50,
    isRequired: true,
    label: 'Office Email',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 1,
    isDisable: false,
    placeholder: 'Enter office email'
  },

  department: {
    id: 'department',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 30,
    isRequired: true,
    label: 'Department',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 2,
    isDisable: false,
    placeholder: 'Select department'
  },

  designation: {
    id: 'designation',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 30,
    isRequired: true,
    label: 'Designation',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 3,
    isDisable: false,
    placeholder: 'Enter your job title'
  },

  employeeType: {
    id: 'employeeType',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 20,
    isRequired: true,
    label: 'Employee Type',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 4,
    isDisable: false,
    placeholder: 'Select employee type'
  },

  workLocation: {
    id: 'workLocation',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 50,
    isRequired: true,
    label: 'Work Location',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 5,
    isDisable: false,
    placeholder: 'Select work location'
  },

  shiftTimings: {
    id: 'shiftTimings',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 30,
    isRequired: true,
    label: 'Shift Timings',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 6,
    isDisable: false,
    placeholder: 'Select shift'
  },

  paylevel: {
    id: 'paylevel',
     isHide: false,
    readOnly: true,
    minLength: 1,
    maxLength: 20,
    isRequired: true,
    label: 'Pay Level/Grade',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 7,
    isDisable: false,
    placeholder: 'Select pay level'
  },

  reportingManager: {
    id: 'reportingManager',
     isHide: false,
    readOnly: true,
    minLength: 2,
    maxLength: 50,
    isRequired: true,
    label: 'Reporting Manager',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 8,
    isDisable: false,
    placeholder: 'Select manager'
  }
};
