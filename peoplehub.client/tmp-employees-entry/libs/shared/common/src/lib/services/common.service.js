import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ApiNames } from '../constants/api-names';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common/http";
import * as i3 from "./requester.service";
export class CommonService {
    fb;
    http;
    requesterService;
    constructor(fb, http, requesterService) {
        this.fb = fb;
        this.http = http;
        this.requesterService = requesterService;
    }
    createForm(formConfig) {
        const groupControls = {};
        Object.keys(formConfig).forEach((key) => {
            const config = formConfig[key];
            const validators = [];
            if (config.isRequired)
                validators.push(Validators.required);
            if (config.minLength && config.minLength > 0)
                validators.push(Validators.minLength(config.minLength));
            if (config.maxLength && config.maxLength > 0)
                validators.push(Validators.maxLength(config.maxLength));
            groupControls[key] = [config.defaultValue || null, validators];
        });
        return this.fb.group(groupControls);
    }
    apiUrl = 'https://localhost:7250/api/Common/';
    submitLeave(parameters) {
        return this.requesterService.post(this.apiUrl + ApiNames.POST_Submit_Leave, parameters);
    }
    deleteAnnouncement(id) {
        return this.http.post(this.apiUrl + ApiNames.POST_DeleteAnnouncement, id, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    addAnnouncement(model) {
        return this.requesterService.post(this.apiUrl + ApiNames.ADD_ANNOUNCEMENT, model);
    }
    addOtp(payload) {
        return this.http.post('https://localhost:60313/api/Common/addOtp', payload);
    }
    getMyReportees(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_MY_REPORTEES, parameters);
    }
    getTeamMembers(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_TEAM_MEMBERS, parameters);
    }
    getRecentPayslips(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_RECENT_PAYSLIPS, parameters);
    }
    getQuickAnnouncement(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_QUICK_ANNOUNCEMENT, parameters);
    }
    getQuickActivities(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_QUICK_ACTIVITIES, parameters);
    }
    getLeaveBalanceOverview(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_LEAVE_BALANCE_OVERVIEW, parameters);
    }
    getSalaryDetails(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_SALARY_DETAILS, parameters);
    }
    getSalaryData(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_SALARY_DATA, parameters);
    }
    getExpiredAnnouncements() {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_EXPIRED_ANNOUNCEMENT, null);
    }
    getAddAnnouncements() {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_ADD_ANNOUNCEMENT, null);
    }
    getHolidayStatistics(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_HOLIDAY_STATISTICS, parameters);
    }
    getHolidayList(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_UPCOMING_HOLIDAYS, parameters);
    }
    getLeaveApprovals(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_LEAVE_APPROVALS, parameters);
    }
    getLogin(parameters) {
        if (parameters.username == "Employee" && parameters.password == "Employee@123") {
            return of("employee");
        }
        else if (parameters.username == "HR" && parameters.password == "Hr@123") {
            return of("hr");
        }
        else { //if (data.username == "Admin" && data.password == "Admin@123") {
            return of("admin");
        }
    }
    getUsers(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_USERS_PROFILE, parameters);
    }
    getAttendance(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_ATTENDANCE, parameters);
    }
    getAttendanceHorizontalBarChart(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_ATTENDANCE_HORIZONTAL_BAR_CHART, parameters);
    }
    getAttendanceDoughnutBarChart(parameters) {
        return this.requesterService.get(this.apiUrl + ApiNames.GET_ATTENDANCE_DOUGHNUT_BAR_CHART, parameters);
    }
    postEmployee(parameters) {
        return this.http.post(this.apiUrl + ApiNames.POST_Employee, { employee: parameters }, {
            responseType: 'text'
        });
    }
    static ɵfac = function CommonService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommonService)(i0.ɵɵinject(i1.FormBuilder), i0.ɵɵinject(i2.HttpClient), i0.ɵɵinject(i3.RequesterService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommonService, factory: CommonService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.HttpClient }, { type: i3.RequesterService }], null); })();
//# sourceMappingURL=common.service.js.map