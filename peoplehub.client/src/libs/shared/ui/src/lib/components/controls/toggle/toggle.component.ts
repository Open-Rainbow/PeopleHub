import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-toggle',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  standalone: true,
})
export class ToggleComponent implements OnInit {
  @Input() checked? = false;
  @Input() color? = '#4CAF50';
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() toggleChange = new EventEmitter<boolean>();
  @Input() label?: string = '';
  @Input() labelPosition?: 'left' | 'right' | 'both' = 'right';
  @Input() isRequired?: boolean = true;
  @Input() labelColor?: string = '#333';
  @Input() size?: 'large' | 'medium' | 'small' = 'small';
  @Input() enableLabelClick?: boolean = false;
  @Input() toggleOnlyMode?: boolean = true;
  @Input() offLabel?: string = '';
  @Input() onLabel?: string = '';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  onToggleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;

    this.checked = value;

    if (this.parentFormGroup?.get(this.id)) {
      this.parentFormGroup.get(this.id)?.setValue(value);
    }
    this.checkedChange.emit(value);
    this.toggleChange.emit(value);
  }

  get formControl() {
    return this.parentFormGroup?.get(this.id);
  }

  get leftLabelText(): string {
    if (!this.hasSeparateOnOffLabels) {
      return this.label ?? '';
    }
    // When custom labels are provided, use them
    return this.offLabel || this.label || '';
  }

  get rightLabelText(): string {
    if (!this.hasSeparateOnOffLabels) {
      return this.label ?? '';
    }
    // When custom labels are provided, use them
    return this.onLabel || this.label || '';
  }

  get hasSeparateOnOffLabels(): boolean {
    return !!this.offLabel || !!this.onLabel;
  }

  get canToggleFromLabel(): boolean {
    if (this.enableLabelClick !== undefined) {
      return this.enableLabelClick;
    }
    return !(this.toggleOnlyMode ?? true);
  }

  ngOnInit(): void {
    this.checked = !!this.formControl?.value;
  }

  @HostBinding('style.--toggle-active-color')
  get toggleActiveColor() {
    return this.color;
  }

  @HostBinding('style.--toggle-label-color')
  get hostToggleLabelColor() {
    return this.labelColor;
  }

  onLabelClick(forceValue?: boolean) {
    if (!this.canToggleFromLabel) return;

    if (forceValue !== undefined) {
      this.checked = forceValue;
    } else {
      this.checked = !this.checked;
    }

    this.parentFormGroup?.get(this.id)?.setValue(this.checked);

    this.checkedChange.emit(this.checked);
    this.toggleChange.emit(this.checked);
  }
}
