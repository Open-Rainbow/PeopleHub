import { IOfferLetter3Form } from "./offer-letter3.model";

export const offerLetter3Form: IOfferLetter3Form = [
    {
    "probationPeriod": {
        id:'probationPeriod',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Probation Period',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 1,
        isDisable: false
    },
    "termsandconditions": {
        id:'termsandconditions',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Terms & Conditions',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 2,
        isDisable: false
    },
    "acceptanceofOffer": {
        id:'acceptanceofOffer',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Acceptance of Offer',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 3,
        isDisable: false
    },
    "bestRegards": {
        id:'bestRegards',
        isHide: true,
        readOnly: true,
        minLength: 0,
        maxLength: 50,
        isRequired: true,
        label: 'Best Regards',
        defaultValue: null,
        fieldValue: null,
        tabIndex: 4,
        isDisable: false
    },
    }
]