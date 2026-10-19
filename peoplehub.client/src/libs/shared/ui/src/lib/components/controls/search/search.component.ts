import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IconComponent, ReactiveFormsModule, CommonModule],
})
export class SearchComponent implements OnInit {
  @Input() placeholderText?: string =
    'Search employees by name, email, position, or department...';
  @Input() showBorder?: boolean = true;
  @Input() borderColor?: string = '#2563eb';
  @Input() showIcon?: boolean = true;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() displaySuggestions?: boolean;
  @Input() searchData?: string[] = [];
  /** Initial text (optional). */
  @Input() value?: string = '';

  @Output() onSelect = new EventEmitter<string>();
  /** Emits on every keystroke (live filtering). `onSelect` still fires for suggestions / clear. */
  @Output() searchChange = new EventEmitter<string>();
  suggestionsVisible: boolean = false;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return (
      this.control?.invalid && (this.control?.dirty || this.control?.touched)
    );
  }

  searchControl = new FormControl('');
  filteredSuggestions: string[] = [];

  ngOnInit() {
    if (this.value) {
      this.searchControl.setValue(this.value, { emitEvent: false });
    }

    this.searchControl.valueChanges.subscribe((value) => {
      const query = value ?? '';
      this.searchChange.emit(query);

      if (query.length === 0) {
        this.filteredSuggestions = [];
        this.suggestionsVisible = false;
        this.onSelect.emit('');

        return;
      }

      this.filterData(query);
    });
  }
  filterData(query: string) {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      this.filteredSuggestions = [];
      this.suggestionsVisible = false;
      return;
    }

    this.filteredSuggestions = (this.searchData ?? []).filter((item) =>
      item.toLowerCase().includes(lowerQuery),
    );

    this.suggestionsVisible = this.displaySuggestions !== false;
  }

  selectSuggestion(value: string) {
    this.searchControl.setValue(value, { emitEvent: false });
    this.suggestionsVisible = false;
    this.searchChange.emit(value);
    this.onSelect.emit(value);
  }

  hideSuggestionsWithDelay() {
    setTimeout(() => {
      this.suggestionsVisible = false;
    }, 200);
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.filteredSuggestions = [];
    this.suggestionsVisible = false;
    this.onSelect.emit('');
  }
}
