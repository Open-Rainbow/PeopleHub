import { IFormFieldConfig } from 'common';

export interface ITempLoginConfig {
  temporaryUsername: IFormFieldConfig;
  temporaryPassword: IFormFieldConfig;
}

export type ITempLoginForm = ITempLoginConfig;
