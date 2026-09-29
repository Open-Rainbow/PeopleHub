import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { ProgressBarComponent } from "../../../common-ui/controls/progress-bar/progress-bar.component";
import { FormGroup } from '@angular/forms';
// import { LeaveCategoriesGroup } from '../../../common-ui/assests/view-models/common-view-models';
// import { ButtonlistComponent } from '../../../common-ui/feature-components/buttonlist/buttonlist.component';
import { CommonModule } from '@angular/common';
import { IconComponent, ProgressBarComponent } from 'ui';
import { LeaveCategoriesGroup } from '../../../../../../shared/ui/src/lib/models/common.model';

// import { IconComponent } from '../../../common-ui/feature-components/icon/icon.component';

@Component({
    selector: 'leave-balance',
    templateUrl: './leave-balance.component.html',
    styleUrl: './leave-balance.component.css',
    imports: [ProgressBarComponent, CommonModule, IconComponent]
})
export class LeaveBalanceComponent {
    @Input() leaveCards: LeaveCategoriesGroup[] = [];
    filteredLeaveCards: LeaveCategoriesGroup[] = [];
    leaveBalance!: FormGroup;
    buttonData: any[] = [];
    @Output() applyLeaveClick = new EventEmitter<LeaveCategoriesGroup>();
    
    selectedCategoryId: number = 1;

    onApplyClick(leave: LeaveCategoriesGroup) {
        this.applyLeaveClick.emit(leave);
    }
    ngOnInit() {
        this.filteredLeaveCards = [...this.leaveCards];
        this.generateButtonData();
    }

    private generateButtonData(): void {

        const totalCount = this.leaveCards.length;

        const categoryCounts = this.leaveCards.reduce((acc: any, card) => {
            acc[card.leaveCategory] = (acc[card.leaveCategory] || 0) + 1;
            return acc;
        }, {});

        this.buttonData = [
            {
                label: 'All',
                labelId: 1,
                showIcon: false,
                showCount: true,
                count: totalCount
            },
            ...Object.keys(categoryCounts).map((category, index) => ({
                label: category,
                labelId: index + 2,
                showIcon: false,
                showCount: true,
                count: categoryCounts[category]
            }))
        ];
    }

    buttonClick(event: any) {
        const selectedCategory = event.label;

        this.selectedCategoryId = event.labelId;
        
        this.filteredLeaveCards =
            selectedCategory === 'All'
                ? [...this.leaveCards]
                : this.leaveCards.filter(l => l.leaveCategory === selectedCategory);
    }

    toggleExpanded(card: LeaveCategoriesGroup): void {
        card.expanded = !card.expanded;
    }

    remaining(total: number, used: number): number {
        return Math.max(total - used, 0);
    }
    trackByLeave = (_: number, item: LeaveCategoriesGroup) =>
        item.leaveTypeName;
}
