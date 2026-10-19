import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PoliciesComponent } from './policies.component';

describe('PoliciesComponent', () => {
  let fixture: ComponentFixture<PoliciesComponent>;
  let component: PoliciesComponent;
  let http: HttpTestingController;

  const settle = async () => {
    for (let i = 0; i < 4; i++) {
      http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
      await new Promise((resolve) => setTimeout(resolve));
      await fixture.whenStable();
    }
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PoliciesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('manage', true);
    fixture.detectChanges();
    await settle();
  });

  afterEach(() => fixture.destroy());

  it('shows published policies to employees and everything to managers', () => {
    expect(component.loading()).toBe(false);
    expect(component.library().length).toBe(3);
    expect(component.all().length).toBe(4);
    expect(component.pendingAcks().length).toBe(2);
  });

  it('filters the library by category', () => {
    component.setCategory(['Workplace']);
    expect(component.libraryView().map((p) => p.title)).toEqual(['Floor and desk management']);
  });

  it('will not save a policy without a title, category and text or file', async () => {
    await component.openEditor();
    await component.save(true);
    expect(component.errors().title).toBeTruthy();
    expect(component.errors().category).toBeTruthy();
    expect(component.errors().content).toBeTruthy();
    expect(component.editing()).toBe('new');
  });

  it('acknowledges from the reader', async () => {
    const desk = component.library().find((p) => p.title === 'Floor and desk management')!;
    await component.open(desk);
    await component.acknowledge(component.reading()!);
    expect(component.reading()!.acknowledgedAt).not.toBeNull();
    expect(component.pendingAcks().length).toBe(1);
  });
});
