import { EventEmitter } from '@angular/core';
import { ToastMessage } from '../../../models/common.model';
import * as i0 from "@angular/core";
export declare class ToastStackComponent {
    private readonly toastInstanceKeys;
    private nextToastInstanceKey;
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    toasts: ToastMessage[];
    toastClosed: EventEmitter<number>;
    removeToast(id: number): void;
    trackByToastInstance(_index: number, toast: ToastMessage): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastStackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastStackComponent, "ui-toast-stack", never, { "position": { "alias": "position"; "required": false; }; "toasts": { "alias": "toasts"; "required": false; }; }, { "toastClosed": "toastClosed"; }, never, never, true, never>;
}
//# sourceMappingURL=toast-stack.component.d.ts.map