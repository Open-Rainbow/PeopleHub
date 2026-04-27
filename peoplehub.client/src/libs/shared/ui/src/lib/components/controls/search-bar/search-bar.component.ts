
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [IconComponent, ReactiveFormsModule, CommonModule]
})
export class SearchBarComponent implements OnInit {
  @Input() placeholderText: string = 'Search employees by name, email, position, or department...';
  @Input() showBorder: boolean = true;
  @Input() borderColor: string = '#2563eb';
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() showIcon: boolean = true; 

   @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() enableIntelligenceBox: boolean = true;
  @Input() searchData: string[] = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe', 'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe'];

  @Output() onSelect = new EventEmitter<string>();
  showIntelegiencebox: boolean = false;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  searchControl = new FormControl('');
  filteredSuggestions: string[] = [];

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      const query = value ?? '';
      
      if (query.length === 0) {
        this.filteredSuggestions = [];
        this.showIntelegiencebox = false;
        this.onSelect.emit('');

        return;
      }

      if (!this.enableIntelligenceBox) {
        this.onSelect.emit(query);
        return;
      }

      this.filterData(query);
    });
  }
  filterData(query: string) {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      this.filteredSuggestions = [];
      this.showIntelegiencebox = false;
      return;
    }

    this.filteredSuggestions = this.searchData.filter(item =>
      item.toLowerCase().includes(lowerQuery)
    );

    this.showIntelegiencebox = true;
  }

  selectSuggestion(value: string) {
    this.searchControl.setValue(value, { emitEvent: false });
    this.showIntelegiencebox = false;
    this.onSelect.emit(value);
  }

  hideSuggestionsWithDelay() {
    setTimeout(() => {
      this.showIntelegiencebox = false;
    }, 200);
  }


  clearSearch() {
  this.searchControl.setValue('');
  this.filteredSuggestions = [];
  this.showIntelegiencebox = false;
  this.onSelect.emit('');
}

}
