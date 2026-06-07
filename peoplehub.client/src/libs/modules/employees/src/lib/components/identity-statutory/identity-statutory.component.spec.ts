import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityStatutoryComponent } from './identity-statutory.component';

describe('IdentityStatutoryComponent', () => {
  let component: IdentityStatutoryComponent;
  let fixture: ComponentFixture<IdentityStatutoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityStatutoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityStatutoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
