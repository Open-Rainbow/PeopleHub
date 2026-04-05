import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAComponent } from './org-a.component';

describe('OrgAComponent', () => {
  let component: OrgAComponent;
  let fixture: ComponentFixture<OrgAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
