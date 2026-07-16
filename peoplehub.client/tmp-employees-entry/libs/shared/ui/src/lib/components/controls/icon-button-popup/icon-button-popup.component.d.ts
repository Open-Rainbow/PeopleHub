import type { ButtonSize, ButtonVariant } from '../../../models/button-control.types';
import * as i0 from "@angular/core";
export declare class IconButtonPopupComponent {
    description?: string;
    popupPosition: 'top' | 'bottom' | 'left' | 'right';
    popupBgColor: string;
    popupTxtColor: string;
    iconName: string;
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    isHovered: boolean;
    get positionClasses(): string;
    get arrowClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconButtonPopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconButtonPopupComponent, "ui-icon-button-popup", never, { "description": { "alias": "description"; "required": false; }; "popupPosition": { "alias": "popupPosition"; "required": false; }; "popupBgColor": { "alias": "popupBgColor"; "required": false; }; "popupTxtColor": { "alias": "popupTxtColor"; "required": false; }; "iconName": { "alias": "iconName"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=icon-button-popup.component.d.ts.map