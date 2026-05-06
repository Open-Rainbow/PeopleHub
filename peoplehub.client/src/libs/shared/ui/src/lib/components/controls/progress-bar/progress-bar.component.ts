import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() total?: number = 12;
  @Input() used?: number = 3;
  @Input() remainingLabel?: string = 'remaining';
  @Input() barColor?: string = 'blueviolet';
  @Input() showBorderRadius?: boolean = true;
  @Input() totalTextColor?: string = '#374151';
  @Input() usedTextColor?: string = '#6b7280';
  @Input() remainingTextColor?: string = '#4f46e5';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() hideDetails?: boolean = true;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  remainingDays: number = 0;
  progressPercentage: number = 0;

  ngOnInit(): void {
    this.calculateProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] || changes['used']) {
      this.calculateProgress();
    }
  }

  private calculateProgress(): void {
    const totalValue = typeof this.total === 'number' && Number.isFinite(this.total)
      ? this.total
      : 0;
    const usedValue = typeof this.used === 'number' && Number.isFinite(this.used)
      ? this.used
      : 0;

    const safeTotal = Math.max(0, totalValue);
    const safeUsed = Math.max(0, Math.min(usedValue, safeTotal));

    this.remainingDays = safeTotal - safeUsed;
    this.progressPercentage = safeTotal > 0 ? (safeUsed / safeTotal) * 100 : 0;
  }
}
