import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { ButtonComponent } from '../../../common-ui/controls/button/button.component';
// import { DoughnutChartComponent } from '../../../common-ui/charts/doughnut-chart/doughnut-chart.component';
// import { ValueDropdownComponent } from '../../../common-ui/controls/value-dropdown/value-dropdown.component';
// import { CommonService } from '../../../common-ui/services/common/common.service';
import { FormGroup } from '@angular/forms';
import { DoughnutChartComponent, TextButtonComponent } from 'ui';
import { CommonService } from 'common';

@Component({
  selector: 'leave-balance-overview',
  standalone: true,
  templateUrl: './leave-balance-overview.component.html',
  styleUrl: './leave-balance-overview.component.css',
  imports: [ DoughnutChartComponent,TextButtonComponent],
})
export class LeaveBalanceOverviewComponent {
  //   leaveData: ILeaveData = {
  //   todayPresent: {
  //     total: 1206,
  //     count: 112,
  //     color: '#3b82f6',
  //     labelName: 'Today Presents',
  //   },
  //   plannedLeaves: {
  //     total: 1206,
  //     count: 128,
  //     color: '#ef4444',
  //     labelName: 'Planned Leaves',
  //   },
  //   unplannedLeaves: {
  //     total: 1206,
  //     count: 12,
  //     color: '#06b6d4',
  //     labelName: 'Unplanned Leaves',
  //   },
  //   pendingRequests: {
  //     total: 100,
  //     count: 10,
  //     color: '#f97316',
  //     labelName: 'Pending Requests',
  //   }
  // };

  //   @Input()
  //   leaveBalance: LeaveBalance = {
  //     totalDays: 20,
  //     usedDays: 8,
  //     remainingDays: 10,
  //     pendingDays: 2
  //   };

  //   ngOnInit(): void {

  //   this.getLeaveBalance();
  // }

  constructor(
    private commonService: CommonService,
    private router: Router,
  ) {}

  // getLeaveBalance(): void {
  //   this.commonService.getLeaveBalanceOverview('')
  //     .subscribe({
  //       next: (response: LeaveBalance) => {
  //         this.leaveBalance = response;
  //       },
  //       error: (error) => {
  //         console.error('Error fetching Leave Balance', error);
  //       }
  //     });
  // }

  // goToApplyLeave() {
  //   const role = this.router.url.split('/')[1];

  //   this.router.navigate([`/${role}/apply-leave`], {
  //     queryParams: { openForm: true }
  //   });
  // }

  // getPercentage(count?: number, total?: number): number {
  //   if (!count || !total) return 0;
  //   return Math.round((count / total) * 100);
  // }

  LeaveBalanceOverview!: FormGroup;
  goToApplyLeave() {
    const role = this.router.url.split('/')[1];

    this.router.navigate([`/${role}/apply-leave`], {
      queryParams: { openForm: true },
    });
  }
}
