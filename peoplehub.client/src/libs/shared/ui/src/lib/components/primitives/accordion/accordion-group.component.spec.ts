import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGroupComponent } from './accordion-group.component';

describe('AccordionGroupComponent', () => {
  let component: AccordionGroupComponent;
  let fixture: ComponentFixture<AccordionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle accordion items', () => {
    component.toggleAccordion('item-1');
    expect(component.getOpenState('item-1')).toBe(true);

    component.toggleAccordion('item-1');
    expect(component.getOpenState('item-1')).toBe(false);
  });

  it('should close other items when one opens in flush variant', () => {
    component.variant = 'flush';
    component.allowMultiple = false;

    component.toggleAccordion('item-1');
    expect(component.getOpenState('item-1')).toBe(true);

    component.toggleAccordion('item-2');
    expect(component.getOpenState('item-1')).toBe(false);
    expect(component.getOpenState('item-2')).toBe(true);
  });

  it('should allow multiple items open when allowMultiple is true', () => {
    component.allowMultiple = true;

    component.toggleAccordion('item-1');
    component.toggleAccordion('item-2');

    expect(component.getOpenState('item-1')).toBe(true);
    expect(component.getOpenState('item-2')).toBe(true);
  });
});
