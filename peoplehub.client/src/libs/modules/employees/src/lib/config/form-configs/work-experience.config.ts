import { IWorkExperienceForm } from "./work-experience.model";

export const workExperienceForm: IWorkExperienceForm = {
  

  previousOrganization: {
        id: 'previousOrganization',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Organisation Name',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false,
        placeholder: 'Enter Organisation Name'
    },
    organizationLocation: {
        id: 'organizationLocation',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Organisation Location',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false,
        placeholder:'HYD'
    },
    yearOfExperience: {
        id: 'yearOfExperience',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Years Of Experience',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false
    },
    previousDesignation: {
        id: 'previousDesignation',
         isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Previous Designation',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false
    },
    
};
