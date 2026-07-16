import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChipPalette, ChipVariant } from '../../../models/component-models/chip.types';
import * as i0 from "@angular/core";
export declare class ChipComponent implements OnChanges, OnInit {
    text?: string;
    private readonly defaultTextColor;
    color: string;
    bgColor?: string;
    variant?: ChipVariant;
    disabled: boolean;
    activeBGColor: string;
    activeColor: string;
    borderRadius: string;
    size: 'extrasmall' | 'small' | 'medium' | 'large' | 'status';
    usePointerCursor: boolean;
    height: string;
    width: string;
    fontSize: string;
    horizontalGap: string;
    isHovered: boolean;
    parentFormGroup: FormGroup;
    id: string;
    get control(): import("@angular/forms").AbstractControl<any, any, any> | null;
    get isInvalid(): boolean;
    get variantPalette(): ChipPalette | undefined;
    get textColor(): string;
    get finalBgColor(): string;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    updateSize(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private convertToOpacity;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipComponent, "ui-chip", never, { "text": { "alias": "text"; "required": false; }; "color": { "alias": "color"; "required": false; }; "bgColor": { "alias": "bgColor"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "activeBGColor": { "alias": "activeBGColor"; "required": false; }; "activeColor": { "alias": "activeColor"; "required": false; }; "borderRadius": { "alias": "borderRadius"; "required": false; }; "size": { "alias": "size"; "required": false; }; "usePointerCursor": { "alias": "usePointerCursor"; "required": false; }; "parentFormGroup": { "alias": "parentFormGroup"; "required": false; }; "id": { "alias": "id"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=chip.component.d.ts.map