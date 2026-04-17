import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBannerComponent } from './notice-banner';

describe('Noticebanner', () => {
  let component: NoticeBannerComponent;
  let fixture: ComponentFixture<NoticeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NoticeBannerComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(NoticeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
