import { ITempLoginCredentialsForm } from "./temp-login-credentials.model";

export const tempLoginCredentialsForm: ITempLoginCredentialsForm =
{
    temporaryUsername: {
        id: 'temporaryUsername',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Temporary Username',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false,
        placeholder: 'Enter Temporary username'
    },
    temporaryPassword: {
        id: 'temporaryPassword',
        isHide: false,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: "Temporary Password",
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false,
        placeholder: 'Enter Temporary Password'
    },
}
