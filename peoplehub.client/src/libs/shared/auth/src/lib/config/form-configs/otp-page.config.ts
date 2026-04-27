import { IOtpPageForm } from "./otp-page.model";

export const otpPageForm: IOtpPageForm = [
    {
    "otp": {
        id:'otp',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Enter OTP here',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false
    },
    }
]