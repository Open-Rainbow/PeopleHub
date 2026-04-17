import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueDropdownComponent } from './value-dropdown.component';

describe('ValueDropdownComponent', () => {
  let component: ValueDropdownComponent;
  let fixture: ComponentFixture<ValueDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ValueDropdownComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ValueDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
