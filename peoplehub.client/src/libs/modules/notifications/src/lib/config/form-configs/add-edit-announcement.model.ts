import { IFormFieldConfig } from 'common';

export interface IAnnouncementFormFields {
    title: IFormFieldConfig;
    priority: IFormFieldConfig;
    expiresOn: IFormFieldConfig;
    description: IFormFieldConfig;
    category:IFormFieldConfig;
    department:IFormFieldConfig;
    targetAudience:IFormFieldConfig;
    postedBy : IFormFieldConfig;
}

export type { IAddEditAnnouncementForm } from './add-edit-announcement.types';




