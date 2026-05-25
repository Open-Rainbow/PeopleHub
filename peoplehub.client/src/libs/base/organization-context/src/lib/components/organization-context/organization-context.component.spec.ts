import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationContextComponent } from './organization-context.component';

describe('OrganizationContextComponent', () => {
  let component: OrganizationContextComponent;
  let fixture: ComponentFixture<OrganizationContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
