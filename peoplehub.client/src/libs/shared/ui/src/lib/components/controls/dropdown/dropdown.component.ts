import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import type { DropdownItem } from '../../../models/component-models/dropdown-item.model';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { IconComponent } from '../../primitives/icon/icon.component';
import { useFieldPolicy } from '../../../services/field-policy';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() label?: string = 'Gender';
  @Input() placeholder?: string = 'Select Gender';
  @Input() isRequired?: boolean = false;
  @Input() options: DropdownOption[] | null = null;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Output() selectedChange = new EventEmitter<unknown>();
  @Output() blurEvent = new EventEmitter<void>();
  @Input() selectedValue: unknown = null;

  @Input() dropdownModel: string = '';
  @Input() draggable: boolean = false;

  uniqueId: string = '';
  isOpenUp: boolean = false;
  isOpen: boolean = false;
  isActive: boolean = false;
  /** Field rules from the Setup page (hidden / read-only / required). */
  private readonly fieldPolicy = useFieldPolicy();

  get optionLength(): number {
    return this.options?.length ?? 0;
  }

  get hasValue(): boolean {
    return (
      this.selectedValue !== null &&
      this.selectedValue !== undefined &&
      this.selectedValue !== ''
    );
  }

  constructor(private eRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.fieldPolicy(this);
    const randomStr = Math.random().toString(36).substring(2, 9);
    const baseId = this.id || this.dropdownModel || 'field';
    this.uniqueId = `dropdown_${baseId}_${randomStr}`;
    this.syncStateFromControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue'] && !changes['selectedValue'].firstChange) {
      this.isActive = this.hasValue;
    }

    if (
      (changes['parentFormGroup'] || changes['id']) &&
      !changes['id']?.firstChange
    ) {
      this.syncStateFromControl();
    }
  }

  private syncStateFromControl(): void {
    if (!this.control) {
      return;
    }

    this.selectedValue = this.control.value;
    this.isActive = this.hasValue;
  }

  get triggerId(): string {
    return `${this.uniqueId}_trigger`;
  }

  get labelId(): string {
    return `${this.uniqueId}_label`;
  }

  get valueId(): string {
    return `${this.uniqueId}_value`;
  }

  get listboxId(): string {
    return `${this.uniqueId}_listbox`;
  }

  get displayText(): string {
    if (!this.hasValue && !this.isOpen) {
      return '';
    }

    return this.getSelectedName() || this.placeholder || '';
  }

  get control() {
    if (!this.parentFormGroup) {
      return null;
    }

    const controlName = this.id || this.dropdownModel;
    return controlName ? this.parentFormGroup.get(controlName) : null;
  }

  get isInvalid() {
    return !!(
      this.control?.invalid &&
      (this.control?.dirty || this.control?.touched)
    );
  }

  get isDisabled(): boolean {
    return this.disabled || !!this.control?.disabled;
  }

  onToggle(event: Event): void {
    this.toggleDropdown(event);
  }

  toggleDropdown(event?: Event): void {
    if (this.isDisabled) {
      return;
    }

    event?.stopPropagation();
    this.hasInteracted = true;
    this.isOpen = !this.isOpen;
    this.isActive = true;

    if (this.isOpen) {
      setTimeout(() => this.decideDropdownDirection(), 0);
      return;
    }

    if (!this.hasValue) {
      this.isActive = false;
    }
  }

  getSelectedName(): string {
    if (
      !this.options ||
      this.selectedValue === null ||
      this.selectedValue === undefined
    ) {
      return '';
    }

    const selectedOption = this.options.find(
      (opt) => opt.value === this.selectedValue,
    );

    return selectedOption ? selectedOption.name : '';
  }

  private onChange = (_: unknown) => {};
  private onTouched = () => {};
  private disabled = false;

  writeValue(obj: unknown): void {
    this.selectedValue = obj;
    this.isActive = this.hasValue;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private hasInteracted = false;

  selectOption(option: DropdownItem): void {
    if (this.isDisabled) {
      return;
    }

    this.selectedValue = option.value;
    this.isActive = true;

    this.onChange(this.selectedValue);
    if (this.control && this.control.value !== option.value) {
      this.control.setValue(option.value);
    }

    this.control?.markAsTouched();
    this.control?.markAsDirty();

    this.onTouched();
    this.selectedChange.emit(this.selectedValue);
    this.blurEvent.emit();
    this.closeDropdown();
  }

  onBlur(): void {
    this.control?.markAsTouched();
    this.onTouched();
    this.blurEvent.emit();

    if (!this.hasValue && !this.isOpen) {
      this.isActive = false;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedNode = event.target as Node | null;
    if (!clickedNode || !this.eRef.nativeElement.contains(clickedNode)) {
      this.closeDropdown();

      if (!this.hasValue) {
        this.isActive = false;
        this.control?.markAsTouched();
      }

      this.onTouched();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeDropdown();
    if (!this.hasValue) {
      this.isActive = false;
    }
  }

  private decideDropdownDirection() {
    const dropdown = this.eRef.nativeElement.querySelector(
      '.dropdown-container',
    ) as HTMLElement;
    const list = this.eRef.nativeElement.querySelector(
      '.custom-dropdown-list',
    ) as HTMLElement;

    if (!dropdown || !list) return;

    const itemCount = this.optionLength || 1;
    const listHeight = Math.min(itemCount * 40 + 12, 244);

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

  private closeDropdown() {
    this.isOpen = false;
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.isOpen) {
        this.toggleDropdown();
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
      return;
    }

    if (event.key === 'Escape') {
      this.closeDropdown();
    }
  }

  onOptionKeydown(event: KeyboardEvent, option: DropdownItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
      return;
    }

    if (event.key === 'Escape') {
      this.closeDropdown();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const currentOption = event.currentTarget as HTMLElement | null;
    if (!currentOption) {
      return;
    }

    const nextOption =
      event.key === 'ArrowDown'
        ? (currentOption.nextElementSibling as HTMLElement | null)
        : (currentOption.previousElementSibling as HTMLElement | null);

    if (!nextOption) {
      return;
    }

    event.preventDefault();
    nextOption.focus();
  }

  trackByOption(_: number, option: DropdownOption): string | number {
    return option.value;
  }
}
