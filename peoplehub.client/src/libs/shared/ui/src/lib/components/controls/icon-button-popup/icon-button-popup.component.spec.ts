import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonPopupComponent } from './icon-button-popup.component';

describe('IconButtonPopupComponent', () => {
  let component: IconButtonPopupComponent;
  let fixture: ComponentFixture<IconButtonPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconButtonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
