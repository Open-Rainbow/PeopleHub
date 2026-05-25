import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent, TextButtonComponent } from 'ui';

@Component({
  selector: 'employee-list-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent {
  employees = [
    { empId: 'E101', name: 'Kiran Babu', designation: 'Senior Developer', department: 'IT', location: 'Hyderabad' },
    { empId: 'E102', name: 'Harini Das', designation: 'HR Executive', department: 'HR', location: 'Bengaluru' },
    { empId: 'E103', name: 'Ajay Rao', designation: 'Finance Analyst', department: 'Finance', location: 'Pune' },
  ];
}


