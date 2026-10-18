import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastStackComponent, ToastMessage } from 'ui';
import { StepperComponent } from '../stepper/stepper.component';
import { ButtonNavigationComponent } from '../button-navigation/button-navigation.component';
import { EMPLOYEE_STEPPER_CONFIG, StepperService } from '../../services/stepper/stepper.service';

const STEP_DESCRIPTIONS: Record<string, string> = {
  'personal-info': 'Basic identity details of the employee.',
  'contact-info': 'How to reach the employee, their addresses and emergency contacts.',
  'family-details': 'Family members and dependents.',
  'job-details': 'Role, department, reporting line and employment terms.',
  'education-details': 'Degrees, institutions and certifications.',
  skills: 'Key skills and proficiency levels.',
  'salary-structure': 'Payroll configuration and bank account details.',
  'identity-statutory': 'Statutory numbers, identity documents and supporting files.',
  'work-experience': 'Previous employers and roles.',
  'insurance-details': 'Insurance policies, covered members and nominees.',
  'documents-upload': 'Upload ID proofs and employment documents.',
  'temp-login-credentials': 'Application access and login setup.',
  separation: 'Resignation, notice period and exit details.',
  assets: 'Company assets issued and compliance items.',
  'change-requests-audit': 'Change requests and audit remarks.',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-add-employee',
  standalone: true,
  imports: [RouterModule, StepperComponent, ButtonNavigationComponent, ToastStackComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  private readonly router = inject(Router);
  private readonly stepperService = inject(StepperService);

  currentComponent = signal<unknown>(null);
  showPreview = signal(false);
  toasts = signal<ToastMessage[]>([]);
  private toastCounter = 0;

  private readonly steps = EMPLOYEE_STEPPER_CONFIG.addEmployee;
  readonly stepCount = this.steps.length;
  readonly stepIndex = signal(0);
  readonly currentStep = computed(() => this.steps[this.stepIndex()]);
  readonly stepDescription = computed(
    () => STEP_DESCRIPTIONS[this.currentStep()?.route ?? ''] ?? '',
  );

  constructor() {
    this.syncStep();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.syncStep());
  }

  onComponentActivate(componentRef: unknown): void {
    this.currentComponent.set(componentRef);
    this.syncStep();
  }

  handleStepSuccess(stepName: string): void {
    this.toasts.update(list => [
      ...list,
      {
        id: ++this.toastCounter,
        title: 'Saved',
        subtitle: `${stepName} details saved successfully!`,
        type: 'success',
        duration: 2000,
        icon: 'charm:tick',
      },
    ]);
  }

  removeToast(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  togglePreview(visible: boolean): void {
    this.showPreview.set(visible);
  }

  private syncStep(): void {
    const segment = this.stepperService.getLastRouteSegment(this.router.url);
    const index = this.steps.findIndex((step) => step.route === segment);
    this.stepIndex.set(index >= 0 ? index : 0);
  }
}
