import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ExpireComponent } from './expire.component';

describe('ExpireComponent', () => {
  let component: ExpireComponent;
  let fixture: ComponentFixture<ExpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpireComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpireComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

