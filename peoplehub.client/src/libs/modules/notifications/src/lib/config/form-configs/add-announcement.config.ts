import { IAddAnnouncementForm } from "./add-announcement.model";

export const addAnnouncementForm: IAddAnnouncementForm = 
    {
    "title": {
        id:'title',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Title',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false,
        
    },
    "priority": {
        id:'priority',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Priority',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
      "category": {
        id:'category',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Category',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    "targetAudience": {
        id:'targetAudience',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'TargetAudience',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    "department": {
        id:'department',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Department',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    "expiresOn": {
        id:'expiresOn',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Expires On',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false
    },
    "description": {
        id:'description',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Description',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false
    },
    postedBy: {
        id: 'postedBy',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: false,
        label: 'Posted By',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 5,
        isDisable: false
    }
    }
