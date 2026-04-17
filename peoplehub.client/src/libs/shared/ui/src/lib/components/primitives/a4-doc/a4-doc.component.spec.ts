import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A4DocComponent } from './a4-doc.component';

describe('A4DocComponent', () => {
  let component: A4DocComponent;
  let fixture: ComponentFixture<A4DocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A4DocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A4DocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
