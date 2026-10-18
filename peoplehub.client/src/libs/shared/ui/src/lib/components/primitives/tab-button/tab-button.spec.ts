import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabButtonComponent } from './tab-button';

describe('TabButtonComponent', () => {
  let component: TabButtonComponent;
  let fixture: ComponentFixture<TabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
