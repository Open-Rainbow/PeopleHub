import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { DropdownConfigService } from '../../../services/dropdown.service';
import { TextButtonComponent } from '../../controls/text-button/text-button.component';
import { DropdownComponent } from '../../controls/dropdown/dropdown.component';
import { NumberBoxComponent } from '../../controls/number-box/number-box.component';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import type { ButtonGroupItem } from '../../../models/component-models/button-list-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-pagination',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    FormsModule,
    NumberBoxComponent,
    TextButtonComponent,
    ButtonGroupComponent,
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems: number = 77;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() isDropCount: boolean = true;
  @Input() isPagination: boolean = true;
  @Input() isGoto: boolean = true;
  @Input() isShowingEntries: boolean = true;
  @Input() backgroundColor: string = '#fff4f4';
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  totalPages: number = 0;
  goToNumber: number = 0;
  isGoDisabled: boolean = true;

  paginationItems: ButtonGroupItem[] = [];
  pageSizeOptions$!: Observable<DropdownOption[]>;

  constructor(private dropdownService: DropdownConfigService) {
    this.pageSizeOptions$ = this.dropdownService.getOptions('pageSize');
  }

  ngOnChanges() {
    this.updatePagination();
  }

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    this.countTotalPage();
    if (this.totalPages === 0) {
      this.currentPage = 1;
      this.paginationItems = [];
      return;
    }

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    this.generateButtons();
  }

  countTotalPage() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get shouldShowPagination() {
    return this.totalPages > 1;
  }

  get startEntry(): number {
    if (this.totalItems <= 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endEntry(): number {
    if (this.totalItems <= 0) return 0;
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  generateButtons() {
    const pages = this.getDisplayedPages();
    this.paginationItems = [];

    if (this.totalPages > 3 && this.currentPage > 1) {
      this.paginationItems.push(
        { label: '', value: '-1', icon: 'double_arrow_left' },
        { label: '', value: '-2', icon: 'arrow_left' },
      );
    }

    pages.forEach((p) => {
      this.paginationItems.push({ label: p.toString(), value: p.toString() });
    });

    if (this.totalPages > 3 && this.currentPage < this.totalPages) {
      this.paginationItems.push(
        { label: '', value: '-3', icon: 'arrow_right' },
        { label: '', value: '-4', icon: 'double_arrow_right' },
      );
    }
  }

  onPaginationClick(item: ButtonGroupItem): void {
    this.goToPage(parseInt(item.value, 10));
  }

  getDisplayedPages(): number[] {
    if (this.totalPages <= 3) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    if (this.currentPage >= this.totalPages - 2) {
      return [this.totalPages - 2, this.totalPages - 1, this.totalPages];
    }

    return [this.currentPage, this.currentPage + 1, this.currentPage + 2];
  }

  goToPage(id: number): void {
    if (id === -1) {
      this.goToPage(1);
      return;
    }
    if (id === -2) {
      this.goToPage(this.currentPage - 1);
      return;
    }
    if (id === -3) {
      this.goToPage(this.currentPage + 1);
      return;
    }
    if (id === -4) {
      this.goToPage(this.totalPages);
      return;
    }

    if (id < 1 || id > this.totalPages) return;

    this.currentPage = id;
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
    });

    this.generateButtons();
  }
  onPageSizeChange(value: any) {
    const newSize = Number(value);

    if (Number.isNaN(newSize) || newSize < 1) {
      this.pageSize = 10;
    } else {
      this.pageSize = Math.floor(newSize);
    }

    this.currentPage = 1;
    this.updatePagination();

    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  onGoToInput(value: number) {
    this.goToNumber = Number(value);

    this.isGoDisabled =
      Number.isNaN(this.goToNumber) ||
      this.goToNumber < 1 ||
      this.goToNumber > this.totalPages;
  }
}
