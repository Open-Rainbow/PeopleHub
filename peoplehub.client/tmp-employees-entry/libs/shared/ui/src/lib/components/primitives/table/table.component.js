import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableCellType, } from '../../../models/table.model';
import * as i0 from "@angular/core";
export class TableComponent {
    searchText = '';
    currentPage = 1;
    itemsPerPage = 5;
    nameSortState = 0;
    draggedRowIndex = -1;
    historyStack = [];
    redoStack = [];
    daySortDirection = {};
    leaveSortState = 0;
    topPagination = true;
    bottomPagination = true;
    showSerialNo = true;
    showUndoRedo = true;
    canDrag = false;
    showCheckbox = true;
    alternateRowColor = true;
    customRowColor = '#dbeafe';
    thRadius = '';
    trRadius = '';
    dragOverIndex = -1;
    selectedRows = new Set();
    rowSelected = new EventEmitter();
    linkClick = new EventEmitter();
    editClicked = new EventEmitter();
    deleteClicked = new EventEmitter();
    dropdownChanged = new EventEmitter();
    originalTable = [];
    CellType = TableCellType;
    tableData = [];
    tableHeaders;
    tableRows;
    totalItems = 0;
    count = 0;
    sortedTable = [];
    hoveredHeaderIndex = null;
    currentSortColIndex = -1;
    colSortState = 0;
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes['tableData']) {
            this.tableData = changes['tableData'].currentValue || [];
            this.tableHeaders = [];
            this.updateTable();
        }
    }
    updateTable() {
        this.totalItems = this.tableData.length;
        this.originalTable = this.getDeepCopy(this.tableData.length > 0 ? this.tableData : []);
        this.processTableData();
    }
    processTableData() {
        if (!this.tableData.length) {
            this.tableRows = [];
            return;
        }
        if (!this.tableHeaders || this.tableHeaders.length === 0) {
            this.tableHeaders = this.tableData[0].map((col) => ({
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
    activePanelCell = null;
    onClickOutside(event) {
        this.activePanelCell = null;
    }
    asImage(cell) {
        return cell;
    }
    asText(cell) {
        return cell;
    }
    asUser(cell) {
        return cell;
    }
    asDropdown(cell) {
        return cell;
    }
    asIcon(cell) {
        return cell;
    }
    asIconPopover(cell) {
        return cell;
    }
    asIconPanel(cell) {
        return cell;
    }
    sortEmployeeName() {
        this.count++;
        this.currentSortColIndex = 0;
        this.colSortState = this.count > 2 ? 0 : this.count;
        const data = this.getDeepCopy(this.originalTable);
        if (this.count === 1 || this.count === 2) {
            this.sortedTable = data.sort((a, b) => {
                const valA = a[0]?.value;
                const valB = b[0]?.value;
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
        }
        else {
            this.sortedTable = [];
            this.count = 0;
        }
        this.currentPage = 1;
        this.processTableData();
    }
    sortColumn(colIndex) {
        if (colIndex === 0) {
            this.sortEmployeeName();
            return;
        }
        this.currentSortColIndex = colIndex;
        this.colSortState = (this.colSortState + 1) % 3;
        if (this.colSortState === 0) {
            this.sortedTable = [];
        }
        else {
            const data = this.getDeepCopy(this.originalTable);
            const colHeader = this.tableHeaders[colIndex]?.colName?.toLowerCase() || '';
            const isDateCol = colHeader.includes('start') ||
                colHeader.includes('end') ||
                colHeader.includes('applied');
            this.sortedTable = data.sort((a, b) => {
                const cellA = a[colIndex];
                const cellB = b[colIndex];
                let valA = '';
                let valB = '';
                if (cellA.type === this.CellType.VALUE_DROPDOWN) {
                    valA =
                        cellA.options?.find((opt) => opt.isDefault)?.value ||
                            '';
                    valB =
                        cellB.options?.find((opt) => opt.isDefault)?.value ||
                            '';
                }
                else if (isDateCol) {
                    valA = this.parseDateValue(String(cellA.value || ''));
                    valB = this.parseDateValue(String(cellB.value || ''));
                }
                else {
                    valA = (cellA.value || '').toString().toLowerCase();
                    valB = (cellB.value || '').toString().toLowerCase();
                }
                if (valA < valB)
                    return this.colSortState === 1 ? -1 : 1;
                if (valA > valB)
                    return this.colSortState === 1 ? 1 : -1;
                return 0;
            });
        }
        this.currentPage = 1;
        this.processTableData();
    }
    parseDateValue(dateStr) {
        if (!dateStr)
            return 0;
        const timestamp = Date.parse(dateStr);
        return isNaN(timestamp) ? 0 : timestamp;
    }
    get isCurrentPageSelected() {
        return (this.tableRows.length > 0 &&
            this.tableRows.every((row) => this.selectedRows.has(row)));
    }
    thCheck() {
        const allOnPage = this.isCurrentPageSelected;
        this.tableRows.forEach((row) => {
            if (allOnPage) {
                this.selectedRows.delete(row);
            }
            else {
                this.selectedRows.add(row);
            }
        });
    }
    check(row) {
        this.selectedRows.has(row)
            ? this.selectedRows.delete(row)
            : this.selectedRows.add(row);
        this.rowSelected.emit(row);
    }
    lastDroppedIndex = -1;
    undo() {
        if (!this.historyStack.length)
            return;
        const current = this.sortedTable.length ? this.sortedTable : this.tableData;
        this.redoStack.push({
            data: this.getDeepCopy(current),
            index: this.lastDroppedIndex,
        });
        const prev = this.historyStack.pop();
        if (this.sortedTable.length)
            this.sortedTable = prev.data;
        else
            this.tableData = prev.data;
        this.lastDroppedIndex = prev.index;
        this.processTableData();
    }
    redo() {
        if (!this.redoStack.length)
            return;
        const current = this.sortedTable.length ? this.sortedTable : this.tableData;
        this.historyStack.push({
            data: this.getDeepCopy(current),
            index: this.lastDroppedIndex,
        });
        const next = this.redoStack.pop();
        if (this.sortedTable.length)
            this.sortedTable = next.data;
        else
            this.tableData = next.data;
        this.lastDroppedIndex = next.index;
        this.processTableData();
    }
    isDragging = false;
    onDragStart(event, index) {
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
    onDragOver(event, overIndex) {
        event.preventDefault();
        if (this.draggedRowIndex === overIndex)
            return;
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
    getDeepCopy(data) {
        return data.map((row) => [...row]);
    }
    getFontStyles(font) {
        if (!font)
            return {};
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
    pageChange(event) {
        this.itemsPerPage = event.pageSize || this.itemsPerPage;
        this.currentPage = event.page || 1;
        this.processTableData();
    }
    trackByFn(index) {
        return index;
    }
    getDefaultDropdownValue(cell) {
        const defaultOption = cell.options.find((opt) => opt.isDefault);
        return defaultOption ? defaultOption.value : cell.value;
    }
    onDropdownChange(row, cell, newValue) {
        cell.value = newValue;
        cell.options.forEach((opt) => {
            opt.isDefault = opt.value === newValue;
        });
        this.dropdownChanged.emit({
            row,
            cell,
            newValue,
        });
    }
    mapToDropdownValues(options) {
        return options.map((opt) => ({
            label: opt.label,
            value: opt.value,
            isDefault: opt.isDefault || false,
            textColor: '#111',
            backgroundColor: '#eaf0ff',
            isDisabled: false,
        }));
    }
    static ɵfac = function TableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TableComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TableComponent, selectors: [["ui-table"]], hostBindings: function TableComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function TableComponent_click_HostBindingHandler($event) { return ctx.onClickOutside($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { topPagination: "topPagination", bottomPagination: "bottomPagination", showSerialNo: "showSerialNo", showUndoRedo: "showUndoRedo", canDrag: "canDrag", showCheckbox: "showCheckbox", alternateRowColor: "alternateRowColor", customRowColor: "customRowColor", thRadius: "thRadius", trRadius: "trRadius", tableData: "tableData" }, outputs: { rowSelected: "rowSelected", linkClick: "linkClick", editClicked: "editClicked", deleteClicked: "deleteClicked", dropdownChanged: "dropdownChanged" }, features: [i0.ɵɵNgOnChangesFeature], decls: 0, vars: 0, template: function TableComponent_Template(rf, ctx) { }, dependencies: [CommonModule,
            FormsModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TableComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-table', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                ], template: "" }]
    }], null, { topPagination: [{
            type: Input
        }], bottomPagination: [{
            type: Input
        }], showSerialNo: [{
            type: Input
        }], showUndoRedo: [{
            type: Input
        }], canDrag: [{
            type: Input
        }], showCheckbox: [{
            type: Input
        }], alternateRowColor: [{
            type: Input
        }], customRowColor: [{
            type: Input
        }], thRadius: [{
            type: Input
        }], trRadius: [{
            type: Input
        }], rowSelected: [{
            type: Output
        }], linkClick: [{
            type: Output
        }], editClicked: [{
            type: Output
        }], deleteClicked: [{
            type: Output
        }], dropdownChanged: [{
            type: Output
        }], tableData: [{
            type: Input
        }], onClickOutside: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TableComponent, { className: "TableComponent", filePath: "libs/shared/ui/src/lib/components/primitives/table/table.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=table.component.js.map