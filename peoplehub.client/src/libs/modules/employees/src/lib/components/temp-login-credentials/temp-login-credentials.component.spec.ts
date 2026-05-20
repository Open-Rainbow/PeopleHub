import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TempLoginCredentialsComponent } from './temp-login-credentials.component';

describe('TempLoginCredentialsComponent', () => {
  let component: TempLoginCredentialsComponent;
  let fixture: ComponentFixture<TempLoginCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempLoginCredentialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TempLoginCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
