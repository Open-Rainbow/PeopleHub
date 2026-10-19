import { POLICY_FILE_TYPES, POLICY_LIMITS } from '../config/policy-options';
import { Policy, PolicyAck, PolicyDraft, PolicyErrors } from '../models/policy.model';

export function fileExtension(name: string | null | undefined): string {
  if (!name) return '';
  const i = name.lastIndexOf('.');
  return i < 0 ? '' : name.slice(i).toLowerCase();
}

/** "C:\fakepath\a.pdf" -> "a.pdf" */
export function baseName(name: string): string {
  return name.trim().split(/[\\/]/).pop() ?? name.trim();
}

export function fileKind(name: string | null | undefined): string {
  const ext = fileExtension(name).replace('.', '').toUpperCase();
  return ext === 'JPEG' ? 'JPG' : ext || 'FILE';
}

export function fileSizeLabel(bytes: number | null | undefined): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-06-01" or "2026-06-01T10:00:00" -> "1 Jun 2026" */
export function shortDate(value: string | null | undefined): string {
  if (!value) return '';
  const [y, m, d] = value.slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function emptyDraft(): PolicyDraft {
  return {
    title: '',
    category: '',
    summary: '',
    content: '',
    file: null,
    removeFile: false,
    effectiveFrom: '',
    requiresAck: false,
    audience: '',
    isPinned: false,
    publish: false,
    newVersion: false,
  };
}

export function draftFrom(p: Policy): PolicyDraft {
  return {
    title: p.title,
    category: p.category,
    summary: p.summary ?? '',
    content: p.content ?? '',
    file: null,
    removeFile: false,
    effectiveFrom: p.effectiveFrom ?? '',
    requiresAck: p.requiresAck,
    audience: p.audience ?? '',
    isPinned: p.isPinned,
    publish: false,
    newVersion: false,
  };
}

/** Same rules as SavePolicyRequestValidator. `hasExistingFile`: the policy already has a file that is kept. */
export function validatePolicy(d: PolicyDraft, hasExistingFile: boolean, maxFileBytes = POLICY_LIMITS.fileMaxBytes): PolicyErrors {
  const e: PolicyErrors = {};
  const title = d.title.trim();
  if (!title) e.title = 'Give the policy a title.';
  else if (title.length < POLICY_LIMITS.titleMin) e.title = `Title must be at least ${POLICY_LIMITS.titleMin} characters.`;
  else if (title.length > POLICY_LIMITS.titleMax) e.title = `Title must be ${POLICY_LIMITS.titleMax} characters or fewer.`;
  if (!d.category) e.category = 'Pick a category.';
  if (d.summary.length > POLICY_LIMITS.summaryMax) e.summary = `Summary must be ${POLICY_LIMITS.summaryMax} characters or fewer.`;
  if (d.content.length > POLICY_LIMITS.contentMax) e.content = 'Policy text is too long. Attach a file for longer documents.';
  if (d.file) {
    if (!POLICY_FILE_TYPES[fileExtension(d.file.fileName)]) e.file = 'Upload a PDF, Word, Excel, PowerPoint, text or image file.';
    else if (d.file.size > maxFileBytes) e.file = `Files must be ${fileSizeLabel(maxFileBytes)} or smaller.`;
  }
  const keepsFile = !!d.file || (hasExistingFile && !d.removeFile);
  if (!d.content.trim() && !keepsFile) e.content = 'Write the policy or attach a file.';
  return e;
}

export function needsMyAck(p: Policy): boolean {
  return p.status === 'Published' && p.requiresAck && !p.acknowledgedAt;
}

export function ackPercent(p: Policy): number {
  return p.audienceCount ? Math.round((p.ackCount / p.audienceCount) * 100) : 0;
}

export function acksToCsv(policy: Policy, rows: PolicyAck[]): string {
  const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const lines = [['Employee ID', 'Name', 'Department', 'Version', 'Acknowledged at'].join(',')];
  rows.forEach((r) => lines.push([r.employeeId, r.employeeName, r.department ?? '', String(r.version), r.acknowledgedAt ?? 'Pending'].map(esc).join(',')));
  return `${policy.title}\n${lines.join('\n')}\n`;
}
