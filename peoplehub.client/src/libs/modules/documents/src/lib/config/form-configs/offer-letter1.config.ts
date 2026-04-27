import { IOfferLetter1Form } from "./offer-letter1.model";

export const offerLetter1Form: IOfferLetter1Form = [
    {
    "date": {
        id:'date',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Date',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false
    },
    "to": {
        id:'to',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'To',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    "subject": {
        id:'subject',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Subject',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false
    },
    "jobTitle": {
        id:'jobTitle',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Job Title',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false
    },
    "location": {
        id:'location',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Location',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 5,
        isDisable: false
    },
    "employmentType": {
        id:'date',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Employment Type',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 6,
        isDisable: false
    },
    "startDate": {
        id:'startDate',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Start Date',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 7,
        isDisable: false
    },
    "reportingTo": {
        id:'reportingTo',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Reporting To',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 8,
        isDisable: false
    },
    }
]