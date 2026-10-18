import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent, IconTextButtonComponent, AccordionComponent, ChipComponent, AccordionGroupComponent } from 'ui';
import { LeaveCategory, LeaveItem, LeaveManagementSummary } from '../../config/form-configs/leave-management.types';
import { AddLeaveType } from '../add-leave-type/add-leave-type';

@Component({
  selector: 'leave-management-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownComponent,
    IconTextButtonComponent,
    AccordionComponent,
    AccordionGroupComponent,
    ChipComponent,
    AddLeaveType,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-management.component.html',
})
export class LeaveManagementComponent {
  readonly currentYear = new Date().getFullYear();
  selectedYear = this.currentYear;
  selectedEmploymentType = 1;

  readonly years = Array.from({ length: 5 }, (_, index) => this.currentYear - index);
  readonly employmentTypes = ['Full-Time', 'Part-Time', 'Contract'];
  readonly employmentTypeDropdownOptions = [
    { name: 'Full-Time', value: 1 },
    { name: 'Part-Time', value: 2 },
    { name: 'Contract', value: 3 },
  ];
  readonly yearDropdownOptions = this.years.map(year => ({ name: String(year), value: year }));

  categories: LeaveCategory[] = [
    { id: 'standard', name: 'Standard', expanded: true },
    { id: 'parental', name: 'Parental', expanded: false },
    { id: 'additional', name: 'Additional', expanded: true },
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
    const totalAnnualAllowance = this.leaves.reduce((total, leave) => total + leave.annualAllowance, 0);
    const paidLeaves = this.leaves.filter(leave => leave.paidLeave).length;
    const unpaidLeaves = this.leaves.filter(leave => !leave.paidLeave).length;
    const totalCarryForward = this.leaves.reduce((total, leave) => total + leave.carryForwardDays, 0);
    const encashableLeaves = this.leaves.filter(leave => leave.enhancementAllowed).length;
    const managerApprovalCount = this.leaves.filter(leave => leave.approvalType === 'Manager').length;

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

  getCategoryLeaves(categoryId: string): LeaveItem[] {
    return this.leaves.filter(leave => leave.categoryId === categoryId);
  }

  getCategoryAllowance(categoryId: string): number {
    return this.getCategoryLeaves(categoryId).reduce((total, leave) => total + leave.annualAllowance, 0);
  }

  onYearChange(value: unknown): void {
    const year = Number(value);
    if (Number.isFinite(year) && this.years.includes(year)) {
      this.selectedYear = year;
    }
  }

  onEmploymentTypeChange(value: unknown): void {
    const employmentTypeId = Number(value);
    const isValid = this.employmentTypeDropdownOptions.some(option => option.value === employmentTypeId);
    if (isValid) {
      this.selectedEmploymentType = employmentTypeId;
    }
  }

  get selectedEmploymentTypeName(): string {
    return this.employmentTypeDropdownOptions.find(option => option.value === this.selectedEmploymentType)?.name ?? '';
  }

  createNewYearPolicy(): void {
    console.log('Create new year policy:', this.selectedYear);
  }

  saveDraft(): void {
    console.log('Save draft', {
      year: this.selectedYear,
      employmentType: this.selectedEmploymentTypeName,
      leaves: this.leaves,
    });
  }

  publishPolicy(): void {
    console.log('Publish policy', {
      year: this.selectedYear,
      employmentType: this.selectedEmploymentTypeName,
      leaves: this.leaves,
    });
  }

  showAddLeave = false;

  addLeave(): void {
    this.showAddLeave = true;
  }

  closeAddLeave(): void {
    this.showAddLeave = false;
  }

  onSaveLeave(leaveData: Record<string, unknown>): void {
    console.log('Leave saved:', leaveData);
    this.showAddLeave = false;
  }
}
