import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../employee-data/employee-data.service";
export const EMPLOYEE_STEPPER_CONFIG = {
    addEmployee: [
        {
            title: 'Personal Information',
            route: 'personal-info',
            status: 'active',
            isValid: false,
            icon: 'home',
        },
        {
            title: 'Contact Details',
            route: 'contact-info',
            status: 'pending',
            isValid: false,
            icon: 'fluent:call-24-regular',
        },
        {
            title: 'Family Details & Dependents',
            route: 'family-details',
            status: 'pending',
            isValid: false,
            icon: 'carbon:user-multiple',
        },
        {
            title: 'Employment Details',
            route: 'job-details',
            status: 'pending',
            isValid: false,
            icon: 'mingcute:suitcase-line',
        },
        {
            title: 'Education Details',
            route: 'education-details',
            status: 'pending',
            isValid: false,
            icon: 'qlementine-icons:education-16',
        },
        {
            title: 'Skills & Competencies',
            route: 'skills',
            status: 'pending',
            isValid: false,
            icon: 'tabler:brain',
        },
        {
            title: 'Compensation, Payroll & Bank',
            route: 'salary-structure',
            status: 'pending',
            isValid: false,
            icon: 'bx:dollar',
        },
        {
            title: 'Identity & Statutory Details',
            route: 'identity-statutory',
            status: 'pending',
            isValid: false,
            icon: 'qlementine-icons:id-card-16',
        },
        {
            title: 'Previous Employment',
            route: 'work-experience',
            status: 'pending',
            isValid: false,
            icon: 'f7:doc-plaintext',
        },
        {
            title: 'Insurance & Benefits',
            route: 'insurance-details',
            status: 'pending',
            isValid: false,
            icon: 'healthicons:health-insurance',
        },
        {
            title: 'Employee Documents',
            route: 'documents-upload',
            status: 'pending',
            isValid: false,
            icon: 'material-symbols:upload-rounded',
        },
        {
            title: 'System Access',
            route: 'temp-login-credentials',
            status: 'pending',
            isValid: false,
            icon: 'lucide:key',
        },
        {
            title: 'Separation & Exit Management',
            route: 'separation',
            status: 'pending',
            isValid: false,
            icon: 'tabler:logout',
        },
        {
            title: 'Assets & Compliance',
            route: 'assets',
            status: 'pending',
            isValid: false,
            icon: 'carbon:asset',
        },
        {
            title: 'Custom Fields / Additional Information',
            route: 'custom-fields-additional',
            status: 'pending',
            isValid: false,
            icon: 'material-symbols:list-alt-outline',
        },
        {
            title: 'Change Requests & Audit Trail',
            route: 'change-requests-audit',
            status: 'pending',
            isValid: false,
            icon: 'mdi:timeline-clock-outline',
        },
    ],
};
export class StepperService {
    route;
    dataService;
    currentStepIndex = new BehaviorSubject(0);
    currentStep$ = this.currentStepIndex.asObservable();
    isLast = false;
    constructor(route, dataService) {
        this.route = route;
        this.dataService = dataService;
    }
    setCurrentStep(index) {
        this.currentStepIndex.next(index);
    }
    getCurrentStep() {
        return this.currentStepIndex.value;
    }
    getSteps(type) {
        const steps = EMPLOYEE_STEPPER_CONFIG[type];
        const currentPath = this.getLastRouteSegment(this.route.url);
        return steps.map((step) => {
            if (step.route === currentPath) {
                step.status = 'active';
            }
            else if (this.isLast && !step.isValid) {
                step.status = 'notComplete';
            }
            else if (step.isValid) {
                step.status = 'completed';
            }
            else {
                step.status = 'pending';
            }
            return step;
        });
    }
    getStepIndexByRoute(route) {
        if (!route)
            return -1;
        const steps = this.getSteps('addEmployee');
        return steps.findIndex((step) => step.route === route);
    }
    getLastRouteSegment(path) {
        if (!path) {
            return '';
        }
        const cleanPath = path.split('?')[0].split('#')[0];
        const segments = cleanPath.split('/').filter(Boolean);
        return segments.length ? segments[segments.length - 1] : '';
    }
    setStepValidity(isValid) {
        const hostConfigPath = this.route.url;
        const routerPath = this.getLastRouteSegment(hostConfigPath);
        const index = this.getStepIndexByRoute(routerPath);
        const steps = this.getSteps('addEmployee');
        if (!steps[index])
            return;
        steps[index].isValid = isValid;
        if (isValid) {
            steps[index].status = 'completed';
        }
        else {
            if (steps[index].status !== 'active') {
                steps[index].status = 'pending';
            }
        }
    }
    validateAllSteps() {
        const steps = this.getSteps('addEmployee');
        const currentIndex = this.getCurrentStep();
        this.isLast = true;
        steps.forEach((step, index) => {
            const savedData = this.dataService.getDataByRoute(step.route);
            if (savedData) {
                step.isValid = true;
            }
            if (index === currentIndex) {
                step.status = 'active';
            }
            else if (step.isValid) {
                step.status = 'completed';
            }
            else {
                step.status = 'notComplete';
            }
        });
    }
    isEntered() {
        return this.isLast;
    }
    getTotalSteps(type) {
        return EMPLOYEE_STEPPER_CONFIG[type].length;
    }
    static ɵfac = function StepperService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StepperService)(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.EmployeeDataService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StepperService, factory: StepperService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StepperService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.Router }, { type: i2.EmployeeDataService }], null); })();
//# sourceMappingURL=stepper.service.js.map