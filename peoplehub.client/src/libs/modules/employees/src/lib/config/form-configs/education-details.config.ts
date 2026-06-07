import { IEducationDetailsForm } from './education-details.types';

export const educationDetailsForm: IEducationDetailsForm = {
  
  higherQualification: {
    id: 'higherQualification',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Qualification',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 1,
    isDisable: false,
    placeholder: 'eg, Bachelors, Masters, PhD'
  },

  board: {
    id: 'board',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 50,
    isRequired: false,
    label: 'Board / University',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 2,
    isDisable: false,
    placeholder: 'Enter board/university',
  },

  courseType: {
    id: 'courseType',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 50,
    isRequired: false,
    label: 'Course Type',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 3,
    isDisable: false,
    placeholder: 'Full-time, Part-time, Online',
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
    tabIndex: 4,
    isDisable: false,
    placeholder: 'eg, Computer Science'
  },

  percentageScore: {
    id: 'percentageScore',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 5,
    isRequired: false,
    label: 'Percentage / Score',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 5,
    isDisable: false,
    placeholder: 'e.g. 85.5',
  },

  scoringMethod: {
    id: 'scoringMethod',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 50,
    isRequired: false,
    label: 'Scoring Method',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 6,
    isDisable: false,
    placeholder: 'Percentage, CGPA, Grade',
  },

  monthOfPassing: {
    id: 'monthOfPassing',
    isHide: false,
    readOnly: false,
    minLength: 0,
    maxLength: 20,
    isRequired: false,
    label: 'Month of Passing',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 7,
    isDisable: false,
    placeholder: 'Select month',
  },

  yearOfPassing: {
    id: 'yearOfPassing',
     isHide: false,
    readOnly: true,
    minLength: 0,
    maxLength: 50,
    isRequired: true,
    label: 'Year of Passing',
    defaultValue: null,
    fieldValue: null,
    tabIndex: 8,
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
    tabIndex: 9,
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
    tabIndex: 10,
    isDisable: false,
    placeholder: 'List any certifications'
  }

};
