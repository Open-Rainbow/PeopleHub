import { CommonModule } from '@angular/common';
import { Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
    SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    BaseCell,
    FontProperties,
    IconCell,
    IconPanelCell,
    IconPopoverCell,
    ImageCell,
    TableCell,
    TableCellType,
    TableData,
    TableRow,
    TextCell,
    UserCell,
    ValueDropdownCell,
} from '../../../models/table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class TableComponent {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  nameSortState: number = 0;
  draggedRowIndex: number = -1;
  historyStack: { data: TableData; index: number }[] = [];
  redoStack: { data: TableData; index: number }[] = [];
  daySortDirection: { [key: number]: number } = {};
  leaveSortState: number = 0;
  @Input() topPagination: boolean = true;
  @Input() bottomPagination: boolean = true;
  @Input() showSerialNo: boolean = true;
  @Input() showUndoRedo: boolean = true;
  @Input() canDrag: boolean = false;
  @Input() showCheckbox: boolean = true;
  @Input() alternateRowColor: boolean = true;
  @Input() customRowColor: string = '#dbeafe';
  @Input() thRadius: string = '';
  @Input() trRadius: string = '';
  dragOverIndex: number = -1;

  selectedRows: Set<BaseCell[]> = new Set();
  @Output() rowSelected = new EventEmitter<BaseCell[]>();
  @Output() linkClick = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<BaseCell[]>();
  @Output() deleteClicked = new EventEmitter<BaseCell[]>();
  @Output() dropdownChanged = new EventEmitter<{
    row: TableRow;
    cell: ValueDropdownCell;
    newValue: any;
  }>();
  originalTable: TableData = [];

  readonly CellType = TableCellType;
  @Input() tableData: TableData = [];

  tableHeaders: any;
  tableRows: any;
  totalItems = 0;
  count = 0;
  sortedTable: TableData = [];
  hoveredHeaderIndex: number | null = null;
  currentSortColIndex: number = -1;
  colSortState: number = 0;

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.tableData = changes['tableData'].currentValue || [];
      this.tableHeaders = [];
      this.updateTable();
    }
  }

  private updateTable() {
    this.totalItems = this.tableData.length;
    this.originalTable = this.getDeepCopy(
      this.tableData.length > 0 ? this.tableData : [],
    );
    this.processTableData();
  }

  processTableData() {
    if (!this.tableData.length) {
      this.tableRows = [];
      return;
    }

    if (!this.tableHeaders || this.tableHeaders.length === 0) {
      this.tableHeaders = this.tableData[0].map((col: any) => ({

        colName: col.colName,
        showColIcon: col.showColIcon,
        colIconName: col.colIconName,
        colIconName2: col.colIconName2,
        hoverIconName: col.hoverIconName,
        showHoverIcon: false,
        freeze: col.freeze,
        thProperties: col.thProperties,
        colClickIconName: col.colClickIconName,
        colClickIconName2: col.colClickIconName2,
        tdProperties: col.tdProperties,
        tdColspan: col.tdColspan,
        thColspan: col.thColspan,
        thRowSpan: col.thRowSpan,
        tdRowSpan: col.tdRowSpan,
        thHidden: col.thHidden,
        tdHidden: col.tdHidden,
        isLink: col.isLink,
        width: col.width || 'auto',
      }));
    }

    const activeData = this.sortedTable.length
      ? this.sortedTable
      : this.tableData;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.tableRows = activeData.slice(start, start + this.itemsPerPage);
  }
  activePanelCell: any = null;
  @HostListener('document:click', ['$event'])
  onClickOutside(event?: Event) {
    this.activePanelCell = null;
  }

  asImage(cell: TableCell): ImageCell {
    return cell as ImageCell;
  }
  asText(cell: TableCell): TextCell {
    return cell as TextCell;
  }
  asUser(cell: TableCell): UserCell {
    return cell as UserCell;
  }
  asDropdown(cell: TableCell): ValueDropdownCell {
    return cell as ValueDropdownCell;
  }
  asIcon(cell: TableCell): IconCell {
    return cell as IconCell;
  }
  asIconPopover(cell: TableCell): IconPopoverCell {
    return cell as IconPopoverCell;
  }
  asIconPanel(cell: TableCell): IconPanelCell {
    return cell as IconPanelCell;
  }

  sortEmployeeName(): void {
    this.count++;
    this.currentSortColIndex = 0;
    this.colSortState = this.count > 2 ? 0 : this.count;
    const data = this.getDeepCopy(this.originalTable);

    if (this.count === 1 || this.count === 2) {
      this.sortedTable = data.sort((a: any, b: any) => {
        const valA: any = a[0]?.value;
        const valB: any = b[0]?.value;

        const strA = (valA?.title || valA?.tabName || valA || '')
          .toString()
          .toLowerCase();
        const strB = (valB?.title || valB?.tabName || valB || '')
          .toString()
          .toLowerCase();

        return this.count === 1
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });
    } else {
      this.sortedTable = [];
      this.count = 0;
    }
    this.currentPage = 1;
    this.processTableData();
  }

  sortColumn(colIndex: number): void {
    if (colIndex === 0) {
      this.sortEmployeeName();
      return;
    }

    this.currentSortColIndex = colIndex;
    this.colSortState = (this.colSortState + 1) % 3;

    if (this.colSortState === 0) {
      this.sortedTable = [];
    } else {
      const data = this.getDeepCopy(this.originalTable);

      const colHeader =
        this.tableHeaders[colIndex]?.colName?.toLowerCase() || '';
      const isDateCol =
        colHeader.includes('start') ||
        colHeader.includes('end') ||
        colHeader.includes('applied');

      this.sortedTable = data.sort((a: any, b: any) => {
        const cellA = a[colIndex];
        const cellB = b[colIndex];

        let valA: any = '';
        let valB: any = '';

        if (cellA.type === this.CellType.VALUE_DROPDOWN) {
          valA =
            (cellA as any).options?.find((opt: any) => opt.isDefault)?.value ||
            '';
          valB =
            (cellB as any).options?.find((opt: any) => opt.isDefault)?.value ||
            '';
        } else if (isDateCol) {
          valA = this.parseDateValue(String(cellA.value || ''));
          valB = this.parseDateValue(String(cellB.value || ''));
        } else {
          valA = (cellA.value || '').toString().toLowerCase();
          valB = (cellB.value || '').toString().toLowerCase();
        }

        if (valA < valB) return this.colSortState === 1 ? -1 : 1;
        if (valA > valB) return this.colSortState === 1 ? 1 : -1;
        return 0;
      });
    }

    this.currentPage = 1;
    this.processTableData();
  }

  parseDateValue(dateStr: string): number {
    if (!dateStr) return 0;
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
  }

  get isCurrentPageSelected(): boolean {
    return (
      this.tableRows.length > 0 &&
      this.tableRows.every((row: TableRow) => this.selectedRows.has(row))
    );
  }

  thCheck() {
    const allOnPage = this.isCurrentPageSelected;
    this.tableRows.forEach((row: TableRow) => {
      if (allOnPage) {
        this.selectedRows.delete(row);
      } else {
        this.selectedRows.add(row);
      }
    });
  }

  check(row: TableRow) {
    this.selectedRows.has(row)
      ? this.selectedRows.delete(row)
      : this.selectedRows.add(row);
    this.rowSelected.emit(row);
  }
  lastDroppedIndex: number = -1;

  undo() {
    if (!this.historyStack.length) return;
    const current = this.sortedTable.length ? this.sortedTable : this.tableData;
    this.redoStack.push({
      data: this.getDeepCopy(current),
      index: this.lastDroppedIndex,
    });
    const prev = this.historyStack.pop()!;
    if (this.sortedTable.length) this.sortedTable = prev.data;
    else this.tableData = prev.data;
    this.lastDroppedIndex = prev.index;
    this.processTableData();
  }

  redo() {
    if (!this.redoStack.length) return;
    const current = this.sortedTable.length ? this.sortedTable : this.tableData;
    this.historyStack.push({
      data: this.getDeepCopy(current),
      index: this.lastDroppedIndex,
    });
    const next = this.redoStack.pop()!;
    if (this.sortedTable.length) this.sortedTable = next.data;
    else this.tableData = next.data;
    this.lastDroppedIndex = next.index;
    this.processTableData();
  }

  isDragging: boolean = false;

  onDragStart(event: DragEvent, index: number) {
    if (!this.canDrag) {
      event.preventDefault();
      return;
    }
    this.draggedRowIndex = index;
    const current = this.sortedTable.length ? this.sortedTable : this.tableData;
    this.historyStack.push({
      data: this.getDeepCopy(current),
      index: this.lastDroppedIndex,
    });
    this.redoStack = [];
    setTimeout(() => (this.isDragging = true), 0);
  }

  onDragOver(event: DragEvent, overIndex: number) {
    event.preventDefault();
    if (this.draggedRowIndex === overIndex) return;
    const pageOffset = (this.currentPage - 1) * this.itemsPerPage;
    const target = this.sortedTable.length ? this.sortedTable : this.tableData;
    const item = target.splice(pageOffset + this.draggedRowIndex, 1)[0];
    target.splice(pageOffset + overIndex, 0, item);
    this.draggedRowIndex = overIndex;
    this.processTableData();
  }

  onDragEnd() {
    this.isDragging = false;
    this.canDrag = false;
    this.lastDroppedIndex = this.draggedRowIndex;
    this.draggedRowIndex = -1;
  }

  private getDeepCopy(data: TableData): TableData {
    return data.map((row: any) => [...row]);
  }

  getFontStyles(font?: FontProperties): any {
    if (!font) return {};
    return {
      color: font.fontColor || '',
      'font-weight': font.fontWeight || '',
      'font-size': font.fontSize || '',
      'font-family': font.fontFamily || '',
      'text-align': font.fontAlign || 'left',
      display: 'inline-block',
      width: '100%',
    };
  }

  pageChange(event: any) {
    this.itemsPerPage = event.pageSize || this.itemsPerPage;
    this.currentPage = event.page || 1;
    this.processTableData();
  }

  trackByFn(index: number) {
    return index;
  }

  getDefaultDropdownValue(cell: ValueDropdownCell): any {
    const defaultOption = cell.options.find((opt: any) => opt.isDefault);
    return defaultOption ? defaultOption.value : cell.value;
  }

  onDropdownChange(row: TableRow, cell: ValueDropdownCell, newValue: any) {
    cell.value = newValue;

    cell.options.forEach((opt: any) => {
      opt.isDefault = opt.value === newValue;
    });

    this.dropdownChanged.emit({
      row,
      cell,
      newValue,
    });
  }

  mapToDropdownValues(options: any[]) {
    return options.map((opt) => ({
      label: opt.label,
      value: opt.value,
      isDefault: opt.isDefault || false,
      textColor: '#111',
      backgroundColor: '#eaf0ff',
      isDisabled: false,
    }));
  }
}
