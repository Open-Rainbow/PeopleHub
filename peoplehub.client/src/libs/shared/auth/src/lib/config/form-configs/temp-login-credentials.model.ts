import { IFormFieldConfig } from 'common';

export interface ITempLoginFormFields {
    temporaryUsername: IFormFieldConfig;
    temporaryPassword: IFormFieldConfig;
}

export type { ITempLoginCredentialsForm } from './temp-login-credentials.types';
