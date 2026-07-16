import { ButtonSize, ButtonVariant, NativeButtonType } from '../../../models/button-control.types';
import * as i0 from "@angular/core";
export declare class IconButtonComponent {
    iconName: import("@angular/core").InputSignal<string>;
    ariaLabel: import("@angular/core").InputSignal<string>;
    title: import("@angular/core").InputSignal<string>;
    variant: import("@angular/core").InputSignal<ButtonVariant>;
    size: import("@angular/core").InputSignal<ButtonSize>;
    type: import("@angular/core").InputSignal<NativeButtonType>;
    disabled: import("@angular/core").InputSignal<boolean>;
    isExpanded: import("@angular/core").InputSignal<boolean>;
    buttonClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    buttonClass: import("@angular/core").Signal<string>;
    onButtonClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconButtonComponent, "ui-icon-button", never, { "iconName": { "alias": "iconName"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "isExpanded": { "alias": "isExpanded"; "required": false; "isSignal": true; }; }, { "buttonClick": "buttonClick"; }, never, never, true, never>;
}
//# sourceMappingURL=icon-button.component.d.ts.map