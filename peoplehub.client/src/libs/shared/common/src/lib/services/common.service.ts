import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiNames } from '../constants/api-names';
import { AddAnnouncementModel, HolidayList } from '../models/common.model';
import { RequesterService } from './requester.service';

const DEMO_ROLES = ['employee', 'manager', 'hr', 'admin', 'superadmin'];

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private fb: FormBuilder, private http: HttpClient, private requesterService: RequesterService) { }


  createForm(formConfig: any): FormGroup {
    const groupControls: { [key: string]: any } = {};

    Object.keys(formConfig).forEach((key) => {
      const config = formConfig[key];

      const validators = [];

      if (config.isRequired) validators.push(Validators.required);
      if (config.minLength && config.minLength > 0) validators.push(Validators.minLength(config.minLength));
      if (config.maxLength && config.maxLength > 0) validators.push(Validators.maxLength(config.maxLength));

      groupControls[key] = [config.defaultValue || null, validators];
    });

    return this.fb.group(groupControls);
  }

  private apiUrl = 'https://localhost:7250/api/Common/';

  submitLeave(parameters: any) {
    return this.requesterService.post(this.apiUrl + ApiNames.POST_Submit_Leave, parameters);
  }

  deleteAnnouncement(id: any) {
    return this.http.post(this.apiUrl + ApiNames.POST_DeleteAnnouncement, id, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  addAnnouncement(model: AddAnnouncementModel) {
    return this.requesterService.post(
      this.apiUrl + ApiNames.ADD_ANNOUNCEMENT,
      model
    );
  }

  addOtp(payload: any) {
    return this.http.post(
      'https://localhost:60313/api/Common/addOtp',
      payload
    );
  }

  getMyReportees(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_MY_REPORTEES,
      parameters
    );
  }

  getTeamMembers(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_TEAM_MEMBERS,
      parameters
    );
  }

  getRecentPayslips(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_RECENT_PAYSLIPS, parameters);
  }

  getQuickAnnouncement(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_QUICK_ANNOUNCEMENT, parameters);
  }

  getQuickActivities(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_QUICK_ACTIVITIES, parameters);
  }

  getLeaveBalanceOverview(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_LEAVE_BALANCE_OVERVIEW, parameters);
  }

  getSalaryDetails(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_SALARY_DETAILS, parameters);
  }

  getSalaryData(parameters: any): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_SALARY_DATA, parameters);
  }

  getExpiredAnnouncements(): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_EXPIRED_ANNOUNCEMENT, null);
  }

  getAddAnnouncements(): Observable<any> {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_ADD_ANNOUNCEMENT, null);
  }

  getHolidayStatistics(parameters: any): Observable<HolidayList[]> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_HOLIDAY_STATISTICS,
      parameters
    );
  }

  getHolidayList(parameters: any): Observable<HolidayList[]> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_UPCOMING_HOLIDAYS,
      parameters
    );
  }

  getLeaveApprovals(parameters: any) {
    return this.requesterService.get(this.apiUrl + ApiNames.GET_LEAVE_APPROVALS, parameters);
  }

  /**
   * Demo login until the auth API is wired up: the role is the username
   * (employee / manager / hr / admin / superadmin).
   */
  getLogin(parameters: any): Observable<string> {
    const username = String(parameters?.username ?? '').trim().toLowerCase();
    return of(DEMO_ROLES.includes(username) ? username : 'employee');
  }

  getUsers(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_USERS_PROFILE,
      parameters
    );
  }

  getAttendance(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_ATTENDANCE,
      parameters
    );
  }

  getAttendanceHorizontalBarChart(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_ATTENDANCE_HORIZONTAL_BAR_CHART,
      parameters
    );
  }

  getAttendanceDoughnutBarChart(parameters: any): Observable<any> {
    return this.requesterService.get(
      this.apiUrl + ApiNames.GET_ATTENDANCE_DOUGHNUT_BAR_CHART,
      parameters
    );
  }

  postEmployee(parameters: string) {
    return this.http.post(this.apiUrl + ApiNames.POST_Employee, { employee: parameters }, {
      responseType: 'text'
    });
  }
}
