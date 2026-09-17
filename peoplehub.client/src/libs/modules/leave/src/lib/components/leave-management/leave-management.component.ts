import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent, DropdownComponent, NumberBoxComponent, TextButtonComponent, IconTextButtonComponent, AccordionComponent, ChipComponent } from 'ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LeaveCategory, LeaveItem, LeaveManagementSummary } from '../../config/form-configs/leave-management.types';
import { AccordionGroupComponent } from '../../../../../../shared/ui/src/lib/components/primitives/accordion/accordion-group.component';

@Component({
  selector: 'leave-management-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToggleComponent, DropdownComponent, NumberBoxComponent, TextButtonComponent, IconTextButtonComponent,AccordionComponent,AccordionGroupComponent,ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-management.component.html',
})
export class LeaveManagementComponent {
 readonly currentYear = new Date().getFullYear();

  selectedYear = this.currentYear;

  selectedEmploymentType = 'Full-Time';


  readonly years = Array.from(
    { length: 5 },
    (_, index) => this.currentYear - index,
  );




  readonly employmentTypes = [
    'Full-Time',
    'Part-Time',
    'Contract',
  ];

    readonly employmentTypeDropdownOptions = this.employmentTypes.map(type => ({
    label: type,
    value: type,
  })); 

  readonly yearDropdownOptions = this.years.map(year => ({
  name: String(year),
  value: year,
}));

  categories: LeaveCategory[] = [
    {
      id: 'standard',
      name: 'Standard',
      expanded: true,
    },
    {
      id: 'parental',
      name: 'Parental',
      expanded: false,
    },
    {
      id: 'additional',
      name: 'Additional',
      expanded: true,
    },
  ];


  leaves: LeaveItem[] = [

    {
      id: 1,
      categoryId: 'standard',
      name: 'Annual Leave',
      description: 'Annual leave',
      annualAllowance: 1,
      carryForwardDays: 1,
      paidLeave: true,
      enhancementAllowed: true,
      anyCertificates: false,
      certificateRequiredAfterDays: null,
      approvalType: 'Manager',
    },

    {
      id: 2,
      categoryId: 'standard',
      name: 'Work Leave',
      description: 'Work related leave',
      annualAllowance: 1,
      carryForwardDays: 1,
      paidLeave: true,
      enhancementAllowed: true,
      anyCertificates: true,
      certificateRequiredAfterDays: 1,
      approvalType: 'Manager',
    },

  ];


  get summary(): LeaveManagementSummary {
    const totalLeaveTypes = this.leaves.length;
    const totalAnnualAllowance = this.leaves.reduce(
      (total, leave) =>
        total + leave.annualAllowance,
      0,
    );

    const paidLeaves = this.leaves.filter(
      leave => leave.paidLeave,
    ).length;

    const unpaidLeaves = this.leaves.filter(
      leave => !leave.paidLeave,
    ).length;

    const totalCarryForward = this.leaves.reduce(
      (total, leave) =>
        total + leave.carryForwardDays,
      0,
    );

    const encashableLeaves = this.leaves.filter(
      leave => leave.enhancementAllowed,
    ).length;

    const managerApprovalCount = this.leaves.filter(
      leave => leave.approvalType === 'Manager',
    ).length;


    return {
      totalLeaveTypes,
      totalAnnualAllowance,
      paidLeaves,
      unpaidLeaves,
      totalCarryForward,
      encashableLeaves,
      managerApprovalCount,
    };
  }


  getCategoryLeaves(
    categoryId: string,
  ): LeaveItem[] {

    return this.leaves.filter(
      leave => leave.categoryId === categoryId,
    );
  }


  getCategoryAllowance(
    categoryId: string,
  ): number {

    return this.getCategoryLeaves(categoryId)
      .reduce(
        (total, leave) =>
          total + leave.annualAllowance,
        0,
      );
  }


  // toggleCategory(
  //   categoryId: string,
  // ): void {

  //   const category = this.categories.find(
  //     item => item.id === categoryId,
  //   );

  //   if (!category) {
  //     return;
  //   }

  //   category.expanded = !category.expanded;
  // }


 onYearChange(event: Event): void {
  const value = (
    event.target as HTMLSelectElement
  ).value;

  this.selectedYear = Number(value);
}

onEmploymentTypeChange(event: Event): void {
  this.selectedEmploymentType = (
    event.target as HTMLSelectElement
  ).value;
}

createNewYearPolicy(): void {

    console.log(
      'Create new year policy:',
      this.selectedYear,
    );
  }


  saveDraft(): void {

    console.log(
      'Save draft',
      {
        year: this.selectedYear,
        employmentType:
          this.selectedEmploymentType,
        leaves: this.leaves,
      },
    );
  }


  publishPolicy(): void {

    console.log(
      'Publish policy',
      {
        year: this.selectedYear,
        employmentType:
          this.selectedEmploymentType,
        leaves: this.leaves,
      },
    );
  }


  addLeave(): void {

    console.log('Add Leave clicked');
  }
}


