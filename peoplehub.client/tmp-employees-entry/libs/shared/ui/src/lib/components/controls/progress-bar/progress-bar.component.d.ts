import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ProgressBarComponent implements OnInit, OnChanges {
    total?: number;
    used?: number;
    remainingLabel?: string;
    barColor?: string;
    showBorderRadius?: boolean;
    totalTextColor?: string;
    usedTextColor?: string;
    remainingTextColor?: string;
    parentFormGroup: FormGroup;
    id: string;
    hideDetails?: boolean;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean | undefined;
    remainingDays: number;
    progressPercentage: number;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private calculateProgress;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressBarComponent, "ui-progress-bar", never, { "total": { "alias": "total"; "required": false; }; "used": { "alias": "used"; "required": false; }; "remainingLabel": { "alias": "remainingLabel"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "showBorderRadius": { "alias": "showBorderRadius"; "required": false; }; "totalTextColor": { "alias": "totalTextColor"; "required": false; }; "usedTextColor": { "alias": "usedTextColor"; "required": false; }; "remainingTextColor": { "alias": "remainingTextColor"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; "hideDetails": { "alias": "hideDetails"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=progress-bar.component.d.ts.map