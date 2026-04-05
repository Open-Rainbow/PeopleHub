import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantContextComponent } from './tenant-context.component';

describe('TenantContextComponent', () => {
  let component: TenantContextComponent;
  let fixture: ComponentFixture<TenantContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
