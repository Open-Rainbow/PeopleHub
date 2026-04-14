import { IFormFieldConfig } from '../form-field-config.model';

interface IHolidayFormFields {
    title: IFormFieldConfig;
    date: IFormFieldConfig;
    type: IFormFieldConfig;
    description: IFormFieldConfig;
}

export type IAddHolidayForm = IHolidayFormFields;
