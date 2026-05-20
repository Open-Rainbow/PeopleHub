import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastStackComponent, ToastMessage } from 'ui';
import { StepperComponent } from '../stepper/stepper.component';
import { ButtonNavigationComponent } from '../button-navigation/button-navigation.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-add-employee',
  standalone: true,
  imports: [RouterModule, StepperComponent, ButtonNavigationComponent, ToastStackComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  currentComponent = signal<unknown>(null);
  showPreview = signal(false);
  toasts = signal<ToastMessage[]>([]);
  private toastCounter = 0;

  onComponentActivate(componentRef: unknown): void {
    this.currentComponent.set(componentRef);
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
}
