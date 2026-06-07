import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconComponent } from 'ui';
import { Step } from 'ui';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-stepper',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);
  private readonly router = inject(Router);

  steps = signal<Step[]>([]);

  readonly completedCount = computed(() =>
    this.steps().filter(s => s.isValid === true && this.dataService.getDataByRoute(s.route) !== null).length
  );

  readonly totalCount = computed(() => this.steps().length);

  readonly progressPercent = computed(() =>
    this.totalCount() > 0 ? (this.completedCount() / this.totalCount()) * 100 : 0
  );

  ngOnInit(): void {
    this.steps.set(this.stepperService.getSteps('addEmployee'));

    this.stepperService.currentStep$.subscribe(() => {
      this.steps.set(this.stepperService.getSteps('addEmployee'));
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.steps.set(this.stepperService.getSteps('addEmployee'));
      });
  }

  onStepClick(step: Step, index: number): void {
    this.stepperService.setCurrentStep(index);
    this.navigateToStep(step.route);
    
    if (this.stepperService.isEntered()) {
      this.stepperService.validateAllSteps();
    }
    this.steps.set(this.stepperService.getSteps('addEmployee'));
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


