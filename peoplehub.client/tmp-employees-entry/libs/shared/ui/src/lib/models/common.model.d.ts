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
export declare class SalaryDetails {
    earnings?: Earnings;
    reimbursements?: Reimbursements;
    benefits?: Benefits;
}
export declare class Earnings {
    Basic?: number;
    HouseRentAllowance?: number;
    ConveyanceAllowance?: number;
    TransportAllowance?: number;
    FixedAllowance?: number;
}
export declare class Reimbursements {
    FuelReimbursement?: number;
}
export declare class Benefits {
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
    linkedInUrl?: string;
    contactNumber?: string;
    permanentAddress?: string;
    presentAddress?: string;
    employeeContactName1?: string;
    employeeContactName2?: string;
    employeeContactNumber1?: string;
    employeeContactNumber2?: string;
    emergencyContactRelation1?: string;
    employeeContactRelation2?: string;
}
export interface LeaveAllocation {
    casual: number;
    festival: number;
    earned: number;
    optional: number;
}
export interface JobDetails {
    officeEmail?: string;
    department?: string;
    currentDesignation?: string;
    employmentType?: string;
    payLevel?: string;
    reportingManager?: string;
    workLocation?: string;
    shiftTimings?: string;
    leaveAllocation?: LeaveAllocation;
}
export interface EducationDetails {
    highestQualification?: string;
    specialization?: string;
    yearOfPassing?: string;
    universityName?: string;
    certification?: string;
}
export interface WorkExperience {
    previousOrganization: string;
    previousDesignation: string;
    yearOfExperience: number;
    organizationLocation: string;
}
export interface OtherDetails {
    username: string;
    password: string;
}
export interface BankDetails {
    bankName: string;
    branchName: string;
    accountNumber: string;
    ifscCode: string;
    pfAccountNumber: string;
}
export interface PayrollInformation {
    currentCTC: string;
    bankDetails: BankDetails;
}
export interface DocumentsUploaded {
    employeePhoto: string;
    employeePANNumber: string;
    employeePANDoc: string;
    employeeAadhaarNumber: string;
    employeeAadhaar: string;
    employeePassportNumber: string;
    employeePassportDoc: string;
    lastSixMonthsBankStatement: string;
    lastThreeMonthsPayslip: string;
    experienceLetter: string;
    relievingLetter: string;
    offerLetter: string;
}
export interface FatherDetails {
    fatherName: string;
    fatherAadhaar: string;
    fatherPan: string;
    fatherDOB: string;
    fatherOccupation: string;
}
export interface MotherDetails {
    motherName: string;
    motherAadhaar: string;
    motherPan: string;
    motherDOB: string;
    motherOccupation: string;
}
export interface SpouseDetails {
    spouseName: string;
    spouseAadhaar: string;
    spousePan: string;
    spouseDob: string;
    spouseOccupation: string;
}
export interface InsuranceDetails {
    fatherDetails: FatherDetails;
    motherDetails: MotherDetails;
    spouseDetails: SpouseDetails;
}
export interface EmployeeDetails {
    PersonalInformation?: PersonalInformation;
    contactInformation?: ContactInformation;
    jobDetails?: JobDetails;
    educationDetails?: EducationDetails;
    workExperience?: WorkExperience;
    otherDetails?: OtherDetails;
    payrollInformation?: PayrollInformation;
    documentsUploaded?: DocumentsUploaded;
    insuranceDetails?: InsuranceDetails;
}
export declare class ApplyLeave {
    startDate: string;
    endDate: string;
    leaveType: string;
    reason: string;
}
export declare class LeaveOverview {
    total?: number;
    count?: number;
    color?: string;
    labelName?: string;
}
export declare class ILeaveData {
    todayPresent?: LeaveOverview;
    plannedLeaves?: LeaveOverview;
    unplannedLeaves?: LeaveOverview;
    pendingRequests?: LeaveOverview;
}
export declare class Step {
    title: string;
    route: string;
    status?: 'completed' | 'active' | 'pending' | 'notComplete';
    isValid?: boolean;
    icon: string;
}
export declare class UserProfile {
    userName: string;
    userRole: string;
    profileUrl: string;
}
export declare class LeaveCategoriesGroup {
    leaveTypeId: number;
    leaveTypeName: string;
    total: number;
    used: number;
    carryForward: number;
    encashable: number;
    color: string;
    accentColor: string;
    expanded?: boolean;
    leaveCategory: string;
}
export interface ToastMessage {
    id: number;
    title?: string;
    subtitle?: string;
    type?: 'normal' | 'warning' | 'alert' | 'success';
    duration?: number;
    icon?: string;
}
export type { LegendShape, GridLineStyle, GridDisplayOption, StepperType, } from './common.types';
//# sourceMappingURL=common.model.d.ts.map