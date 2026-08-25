import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ChipComponent,
  DropdownComponent,
  SearchComponent,
  TableComponent,
  TextButtonComponent,
  TableCellType,
  TableData,
  BaseCell,
} from 'ui';
import {
  CommonService,
  DropdownConfigService,
  DropdownOption,
} from 'common';
import { ConfirmPopupService } from 'ui';

@Component({
  selector: 'announcements-announcement-summary',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipComponent,
    DropdownComponent,
    SearchComponent,
    TableComponent,
    TextButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './announcement-summary.component.html',
  styleUrls: ['./announcement-summary.component.scss'],
})
export class AnnouncementSummaryComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly commonService = inject(CommonService);
  private readonly confirmPopupService = inject(ConfirmPopupService);
  private readonly dropdownService = inject(DropdownConfigService);

  @Output() editAnnouncement = new EventEmitter<Record<string, unknown>>();
  @Output() viewAnnouncement = new EventEmitter<Record<string, unknown>>();

  readonly categoryOptions$: Observable<DropdownOption[]> =
    this.dropdownService.getOptions('category');

  readonly searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  normalizedTableData: TableData = [];
  originalTableData: BaseCell[][] = [];
  selectedStatus = 'All';
  activeCount = 0;
  expiredCount = 0;

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  private mapType(type: string | undefined): TableCellType {
    if (type === 'user') return TableCellType.USER;
    if (type === 'text') return TableCellType.TEXT;
    return type as TableCellType;
  }

  loadAnnouncements(): void {
    this.commonService.getAddAnnouncements().subscribe((data: any[]) => {
      this.originalTableData = data.map((item) => [
        {
          colName: 'Id',
          key: 'id',
          type: 'user',
          isLink: false,
          thHidden: true,
          tdHidden: true,
          value: { title: item.id },
        },
        {
          colName: 'Title',
          type: 'user',
          isLink: true,
          value: { title: item.title, subtitle: item.description || '—' },
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Priority',
          type: 'text',
          value: item.priorityDesc,
          tdProperties: {
            fontProperties: {
              fontWeight:
                item.priorityDesc?.toLowerCase() === 'high' ? 'bold' : 'normal',
              fontColor:
                item.priorityDesc?.toLowerCase() === 'high' ? 'red' : '',
            },
          },
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Category',
          type: 'text',
          value: item.category,
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Department',
          type: 'text',
          value: item.department,
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Target Audience',
          type: 'text',
          value: item.targetAudience,
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Published',
          type: 'text',
          value: this.formatDate(new Date()),
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Expires',
          type: 'text',
          value: this.formatDate(item.expireOn),
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Status',
          type: 'text',
          value: this.getStatus(item.expireOn),
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'PostedBy',
          type: 'text',
          value: item.postedBy,
          showColIcon: true,
          colIconName: 'arrow_sort',
          colClickIconName: 'arrow_up_outline',
          colClickIconName2: 'arrow_down_outline',
        },
        {
          colName: 'Action',
          type: 'text',
          tdProperties: {
            showEditIcon: true,
            showDeleteIcon: true,
            showEditIconName: 'edit',
            showDeleteIconName: 'delete',
          },
        },
      ]) as BaseCell[][];

      this.applyStatusFilter(this.selectedStatus);
      this.calculateStatusCounts();
    });
  }

  private normalize(rows: BaseCell[][]): TableData {
    return rows.map((row) =>
      row.map((cell) => ({ ...cell, type: this.mapType(cell.type) })),
    ) as TableData;
  }

  formatDate(dateInput: string | Date | null): string {
    if (!dateInput) return '—';
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getStatus(expireOn: string): string {
    const today = new Date();
    const expiry = new Date(expireOn);
    return expiry >= today ? 'Active' : 'Expired';
  }

  calculateStatusCounts(): void {
    this.activeCount = 0;
    this.expiredCount = 0;
    this.originalTableData.forEach((row) => {
      const statusCell = row.find((cell) => cell.colName === 'Status');
      if (!statusCell) return;
      const status = (statusCell as any).value?.toLowerCase();
      if (status === 'active') this.activeCount++;
      if (status === 'expired') this.expiredCount++;
    });
  }

  applyStatusFilter(status: string): void {
    this.selectedStatus = status;
    let filteredData = this.originalTableData;
    if (status !== 'All') {
      filteredData = this.originalTableData.filter((row) => {
        const statusCell = row.find((cell) => cell.colName === 'Status');
        return (statusCell as any)?.value?.toLowerCase() === status.toLowerCase();
      });
    }
    this.normalizedTableData = this.normalize(filteredData);
  }

  rowSelected(): void {
    // no-op
  }

  linkClick(event: BaseCell[]): void {
    this.viewAnnouncement.emit(this.extractRowData(event, true));
  }

  editClicked(row: BaseCell[]): void {
    this.editAnnouncement.emit(this.extractRowData(row, false));
  }

  private extractRowData(
    row: BaseCell[],
    includePostedBy: boolean,
  ): Record<string, unknown> {
    const find = (name: string) => row.find((c) => c.colName === name) as any;
    const titleCell = find('Title');
    const data: Record<string, unknown> = {
      title: titleCell?.value?.title,
      description: titleCell?.value?.subtitle,
      priorityDesc: find('Priority')?.value,
      expireOn: find('Expires')?.value,
      category: find('Category')?.value,
      department: find('Department')?.value,
      targetAudience: find('Target Audience')?.value,
      published: find('Published')?.value,
    };
    if (includePostedBy) {
      data['postedBy'] = find('PostedBy')?.value;
    }
    return data;
  }

  deleteClicked(row: BaseCell[]): void {
    const titleCell = row.find((c) => c.colName === 'Title') as any;
    const title = titleCell?.value?.title;
    const idCell = row.find((c) => (c as any).key === 'id') as any;
    const id = idCell?.value?.title;
    this.confirmPopupService
      .showConfirm(
        'Announcement Delete',
        `Are you sure you want to delete "${title}"?`,
      )
      .subscribe((confirmed: string) => {
        if (confirmed === 'Yes') {
          this.commonService.deleteAnnouncement(id).subscribe((res) => {
            if (res) {
              this.confirmPopupService
                .showOk('Announcement', 'Announcement deleted successfully')
                .subscribe(() => this.loadAnnouncements());
            }
          });
        }
      });
  }

  onSearch(searchText: string): void {
    if (!searchText || searchText.trim() === '') {
      this.applyStatusFilter(this.selectedStatus);
      return;
    }
    const lowerSearch = searchText.toLowerCase();
    const filteredData = this.originalTableData.filter((row) => {
      const titleCell = row.find((cell) => cell.colName === 'Title') as any;
      const title = titleCell?.value?.title?.toLowerCase();
      return title?.includes(lowerSearch);
    });
    const finalData =
      this.selectedStatus === 'All'
        ? filteredData
        : filteredData.filter((row) => {
            const statusCell = row.find((cell) => cell.colName === 'Status') as any;
            return (
              statusCell?.value?.toLowerCase() ===
              this.selectedStatus.toLowerCase()
            );
          });
    this.normalizedTableData = this.normalize(finalData);
  }
}
