import { Router } from '@angular/router';
import { Step, StepperType } from 'ui';
import { EmployeeDataService } from '../employee-data/employee-data.service';
import * as i0 from "@angular/core";
export declare const EMPLOYEE_STEPPER_CONFIG: Record<StepperType, Step[]>;
export declare class StepperService {
    private route;
    private dataService;
    private currentStepIndex;
    currentStep$: import("rxjs").Observable<number>;
    private isLast;
    constructor(route: Router, dataService: EmployeeDataService);
    setCurrentStep(index: number): void;
    getCurrentStep(): number;
    getSteps(type: StepperType): Step[];
    getStepIndexByRoute(route: string): number;
    getLastRouteSegment(path: string): string;
    setStepValidity(isValid: boolean): void;
    validateAllSteps(): void;
    isEntered(): boolean;
    getTotalSteps(type: StepperType): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StepperService>;
}
//# sourceMappingURL=stepper.service.d.ts.map