import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import type { SearchDropdownOption } from '../../../models/value-configs/search-dropdown-option.model';
import { IconComponent } from '../../primitives/icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'ui-search-dropdown',
  imports: [IconComponent, CommonModule, DropdownComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDropdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() label?: string = 'Search';
  @Input() placeholderText?: string =
    'Search by name, email, position, or department...';
  @Input() showBorder?: boolean = true;
  @Input() borderColor?: string = '#2563eb';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() data?: any[] = [];
  @Input() config?: SearchDropdownOption;
  @Output() onSelect = new EventEmitter<any>();

  isOpen = false;
  private defaultConfig: SearchDropdownOption = {
    displayField: 'name',
    subtitleField: 'email',
    descriptionField: 'position',
    searchFields: ['name', 'email'],
  };
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  searchControl = new FormControl('');
  filteredList: any[] = [];
  private destroy$ = new Subject<void>();

  private getConfig(): SearchDropdownOption {
    return this.config || this.defaultConfig;
  }

  getFieldValue(item: any, field: string): string {
    return String(item?.[field] ?? '');
  }

  onInputFocus() {
    this.isOpen = true;
    this.filterList(this.searchControl.value);
    this.cdr.markForCheck();
  }

  onInputBlur() {
    setTimeout(() => {
      this.isOpen = false;
      this.cdr.markForCheck();
    }, 200);
  }

  selectItem(item: any) {
    const displayValue = this.getFieldValue(item, this.getConfig().displayField);
    this.searchControl.setValue(displayValue);
    this.onSelect.emit(item);
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => {
        this.filterList(query);
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.filterList(this.searchControl.value);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterList(query: string | null) {
    const searchQuery = (query ?? '').toLowerCase().trim();
    const config = this.getConfig();
    const fieldsToSearch = config.searchFields || Object.keys(this.data?.[0] || {}).filter(
      (key) => typeof this.data?.[0]?.[key] === 'string'
    );

    if (!searchQuery) {
      // Show all items when search is empty
      this.filteredList = this.data ?? [];
      return;
    }

    // Filter items based on search query
    this.filteredList = (this.data ?? []).filter((item) =>
      fieldsToSearch.some((field) =>
        String(item[field] ?? '').toLowerCase().includes(searchQuery)
      )
    );
  }
}
