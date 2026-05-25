import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { StepperService } from '../../services/stepper/stepper.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-salary-structure',
  standalone: true,
  imports: [],
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.scss'],
})
export class SalaryStructureComponent implements OnInit {
  private readonly stepperService = inject(StepperService);

  ngOnInit(): void {
    // Salary structure is currently a placeholder step
    // Step validity is set to false until implemented
    this.stepperService.setStepValidity(false);
  }
}
