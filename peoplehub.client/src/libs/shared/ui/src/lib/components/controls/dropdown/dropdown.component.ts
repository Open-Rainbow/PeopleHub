import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import type { DropdownItem } from '../../../models/component-models/dropdown-item.model';
import { DropdownOption } from '../../../models/value-configs/dropdown-option.model';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, IconComponent, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input() label?: string = 'Gender';
  @Input() placeHolder?: string = 'Select Gender';
  @Input() isRequired?: boolean = false;
  @Input() options: DropdownOption[] | null = null;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Output() selectedChange = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<void>();
  @Input() selectedValue: any = null;

  @Input() dropDownModel: string = '';
  get optionLength(): number {
    return this.options?.length ?? 0;
  }

  onToggle(event: Event) {
    event.stopPropagation();
    this.hasInteracted = true;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      setTimeout(() => {
        this.decideDropdownDirection();
        this.setInitialHeight();
      }, 0);
    }

    if (!this.isOpen && !this.selectedValue) {
      this.isActive = false;
    }
  }

  private portalList?: HTMLElement;

  uniqueId: string = '';
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
  ) {
    this.mouseMoveListener = this.handleMouseMove.bind(this);
    this.mouseUpListener = this.handleMouseUp.bind(this);
  }

  ngOnInit() {
    const randomStr = Math.random().toString(36).substring(2, 9);
    this.uniqueId = `dropdown_${this.id}_${randomStr}`;

    if (this.parentFormGroup && this.id) {
      this.selectedValue = this.parentFormGroup.get(this.id)?.value;
      this.isActive = !!this.selectedValue;
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
    this.selectedValue = obj;
    this.isActive = !!obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private hasInteracted = false;

  selectOption(option: DropdownItem) {
    this.selectedValue = option.value;
    this.isActive = true;
    this.onChange(this.selectedValue);
    this.control?.setValue(option.value);

    this.control?.markAsTouched();
    this.control?.markAsDirty();
    this.selectedChange.emit(this.selectedValue);
    setTimeout(() => this.blurEvent.emit(), 50);
    this.closeDropdown();
  }

  onBlur() {
    this.control?.markAsTouched();

    this.onTouched();
    this.blurEvent.emit();

    if (!this.selectedValue) {
      this.isActive = false; // move label down if no value
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown();

      if (!this.selectedValue) {
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
      const buffer = 36;
      const totalHeight = this.optionLength * optionHeight + buffer;
      const initialHeight = Math.min(244, totalHeight);
      const maxHeight = totalHeight;

      this.renderer.setStyle(list, 'height', `${initialHeight}px`);
      this.renderer.setStyle(list, 'max-height', `${maxHeight}px`);
      this.renderer.setStyle(list, 'overflow-y', 'auto');
      this.renderer.setStyle(list, 'resize', 'none');
      this.renderer.setStyle(list, 'transform-origin', 'top');
    }
  }

  private closeDropdown() {
    const checkbox: HTMLInputElement | null =
      this.eRef.nativeElement.querySelector('.dropdown-toggle');
    if (checkbox) checkbox.checked = false;
    this.isOpen = false;
    this.closeOverlay();
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
  // private startResize(event: MouseEvent, list: HTMLElement) {
  //   this.startY = event.clientY;
  //   this.startHeight = list.offsetHeight;
  //   this.resizing = true;

  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.stopImmediatePropagation();

  //   document.body.style.cursor = 'ns-resize';
  //   document.body.style.userSelect = 'none';
  //   document.body.style.webkitUserSelect = 'none';

  //   document.addEventListener('mousemove', this.mouseMoveListener!, {
  //     passive: false,
  //   });
  //   document.addEventListener('mouseup', this.mouseUpListener!, {
  //     passive: false,
  //   });

  //   document.addEventListener('contextmenu', this.preventContextMenu, {
  //     passive: false,
  //   });
  // }

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

    if (newHeight >= totalHeight) {
      this.renderer.setStyle(list, 'overflow-y', 'hidden');
    } else {
      this.renderer.setStyle(list, 'overflow-y', 'auto');
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

  draggable: boolean = false;
}
