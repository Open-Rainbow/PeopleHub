import { ToastMessage } from 'ui';
import * as i0 from "@angular/core";
export declare class AddEmployeeComponent {
    currentComponent: import("@angular/core").WritableSignal<unknown>;
    showPreview: import("@angular/core").WritableSignal<boolean>;
    toasts: import("@angular/core").WritableSignal<ToastMessage[]>;
    private toastCounter;
    onComponentActivate(componentRef: unknown): void;
    handleStepSuccess(stepName: string): void;
    removeToast(id: number): void;
    togglePreview(visible: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddEmployeeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddEmployeeComponent, "employees-add-employee", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=add-employee.component.d.ts.map