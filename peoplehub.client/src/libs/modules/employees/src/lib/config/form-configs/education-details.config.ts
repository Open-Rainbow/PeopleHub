import { IEducationDetailsForm } from "./education-details.model";

export const educationDetailsForm: IEducationDetailsForm = {
  
  higherQualification: {
    id: 'higherQualification',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Higher Qualification',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 1,
    isDisable: false,
    placeholder: 'eg, Bachelors, Masters, PhD'
  },

  specialization: {
    id: 'specialization',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Specialization',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 2,
    isDisable: false,
    placeholder: 'eg, Computer Science'
  },

  yearofPassing: {
    id: 'yearofPassing',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Year of Passing',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 3,
    isDisable: false,
    placeholder: 'Select year'
  },

  universityName: {
    id: 'universityName',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'University/College Name',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 4,
    isDisable: false,
    placeholder: 'Enter University/College Name'
  },

  certifications: {
    id: 'certifications',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Certifications',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 5,
    isDisable: false,
    placeholder: 'List any certifications'
  }

};
