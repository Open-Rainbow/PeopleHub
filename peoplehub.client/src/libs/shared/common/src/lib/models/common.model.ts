export interface Announcement {
  announcementId: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  category?: 'Developer' | 'Sales' | 'Database';
  department?: 'IT' | 'Sales' | 'DB';
  targetAudience?: 'All Employees' | 'Manager' | 'Team Lead' | 'Admin';
  description: string;
  postedDate: string;
  postedBy: string;
  expireDate: string;
  expireOn?: Date;
  priorityDesc?: string;
}

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

export interface ExpireAnnouncement {
  announcementId: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  postedDate: string;
  postedBy: string;
  expireDate: string;
  expireOn?: Date;
  priorityDesc?: string;
}

export interface QuickAnnouncements {
  name: string;
  date: string;
}

export interface LeaveBalance {
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  pendingDays: number;
}

export interface Activity {
  name: string;
  date: string;
}

export interface RecentPayslip {
  month: string;
  date: string;
  amount: string;
}

export interface DropdownValues {
  value: string;
  isDefault: boolean;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
}

export class SalaryDetails {
  earnings?: Earnings;
  reimbursements?: Reimbursements;
  benefits?: Benefits;
}

export class Earnings {
  Basic?: number;
  HouseRentAllowance?: number;
  ConveyanceAllowance?: number;
  TransportAllowance?: number;
  FixedAllowance?: number;
}

export class Reimbursements {
  FuelReimbursement?: number;
}

export class Benefits {
  LeaveTravelAllowance?: number;
  TelephoneReimbursement?: number;
}

export interface TeamData {
  name: string;
  designation: string;
  imageUrl: string;
  empID: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AnnouncementInfo {
  icon: string;
  label: string;
  value: string;
}

export interface TeamMembers {
  name: string;
  designation: string;
  imageUrl: string;
  empID: string;
}

export interface HolidayList {
  holidayMonth: string;
  holidayDate: number;
  holidayName: string;
  holidayType: string;
  holidayClassification: string;
  holidayCalendar: string;
}

export interface PersonalInformation {
  dateOfJoining?: string;
  employeeName?: string;
  employeeId?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  maritalStatus?: string;
}

export interface ContactInformation {
  personalEmail?: string;
  alternatePersonalEmail?: string;
  mobileNumber?: string;
  alternateMobileNumber?: string;
  landlineNumber?: string;
  officialEmail?: string;
  linkedInUrl?: string;
  addresses?: AddressInformation[];
  emergencyContacts?: EmergencyContact[];
}

export interface AddressInformation {
  addressType?: string;
  houseNumber?: string;
  streetName?: string;
  landmark?: string;
  colony?: string;
  area?: string;
  city?: string;
  district?: string;
  stateProvince?: string;
  country?: string;
  pincode?: string;
  sameAsAnotherAddress?: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  addressProofLink?: string;
}

export interface EmergencyContact {
  contactName?: string;
  relationship?: string;
  contactNumber?: string;
  alternateContactNumber?: string;
  email?: string;
  address?: string;
  priorityOrder?: number;
  primaryEmergencyContact?: boolean;
  remarks?: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

