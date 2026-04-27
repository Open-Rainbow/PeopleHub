export interface AddAnnouncementModel {
  Title: string;
  Date: Date;
  Priority: string;
  Description: string;
  OrgId: number;
  Category: string;
  Department: string;
  TargetAudience: string;
}

export interface HolidayList {
  holidayMonth: string;
  holidayDate: number;
  holidayName: string;
  holidayType: string;
  holidayClassification: string;
  holidayCalendar: string;
}

export interface LeaveBalance {
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  pendingDays: number;
}

export interface TeamMembers {
  name: string;
  designation: string;
  imageUrl: string;
  empID: string;
}
