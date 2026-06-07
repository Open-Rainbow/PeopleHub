import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomFieldsAdditionalComponent } from './custom-fields-additional.component';

describe('CustomFieldsAdditionalComponent', () => {
  let component: CustomFieldsAdditionalComponent;
  let fixture: ComponentFixture<CustomFieldsAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFieldsAdditionalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomFieldsAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
