import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { LeaveBalanceComponent } from '../leave-balance/leave-balance.component';
import { RecentLeaveRequestComponent } from '../recent-leave-request/recent-leave-request.component';

import { LeaveBalanceOverviewComponent } from '../leave-balance-overview/leave-balance-overview.component';
import { take } from 'rxjs';
import { CalendarComponent, ConfirmPopupService, DropdownComponent, LineChartComponent, TextAreaComponent, TextButtonComponent } from 'ui';
import { applyLeaveForm } from '../../config/form-configs/apply-leave.config';
import { ApplyLeave, LeaveCategoriesGroup } from '../../../../../../shared/ui/src/lib/models/common.model';
import { CommonService, DropdownConfigService, DropdownOption } from 'common';


@Component({
  selector: 'apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css',
  imports: [
    CalendarComponent,
    TextAreaComponent,
    TextButtonComponent,
    CommonModule,
    LeaveBalanceComponent,
    RecentLeaveRequestComponent,
    LeaveBalanceOverviewComponent,
    ReactiveFormsModule,
    DropdownComponent,
    LineChartComponent,
  ],
  standalone: true,
})
export class ApplyLeaveComponentcopy {
  formConfig: any = applyLeaveForm;
  showForm: boolean = false;
  applyLeaveForm!: FormGroup;
  isformOpen = false;

  selectedValue: number = 0;
  LeaveCard: LeaveCategoriesGroup[] = [
    {
      leaveTypeId: 7,
      leaveTypeName: 'Annual Leave',
      total: 18,
      used: 5,
      carryForward: 5,
      encashable: 10,
      color: '#2563eb',
      accentColor: 'hsl(217, 91%, 60%)',
      leaveCategory: 'Paid',
    },
    {
      leaveTypeId: 8,
      leaveTypeName: 'Sick Leave',
      total: 12,
      used: 4,
      carryForward: 5,
      encashable: 0,
      color: '#dc2626',
      accentColor: 'hsl(0, 84%, 60%)',
      leaveCategory: 'Paid',
    },
    {
      leaveTypeId: 1,
      leaveTypeName: 'Casual Leave',
      total: 8,
      used: 2,
      carryForward: 0,
      encashable: 0,
      color: '#f59e0b',
      accentColor: 'hsl(38, 92%, 50%)',
      leaveCategory: 'Paid',
    },
    {
      leaveTypeId: 5,
      leaveTypeName: 'Comp Off',
      total: 4,
      used: 1,
      carryForward: 0,
      encashable: 0,
      color: '#10b981',
      accentColor: 'hsl(160, 84%, 39%)',
      leaveCategory: 'Paid',
    },
    {
      leaveTypeId: 2,
      leaveTypeName: 'Earned Leave',
      total: 15,
      used: 3,
      carryForward: 5,
      encashable: 10,
      color: '#0ea5e9',
      accentColor: 'hsl(199, 89%, 48%)',
      leaveCategory: 'Paid',
    },
    {
      leaveTypeId: 4,
      leaveTypeName: 'Paternity Leave',
      total: 15,
      used: 0,
      carryForward: 5,
      encashable: 10,
      color: '#6366f1',
      accentColor: 'hsl(243, 75%, 59%)',
      leaveCategory: 'Special',
    },
    {
      leaveTypeId: 3,
      leaveTypeName: 'Maternity Leave',
      total: 182,
      used: 0,
      carryForward: 0,
      encashable: 0,
      color: '#db2777',
      accentColor: 'hsl(333, 71%, 51%)',
      leaveCategory: 'Special',
    },
    {
      leaveTypeId: 9,
      leaveTypeName: 'Sabbatical',
      total: 30,
      used: 0,
      carryForward: 0,
      encashable: 0,
      color: '#16a34a',
      accentColor: 'hsl(142, 71%, 45%)',
      leaveCategory: 'Special',
    },
    {
      leaveTypeId: 6,
      leaveTypeName: 'Unpaid Leave',
      total: 10,
      used: 1,
      carryForward: 0,
      encashable: 0,
      color: '#64748b',
      accentColor: 'hsl(215, 19%, 35%)',
      leaveCategory: 'Unpaid',
    },
    {
      leaveTypeId: 10,
      leaveTypeName: 'Study Leave',
      total: 5,
      used: 0,
      carryForward: 0,
      encashable: 0,
      color: '#7c3aed',
      accentColor: 'hsl(262, 83%, 58%)',
      leaveCategory: 'Special',
    },
  ];
  // Add leave type dropdown options
  leaveTypeOptions$!: Observable<DropdownOption[]>;

  applyLeave: ApplyLeave = new ApplyLeave();

  constructor(
    private commonService: CommonService,
    private confirmPopupService: ConfirmPopupService,
    private dropdownService: DropdownConfigService,
    private formService: CommonService,
    private route: ActivatedRoute,
  ) {
    // Initialize leave type options from service
    this.leaveTypeOptions$ = this.dropdownService.getOptions('leaveType');
  }

  deptOption = [
    {
      value: '2024',
      isDefault: true,
      textColor: 'blue',
      backgroundColor: 'black',
      isDisabled: false,
    },
    {
      value: '2025',
      isDefault: false,
      textColor: 'blue',
      backgroundColor: 'black',
      isDisabled: false,
    },
    {
      value: '2026',
      isDefault: false,
      textColor: 'green',
      backgroundColor: 'black',
      isDisabled: false,
    },
  ];

  allMonths: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  yearlyLeaveData: { [year: string]: number[] } = {
    '2024': [9, 5, 0, 1, 3, 2, 8, 1, 0, 4, 2, 5],
    '2025': [1, 2, 0, 5, 1, 0, 4, 3, 2, 1, 6, 2],
    '2026': [3, 2, 0, 5, 1, 0, 4, 5, 0, 2, 6, 7],
  };

  lineLabels: string[] = this.allMonths;
  // lineYAxisLabels: string[] = ['0', '5', '10', '15', '20', '25', '30'];
  lineSeriesLabels: string[] = ['Leaves Taken'];
  lineData: number[][] = [[]];
  lineColors: string[] = ['#4076ff'];
  lineStyles: ('solid' | 'dashed' | 'dotted')[] = ['solid'];
  lineVisible: boolean[] = [true];
  lineLineThickness: number[] = [2];
  lineLegendShapes: any[] = ['rectRounded'];

  showLeaveForm() {
    this.showForm = true;
    this.isformOpen = true;
  }

  CloseApplication() {
    this.showForm = true;
  }

  formatDate(date: string | null): string {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  //   submitApplication() {
  //       console.log("Submit button clicked");

  //     this.confirmPopupService.showValidation(this.applyLeaveForm, this.formConfig).subscribe();

  //       if (this.applyLeaveForm.invalid) {
  //     return;
  //   }

  //   const payload = this.applyLeaveForm.getRawValue();

  //  console.log("Payload Sending to API:", payload);

  //   this.formService.submitLeave(payload).subscribe({
  //     next: (res) => {
  //        console.log("API SUCCESS RESPONSE:", res);
  //       this.applyLeaveForm.reset();
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);
  //     }
  //   });
  //   }

  submitApplication() {
    console.log('clicked');

    this.confirmPopupService
      .showValidation(this.applyLeaveForm, this.formConfig)
      .subscribe();

    console.log('Form Valid:', this.applyLeaveForm.valid);
    console.log('Form Value:', this.applyLeaveForm.value);
    console.log('Form Errors:', this.applyLeaveForm.errors);

    if (this.applyLeaveForm.invalid) {
      console.log('Form is INVALID');
      return;
    }

    console.log('Form is VALID');

    const payload = this.applyLeaveForm.getRawValue();
    console.log('Payload:', payload);

    this.formService.submitLeave(payload).subscribe({
      next: (res) => {
        console.log('API SUCCESS:', res);
      },
      error: (err) => {
        console.error('API ERROR:', err);
      },
    });
  }
  selectedLeaveType: string = '';

  // openFormFromCard(leave: any) {
  //   this.selectedLeaveType = leave.leaveTypeName;

  //   this.isformOpen = true;
  //   this.showForm = true;

  //   this.applyLeaveForm.patchValue({
  //     leaveType: leave.leaveTypeName
  //   });
  // }

  openFormFromCard(leave: LeaveCategoriesGroup) {
    // debugger;
    this.selectedValue = leave.leaveTypeId;
    this.selectedLeaveType = leave.leaveTypeName;
    this.isformOpen = true;
    this.showForm = true;
    // console.log(this.applyLeaveForm);
    this.applyLeaveForm.get('leaveType')?.setValue(this.selectedLeaveType);
    console.log(this.applyLeaveForm.controls['leaveType'].value);

    // const controlName = this.formConfig.leaveType?.id || 'leaveType';

    // setTimeout(() => {
    //   this.leaveTypeOptions$.pipe(take(1)).subscribe((options: DropdownOption[]) => {
    //     const matchedOption = options.find(opt =>
    //       opt.name.replace(/[- ]/g, '').toLowerCase() === leave.leaveTypeName.replace(/[- ]/g, '').toLowerCase()
    //     );
    //     if (matchedOption) {
    //       this.applyLeaveForm.patchValue({
    //         [controlName]: matchedOption.value
    //       });
    //       console.log(this.selectedLeaveType);
    //     }
    //   });
    //   console.log(this.selectedLeaveType);
    // }, 0);
    // console.log(this.selectedLeaveType);
  }
  openEditForm(row: any) {
    this.isformOpen = true;
    this.showForm = true;

    const getValue = (name: string) =>
      row.find((c: any) => c.colName === name)?.value;

    const startDateRaw = getValue('Start Date');
    const endDateRaw = getValue('End Date');
    const leaveType = getValue('Leave Type');

    const actionCell = row.find((c: any) => c.colName === 'Action');
    const reason = actionCell?.value?.customReason || '';

    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    const controlName = this.formConfig.leaveType?.id || 'leaveType';

    setTimeout(() => {
      this.leaveTypeOptions$.pipe(take(1)).subscribe((options) => {
        const matchedOption = options.find(
          (opt) =>
            opt.name.replace(/[- ]/g, '').toLowerCase() ===
            leaveType.replace(/[- ]/g, '').toLowerCase(),
        );

        this.applyLeaveForm.patchValue({
          [this.formConfig.startDate.id]: startDate,
          [this.formConfig.endDate.id]: endDate,
          [controlName]: matchedOption?.value || '',
          [this.formConfig.reasonforLeave.id]: reason,
        });

        console.log('PATCHED VALUE:', this.applyLeaveForm.value);
      });
    }, 0);
  }
  ngOnInit() {
    this.applyLeaveForm = this.commonService.createForm(this.formConfig);
    this.updateChartData('2024');
    this.route.queryParams.subscribe((params) => {
      if (params['openForm'] === 'true') {
        this.showLeaveForm();
      }
    });
  }
  closeModal() {
    this.isformOpen = false;
  }
  filterByDept(event: any) {
    // console.log('Selected Year:', event);
    const selectedYear = event?.value || event;
    console.log('Selected Year:', selectedYear);

    this.updateChartData(selectedYear.toString());
  }
  updateChartData(year: string) {
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();

    let dataToDisplay = this.yearlyLeaveData[year] || [];
    let monthsToDisplay = this.allMonths;

    if (parseInt(year) === currentYear) {
      monthsToDisplay = this.allMonths.slice(0, currentMonthIndex + 1);
      dataToDisplay = dataToDisplay.slice(0, currentMonthIndex + 1);
    } else if (parseInt(year) > currentYear) {
      monthsToDisplay = [];
      dataToDisplay = [];
    }

    this.lineLabels = monthsToDisplay;
    this.lineData = [dataToDisplay];
  }
}
