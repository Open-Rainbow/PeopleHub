import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeRequestsAuditComponent } from './change-requests-audit.component';

describe('ChangeRequestsAuditComponent', () => {
  let component: ChangeRequestsAuditComponent;
  let fixture: ComponentFixture<ChangeRequestsAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRequestsAuditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRequestsAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
