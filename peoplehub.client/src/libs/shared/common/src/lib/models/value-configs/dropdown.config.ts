import { DropdownOption } from './dropdown-option.model';

export const dropdownConfig: Record<string, DropdownOption[]> = {
  pageSize: [
    { value: 5, name: '5' },
    { value: 10, name: '10' },
    { value: 15, name: '15' },
    { value: 20, name: '20' },
    { value: 25, name: '25' },
  ],
};
