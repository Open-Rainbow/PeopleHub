export type PolicyStatus = 'Draft' | 'Published' | 'Archived';

export type PolicyCategory =
  | 'Workplace'
  | 'HR'
  | 'IT & Security'
  | 'Leave & Attendance'
  | 'Finance'
  | 'Code of Conduct'
  | 'Health & Safety'
  | 'Other';

/** A company policy as returned by GET api/v1/policies. `content` is only filled for single reads. */
export interface Policy {
  id: number;
  title: string;
  category: PolicyCategory;
  summary: string | null;
  content: string | null;
  hasContent: boolean;
  fileName: string | null;
  fileContentType: string | null;
  fileSize: number | null;
  hasFile: boolean;
  version: number;
  /** yyyy-MM-dd */
  effectiveFrom: string | null;
  status: PolicyStatus;
  requiresAck: boolean;
  /** Department; null = everyone. */
  audience: string | null;
  isPinned: boolean;
  publishedAt: string | null;
  publishedBy: string | null;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  /** When the current employee acknowledged this version. */
  acknowledgedAt: string | null;
  ackCount: number;
  audienceCount: number;
}

/** New attachment picked in the editor (data URI from the shared file upload). */
export interface PolicyFileDraft {
  fileName: string;
  contentType: string;
  size: number;
  data: string;
}

export interface PolicyDraft {
  title: string;
  category: PolicyCategory | '';
  summary: string;
  content: string;
  file: PolicyFileDraft | null;
  removeFile: boolean;
  /** yyyy-MM-dd or '' */
  effectiveFrom: string;
  requiresAck: boolean;
  audience: string;
  isPinned: boolean;
  publish: boolean;
  newVersion: boolean;
}

export type PolicyErrors = Partial<Record<'title' | 'category' | 'summary' | 'content' | 'file', string>>;

export interface PolicyQuery {
  employeeId: string;
  manage: boolean;
  status?: PolicyStatus | 'All';
  category?: PolicyCategory | 'All';
  search?: string;
}

export interface PolicyAck {
  employeeId: string;
  employeeName: string;
  department: string | null;
  acknowledgedAt: string | null;
  version: number;
}
