import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class LabelValueComponent {
    label?: string;
    value: string;
    isRequired: boolean;
    isEditMode: boolean;
    parentFormGroup: FormGroup;
    id: string;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    editableValue: string;
    ngOnChanges(): void;
    onValueChange(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelValueComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelValueComponent, "ui-label-value", never, { "label": { "alias": "label"; "required": false; }; "value": { "alias": "value"; "required": false; }; "isRequired": { "alias": "isRequired"; "required": false; }; "isEditMode": { "alias": "isEditMode"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=label-value.component.d.ts.map