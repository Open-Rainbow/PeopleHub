import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { DropdownConfigService } from '../../../services/dropdown.service';
import { ButtonComponent } from '../../controls/button/button.component';
import { DropdownComponent } from '../../controls/dropdown/dropdown.component';
import { NumberBoxComponent } from '../../controls/number-box/number-box.component';
import { ButtonListComponent } from '../button-list/button-list.component';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    FormsModule,
    NumberBoxComponent,
    ButtonComponent,
    ButtonListComponent,
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
  @Input() backgroundColor: string =  '#fff4f4';
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  totalPages: number = 0;
  goToNumber: number = 0;
  isGoDisabled: boolean = true;

  paginationButtons: any[] = [];
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
    this.generateButtons();
  }

  countTotalPage() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get shouldShowPagination() {
    return this.totalPages > 1;
  }

  generateButtons() {
    const pages = this.getDisplayedPages();
    this.paginationButtons = [];

    if (this.totalPages > 3) {
      if (this.currentPage > 1) {
        this.paginationButtons.push(
          { label: 'double_arrow_left', labelId: -1, showIcon: true },
          { label: 'arrow_left', labelId: -2, showIcon: true }
        );
      }
    }

    pages.forEach((p) => {
      this.paginationButtons.push({
        label: p.toString(),
        labelId: p,
        showIcon: false,
      });
    });

    if (this.totalPages > 3) {
      if (this.currentPage < this.totalPages) {
        this.paginationButtons.push(
          { label: 'arrow_right', labelId: -3, showIcon: true },
          { label: 'double_arrow_right', labelId: -4, showIcon: true }
        );
      }
    }
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

  if (isNaN(newSize)) {
    this.pageSize = 10; 
  } else {
    this.pageSize = newSize;
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
    this.goToNumber < 1 || this.goToNumber > this.totalPages;
}

}
