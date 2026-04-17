import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownValues } from '../../../models/common.model';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  selector: 'ui-value-dropdown',
  templateUrl: './value-dropdown.component.html',
  styleUrls: ['./value-dropdown.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IconComponent]
})
export class ValueDropdownComponent implements OnInit {
  @Input() dropdownValues: DropdownValues[] = [];
  @Input() defaultSelected: string | number | null = null;
  @Input() placeholderText: string = '2024';
  @Input() textColor: string = '#111';
  @Input() backgroundColor: string = 'white';
  @Input() activeBackgroundColor: string = '#eaf0ff';
  @Input() borderColor: string = 'lightgray';
  @Input() activeTextColor: string = '#316aff';
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() showIcon: boolean = true;
  @Output() onSelect = new EventEmitter<string | number>();
  // ADD these 2 getters
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  @ViewChild('selectedYearRef', { static: true }) selectedYearRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('ripple', { static: true }) rippleRef!: ElementRef<HTMLSpanElement>;

  selectedYear: string | number | null = null;
  isOpen = false;

  constructor(private renderer: Renderer2) { }

   // ngOnInit() {
  //   this.selectedYear = this.dropdownValues.filter(x=>x.isDefault)[0].value
  // }
ngOnInit() {
  if (this.defaultSelected !== null && this.defaultSelected !== undefined) {
    this.selectedYear = this.defaultSelected;
  } else {
    const defaultOption = this.dropdownValues.find(x => x.isDefault);
    this.selectedYear = defaultOption ? defaultOption.value : null;
  }
}

  toggleDropdown(event: MouseEvent) {
    this.isOpen = !this.isOpen;

    const btn = this.selectedYearRef.nativeElement;
    const ripple = this.rippleRef.nativeElement;

    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.removeClass(ripple, 'ripple-active');
    void ripple.offsetWidth;
    this.renderer.addClass(ripple, 'ripple-active');
  }

  selectYear(value: string | number) {
    // event.preventDefault();
    this.selectedYear = value;
    this.isOpen = false;
    this.onSelect.emit(value);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.selectedYearRef.nativeElement
      .closest('.relative')
      ?.contains(event.target as Node);

    if (!clickedInside) {
      this.isOpen = false;
    }
  }

}


