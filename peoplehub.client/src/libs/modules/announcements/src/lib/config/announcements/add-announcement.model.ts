import { IFormFieldConfig } from 'common';

export interface IAddAnnouncementFormFields {
  title: IFormFieldConfig;
  description: IFormFieldConfig;
  priority: IFormFieldConfig;
  category: IFormFieldConfig;
  department: IFormFieldConfig;
  targetAudience: IFormFieldConfig;
  expiresOn: IFormFieldConfig;
}

import { IAddAnnouncementForm } from "./add-announcement.types";

