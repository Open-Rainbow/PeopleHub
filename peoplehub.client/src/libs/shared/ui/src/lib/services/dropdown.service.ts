import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DropdownOption } from '../models/value-configs/dropdown-option.model';
import { dropdownConfig } from '../models/value-configs/dropdown-config';

@Injectable({
  providedIn: 'root',
})
export class DropdownConfigService {
  getOptions(key: string): Observable<DropdownOption[]> {
    const config = dropdownConfig as Record<string, DropdownOption[]>;
    return of(config[key] ?? []);
  }
}
