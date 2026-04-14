export interface IFormFieldConfig {
    id: string;
    isHide?: boolean;
    readOnly?: boolean;
    minLength: number;
    maxLength: number;
    isRequired?: boolean;
    label?: string;
    defaultValue?: string | null;
    fieldValue?: string | null;
    tabIndex?: number;
    isDisable?: boolean;
    placeHolder?: string;
}
