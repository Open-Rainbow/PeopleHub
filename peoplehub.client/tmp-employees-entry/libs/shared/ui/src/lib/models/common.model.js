export class SalaryDetails {
    earnings;
    reimbursements;
    benefits;
}
export class Earnings {
    Basic;
    HouseRentAllowance;
    ConveyanceAllowance;
    TransportAllowance;
    FixedAllowance;
}
export class Reimbursements {
    FuelReimbursement;
}
export class Benefits {
    LeaveTravelAllowance;
    TelephoneReimbursement;
}
export class ApplyLeave {
    startDate;
    endDate;
    leaveType;
    reason;
}
export class LeaveOverview {
    total = 0;
    count = 0;
    color;
    labelName;
}
export class ILeaveData {
    todayPresent;
    plannedLeaves;
    unplannedLeaves;
    pendingRequests;
}
export class Step {
    title;
    route;
    status;
    isValid;
    icon;
}
export class UserProfile {
    userName;
    userRole;
    profileUrl;
}
export class LeaveCategoriesGroup {
    leaveTypeId = 0;
    leaveTypeName;
    total = 0;
    used = 0;
    carryForward = 0;
    encashable = 0;
    color;
    accentColor;
    expanded;
    leaveCategory;
}
//# sourceMappingURL=common.model.js.map