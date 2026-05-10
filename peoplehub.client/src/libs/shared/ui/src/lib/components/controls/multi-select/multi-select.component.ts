import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import type { DropdownItem } from '../../../models/component-models/dropdown-item.model';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { IconComponent } from '../../primitives/icon/icon.component';
import { SearchComponent } from '../search/search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    FormsModule,
    ReactiveFormsModule,
    SearchComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectComponent,
      multi: true,
    },
  ],
})
export class MultiSelectComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() label?: string = 'Gender';
  @Input() placeholder?: string = 'Select Gender';
  @Input() isRequired?: boolean = false;
  @Input() set options(value: DropdownOption[]) {
    this._options = value;
    this.filteredOptions = [...value];
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  get options(): DropdownOption[] {
    return this._options;
  }
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Output() selectedChange = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<void>();
  private _options: DropdownOption[] = [];
  @Input() showSelectAll: boolean = true;
  filteredOptions: DropdownOption[] = [];
  searchControlId = 'search';
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  get hasSelectedValues(): boolean {
    return this.selectedValues.length > 0;
  }

  get optionNames(): string[] {
    return this.options.map((option) => option.name);
  }

  get visibleOptionValues(): any[] {
    return this.filteredOptions.map((option) => option.value);
  }

  get areAllVisibleOptionsSelected(): boolean {
    return (
      this.visibleOptionValues.length > 0 &&
      this.visibleOptionValues.every((value) =>
        this.selectedValues.includes(value),
      )
    );
  }

  get areAllOptionsSelected(): boolean {
    return this.options.length > 0 && this.selectedValues.length === this.options.length;
  }

  get optionLength(): number {
    return this.filteredOptions?.length ?? 0;
  }

  get panelHeaderHeight(): number {
    let height = 56;

    if (this.showSelectAll && this.options.length > 0) {
      height += 46;
    }

    return height;
  }

  onToggle(event: Event) {
    event.stopPropagation();
    this.hasInteracted = true;
    // onToggle is no longer needed with new structure
  }

  private portalList?: HTMLElement;

  uniqueId: string = '';

  selectedValues: any[] = [];
  isOpenUp: boolean = false;
  isOpen: boolean = false;
  isActive: boolean = false;
  private startY = 0;
  private startHeight = 0;
  private resizing = false;
  private mouseMoveListener?: (event: MouseEvent) => void;
  private mouseUpListener?: (event: MouseEvent) => void;

  constructor(
    private eRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {
    this.mouseMoveListener = this.handleMouseMove.bind(this);
    this.mouseUpListener = this.handleMouseUp.bind(this);
  }

  ngOnInit() {
    const randomStr = Math.random().toString(36).substring(2, 9);
    this.uniqueId = `dropdown_${this.id}_${randomStr}`;

    if (this.parentFormGroup && this.id) {
      this.selectedValues = this.parentFormGroup.get(this.id)?.value || [];
      this.isActive = this.selectedValues.length > 0;
    }

    this.searchControlId = `search_${this.id || randomStr}`;
  }

  onSearchTextChange(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    const query = searchText.toLowerCase().trim();

    if (!query) {
      this.filteredOptions = [...this.options];
    } else {
      this.filteredOptions = this.options.filter((option) => {
        const matchesName = option.name.toLowerCase().includes(query);
        const matchesEmail = option.email?.toLowerCase().includes(query) || false;
        return matchesName || matchesEmail;
      });
    }

    this.cdr.detectChanges();
  }

  onCheckboxChange(checked: boolean, option: DropdownOption) {
    if (checked) {
      if (!this.selectedValues.includes(option.value)) {
        this.selectedValues.push(option.value);
      }
    } else {
      this.selectedValues = this.selectedValues.filter(
        (v) => v !== option.value,
      );
    }

    this.syncSelectionState();
  }

  removeSelected(value: any) {
    this.selectedValues = this.selectedValues.filter((v) => v !== value);
    // Update filteredOptions to show the removed item in dropdown
    this.filteredOptions = [...this.options];
    this.syncSelectionState();
    this.cdr.detectChanges();
  }

  getSelectedOptions() {
    return this.options.filter((opt) =>
      this.selectedValues.includes(opt.value),
    );
  }

  // Get only options that are NOT selected
  getAvailableOptions(): DropdownOption[] {
    return this.filteredOptions.filter(
      (option) => !this.selectedValues.includes(option.value)
    );
  }

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
  private disabled = false;

  writeValue(obj: any): void {
    this.selectedValues = obj || [];
    this.isActive = this.selectedValues.length > 0;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  deleteOption(option: any) {
    this.filteredOptions = this.filteredOptions.filter((o) => o !== option);
    this.options = this.options.filter((o) => o !== option);
    this.selectedValues = this.selectedValues.filter((v) => v !== option.value);
    this.syncSelectionState();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private hasInteracted = false;

  selectOption(option: DropdownItem) {
    if (!this.selectedValues.includes(option.value)) {
      this.selectedValues.push(option.value);
    }

    this.searchForm.get('search')?.setValue('');
    this.filteredOptions = [...this.options];
    this.isActive = true;
    this.syncSelectionState(true);
  }

  clearAll() {
    this.selectedValues = [];
    this.filteredOptions = [...this.options];
    this.searchForm.get('search')?.setValue('');
    this.syncSelectionState();
    this.cdr.detectChanges();
  }

  toggleSelectAllClick() {
    const isAllSelected =
      this.selectedValues.length === this.options.length && this.options.length > 0;

    this.toggleSelectAll(!isAllSelected);
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      // Select all options
      const allValues = this.options.map(opt => opt.value);
      this.selectedValues = [...new Set([...this.selectedValues, ...allValues])];
    } else {
      // Deselect all options
      this.selectedValues = [];
    }

    this.filteredOptions = [...this.options];
    this.searchForm.get('search')?.setValue('');
    this.syncSelectionState(true);
    this.cdr.detectChanges();
  }

  onBlur() {
    this.control?.markAsTouched();

    this.onTouched();
    this.blurEvent.emit();

    if (this.selectedValues.length === 0) {
      this.isActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown();

      if (this.selectedValues.length === 0) {
        this.isActive = false;
        this.control?.markAsTouched();
      }
    }
  }

  private closeOverlay() {
    if (this.portalList) {
      this.portalList.remove();
      this.portalList = undefined;
    }
  }
  private decideDropdownDirection() {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.custom-dropdown',
    ) as HTMLElement;
    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;

    if (!dropdown || !list) return;

    list.style.visibility = 'hidden';
    list.style.display = 'block';
    const listHeight = list.offsetHeight || 150;
    list.style.display = '';
    list.style.visibility = '';

    const rect = dropdown.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    this.isOpenUp = spaceBelow < listHeight && spaceAbove > spaceBelow;

    if (this.isOpenUp) {
      list.classList.add('open-up');
    } else {
      list.classList.remove('open-up');
    }
  }

  private setInitialHeight() {
    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;

    if (list) {
      const optionHeight = 38;
      const buffer = 12 + this.panelHeaderHeight;
      const totalHeight = this.optionLength * optionHeight + buffer;
      const initialHeight = Math.min(244, totalHeight);
      const maxHeight = totalHeight;

      this.renderer.setStyle(list, 'height', `${initialHeight}px`);
      this.renderer.setStyle(list, 'max-height', `${maxHeight}px`);
      this.renderer.setStyle(list, 'overflow', 'hidden');
      this.renderer.setStyle(list, 'resize', 'none');
      this.renderer.setStyle(list, 'transform-origin', 'top');

      const optionsDiv = list.querySelector(':scope > div') as HTMLElement;
      if (optionsDiv) {
        const optionsDivHeight = Math.max(initialHeight - this.panelHeaderHeight, 0);
        this.renderer.setStyle(optionsDiv, 'max-height', `${optionsDivHeight}px`);
        this.renderer.setStyle(optionsDiv, 'overflow-y', 'auto');
      }
    }
  }

  private closeDropdown() {
    const checkbox: HTMLInputElement | null =
      this.eRef.nativeElement.querySelector('.dropdown-toggle');
    if (checkbox) checkbox.checked = false;
    this.isOpen = false;
    this.closeOverlay();
  }

  private syncSelectionState(markControl = false) {
    const nextValues = [...this.selectedValues];

    this.selectedValues = nextValues;
    this.isActive = nextValues.length > 0;

    this.onChange(nextValues);

    if (markControl) {
      this.control?.markAsTouched();
      this.control?.markAsDirty();
    }

    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.selectedChange.emit(nextValues);
  }

  ngAfterViewInit() {
    if (!this.draggable) return;

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;
    const handle = this.eRef.nativeElement.querySelector(
      '.resize-hr',
    ) as HTMLElement;

    if (!list || !handle) return;

    handle.addEventListener('mousedown', (event: MouseEvent) => {
      this.startY = event.clientY;
      this.startHeight = list.offsetHeight;
      this.resizing = true;
      handle.classList.add('dragging');
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener('mousemove', this.mouseMoveListener!, {
      passive: false,
    });
    document.addEventListener('mouseup', this.mouseUpListener!, {
      passive: false,
    });
    document.addEventListener('contextmenu', this.preventContextMenu, {
      passive: false,
    });
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.resizing) return;

    event.preventDefault();
    event.stopPropagation();

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;
    if (!list) return;

    const diff = event.clientY - this.startY;
    let newHeight = this.startHeight + diff;

    const totalHeight = this.optionLength * 38;
    const minHeight = 80;

    newHeight = Math.min(newHeight, totalHeight);
    newHeight = Math.max(newHeight, minHeight);

    list.style.height = `${newHeight}px`;
    list.style.minHeight = `${newHeight}px`;
    list.style.maxHeight = `${Math.max(newHeight, totalHeight)}px`;

    const optionsDiv = list.querySelector(':scope > div') as HTMLElement;
    if (optionsDiv) {
      const optionsDivHeight = Math.max(newHeight - this.panelHeaderHeight, 0);
      this.renderer.setStyle(optionsDiv, 'max-height', `${optionsDivHeight}px`);
    }

    this.adjustDropdownPosition(list);
  }

  private handleMouseUp(event: MouseEvent) {
    if (!this.resizing) return;

    event.preventDefault();
    event.stopPropagation();

    this.resizing = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';

    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;
    if (list) {
      const currentHeight = list.offsetHeight;
      list.style.height = `${currentHeight}px`;
      list.style.transition = 'none';
      list.style.cursor = 'default';
    }

    document.removeEventListener('mousemove', this.mouseMoveListener!);
    document.removeEventListener('mouseup', this.mouseUpListener!);
    document.removeEventListener('contextmenu', this.preventContextMenu);
  }

  private adjustDropdownPosition(list: HTMLElement) {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.custom-dropdown',
    ) as HTMLElement;
    if (!dropdown || !list) return;

    const rect = dropdown.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < listRect.height && spaceAbove > spaceBelow) {
      list.classList.add('open-up');
    } else {
      list.classList.remove('open-up');
    }
  }

  private preventContextMenu = (event: Event) => {
    event.preventDefault();
  };

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
    }
    document.removeEventListener('contextmenu', this.preventContextMenu);
  }

  @Input() draggable: boolean = false;
}
