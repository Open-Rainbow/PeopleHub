import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import type { ButtonGroupItem } from '../../../models/component-models/button-list-item.model';
import type { ButtonGroupOrientation, ButtonGroupSelectionMode, ButtonGroupSize, ButtonGroupVariant } from '../../../models/component-models/button-group.types';
import { IconComponent } from '../icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-button-group',
  imports: [CommonModule, IconComponent],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements OnChanges {
  @Input() items: ButtonGroupItem[] = [];
  @Input() variant: ButtonGroupVariant = 'default';
  @Input() size: ButtonGroupSize = 'md';
  @Input() orientation: ButtonGroupOrientation = 'horizontal';
  @Input() selectionMode: ButtonGroupSelectionMode = 'single';
  @Input() ariaLabel: string = 'Button group';
  @Input() selectedValues: string[] = [];

  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() buttonClick = new EventEmitter<ButtonGroupItem>();

  readonly _selected = signal<Set<string>>(new Set());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValues']) {
      this._selected.set(new Set(this.selectedValues));
    }
  }

  isSelected(value: string): boolean {
    return this._selected().has(value);
  }

  getContainerClasses(): string {
    const cls = ['ui-button-group', `ui-button-group--${this.variant}`, `ui-button-group--${this.size}`];
    if (this.orientation === 'vertical') cls.push('ui-button-group--vertical');
    return cls.join(' ');
  }

  getButtonClasses(item: ButtonGroupItem): string {
    const cls = ['ui-button-group__btn'];
    if (this.isSelected(item.value)) cls.push('ui-button-group__btn--active');
    if (item.disabled) cls.push('ui-button-group__btn--disabled');
    return cls.join(' ');
  }

  handleClick(item: ButtonGroupItem): void {
    if (item.disabled) return;

    if (this.selectionMode === 'single') {
      this._selected.set(new Set([item.value]));
    } else if (this.selectionMode === 'multiple') {
      const next = new Set(this._selected());
      if (next.has(item.value)) {
        next.delete(item.value);
      } else {
        next.add(item.value);
      }
      this._selected.set(next);
    }

    this.selectionChange.emit(Array.from(this._selected()));
    this.buttonClick.emit(item);
  }
}
