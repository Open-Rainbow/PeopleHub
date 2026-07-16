import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ButtonNavigationComponent implements OnInit {
    private readonly router;
    private readonly stepperService;
    private readonly confirmPopupService;
    private readonly dataService;
    private readonly employeesService;
    readonly activeComponent: import("@angular/core").InputSignal<unknown>;
    readonly stepSaved: import("@angular/core").OutputEmitterRef<string>;
    readonly previewToggle: import("@angular/core").OutputEmitterRef<boolean>;
    private readonly steps;
    readonly isFirstStep: import("@angular/core").Signal<boolean>;
    readonly isLastStep: import("@angular/core").Signal<boolean>;
    readonly nextButtonLabel: import("@angular/core").Signal<"Submit" | "Next">;
    private isPreviewVisible;
    ngOnInit(): void;
    goNext(): void;
    goPrevious(): void;
    goPreview(): void;
    private findFormGroup;
    private navigateToStep;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonNavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonNavigationComponent, "employees-button-navigation", never, { "activeComponent": { "alias": "activeComponent"; "required": false; "isSignal": true; }; }, { "stepSaved": "stepSaved"; "previewToggle": "previewToggle"; }, never, never, true, never>;
}
//# sourceMappingURL=button-navigation.component.d.ts.map