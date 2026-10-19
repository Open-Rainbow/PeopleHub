import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ORG_CHART_API, OrgChartService } from './org-chart.service';
import { buildForest, chainOf } from './org-chart.utils';

describe('OrgChartService', () => {
  let service: OrgChartService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(OrgChartService);
    http = TestBed.inject(HttpTestingController);
  });

  const offline = async () => {
    await Promise.resolve();
    http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
  };

  it('falls back to a demo chart with the CEO on top', async () => {
    const pending = service.list();
    await offline();
    const forest = buildForest(await pending);
    expect(service.isOnline()).toBe(false);
    expect(forest.roots.length).toBe(1);
    expect(forest.roots[0].person.employeeId).toBe('EMP00006');
    expect(chainOf(forest, 'EMP00001').map((n) => n.person.employeeId)).toEqual(['EMP00006', 'EMP00004']);
  });

  it('moves someone and blocks loops and self-reporting', async () => {
    const pending = service.list();
    await offline();
    await pending;

    const moved = buildForest(await service.setManager('EMP00003', 'EMP00009'));
    expect(moved.byId.get('EMP00009')!.children.map((c) => c.person.employeeId)).toContain('EMP00003');

    await expectAsync(service.setManager('EMP00008', 'EMP00003')).toBeRejectedWithError(/loop/);
    await expectAsync(service.setManager('EMP00001', 'EMP00001')).toBeRejectedWithError(/themselves/);
  });

  it('maps API rows', async () => {
    const pending = service.list();
    await Promise.resolve();
    http.expectOne(ORG_CHART_API).flush([
      { employeeId: 'EMP00006', employeeName: 'Arjun Mehta', designation: 'CEO', department: 'Leadership', workLocation: 'Hyderabad', managerId: null, dateOfJoining: '2015-04-01T00:00:00', inLoop: false },
    ]);
    const [p] = await pending;
    expect(service.isOnline()).toBe(true);
    expect(p.name).toBe('Arjun Mehta');
    expect(p.managerId).toBe('');
    expect(p.location).toBe('Hyderabad');
    expect(p.dateOfJoining).toBe('2015-04-01');
  });

  it('shows the server message for business errors', async () => {
    const first = service.list();
    await Promise.resolve();
    http.expectOne(ORG_CHART_API).flush([]);
    await first;

    const pending = service.setManager('EMP00008', 'EMP00009');
    await Promise.resolve();
    http.expectOne(`${ORG_CHART_API}/EMP00008/manager`).flush(
      { detail: 'That would create a loop: the new manager already reports to this person.' },
      { status: 422, statusText: 'Unprocessable' },
    );
    await expectAsync(pending).toBeRejectedWithError(/loop/);
  });
});

describe('buildForest', () => {
  const p = (employeeId: string, managerId: string) => ({
    employeeId, managerId, name: employeeId, preferredName: '', designation: '', department: '', location: '', employeeType: '',
    employmentStatus: '', employeeStatus: '', dottedLineManagerId: '', email: '', mobile: '', dateOfJoining: '', inLoop: false,
  });

  it('never loses people with a missing manager or a reporting loop', () => {
    const f = buildForest([p('A', ''), p('B', 'A'), p('X', 'Y'), p('Y', 'X'), p('Z', 'GONE')]);
    expect(f.byId.size).toBe(5);
    expect(f.roots.map((r) => r.person.employeeId).sort()).toEqual(['A', 'X', 'Z']);
    expect(f.byId.get('X')!.total).toBe(1);
  });
});
