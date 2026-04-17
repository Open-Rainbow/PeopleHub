// src/assets/configs/dropdown.config.ts
import { DropdownOption } from './dropdown-option.model';

export const dropdownConfig = {
  maritalStatus: [
    { value: 1, name: 'Single' },
    { value: 2, name: 'Married' }
  ] as DropdownOption[],
  gender: [
    { value: 1, name: 'Male' },
    { value: 2, name: 'Female' },
    { value: 3, name: 'Other' }
  ] as DropdownOption[],
  relation: [
    { value: 1, name: 'Father' },
    { value: 2, name: 'Mother' },
    { value: 3, name: 'Spouse' },
    { value: 4, name: 'Brother/Sister' },
    { value: 5, name: 'Child' },
    { value: 6, name: 'Others' }
  ] as DropdownOption[],
   yearOfPassing: [
    { value: 2025, name: '2025' },
    { value: 2024, name: '2024' },
    { value: 2023, name: '2023' },
    { value: 2022, name: '2022' },
    { value: 2021, name: '2021' },
    { value: 2020, name: '2020' },
    { value: 2019, name: '2019' },
    { value: 2018, name: '2018' },
    { value: 2017, name: '2017' },
    { value: 2016, name: '2016' }
  ] as DropdownOption[],
  leaveType: [
  { value: 1, name: 'Casual Leave' },
  { value: 2, name: 'Earned Leave' },
  { value: 3, name: 'Maternity Leave' },
  { value: 4, name: 'Paternity Leave' },
  { value: 5, name: 'Comp Off' }, 
  { value: 6, name: 'Unpaid Leave' },
  { value: 7, name: 'Annual Leave' }, 
  { value: 8, name: 'Sick Leave' },   
  { value: 9, name: 'Sabbatical' },   
  { value: 10, name: 'Study Leave' }  
] as DropdownOption[],
pageSize: [
  { value: 5, name: '5' },
  { value: 10, name: '10' },
  { value: 15, name: '15' },
  { value: 20, name: '20' },
  { value: 25, name: '25' }
] as DropdownOption[],

severity: [
  { value: 1, name: 'high' },
  { value: 2, name: 'medium' },
  { value: 3, name: 'low' }
] as DropdownOption[],
category: [
  { value: 1, name: 'Developer' },
  { value: 2, name: 'Sales' },
  { value: 3, name: 'Database' }
] as DropdownOption[],

targetAudience: [
  { value: 1, name: 'All Employees' },
  { value: 2, name: 'Manager' },
  { value: 3, name: 'Team Lead' },
  { value: 4, name: 'Admin' }
] as DropdownOption[],



employmentType: [
  { value: 1, name: 'Software Engineer' },
  { value: 2, name: 'Senior Software Engineer' },
  { value: 3, name: 'Team Lead' },
  { value: 4, name: 'Project Manager' },
  { value: 5, name: 'HR Manager' },
  { value: 6, name: 'Recruiter' }
] as DropdownOption[],

yesNo: [
  { value: 1, name: 'Yes' },
  { value: 2, name: 'No' }
] as DropdownOption[],

accrualMethod: [
  { value: 1, name: 'Monthly' },
  { value: 2, name: 'Yearly' }
] as DropdownOption[],

expiryPeriod: [
  { value: 1, name: '30 Days' },
  { value: 2, name: '60 Days' }
] as DropdownOption[],

approvalLevel: [
  { value: 1, name: 'Manager' },
  { value: 2, name: 'HR' }
] as DropdownOption[],

department: [
  { value: 1, name: 'Engineering' },
  { value: 2, name: 'HR' },
  { value: 3, name: 'Finance' },
  { value: 4, name: 'Operations' }
] as DropdownOption[],

employeeType: [
  { value: 1, name: 'Full Time' },
  { value: 2, name: 'Part Time' },
  { value: 3, name: 'Contract' },
  { value: 4, name: 'Intern' }
] as DropdownOption[],

workLocation: [
  { value: 1, name: 'Bangalore' },
  { value: 2, name: 'Hyderabad' },
  { value: 3, name: 'Remote' }
] as DropdownOption[],

shiftTiming: [
  { value: 1, name: 'Day Shift' },
  { value: 2, name: 'Night Shift' },
  { value: 3, name: 'Rotational' }
] as DropdownOption[],

payLevel: [
  { value: 1, name: 'L1' },
  { value: 2, name: 'L2' },
  { value: 3, name: 'L3' }
] as DropdownOption[],

reportingManager: [
  { value: 1, name: 'Manager A' },
  { value: 2, name: 'Manager B' }
] as DropdownOption[],




};
