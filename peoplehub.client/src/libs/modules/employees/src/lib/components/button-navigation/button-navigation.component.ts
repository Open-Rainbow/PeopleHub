import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ConfirmPopupService, IconTextButtonComponent } from 'ui';
import { Step } from 'ui';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-button-navigation',
  standalone: true,
  imports: [IconTextButtonComponent],
  templateUrl: './button-navigation.component.html',
  styleUrls: ['./button-navigation.component.scss'],
})
export class ButtonNavigationComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly stepperService = inject(StepperService);
  private readonly confirmPopupService = inject(ConfirmPopupService);
  private readonly dataService = inject(EmployeeDataService);
  private readonly employeesService = inject(EmployeesService);
  readonly activeComponent = input<unknown>(null);

  readonly stepSaved = output<string>();
  readonly previewToggle = output<boolean>();

  private readonly steps = signal<Step[]>([]);

  /** Reactive copy of the stepper's current index (the service exposes a BehaviorSubject). */
  private readonly currentIndex = toSignal(this.stepperService.currentStep$, {
    initialValue: this.stepperService.getCurrentStep(),
  });

  readonly isFirstStep = computed(() => this.currentIndex() === 0);
  readonly isLastStep = computed(
    () => this.steps().length > 0 && this.currentIndex() === this.steps().length - 1,
  );
  readonly nextButtonLabel = computed(() =>
    this.isLastStep() ? 'Submit' : 'Next',
  );

  private isPreviewVisible = false;

  ngOnInit(): void {
    this.steps.set(this.stepperService.getSteps('addEmployee'));
    this.syncIndexFromUrl();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncIndexFromUrl();
        this.steps.set(this.stepperService.getSteps('addEmployee'));
      });
  }

  goNext(): void {
    const currentIndex = this.stepperService.getCurrentStep();
    const activeComp = this.activeComponent();
    const formGroup = this.findFormGroup(activeComp);

    if (formGroup) {
      if (formGroup.valid) {
        const currentRoute = this.steps()[currentIndex].route;
        const formValue = formGroup.value as Record<string, unknown>;

        if (currentRoute === 'personal-info') {
          this.employeesService.savePersonalInfo(formValue).subscribe({
            next: (response) => {
              this.dataService.setDataByRoute(currentRoute, {
                ...formValue,
                ...(response as Record<string, unknown>),
              });
              this.stepperService.setStepValidity(true);
              this.stepSaved.emit(this.steps()[currentIndex].title);
              this.steps.set(this.stepperService.getSteps('addEmployee'));

              if (currentIndex < this.steps().length - 1) {
                const nextIndex = currentIndex + 1;
                this.navigateToStep(this.steps()[nextIndex].route);
              }
            },
            error: (err: unknown) =>
              console.error('Failed to save personal info:', err),
          });

          return;
        }

        this.dataService.setDataByRoute(currentRoute, formValue);
        this.stepperService.setStepValidity(true);
        this.stepSaved.emit(this.steps()[currentIndex].title);
        this.steps.set(this.stepperService.getSteps('addEmployee'));
      } else {
        formGroup.markAllAsTouched();
        this.confirmPopupService.showValidation(
          formGroup as unknown as FormGroup,
          (activeComp as Record<string, unknown>)['formConfig'] as Record<
            string,
            unknown
          >,
        );
        return;
      }
    }

    if (currentIndex < this.steps().length - 1) {
      const nextIndex = currentIndex + 1;
      this.navigateToStep(this.steps()[nextIndex].route);
    } else if (currentIndex === this.steps().length - 1) {
      this.stepperService.validateAllSteps();
      this.steps.set(this.stepperService.getSteps('addEmployee'));

      const hasErrors = this.steps().some((s) => s.status === 'notComplete');
      if (!hasErrors) {
        const finalPayload = this.dataService.getAllData();
        this.employeesService.addEmployee(finalPayload).subscribe({
          next: () => this.stepSaved.emit('Employee'),
          error: (err) => console.error('Failed to submit employee:', err),
        });
      }
    }
  }

  goPrevious(): void {
    const currentIndex = this.stepperService.getCurrentStep();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      this.navigateToStep(this.steps()[prevIndex].route);
      this.stepperService.setCurrentStep(prevIndex);
      this.steps.set(this.stepperService.getSteps('addEmployee'));
    }
  }

  goPreview(): void {
    this.isPreviewVisible = !this.isPreviewVisible;
    this.previewToggle.emit(this.isPreviewVisible);
  }

  /** Keeps the stepper index in line with the URL (direct links, refresh, stepper clicks). */
  private syncIndexFromUrl(): void {
    const currentRoute = this.stepperService.getLastRouteSegment(this.router.url);
    const index = this.stepperService
      .getSteps('addEmployee')
      .findIndex((s) => s.route === currentRoute);

    if (index < 0) return;

    this.stepperService.setCurrentStep(index);

    if (this.dataService.getDataByRoute(currentRoute)) {
      this.stepperService.setStepValidity(true);
    }
  }

  private findFormGroup(
    component: unknown,
  ): { valid: boolean; markAllAsTouched(): void; value: unknown } | null {
    if (!component || typeof component !== 'object') return null;

    const comp = component as Record<string, unknown>;

    const activeFormGroupGetter = comp['getActiveFormGroup'];
    if (typeof activeFormGroupGetter === 'function') {
      const candidate = activeFormGroupGetter.call(comp);
      if (
        candidate &&
        typeof candidate === 'object' &&
        'controls' in candidate
      ) {
        return candidate as {
          valid: boolean;
          markAllAsTouched(): void;
          value: unknown;
        };
      }
    }

    for (const key in comp) {
      const candidate = comp[key];
      if (
        candidate &&
        typeof candidate === 'object' &&
        'controls' in candidate
      ) {
        return candidate as unknown as {
          valid: boolean;
          markAllAsTouched(): void;
          value: unknown;
        };
      }
    }
    return null;
  }

  private navigateToStep(targetRoute: string): void {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    const segments = currentPath.split('/').filter(Boolean);

    if (segments.length === 0) {
      return;
    }

    const addEmployeeIndex = segments.lastIndexOf('add-employee');
    if (addEmployeeIndex === -1) {
      return;
    }

    const baseSegments = segments.slice(0, addEmployeeIndex + 1);
    this.router.navigateByUrl(`/${[...baseSegments, targetRoute].join('/')}`);
  }
}
