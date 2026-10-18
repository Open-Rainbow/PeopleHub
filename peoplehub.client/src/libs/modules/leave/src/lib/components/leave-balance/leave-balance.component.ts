import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent, IconComponent, ProgressBarComponent } from 'ui';
import { LeaveCategoriesGroup } from '../../../../../../shared/ui/src/lib/models/common.model';

/** Shape expected by ui-button-group items. */
interface CategoryButton {
  label: string;
  value: string;
  category: string;
}

@Component({
  selector: 'leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css',
  imports: [ProgressBarComponent, CommonModule, IconComponent, ButtonGroupComponent],
})
export class LeaveBalanceComponent implements OnInit {
  @Input() leaveCards: LeaveCategoriesGroup[] = [];
  @Output() applyLeaveClick = new EventEmitter<LeaveCategoriesGroup>();

  filteredLeaveCards: LeaveCategoriesGroup[] = [];
  leaveBalance!: FormGroup;
  categoryButtons: CategoryButton[] = [];
  selectedCategory = 'all';

  ngOnInit(): void {
    this.filteredLeaveCards = [...this.leaveCards];
    this.buildCategoryButtons();
  }

  onApplyClick(leave: LeaveCategoriesGroup): void {
    this.applyLeaveClick.emit(leave);
  }

  onCategoryClick(item: { value: string }): void {
    const button = this.categoryButtons.find((b) => b.value === item.value);
    if (!button) return;

    this.selectedCategory = button.value;
    this.filteredLeaveCards =
      button.value === 'all'
        ? [...this.leaveCards]
        : this.leaveCards.filter((l) => l.leaveCategory === button.category);
  }

  toggleExpanded(card: LeaveCategoriesGroup): void {
    card.expanded = !card.expanded;
  }

  remaining(total: number, used: number): number {
    return Math.max(total - used, 0);
  }

  trackByLeave = (_: number, item: LeaveCategoriesGroup) => item.leaveTypeName;

  private buildCategoryButtons(): void {
    const counts = this.leaveCards.reduce<Record<string, number>>((acc, card) => {
      acc[card.leaveCategory] = (acc[card.leaveCategory] || 0) + 1;
      return acc;
    }, {});

    this.categoryButtons = [
      { label: `All (${this.leaveCards.length})`, value: 'all', category: 'All' },
      ...Object.keys(counts).map((category, index) => ({
        label: `${category} (${counts[category]})`,
        value: `cat-${index}`,
        category,
      })),
    ];
  }
}
