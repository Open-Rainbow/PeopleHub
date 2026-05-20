import { DropdownOption } from './dropdown-option.model';

export const dropdownConfig: Record<string, DropdownOption[]> = {
  pageSize: [
    { value: 5, name: '5' },
    { value: 10, name: '10' },
    { value: 15, name: '15' },
    { value: 20, name: '20' },
    { value: 25, name: '25' },
  ],
  gender: [
    { value: 1, name: 'Male' },
    { value: 2, name: 'Female' },
    { value: 3, name: 'Non-binary' },
    { value: 4, name: 'Prefer not to say' },
  ],
  maritalStatus: [
    { value: 1, name: 'Single' },
    { value: 2, name: 'Married' },
    { value: 3, name: 'Divorced' },
    { value: 4, name: 'Widowed' },
  ],
  relation: [
    { value: 1, name: 'Spouse' },
    { value: 2, name: 'Parent' },
    { value: 3, name: 'Sibling' },
    { value: 4, name: 'Friend' },
    { value: 5, name: 'Other' },
  ],
  department: [
    { value: 1, name: 'Engineering' },
    { value: 2, name: 'Human Resources' },
    { value: 3, name: 'Finance' },
    { value: 4, name: 'Marketing' },
    { value: 5, name: 'Operations' },
    { value: 6, name: 'Sales' },
  ],
  employeeType: [
    { value: 1, name: 'Full-time' },
    { value: 2, name: 'Part-time' },
    { value: 3, name: 'Contract' },
    { value: 4, name: 'Intern' },
  ],
  workLocation: [
    { value: 1, name: 'On-site' },
    { value: 2, name: 'Remote' },
    { value: 3, name: 'Hybrid' },
  ],
  shiftTiming: [
    { value: 1, name: 'Morning (9 AM – 5 PM)' },
    { value: 2, name: 'Afternoon (1 PM – 9 PM)' },
    { value: 3, name: 'Night (9 PM – 5 AM)' },
    { value: 4, name: 'Flexible' },
  ],
  payLevel: [
    { value: 1, name: 'Level 1' },
    { value: 2, name: 'Level 2' },
    { value: 3, name: 'Level 3' },
    { value: 4, name: 'Level 4' },
    { value: 5, name: 'Level 5' },
  ],
  reportingManager: [],
  yearOfPassing: Array.from({ length: 40 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, name: String(year) };
  }),
};
