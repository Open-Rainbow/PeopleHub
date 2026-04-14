import { IAddHolidayForm } from './add-holiday.model';

export const addHolidayForm: IAddHolidayForm =
{
    title: {
        id: 'title',
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
        placeHolder: 'Enter the title'
    },
    date: {
        id: 'date',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 0,
        isRequired: true,
        label: 'Date',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false,
    },
    type: {
        id: 'type',
        isHide: false,
        readOnly: false,
        minLength: 0,
        maxLength: 0,
        isRequired: true,
        label: 'Type',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false,
        placeHolder: 'Select severity type'
    },
    description: {
        id: 'description',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 500,
        isRequired: true,
        label: 'Description',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false,
        placeHolder: 'Enter Description'
    },
};
