import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropdownOption } from '../models/value-configs/dropdown-option.model';
import { dropdownConfig } from '../models/value-configs/dropdown.config';

@Injectable({
  providedIn: 'root'
})
export class DropdownConfigService {
  private configSubject = new BehaviorSubject(dropdownConfig);
  public config$ = this.configSubject.asObservable();

  getOptions(key: string): Observable<DropdownOption[]> {
    return this.config$.pipe(
      map(config => config[key as keyof typeof config] ?? [])
    );
  }
}
