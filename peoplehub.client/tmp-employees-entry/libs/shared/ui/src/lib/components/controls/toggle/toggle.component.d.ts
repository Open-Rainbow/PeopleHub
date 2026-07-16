import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ToggleComponent implements OnInit {
    checked?: boolean | undefined;
    color?: string | undefined;
    checkedChange: EventEmitter<boolean>;
    toggleChange: EventEmitter<boolean>;
    label?: string;
    labelPosition?: 'left' | 'right' | 'both';
    isRequired?: boolean;
    labelColor?: string;
    size?: 'large' | 'medium' | 'small';
    enableLabelClick?: boolean;
    toggleOnlyMode?: boolean;
    offLabel?: string;
    onLabel?: string;
    parentFormGroup: FormGroup;
    id: string;
    onToggleChange(event: Event): void;
    get formControl(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get leftLabelText(): string;
    get rightLabelText(): string;
    get hasSeparateOnOffLabels(): boolean;
    get canToggleFromLabel(): boolean;
    ngOnInit(): void;
    get toggleActiveColor(): string | undefined;
    get hostToggleLabelColor(): string | undefined;
    onLabelClick(forceValue?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleComponent, "ui-toggle", never, { "checked": { "alias": "checked"; "required": false; }; "color": { "alias": "color"; "required": false; }; "label": { "alias": "label"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "isRequired": { "alias": "isRequired"; "required": false; }; "labelColor": { "alias": "labelColor"; "required": false; }; "size": { "alias": "size"; "required": false; }; "enableLabelClick": { "alias": "enableLabelClick"; "required": false; }; "toggleOnlyMode": { "alias": "toggleOnlyMode"; "required": false; }; "offLabel": { "alias": "offLabel"; "required": false; }; "onLabel": { "alias": "onLabel"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, { "checkedChange": "checkedChange"; "toggleChange": "toggleChange"; }, never, never, true, never>;
}
//# sourceMappingURL=toggle.component.d.ts.map