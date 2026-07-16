import { OnInit } from '@angular/core';
import { Step } from 'ui';
import * as i0 from "@angular/core";
export declare class StepperComponent implements OnInit {
    private readonly stepperService;
    private readonly dataService;
    private readonly router;
    steps: import("@angular/core").WritableSignal<Step[]>;
    readonly completedCount: import("@angular/core").Signal<number>;
    readonly totalCount: import("@angular/core").Signal<number>;
    readonly progressPercent: import("@angular/core").Signal<number>;
    ngOnInit(): void;
    onStepClick(step: Step, index: number): void;
    private navigateToStep;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperComponent, "employees-stepper", never, {}, {}, never, never, true, never>;
}
//# sourceMappingURL=stepper.component.d.ts.map