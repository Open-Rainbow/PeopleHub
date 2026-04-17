import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { SearchDropdownEmployee } from '../../../models/component-models/search-dropdown-employee.model';
import { IconComponent } from '../../primitives/icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'ui-search-dropdown',
  imports: [IconComponent, CommonModule, FormsModule, DropdownComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDropdownComponent {
  @Input() placeholderText: string =
    'Search employees by name, email, position, or department...';
  @Input() showBorder: boolean = true;
  @Input() borderColor: string = '#2563eb';
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() showIcon: boolean = true;

   @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  searchText: string = '';
  filteredList: SearchDropdownEmployee[] = [];

  empList: SearchDropdownEmployee[] = [
    {
      name: 'Sandeep',
      email: 'Laptop@gmail.com',
      position: 'seniordev',
      department: 'developer',
    },
    {
      name: 'Srikant',
      email: 'Srikant@gmail.com',
      position: 'junniordev',
      department: 'fullstackdeveloper',
    },
    {
      name: 'Auro',
      email: 'Auro@gmail.com',
      position: 'intern',
      department: 'developer',
    },
    {
      name: 'Arobinda',
      email: 'Arobinda@gmail.com',
      position: 'trainee',
      department: 'HR',
    },
    {
      name: 'Bikram',
      email: 'Bikram@gmail.com',
      position: 'seniordev',
      department: 'developer',
    },
    {
      name: 'Rajesh',
      email: 'Rajesh@gmail.com',
      position: 'intern',
      department: 'database',
    },
    {
      name: 'Rakesh',
      email: 'Rakesh@gmail.com',
      position: 'trainee',
      department: 'HR',
    },
    {
      name: 'Badal',
      email: 'Badal@gmail.com',
      position: 'seniordev',
      department: 'fullstackdeveloper',
    },
    {
      name: 'Keshab',
      email: 'Keshab@gmail.com',
      position: 'junniordev',
      department: 'database',
    },
  ];

  filterList() {
    const query = this.searchText.toLowerCase();

    if (!query) {
      this.filteredList = [];
      return;
    }

    this.filteredList = this.empList.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query)
    );
  }
}
