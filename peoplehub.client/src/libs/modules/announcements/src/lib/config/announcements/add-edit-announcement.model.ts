import { IFormFieldConfig } from 'common';

export interface IAddEditAnnouncementFormFields {
  title: IFormFieldConfig;
  description: IFormFieldConfig;
  priority: IFormFieldConfig;
  category: IFormFieldConfig;
  department: IFormFieldConfig;
  targetAudience: IFormFieldConfig;
  expiresOn: IFormFieldConfig;
}

export type { IAddEditAnnouncementForm } from './add-edit-announcement.types';
