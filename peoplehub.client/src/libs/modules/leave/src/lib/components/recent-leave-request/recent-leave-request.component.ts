import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
// import { ButtonComponent } from '../../../common-ui/controls/button/button.component';
// import { TooltipDirective } from '../../../common-ui/feature-components/tooltip/directive/tooltip.directive';
import { CommonModule } from '@angular/common';
import { IconComponent, TableCellType, TableComponent, TableData, TextButtonComponent } from 'ui';
import { TooltipDirective } from 'directives';
import { CommonService } from 'common';
import { IconPanelCell } from '../../../../../../shared/ui/src/lib/models/table.model';
// import { CommonService } from '../../../common-ui/services/common/common.service';
// import { IconComponent } from '../../../common-ui/feature-components/icon/icon.component';
// import { TableComponent } from '../../../common-ui/feature-components/table/table.component';
// import {
//   ICON_PANELCell,
//   TableCellType,
//   TableData,
// } from '../../../common-ui/assests/view-models/tabel-view-model';


export interface LeaveRequest {
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  fromDate: string;
  toDate: string;
  applyOn: string;
  description: string;
  totalDays: number;
  used: number;
}

@Component({
  selector: 'recent-leave-request',
  templateUrl: './recent-leave-request.component.html',
  styleUrl: './recent-leave-request.component.css',
  imports: [
    TextButtonComponent,
    TooltipDirective,
    CommonModule,
    IconComponent,
    TableComponent,
    
  ],
})
export class RecentLeaveRequestComponent {
  @ViewChild('actionMenu', { static: true }) actionMenuTable!: TemplateRef<any>;

  @Output() editLeave = new EventEmitter<any>();
  onEdit(data: any) {
    console.log('ROW DATA:', data);
    this.editLeave.emit(data);
  }
  @Input() data: any[] = [];
  appId1: any;
  isformOpen = false;

  // commonService: any;

  constructor(private commonService: CommonService) {}
  leaveTableData: TableData = [];
  ngOnInit() {
    this.prepareTable();
  }
  ngAfterViewInit() {
    //Bind the template to all ICON_PANEL cells after the view initializes
    this.leaveTableData.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === TableCellType.ICON_PANEL) {
          (cell as IconPanelCell).value!.panelContent = this.actionMenuTable;
        }
      });
    });
  }

  selectedRow: any = null;

  confirmDelete(row: any) {
    this.selectedRow = row;
    this.isformOpen = true;
  }

  deleteLeave() {
    console.log('Deleting:', this.selectedRow);

    this.leaveTableData = this.leaveTableData.filter(
      (r) => r !== this.selectedRow,
    );

    this.closeModal();
  }

  closeModal() {
    this.isformOpen = false;
    this.selectedRow = null;
  }
  calculateDays(fromDate: string, toDate?: string): number {
    const from = new Date(fromDate);
    const to = new Date(toDate || fromDate);
    return Math.ceil((+to - +from) / 86400000) + 1;
  }

  isTruncated(text: string, limit: number): boolean {
    return !!text && text.length > limit;
  }

  leaveDescription(text: string, limit: number): string {
    if (!text) return '';
    if (text.length <= limit) return text;

    let trimmed = text.substring(0, limit);

    if (text.charAt(limit) !== ' ' && trimmed.lastIndexOf(' ') !== -1) {
      trimmed = trimmed.substring(0, trimmed.lastIndexOf(' '));
    }

    trimmed = trimmed.trim();

    return trimmed + '...';
  }

  // getReason(row: any): string {
  //   if (!row) return 'No reason provided';
  //   const actionCell = row.find((col: any) => col.colName === 'Action');
  //   return actionCell?.customReason || 'No reason provided';
  // }

  getReason(row: any): string {
    if (!row || !Array.isArray(row)) return 'No reason provided';

    const actionCell = row.find((col: any) => col.colName === 'Action');

    return actionCell?.value?.customReason || 'No reason provided';
  }

  prepareTable() {
    this.leaveTableData = [
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          // colIconName: 'arrow_up_outline',
          // colIconName2: 'arrow_down_outline',
          // showColIcon: true,
          showColIcon: true,
          colIconName: 'arrow_sort',

          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
          value: 'Study Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 14, 2026',
          // colIconName: 'arrow_up_outline',
          // colIconName2: 'arrow_down_outline',
          // showColIcon: true,
          showColIcon: true,
          colIconName: 'arrow_sort',

          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 18, 2026',
          // colIconName: 'arrow_up_outline',
          // colIconName2: 'arrow_down_outline',
          // showColIcon: true,
          showColIcon: true,
          colIconName: 'arrow_sort',

          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          // colIconName: 'arrow_up_outline',
          // colIconName2: 'arrow_down_outline',
          // showColIcon: true,
          showColIcon: true,
          colIconName: 'arrow_sort',

          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
          value: '5',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Pending',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 11, 2026',
          // colIconName: 'arrow_up_outline',
          // colIconName2: 'arrow_down_outline',
          // showColIcon: true,
          showColIcon: true,
          colIconName: 'arrow_sort',

          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],

      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Study Leave',
          tdProperties: {
            fontProperties: { fontWeight: '600', fontColor: '#DC2626' },
          },
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 14, 2026',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 18, 2026',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          value: '5',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Pending',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 11, 2026',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],

      // Row 2
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Annual Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Mar 05, 2026',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Mar 07, 2026',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          value: '3',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Approved',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 08, 2026',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Annual Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Mar 05, 2026',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Mar 07, 2026',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          value: '3',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Approved',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 08, 2026',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: 'Study Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 14, 2026',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 18, 2026',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: '5',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Pending',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 11, 2026',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: 'Study Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 14, 2026',
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 18, 2026',
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: '5',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Pending',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 11, 2026',
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],
      [
        {
          colName: 'Leave Type',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: 'Study Leave',
        },
        {
          colName: 'Start Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 14, 2026',
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
        },
        {
          colName: 'End Date',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Apr 18, 2026',
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
        },
        {
          colName: 'Days',
          width: '15%',
          type: TableCellType.TEXT,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
          value: '5',
        },
        {
          colName: 'Status',
          width: '15%',
          type: TableCellType.CHIP,
          value: {
            status: 'Pending',
          },
        },
        {
          colName: 'Applied On',
          width: '15%',
          type: TableCellType.TEXT,
          value: 'Feb 11, 2026',
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          showColIcon: true,
        },
        {
          colName: 'Action',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'dots_horizontal',
            customReason: 'My Life My Rule',
          },
        },
      ],
    ];
  }

  approveLeave(leave: LeaveRequest) {
    const updatedLeave: LeaveRequest = {
      ...leave,
      status: 'Approved',
    };
    this.commonService.getLeaveApprovals(updatedLeave).subscribe((data) => {});
  }
  rejectLeave(leave: LeaveRequest) {
    const updatedLeave: LeaveRequest = {
      ...leave,
      status: 'Rejected',
    };
    this.commonService.getLeaveApprovals(updatedLeave).subscribe((data) => {});
  }
  // getDBA_RecentLeaveRequest() {

  //     const parameters = {
  //       appId1: this.appId1,
  //     };

  //     this.commonService
  //       .getRecentLeaveRequest(parameters)
  //       .subscribe((data: any) => {
  //         this.RecentLeaveRequest = data;
  //       });
  //   }
}
