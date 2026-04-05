import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTokensComponent } from './theme-tokens.component';

describe('ThemeTokensComponent', () => {
  let component: ThemeTokensComponent;
  let fixture: ComponentFixture<ThemeTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeTokensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
