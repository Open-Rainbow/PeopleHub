import { ButtonSize, ButtonVariant, NativeButtonType } from '../../../models/button-control.types';
import * as i0 from "@angular/core";
export declare class TextButtonComponent {
    text: import("@angular/core").InputSignal<string>;
    variant: import("@angular/core").InputSignal<ButtonVariant>;
    size: import("@angular/core").InputSignal<ButtonSize>;
    type: import("@angular/core").InputSignal<NativeButtonType>;
    disabled: import("@angular/core").InputSignal<boolean>;
    isExpanded: import("@angular/core").InputSignal<boolean>;
    backgroundColor: import("@angular/core").InputSignal<string>;
    textColor: import("@angular/core").InputSignal<string>;
    borderColor: import("@angular/core").InputSignal<string>;
    hoverBackgroundColor: import("@angular/core").InputSignal<string>;
    hoverTextColor: import("@angular/core").InputSignal<string>;
    buttonClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    hasCustomColors: import("@angular/core").Signal<boolean>;
    buttonClass: import("@angular/core").Signal<string>;
    onButtonClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextButtonComponent, "ui-text-button", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "isExpanded": { "alias": "isExpanded"; "required": false; "isSignal": true; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; "isSignal": true; }; "textColor": { "alias": "textColor"; "required": false; "isSignal": true; }; "borderColor": { "alias": "borderColor"; "required": false; "isSignal": true; }; "hoverBackgroundColor": { "alias": "hoverBackgroundColor"; "required": false; "isSignal": true; }; "hoverTextColor": { "alias": "hoverTextColor"; "required": false; "isSignal": true; }; }, { "buttonClick": "buttonClick"; }, never, never, true, never>;
}
//# sourceMappingURL=text-button.component.d.ts.map