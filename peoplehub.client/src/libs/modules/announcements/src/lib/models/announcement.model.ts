export type AnnouncementPriority = 'High' | 'Medium' | 'Low';

/** Derived from publish/expiry dates, never stored. */
export type AnnouncementStatus = 'Active' | 'Scheduled' | 'Expired';

export interface AnnouncementItem {
  id: number;
  title: string;
  description: string;
  priority: AnnouncementPriority;
  category: string;
  department: string;
  targetAudience: string;
  /** ISO date (yyyy-MM-dd). Future date = scheduled. */
  publishOn: string;
  /** ISO date (yyyy-MM-dd). */
  expiresOn: string;
  postedBy: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type AnnouncementDraft = Omit<AnnouncementItem, 'id' | 'createdAt' | 'updatedAt' | 'postedBy'> & {
  postedBy?: string;
};
