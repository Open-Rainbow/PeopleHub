import { ButtonSize, ButtonVariant, IconPosition, NativeButtonType } from '../../../models/button-control.types';
import * as i0 from "@angular/core";
export declare class IconTextButtonComponent {
    text: import("@angular/core").InputSignal<string>;
    iconName: import("@angular/core").InputSignal<string>;
    iconPosition: import("@angular/core").InputSignal<IconPosition>;
    iconAriaHidden: import("@angular/core").InputSignal<boolean>;
    variant: import("@angular/core").InputSignal<ButtonVariant>;
    size: import("@angular/core").InputSignal<ButtonSize>;
    type: import("@angular/core").InputSignal<NativeButtonType>;
    disabled: import("@angular/core").InputSignal<boolean>;
    isExpanded: import("@angular/core").InputSignal<boolean>;
    buttonClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    buttonClass: import("@angular/core").Signal<string>;
    onButtonClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconTextButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconTextButtonComponent, "ui-icon-text-button", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "iconName": { "alias": "iconName"; "required": false; "isSignal": true; }; "iconPosition": { "alias": "iconPosition"; "required": false; "isSignal": true; }; "iconAriaHidden": { "alias": "iconAriaHidden"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "isExpanded": { "alias": "isExpanded"; "required": false; "isSignal": true; }; }, { "buttonClick": "buttonClick"; }, never, never, true, never>;
}
//# sourceMappingURL=icon-text-button.component.d.ts.map