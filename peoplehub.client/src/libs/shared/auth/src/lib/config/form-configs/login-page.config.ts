import { ILoginPageForm } from "./login-page.model";

export const loginPageForm: ILoginPageForm = [
    {
    "username": {
        id:'username',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Username',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false
    },
    "password": {
        id:'password',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Password',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    }
]