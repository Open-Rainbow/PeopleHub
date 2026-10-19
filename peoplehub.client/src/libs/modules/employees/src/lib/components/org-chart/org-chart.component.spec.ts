import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrgChartComponent } from './org-chart.component';

describe('OrgChartComponent', () => {
  let fixture: ComponentFixture<OrgChartComponent>;
  let component: OrgChartComponent;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [OrgChartComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(OrgChartComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('manage', true);
    fixture.detectChanges();
    for (let i = 0; i < 3; i++) {
      http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
      await new Promise((resolve) => setTimeout(resolve));
      await fixture.whenStable();
    }
    fixture.detectChanges();
  });

  it('renders the chart from demo data', () => {
    expect(component.stats().people).toBe(9);
    expect(fixture.nativeElement.querySelector('#org-node-EMP00006')).toBeTruthy();
  });

  it('search reveals and opens the person', () => {
    component.onQuery('polly');
    expect(component.results()[0].employeeId).toBe('EMP00002');
    component.pickResult(component.results()[0]);
    expect(component.selectedId()).toBe('EMP00002');
    expect(component.expanded().has('EMP00004')).toBe(true);
  });

  it('only offers managers outside the person\'s own team', () => {
    component.select('EMP00008');
    const ids = component.moveOptions().map((o) => o.employeeId);
    expect(ids).not.toContain('EMP00008');
    expect(ids).not.toContain('EMP00009');
    expect(ids).toContain('EMP00006');
  });

  it('changes a manager', async () => {
    component.select('EMP00003');
    component.moveTo.set('EMP00009');
    await component.saveManager();
    expect(component.selectedManager()?.person.employeeId).toBe('EMP00009');
  });
});
