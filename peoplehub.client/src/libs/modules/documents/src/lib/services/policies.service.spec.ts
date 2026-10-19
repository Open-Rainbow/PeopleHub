import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PoliciesService, POLICIES_API } from './policies.service';
import { emptyDraft, validatePolicy } from './policies.utils';

describe('PoliciesService', () => {
  let service: PoliciesService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(PoliciesService);
    http = TestBed.inject(HttpTestingController);
  });

  const offline = async () => {
    await Promise.resolve();
    http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
  };

  it('calls the API with the employee and manage flag', async () => {
    const pending = service.list({ employeeId: 'EMP00001', manage: false, category: 'Workplace' });
    await Promise.resolve();
    const req = http.expectOne((r) => r.url === POLICIES_API);
    expect(req.request.params.get('employeeId')).toBe('EMP00001');
    expect(req.request.params.get('category')).toBe('Workplace');
    req.flush([{ id: 1, title: 'Floor and desk management', category: 'Workplace', status: 'Published', version: 1, effectiveFrom: '2026-06-01T00:00:00' }]);
    const [p] = await pending;
    expect(p.effectiveFrom).toBe('2026-06-01');
    expect(service.isOnline()).toBe(true);
  });

  it('demo: employees only see published policies and can acknowledge once per version', async () => {
    const pending = service.list({ employeeId: 'EMP00001', manage: false });
    await offline();
    const list = await pending;
    expect(list.some((p) => p.status !== 'Published')).toBe(false);
    const desk = list.find((p) => p.title === 'Floor and desk management')!;
    expect(desk.acknowledgedAt).toBeNull();

    const acked = await service.acknowledge(desk.id, 'EMP00001');
    expect(acked.acknowledgedAt).not.toBeNull();
    expect(acked.ackCount).toBe(3);
  });

  it('demo: HR creates, publishes and versions a policy with an uploaded file', async () => {
    const pending = service.list({ employeeId: 'EMP00004', manage: true });
    await offline();
    expect((await pending).length).toBe(4);

    const created = await service.create({
      ...emptyDraft(),
      title: 'Parking',
      category: 'Workplace',
      file: { fileName: 'C:\\fakepath\\parking.pdf', contentType: 'application/pdf', size: 9, data: 'data:application/pdf;base64,JVBERi0xLjQK' },
      requiresAck: true,
    });
    expect(created.status).toBe('Draft');
    expect(created.fileName).toBe('parking.pdf');
    expect(service.fileUrl(created, 'EMP00004', true)).toContain('base64');

    await service.setStatus(created.id, 'Published');
    await service.acknowledge(created.id, 'EMP00001');
    const v2 = await service.update(created.id, { ...emptyDraft(), title: 'Parking', category: 'Workplace', content: 'Use level B2.', newVersion: true, requiresAck: true });
    expect(v2.version).toBe(2);
    expect(v2.ackCount).toBe(0);
    expect(v2.hasFile).toBe(true);
  });

  it('demo: duplicate titles are refused', async () => {
    const pending = service.list({ employeeId: 'EMP00004', manage: true });
    await offline();
    await pending;
    await expectAsync(service.create({ ...emptyDraft(), title: 'work from home', category: 'HR', content: 'x' })).toBeRejectedWithError(
      'A policy with this title already exists.',
    );
  });

  it('validation mirrors the API', () => {
    expect(validatePolicy(emptyDraft(), false)).toEqual(
      jasmine.objectContaining({ title: 'Give the policy a title.', category: 'Pick a category.', content: 'Write the policy or attach a file.' }),
    );
    const exe = { ...emptyDraft(), title: 'Setup', category: 'Other' as const, file: { fileName: 'setup.exe', contentType: '', size: 10, data: 'x' } };
    expect(validatePolicy(exe, false).file).toContain('Upload a PDF');
    expect(validatePolicy({ ...emptyDraft(), title: 'Desk', category: 'Workplace', removeFile: false }, true)).toEqual({});
  });
});
