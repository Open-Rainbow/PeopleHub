(self.webpackChunkpeoplehub_client =
  self.webpackChunkpeoplehub_client || []).push([
  [3813],
  {
    "./src/libs/modules/employees/src/lib/components/basic-info/basic-info.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        s: () => PersonalInfoComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var basic_info_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/basic-info/basic-info.component.scss?ngResource",
        ),
        basic_info_componentngResource_default = __webpack_require__.n(
          basic_info_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        text_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts",
        ),
        calendar_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/calendar/calendar.component.ts",
        ),
        dropdown_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/dropdown/dropdown.component.ts",
        ),
        common_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/common.service.ts",
        ),
        dropdown_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/dropdown.service.ts",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        ),
        employee_data_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/employee-data/employee-data.service.ts",
        );
      const personalInfoForm = {
        firstName: {
          id: "firstName",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Full Name",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 1,
          isDisable: !1,
          placeholder: "Enter Full Name",
        },
        employeeId: {
          id: "employeeId",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Employee ID",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 2,
          isDisable: !1,
          placeholder: "EMP0042",
        },
        dateOfBirth: {
          id: "dateOfBirth",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Date of Birth",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 3,
          isDisable: !1,
        },
        dateOfJoining: {
          id: "dateOfJoining",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Date of Joining",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 4,
          isDisable: !1,
        },
        gender: {
          id: "gender",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Gender",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 5,
          isDisable: !1,
          placeholder: "Select Gender",
        },
        maritalStatus: {
          id: "maritalStatus",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Marital Status",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 6,
          isDisable: !1,
          placeholder: "Select Marital Status",
        },
      };
      let PersonalInfoComponent = class PersonalInfoComponent {
        commonService = (0, _effect_chunk2.WQX)(common_service.h);
        dropdownService = (0, _effect_chunk2.WQX)(dropdown_service.H);
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        dataService = (0, _effect_chunk2.WQX)(employee_data_service.a);
        formConfig = personalInfoForm;
        personalInfo;
        genderOptions$;
        maritalStatusOptions$;
        ngOnInit() {
          ((this.genderOptions$ = this.dropdownService.getOptions("gender")),
            (this.maritalStatusOptions$ =
              this.dropdownService.getOptions("maritalStatus")),
            (this.personalInfo = this.commonService.createForm(
              this.formConfig,
            )));
          const savedData = this.dataService.getDataByRoute("basic-info");
          (savedData && this.personalInfo.patchValue(savedData),
            this.stepperService.setStepValidity(this.personalInfo.valid),
            this.personalInfo.statusChanges.subscribe((status) => {
              this.stepperService.setStepValidity("VALID" === status);
            }));
        }
      };
      PersonalInfoComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-basic-info",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              text_box_component.O,
              calendar_component.S,
              dropdown_component.P,
            ],
            template:
              '<div class="bg-white rounded-2xl border border-blue-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in pt-8 px-6 pb-7 h-full hover:shadow-md">\r\n  <div class="grid grid-cols-3 gap-[10px]">\r\n\r\n    @if (!formConfig.firstName.isHide) {\r\n      <div class="form-group">\r\n        <ui-text-box\r\n          [id]="formConfig.firstName.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.firstName.label!"\r\n          [placeholder]="formConfig.firstName.placeholder ?? \'\'"\r\n          [minLength]="formConfig.firstName.minLength"\r\n          [maxLength]="formConfig.firstName.maxLength"\r\n          [isRequired]="formConfig.firstName.isRequired!"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.employeeId.isHide) {\r\n      <div class="form-group">\r\n        <ui-text-box\r\n          [id]="formConfig.employeeId.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.employeeId.label!"\r\n          [placeholder]="formConfig.employeeId.placeholder ?? \'\'"\r\n          [minLength]="formConfig.employeeId.minLength"\r\n          [maxLength]="formConfig.employeeId.maxLength"\r\n          [isRequired]="formConfig.employeeId.isRequired!"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.dateOfBirth.isHide) {\r\n      <div class="form-group">\r\n        <ui-calendar\r\n          [id]="formConfig.dateOfBirth.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.dateOfBirth.label!"\r\n          [isRequired]="formConfig.dateOfBirth.isRequired!"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.dateOfJoining.isHide) {\r\n      <div class="form-group">\r\n        <ui-calendar\r\n          [id]="formConfig.dateOfJoining.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.dateOfJoining.label!"\r\n          [isRequired]="formConfig.dateOfJoining.isRequired!"\r\n        ></ui-calendar>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.gender.isHide) {\r\n      <div class="form-group">\r\n        <ui-dropdown\r\n          [id]="formConfig.gender.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.gender.label!"\r\n          [placeholder]="formConfig.gender.placeholder ?? \'\'"\r\n          [isRequired]="formConfig.gender.isRequired!"\r\n          [options]="genderOptions$ | async"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.maritalStatus.isHide) {\r\n      <div class="form-group">\r\n        <ui-dropdown\r\n          [id]="formConfig.maritalStatus.id"\r\n          [parentFormGroup]="personalInfo"\r\n          [label]="formConfig.maritalStatus.label!"\r\n          [placeholder]="formConfig.maritalStatus.placeholder ?? \'\'"\r\n          [isRequired]="formConfig.maritalStatus.isRequired!"\r\n          [options]="maritalStatusOptions$ | async"\r\n        ></ui-dropdown>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n',
            styles: [basic_info_componentngResource_default()],
          }),
        ],
        PersonalInfoComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/education-details/education-details.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        a: () => EducationDetailsComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var education_details_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/education-details/education-details.component.scss?ngResource",
        ),
        education_details_componentngResource_default = __webpack_require__.n(
          education_details_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        text_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts",
        ),
        text_area_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-area/text-area.component.ts",
        ),
        dropdown_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/dropdown/dropdown.component.ts",
        ),
        common_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/common.service.ts",
        ),
        dropdown_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/dropdown.service.ts",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        ),
        employee_data_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/employee-data/employee-data.service.ts",
        );
      const educationDetailsForm = {
        higherQualification: {
          id: "higherQualification",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Higher Qualification",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 1,
          isDisable: !1,
          placeholder: "eg, Bachelors, Masters, PhD",
        },
        specialization: {
          id: "specialization",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Specialization",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 2,
          isDisable: !1,
          placeholder: "eg, Computer Science",
        },
        yearOfPassing: {
          id: "yearOfPassing",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Year of Passing",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 3,
          isDisable: !1,
          placeholder: "Select year",
        },
        universityName: {
          id: "universityName",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "University/College Name",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 4,
          isDisable: !1,
          placeholder: "Enter University/College Name",
        },
        certifications: {
          id: "certifications",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Certifications",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 5,
          isDisable: !1,
          placeholder: "List any certifications",
        },
      };
      let EducationDetailsComponent = class EducationDetailsComponent {
        commonService = (0, _effect_chunk2.WQX)(common_service.h);
        dropdownService = (0, _effect_chunk2.WQX)(dropdown_service.H);
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        dataService = (0, _effect_chunk2.WQX)(employee_data_service.a);
        formConfig = educationDetailsForm;
        educationDetails;
        yearOfPassingOptions$;
        ngOnInit() {
          ((this.yearOfPassingOptions$ =
            this.dropdownService.getOptions("yearOfPassing")),
            (this.educationDetails = this.commonService.createForm(
              this.formConfig,
            )));
          const savedData =
            this.dataService.getDataByRoute("education-details");
          (savedData && this.educationDetails.patchValue(savedData),
            this.stepperService.setStepValidity(this.educationDetails.valid),
            this.educationDetails.statusChanges.subscribe((status) => {
              this.stepperService.setStepValidity("VALID" === status);
            }));
        }
      };
      EducationDetailsComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-education-details",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              text_box_component.O,
              text_area_component.Q,
              dropdown_component.P,
            ],
            template:
              '<div class="w-full h-full bg-white rounded-[25px] p-5 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md">\r\n  <div class="grid grid-cols-3 gap-5 mt-5">\r\n\r\n    @if (!formConfig.higherQualification.isHide) {\r\n      <ui-text-box\r\n        [id]="formConfig.higherQualification.id"\r\n        [parentFormGroup]="educationDetails"\r\n        [label]="formConfig.higherQualification.label!"\r\n        [placeholder]="formConfig.higherQualification.placeholder ?? \'\'"\r\n        [minLength]="formConfig.higherQualification.minLength"\r\n        [maxLength]="formConfig.higherQualification.maxLength"\r\n        [isRequired]="formConfig.higherQualification.isRequired!"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.specialization.isHide) {\r\n      <ui-text-box\r\n        [id]="formConfig.specialization.id"\r\n        [parentFormGroup]="educationDetails"\r\n        [label]="formConfig.specialization.label!"\r\n        [placeholder]="formConfig.specialization.placeholder ?? \'\'"\r\n        [minLength]="formConfig.specialization.minLength"\r\n        [maxLength]="formConfig.specialization.maxLength"\r\n        [isRequired]="formConfig.specialization.isRequired!"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.yearOfPassing.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.yearOfPassing.id"\r\n        [parentFormGroup]="educationDetails"\r\n        [label]="formConfig.yearOfPassing.label!"\r\n        [placeholder]="formConfig.yearOfPassing.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.yearOfPassing.isRequired!"\r\n        [options]="yearOfPassingOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.universityName.isHide) {\r\n      <ui-text-box\r\n        [id]="formConfig.universityName.id"\r\n        [parentFormGroup]="educationDetails"\r\n        [label]="formConfig.universityName.label!"\r\n        [placeholder]="formConfig.universityName.placeholder ?? \'\'"\r\n        [minLength]="formConfig.universityName.minLength"\r\n        [maxLength]="formConfig.universityName.maxLength"\r\n        [isRequired]="formConfig.universityName.isRequired!"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    \x3c!-- Empty columns to preserve 3-col grid alignment --\x3e\r\n    <div></div>\r\n    <div></div>\r\n  </div>\r\n\r\n  @if (!formConfig.certifications.isHide) {\r\n    <div class="mt-5">\r\n      <ui-text-area\r\n        [id]="formConfig.certifications.id"\r\n        [parentFormGroup]="educationDetails"\r\n        [label]="formConfig.certifications.label!"\r\n        [placeholder]="formConfig.certifications.placeholder ?? \'\'"\r\n        [maxLength]="formConfig.certifications.maxLength"\r\n        [isRequired]="formConfig.certifications.isRequired!"\r\n      ></ui-text-area>\r\n    </div>\r\n  }\r\n</div>\r\n',
            styles: [education_details_componentngResource_default()],
          }),
        ],
        EducationDetailsComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/job-details/job-details.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        N: () => JobDetailsComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var job_details_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/job-details/job-details.component.scss?ngResource",
        ),
        job_details_componentngResource_default = __webpack_require__.n(
          job_details_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        text_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts",
        ),
        dropdown_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/dropdown/dropdown.component.ts",
        ),
        common_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/common.service.ts",
        ),
        dropdown_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/dropdown.service.ts",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        ),
        employee_data_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/employee-data/employee-data.service.ts",
        );
      const jobDetailsForm = {
        officeEmail: {
          id: "officeEmail",
          isHide: !1,
          readOnly: !0,
          minLength: 5,
          maxLength: 50,
          isRequired: !0,
          label: "Office Email",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 1,
          isDisable: !1,
          placeholder: "Enter office email",
        },
        department: {
          id: "department",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 30,
          isRequired: !0,
          label: "Department",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 2,
          isDisable: !1,
          placeholder: "Select department",
        },
        designation: {
          id: "designation",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 30,
          isRequired: !0,
          label: "Designation",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 3,
          isDisable: !1,
          placeholder: "Enter your job title",
        },
        employeeType: {
          id: "employeeType",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 20,
          isRequired: !0,
          label: "Employee Type",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 4,
          isDisable: !1,
          placeholder: "Select employee type",
        },
        workLocation: {
          id: "workLocation",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 50,
          isRequired: !0,
          label: "Work Location",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 5,
          isDisable: !1,
          placeholder: "Select work location",
        },
        shiftTimings: {
          id: "shiftTimings",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 30,
          isRequired: !0,
          label: "Shift Timings",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 6,
          isDisable: !1,
          placeholder: "Select shift",
        },
        payLevel: {
          id: "payLevel",
          isHide: !1,
          readOnly: !0,
          minLength: 1,
          maxLength: 20,
          isRequired: !0,
          label: "Pay Level/Grade",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 7,
          isDisable: !1,
          placeholder: "Select pay level",
        },
        reportingManager: {
          id: "reportingManager",
          isHide: !1,
          readOnly: !0,
          minLength: 2,
          maxLength: 50,
          isRequired: !0,
          label: "Reporting Manager",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 8,
          isDisable: !1,
          placeholder: "Select manager",
        },
      };
      let JobDetailsComponent = class JobDetailsComponent {
        commonService = (0, _effect_chunk2.WQX)(common_service.h);
        dropdownService = (0, _effect_chunk2.WQX)(dropdown_service.H);
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        dataService = (0, _effect_chunk2.WQX)(employee_data_service.a);
        formConfig = jobDetailsForm;
        jobDetails;
        departmentOptions$;
        employeeTypeOptions$;
        workLocationOptions$;
        shiftTimingOptions$;
        payLevelOptions$;
        reportingManagerOptions$;
        ngOnInit() {
          ((this.departmentOptions$ =
            this.dropdownService.getOptions("department")),
            (this.employeeTypeOptions$ =
              this.dropdownService.getOptions("employeeType")),
            (this.workLocationOptions$ =
              this.dropdownService.getOptions("workLocation")),
            (this.shiftTimingOptions$ =
              this.dropdownService.getOptions("shiftTiming")),
            (this.payLevelOptions$ =
              this.dropdownService.getOptions("payLevel")),
            (this.reportingManagerOptions$ =
              this.dropdownService.getOptions("reportingManager")),
            (this.jobDetails = this.commonService.createForm(this.formConfig)));
          const savedData = this.dataService.getDataByRoute("job-details");
          (savedData && this.jobDetails.patchValue(savedData),
            this.stepperService.setStepValidity(this.jobDetails.valid),
            this.jobDetails.statusChanges.subscribe((status) => {
              this.stepperService.setStepValidity("VALID" === status);
            }));
        }
      };
      JobDetailsComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-job-details",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              text_box_component.O,
              dropdown_component.P,
            ],
            template:
              '<div class="w-full bg-white p-5 rounded-[25px] border border-gray-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">\r\n  <div class="grid grid-cols-3 gap-5 mt-[3%]">\r\n\r\n    @if (!formConfig.officeEmail.isHide) {\r\n      <ui-text-box\r\n        [id]="formConfig.officeEmail.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.officeEmail.label!"\r\n        [placeholder]="formConfig.officeEmail.placeholder ?? \'\'"\r\n        [minLength]="formConfig.officeEmail.minLength"\r\n        [maxLength]="formConfig.officeEmail.maxLength"\r\n        [isRequired]="formConfig.officeEmail.isRequired!"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.department.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.department.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.department.label!"\r\n        [placeholder]="formConfig.department.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.department.isRequired!"\r\n        [options]="departmentOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.designation.isHide) {\r\n      <ui-text-box\r\n        [id]="formConfig.designation.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.designation.label!"\r\n        [placeholder]="formConfig.designation.placeholder ?? \'\'"\r\n        [minLength]="formConfig.designation.minLength"\r\n        [maxLength]="formConfig.designation.maxLength"\r\n        [isRequired]="formConfig.designation.isRequired!"\r\n      ></ui-text-box>\r\n    }\r\n\r\n    @if (!formConfig.employeeType.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.employeeType.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.employeeType.label!"\r\n        [placeholder]="formConfig.employeeType.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.employeeType.isRequired!"\r\n        [options]="employeeTypeOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.workLocation.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.workLocation.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.workLocation.label!"\r\n        [placeholder]="formConfig.workLocation.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.workLocation.isRequired!"\r\n        [options]="workLocationOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.shiftTimings.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.shiftTimings.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.shiftTimings.label!"\r\n        [placeholder]="formConfig.shiftTimings.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.shiftTimings.isRequired!"\r\n        [options]="shiftTimingOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.payLevel.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.payLevel.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.payLevel.label!"\r\n        [placeholder]="formConfig.payLevel.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.payLevel.isRequired!"\r\n        [options]="payLevelOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n    @if (!formConfig.reportingManager.isHide) {\r\n      <ui-dropdown\r\n        [id]="formConfig.reportingManager.id"\r\n        [parentFormGroup]="jobDetails"\r\n        [label]="formConfig.reportingManager.label!"\r\n        [placeholder]="formConfig.reportingManager.placeholder ?? \'\'"\r\n        [isRequired]="formConfig.reportingManager.isRequired!"\r\n        [options]="reportingManagerOptions$ | async"\r\n      ></ui-dropdown>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n',
            styles: [job_details_componentngResource_default()],
          }),
        ],
        JobDetailsComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/salary-structure/salary-structure.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        v: () => SalaryStructureComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var salary_structure_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/salary-structure/salary-structure.component.scss?ngResource",
        ),
        salary_structure_componentngResource_default = __webpack_require__.n(
          salary_structure_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        );
      let SalaryStructureComponent = class SalaryStructureComponent {
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        ngOnInit() {
          this.stepperService.setStepValidity(!1);
        }
      };
      SalaryStructureComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-salary-structure",
            standalone: !0,
            imports: [],
            template:
              '<div class="w-full bg-white rounded-[25px] p-8 border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center min-h-[200px]">\r\n  <p class="text-gray-400 text-[16px]">Salary &amp; Payroll configuration coming soon.</p>\r\n</div>\r\n',
            styles: [salary_structure_componentngResource_default()],
          }),
        ],
        SalaryStructureComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        b: () => TempLoginCredentialsComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var temp_login_credentials_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component.scss?ngResource",
        ),
        temp_login_credentials_componentngResource_default =
          __webpack_require__.n(temp_login_credentials_componentngResource),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        text_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts",
        ),
        password_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/password/password.component.ts",
        ),
        icon_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/primitives/icon/icon.component.ts",
        );
      var notice_bannerngResource = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/primitives/notice-banner/notice-banner.scss?ngResource",
        ),
        notice_bannerngResource_default = __webpack_require__.n(
          notice_bannerngResource,
        );
      let NoticeBannerComponent = class NoticeBannerComponent {
        heading = "Important: ";
        content =
          "Changes to leave policies will apply to all employees from the next calendar year. Current year balances will remain unchanged.";
        headingColor = "#1E3A8A";
        contentColor = "#374151";
        contentInNextLine = !1;
        bannerColor = "#DBEAFE";
        highlighterColor = "#1E3A8A";
        showIcon = !0;
        iconColor = "#1E3A8A";
        showBorder = !1;
        static propDecorators = {
          heading: [{ type: _debug_node_chunk.pde }],
          content: [{ type: _debug_node_chunk.pde }],
          headingColor: [{ type: _debug_node_chunk.pde }],
          contentColor: [{ type: _debug_node_chunk.pde }],
          contentInNextLine: [{ type: _debug_node_chunk.pde }],
          bannerColor: [{ type: _debug_node_chunk.pde }],
          highlighterColor: [{ type: _debug_node_chunk.pde }],
          showIcon: [{ type: _debug_node_chunk.pde }],
          iconColor: [{ type: _debug_node_chunk.pde }],
          showBorder: [{ type: _debug_node_chunk.pde }],
        };
      };
      NoticeBannerComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            selector: "ui-notice-banner",
            standalone: !0,
            imports: [icon_component.R],
            template:
              '\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div\r\n  class="flex p-4 rounded-md bg-[var(--banner-color,#DBEAFE)] border-l-4 border-[var(--border-color,#1E3A8A)]"\r\n  [class.border]="showBorder"\r\n  [class.hide-icon]="!showIcon"\r\n  [style.--banner-color]="bannerColor"\r\n  [style.--border-color]="highlighterColor"\r\n  [style.--heading-color]="headingColor"\r\n  [style.--content-color]="contentColor"\r\n  [style.--icon-color]="iconColor"\r\n>\r\n\r\n\r\n  <ui-icon [name]="\'mage:information-circle\'"></ui-icon>\r\n\r\n  <div class="ml-3">\r\n    <span class="font-semibold text-[var(--heading-color,#1E3A8A)]">{{ heading }}</span>\r\n\r\n    @if (!contentInNextLine) {\r\n      <span class="text-[var(--content-color,#374151)]">{{ content }}</span>\r\n    }\r\n\r\n    @if (contentInNextLine) {\r\n      <div class="mt-1">\r\n        <span class="text-[var(--content-color,#374151)]">{{ content }}</span>\r\n      </div>\r\n    }\r\n  </div>\r\n</div>\r\n',
            styles: [notice_bannerngResource_default()],
          }),
        ],
        NoticeBannerComponent,
      );
      var icon_text_button_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/icon-text-button/icon-text-button.component.ts",
        ),
        common_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/common.service.ts",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        ),
        employee_data_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/employee-data/employee-data.service.ts",
        );
      const tempLoginForm = {
        temporaryUsername: {
          id: "temporaryUsername",
          isHide: !1,
          readOnly: !1,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Temporary Username",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 1,
          isDisable: !1,
          placeholder: "Enter temporary username",
        },
        temporaryPassword: {
          id: "temporaryPassword",
          isHide: !1,
          readOnly: !1,
          minLength: 12,
          maxLength: 50,
          isRequired: !0,
          label: "Temporary Password",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 2,
          isDisable: !1,
          placeholder: "Enter temporary password",
        },
      };
      let TempLoginCredentialsComponent = class TempLoginCredentialsComponent {
        commonService = (0, _effect_chunk2.WQX)(common_service.h);
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        dataService = (0, _effect_chunk2.WQX)(employee_data_service.a);
        formConfig = tempLoginForm;
        tempLoginCredentials;
        temporaryPassword = (0, _effect_chunk2.vPA)("");
        temporaryUsername = (0, _effect_chunk2.vPA)("");
        hasUppercase = (0, _effect_chunk2.vPA)(!1);
        hasLowercase = (0, _effect_chunk2.vPA)(!1);
        hasNumber = (0, _effect_chunk2.vPA)(!1);
        hasSpecialChar = (0, _effect_chunk2.vPA)(!1);
        isLengthValid = (0, _effect_chunk2.vPA)(!1);
        isAllRulesMet = !1;
        ngOnInit() {
          this.tempLoginCredentials = this.commonService.createForm(
            this.formConfig,
          );
          const savedData = this.dataService.getDataByRoute(
            "temp-login-credentials",
          );
          (savedData && this.tempLoginCredentials.patchValue(savedData),
            this.tempLoginCredentials.statusChanges.subscribe((status) => {
              const isValid = "VALID" === status && this.isAllRulesMet;
              this.stepperService.setStepValidity(isValid);
            }));
        }
        onUserNameInput(value) {
          (this.temporaryUsername.set(value), this.updateFormValues());
        }
        onPasswordInput(value) {
          (this.temporaryPassword.set(value),
            this.checkPasswordRules(),
            this.updateFormValues());
        }
        preventInvalidKeys(event) {
          /[A-Za-z0-9!@#$%&*]/.test(event.key) ||
            ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
              event.key,
            ) ||
            event.preventDefault();
        }
        emailSplitting(email) {
          if (!email) return;
          const username = email.split("@")[0];
          (this.temporaryUsername.set(username), this.generate());
        }
        generate() {
          const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lower = "abcdefghijklmnopqrstuvwxyz",
            required =
              upper[Math.floor(26 * Math.random())] +
              lower[Math.floor(26 * Math.random())] +
              "0123456789"[Math.floor(10 * Math.random())] +
              "!@#$%&*"[Math.floor(7 * Math.random())],
            allChars = upper + lower + "0123456789!@#$%&*";
          let password = required;
          for (let i = required.length; i < 12; i++)
            password += allChars[Math.floor(69 * Math.random())];
          const shuffled = password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
          (this.temporaryPassword.set(shuffled),
            this.checkPasswordRules(),
            this.updateFormValues());
        }
        checkPasswordRules() {
          const pwd = this.temporaryPassword();
          (this.isLengthValid.set(pwd.length >= 12),
            this.hasUppercase.set(/[A-Z]/.test(pwd)),
            this.hasLowercase.set(/[a-z]/.test(pwd)),
            this.hasNumber.set(/\d/.test(pwd)),
            this.hasSpecialChar.set(/[!@#$%&*]/.test(pwd)),
            (this.isAllRulesMet =
              this.isLengthValid() &&
              this.hasUppercase() &&
              this.hasLowercase() &&
              this.hasNumber() &&
              this.hasSpecialChar()));
        }
        updateFormValues() {
          this.tempLoginCredentials.patchValue({
            temporaryUsername: this.temporaryUsername(),
            temporaryPassword: this.temporaryPassword(),
          });
        }
      };
      TempLoginCredentialsComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-temp-login-credentials",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              text_box_component.O,
              password_component.n,
              icon_component.R,
              NoticeBannerComponent,
              icon_text_button_component.C,
            ],
            template:
              '<div class="border border-blue-300/60 bg-blue-50 rounded-lg p-6 w-full shadow-sm">\r\n  <div class="flex items-center mb-2">\r\n    <span class="text-[20px] text-blue-600 mr-2">\r\n      <ui-icon name="lucide:key"></ui-icon>\r\n    </span>\r\n    <h2 class="text-[18px] text-slate-800 m-0">Temporary Login Credentials</h2>\r\n  </div>\r\n\r\n  <p class="text-gray-500 text-[15px] pb-6 pr-0">\r\n    Generate a temporary password for the employee\'s first login. The employee will be required to change this\r\n    password on first login.\r\n  </p>\r\n\r\n  <div class="grid grid-cols-[30%_55%_15%] gap-2 items-end">\r\n    @if (!formConfig.temporaryUsername.isHide) {\r\n      <div class="pr-2">\r\n        <ui-text-box\r\n          [id]="formConfig.temporaryUsername.id"\r\n          [parentFormGroup]="tempLoginCredentials"\r\n          [label]="formConfig.temporaryUsername.label!"\r\n          [placeholder]="formConfig.temporaryUsername.placeholder ?? \'\'"\r\n          [isRequired]="formConfig.temporaryUsername.isRequired!"\r\n          [value]="temporaryUsername()"\r\n          (valueChange)="onUserNameInput($event)"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.temporaryPassword.isHide) {\r\n      <div>\r\n        <ui-password\r\n          [id]="formConfig.temporaryPassword.id"\r\n          [parentFormGroup]="tempLoginCredentials"\r\n          [label]="formConfig.temporaryPassword.label!"\r\n          [placeholder]="formConfig.temporaryPassword.placeholder ?? \'\'"\r\n          [isRequired]="formConfig.temporaryPassword.isRequired!"\r\n          [value]="temporaryPassword()"\r\n          (valueChange)="onPasswordInput($event)"\r\n          (keydown)="preventInvalidKeys($event)"\r\n        ></ui-password>\r\n      </div>\r\n    }\r\n\r\n    <div class="pl-2">\r\n      <ui-icon-text-button\r\n        text="Generate"\r\n        variant="primary"\r\n        (buttonClick)="generate()"\r\n      ></ui-icon-text-button>\r\n    </div>\r\n  </div>\r\n\r\n  <ul class="mt-1 mb-2 text-[13px] text-gray-500 list-disc pl-5">\r\n    <li class="font-medium transition-colors duration-200 ease-in-out">\r\n      Password should be\r\n      <span [class.text-green-600]="isLengthValid()" [class.text-gray-400]="!isLengthValid()">12 characters long</span>\r\n    </li>\r\n    <li class="font-medium transition-colors duration-200 ease-in-out">\r\n      Include\r\n      <span [class.text-green-600]="hasUppercase()" [class.text-gray-400]="!hasUppercase()">uppercase</span>,\r\n      <span [class.text-green-600]="hasLowercase()" [class.text-gray-400]="!hasLowercase()">lowercase</span>,\r\n      <span [class.text-green-600]="hasNumber()" [class.text-gray-400]="!hasNumber()">number</span>, and\r\n      <span [class.text-green-600]="hasSpecialChar()" [class.text-gray-400]="!hasSpecialChar()">special characters ( ! @ # $ % &amp; * )</span>\r\n    </li>\r\n    <li class="font-medium">Employee will be prompted to change password on first login</li>\r\n  </ul>\r\n\r\n  @if (isAllRulesMet) {\r\n    <ui-notice-banner\r\n      heading="Temporary password generated successfully"\r\n      headingColor="green"\r\n      contentColor="green"\r\n      highlighterColor="green"\r\n      bannerColor="green-500"\r\n      [contentInNextLine]="true"\r\n      [showIcon]="false"\r\n      [showBorder]="true"\r\n      content="Make sure to securely share this password with the employee through official channels."\r\n    ></ui-notice-banner>\r\n  }\r\n</div>\r\n',
            styles: [temp_login_credentials_componentngResource_default()],
          }),
        ],
        TempLoginCredentialsComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/work-experience/work-experience.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        D: () => WorkExperienceComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var work_experience_componentngResource = __webpack_require__(
          "./src/libs/modules/employees/src/lib/components/work-experience/work-experience.component.scss?ngResource",
        ),
        work_experience_componentngResource_default = __webpack_require__.n(
          work_experience_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        text_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/text-box/text-box.component.ts",
        ),
        number_box_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/number-box/number-box.component.ts",
        ),
        common_service = __webpack_require__(
          "./src/libs/shared/common/src/lib/services/common.service.ts",
        ),
        stepper_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/stepper/stepper.service.ts",
        ),
        employee_data_service = __webpack_require__(
          "./src/libs/modules/employees/src/lib/services/employee-data/employee-data.service.ts",
        );
      const workExperienceForm = {
        previousOrganization: {
          id: "previousOrganization",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Organisation Name",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 1,
          isDisable: !1,
          placeholder: "Enter Organisation Name",
        },
        organizationLocation: {
          id: "organizationLocation",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Organisation Location",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 2,
          isDisable: !1,
          placeholder: "HYD",
        },
        yearOfExperience: {
          id: "yearOfExperience",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Years Of Experience",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 3,
          isDisable: !1,
        },
        previousDesignation: {
          id: "previousDesignation",
          isHide: !1,
          readOnly: !0,
          minLength: 0,
          maxLength: 50,
          isRequired: !0,
          label: "Previous Designation",
          defaultValue: null,
          fieldValue: null,
          tabIndex: 4,
          isDisable: !1,
        },
      };
      let WorkExperienceComponent = class WorkExperienceComponent {
        commonService = (0, _effect_chunk2.WQX)(common_service.h);
        stepperService = (0, _effect_chunk2.WQX)(stepper_service.p);
        dataService = (0, _effect_chunk2.WQX)(employee_data_service.a);
        formConfig = workExperienceForm;
        workExperience;
        ngOnInit() {
          this.workExperience = this.commonService.createForm(this.formConfig);
          const savedData = this.dataService.getDataByRoute("work-experience");
          (savedData && this.workExperience.patchValue(savedData),
            this.stepperService.setStepValidity(this.workExperience.valid),
            this.workExperience.statusChanges.subscribe((status) => {
              this.stepperService.setStepValidity("VALID" === status);
            }));
        }
      };
      WorkExperienceComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "employees-work-experience",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              text_box_component.O,
              number_box_component.m,
            ],
            template:
              '<div class="bg-white rounded-[16px] border border-[#dbeafe] shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in p-8 h-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">\r\n  <div class="grid grid-cols-2 gap-[10px] max-[768px]:grid-cols-1">\r\n\r\n    @if (!formConfig.previousOrganization.isHide) {\r\n      <div class="form-group">\r\n        <ui-text-box\r\n          [id]="formConfig.previousOrganization.id"\r\n          [parentFormGroup]="workExperience"\r\n          [label]="formConfig.previousOrganization.label!"\r\n          [placeholder]="formConfig.previousOrganization.placeholder ?? \'\'"\r\n          [minLength]="formConfig.previousOrganization.minLength"\r\n          [maxLength]="formConfig.previousOrganization.maxLength"\r\n          [isRequired]="formConfig.previousOrganization.isRequired!"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.previousDesignation.isHide) {\r\n      <div class="form-group">\r\n        <ui-text-box\r\n          [id]="formConfig.previousDesignation.id"\r\n          [parentFormGroup]="workExperience"\r\n          [label]="formConfig.previousDesignation.label!"\r\n          [placeholder]="formConfig.previousDesignation.placeholder ?? \'\'"\r\n          [minLength]="formConfig.previousDesignation.minLength"\r\n          [maxLength]="formConfig.previousDesignation.maxLength"\r\n          [isRequired]="formConfig.previousDesignation.isRequired!"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.yearOfExperience.isHide) {\r\n      <div class="form-group">\r\n        <ui-number-box\r\n          [id]="formConfig.yearOfExperience.id"\r\n          [parentFormGroup]="workExperience"\r\n          [label]="formConfig.yearOfExperience.label!"\r\n          [placeholder]="formConfig.yearOfExperience.placeholder ?? \'0\'"\r\n          [minValue]="formConfig.yearOfExperience.minLength"\r\n          [maxValue]="formConfig.yearOfExperience.maxLength"\r\n          [isRequired]="formConfig.yearOfExperience.isRequired!"\r\n        ></ui-number-box>\r\n      </div>\r\n    }\r\n\r\n    @if (!formConfig.organizationLocation.isHide) {\r\n      <div class="form-group">\r\n        <ui-text-box\r\n          [id]="formConfig.organizationLocation.id"\r\n          [parentFormGroup]="workExperience"\r\n          [label]="formConfig.organizationLocation.label!"\r\n          [placeholder]="formConfig.organizationLocation.placeholder ?? \'\'"\r\n          [minLength]="formConfig.organizationLocation.minLength"\r\n          [maxLength]="formConfig.organizationLocation.maxLength"\r\n          [isRequired]="formConfig.organizationLocation.isRequired!"\r\n        ></ui-text-box>\r\n      </div>\r\n    }\r\n\r\n  </div>\r\n</div>\r\n',
            styles: [work_experience_componentngResource_default()],
          }),
        ],
        WorkExperienceComponent,
      );
    },
    "./src/libs/shared/ui/src/lib/components/controls/number-box/number-box.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        m: () => NumberBoxComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var number_box_componentngResource = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/number-box/number-box.component.scss?ngResource",
        ),
        number_box_componentngResource_default = __webpack_require__.n(
          number_box_componentngResource,
        ),
        _common_module_chunk = __webpack_require__(
          "./node_modules/@angular/common/fesm2022/_common_module-chunk.mjs",
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        core = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/core.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        icon_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/primitives/icon/icon.component.ts",
        );
      let NumberBoxComponent = class NumberBoxComponent {
        cdr;
        label = "Casual";
        isRequired = !0;
        placeholder = "0";
        parentFormGroup;
        minValue;
        maxValue;
        set step(value) {
          this._step = value < 0 ? Math.abs(value) : value || 1;
        }
        get step() {
          return this._step;
        }
        _step = 1;
        id = "casual";
        numberBox = new _effect_chunk2.bkB();
        blurEvent = new _effect_chunk2.bkB();
        localForm = new fesm2022_forms.gE({});
        isFocused = !1;
        constructor(cdr) {
          this.cdr = cdr;
        }
        ngOnInit() {
          this.parentFormGroup ||
            (this.localForm = new fesm2022_forms.gE({
              [this.id]: new fesm2022_forms.MJ(""),
            }));
        }
        get activeForm() {
          return this.parentFormGroup ?? this.localForm;
        }
        get control() {
          return this.activeForm.get(this.id);
        }
        get hasValue() {
          const value = this.control?.value;
          return null != value && "" !== value;
        }
        get isInvalid() {
          return !(
            !this.control ||
            !this.control.invalid ||
            (!this.control.dirty && !this.control.touched)
          );
        }
        onInput(event) {
          const input = event.target,
            rawValue = input.value.trim();
          if ("" === rawValue)
            return (
              this.control?.setValue("", { emitEvent: !1 }),
              this.cdr.markForCheck(),
              void this.cdr.detectChanges()
            );
          let value = Number(rawValue);
          (void 0 !== this.minValue &&
            value < this.minValue &&
            ((value = this.minValue), (input.value = value.toString())),
            void 0 !== this.maxValue &&
              value > this.maxValue &&
              ((value = this.maxValue), (input.value = value.toString())),
            this.control?.setValue(value, { emitEvent: !1 }),
            this.cdr.markForCheck(),
            this.cdr.detectChanges(),
            this.numberBox.emit(value));
        }
        onFocus() {
          ((this.isFocused = !0), this.cdr.markForCheck());
        }
        onBlur() {
          ((this.isFocused = !1),
            this.control?.markAsTouched(),
            this.cdr.markForCheck(),
            this.blurEvent.emit());
        }
        increment(event) {
          if ((event.preventDefault(), event.stopPropagation(), !this.control))
            return;
          let next = (Number(this.control.value) || 0) + this.step;
          (void 0 !== this.maxValue &&
            next > this.maxValue &&
            (next = this.maxValue),
            this.updateValue(next));
        }
        decrement(event) {
          if ((event.preventDefault(), event.stopPropagation(), !this.control))
            return;
          let next = (Number(this.control.value) || 0) - this.step;
          (void 0 !== this.minValue &&
            next < this.minValue &&
            (next = this.minValue),
            this.updateValue(next));
        }
        updateValue(value) {
          if (!this.control) return;
          (this.control.setValue(value),
            this.control.markAsDirty(),
            this.control.markAsTouched(),
            this.control.updateValueAndValidity({
              onlySelf: !1,
              emitEvent: !0,
            }),
            this.cdr.markForCheck(),
            this.cdr.detectChanges(),
            this.numberBox.emit(value));
          const inputElement = document.getElementById(this.id);
          inputElement && inputElement.focus();
        }
        static ctorParameters = () => [{ type: core.ChangeDetectorRef }];
        static propDecorators = {
          label: [{ type: _debug_node_chunk.pde }],
          isRequired: [{ type: _debug_node_chunk.pde }],
          placeholder: [{ type: _debug_node_chunk.pde }],
          parentFormGroup: [{ type: _debug_node_chunk.pde }],
          minValue: [{ type: _debug_node_chunk.pde }],
          maxValue: [{ type: _debug_node_chunk.pde }],
          step: [{ type: _debug_node_chunk.pde }],
          id: [{ type: _debug_node_chunk.pde }],
          numberBox: [{ type: _debug_node_chunk.k7i }],
          blurEvent: [{ type: _debug_node_chunk.k7i }],
        };
      };
      NumberBoxComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "ui-number-box",
            standalone: !0,
            imports: [
              _common_module_chunk.MD,
              fesm2022_forms.X1,
              icon_component.R,
            ],
            template:
              '\r\n\r\n<div class="relative w-full" [formGroup]="activeForm">\r\n\r\n  <input\r\n    type="number"\r\n    [step]="step"\r\n    [id]="id"\r\n    [formControlName]="id"\r\n    [attr.placeholder]="isFocused || hasValue ? placeholder : \'\'"\r\n    (focus)="onFocus()"\r\n    (input)="onInput($event)"\r\n    (blur)="onBlur()"\r\n    [class.border-red-600]="isInvalid"\r\n    class="peer w-full h-[36px] inputBoxHeight\r\n           text-[14px] text-[#1f2937]\r\n           rounded-[6px]\r\n           outline-none\r\n           transition\r\n           bg-white\r\n           px-3 pr-[40px] pb-1\r\n           border border-slate-300\r\n           placeholder:text-gray-400\r\n           focus:!border-[#2563eb]\r\n           focus:shadow-none\r\n           [&::-webkit-inner-spin-button]:appearance-none\r\n           [&::-webkit-outer-spin-button]:appearance-none"\r\n  />\r\n\r\n  <label\r\n    [for]="id"\r\n    class="absolute left-3 bg-white px-1\r\n           transition-all duration-200 ease-out\r\n           pointer-events-none z-[2]\r\n           font-medium whitespace-nowrap"\r\n    [class]="(isFocused || hasValue) ? \'-top-[7.5px] text-[12px]\' : \'top-[6px] text-[14px]\'"\r\n    [class.text-blue-600]="isFocused && !isInvalid"\r\n    [class.text-gray-500]="!isFocused && !isInvalid"\r\n    [class.text-red-600]="isInvalid">\r\n    {{ label }}\r\n    @if (isRequired) {\r\n      <span class="required text-red-600">*</span>\r\n    }\r\n  </label>\r\n\r\n  @if (isFocused || hasValue) {\r\n    <div class="absolute right-[10px] top-1/2 -translate-y-1/2\r\n                flex flex-col gap-0 z-[50]">\r\n\r\n      <button\r\n        type="button"\r\n        (click)="increment($event)"\r\n        tabindex="-1"\r\n        class="w-[20px] h-[16px]\r\n               flex items-center justify-center\r\n               bg-transparent\r\n               text-[#6b7280]\r\n               cursor-pointer\r\n               outline-none\r\n               select-none\r\n               hover:text-[#2563eb]\r\n               hover:bg-[#f3f4f6]\r\n               hover:rounded-[2px]\r\n               active:scale-[0.95]\r\n               active:bg-[#e5e7eb]\r\n               relative z-[51]">\r\n\r\n        <ui-icon\r\n          [name]="\'fluent:caret-up-24-filled\'"\r\n          class="pointer-events-none w-[12px] h-[12px]">\r\n        </ui-icon>\r\n\r\n      </button>\r\n\r\n      <button\r\n        type="button"\r\n        (click)="decrement($event)"\r\n        tabindex="-1"\r\n        class="w-[20px] h-[16px]\r\n               flex items-center justify-center\r\n               bg-transparent\r\n               text-[#6b7280]\r\n               cursor-pointer\r\n               outline-none\r\n               select-none\r\n               hover:text-[#2563eb]\r\n               hover:bg-[#f3f4f6]\r\n               hover:rounded-[2px]\r\n               active:scale-[0.95]\r\n               active:bg-[#e5e7eb]\r\n               relative z-[51]">\r\n\r\n        <ui-icon\r\n          [name]="\'fluent:caret-down-24-filled\'"\r\n          class="pointer-events-none w-[12px] h-[12px]">\r\n        </ui-icon>\r\n\r\n      </button>\r\n\r\n    </div>\r\n  }\r\n</div>\r\n',
            styles: [number_box_componentngResource_default()],
          }),
        ],
        NumberBoxComponent,
      );
    },
    "./src/libs/shared/ui/src/lib/components/controls/password/password.component.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        n: () => PasswordComponent,
      });
      var tslib_es6 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
      var password_componentngResource = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/controls/password/password.component.scss?ngResource",
        ),
        password_componentngResource_default = __webpack_require__.n(
          password_componentngResource,
        ),
        _effect_chunk2 = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _debug_node_chunk = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        fesm2022_forms = __webpack_require__(
          "./node_modules/@angular/forms/fesm2022/forms.mjs",
        ),
        icon_component = __webpack_require__(
          "./src/libs/shared/ui/src/lib/components/primitives/icon/icon.component.ts",
        );
      let PasswordComponent = class PasswordComponent {
        label = "Temporary Password";
        isRequired = !0;
        placeholder = "Enter Temporary password";
        minLength = 0;
        maxLength = 50;
        passwordVisible = !1;
        activeChange = new _effect_chunk2.bkB();
        value = "";
        isActive = !1;
        parentFormGroup;
        id;
        get control() {
          return this.parentFormGroup?.get(this.id);
        }
        get isInvalid() {
          return (
            this.control?.invalid &&
            (this.control?.dirty || this.control?.touched)
          );
        }
        get hasValue() {
          return (
            (this.control?.value ?? this.value ?? "").toString().length > 0
          );
        }
        valueChange = new _effect_chunk2.bkB();
        togglePassword() {
          this.passwordVisible = !this.passwordVisible;
        }
        onFocus() {
          this.isActive = !0;
        }
        onBlur() {
          (this.hasValue || (this.isActive = !1),
            this.control?.markAsTouched());
        }
        onInput(event) {
          const input = event.target;
          let v = input.value;
          (v.length > this.maxLength &&
            ((v = v.slice(0, this.maxLength)), (input.value = v)),
            (this.value = v),
            this.valueChange.emit(this.value));
        }
        static propDecorators = {
          label: [{ type: _debug_node_chunk.pde }],
          isRequired: [{ type: _debug_node_chunk.pde }],
          placeholder: [{ type: _debug_node_chunk.pde }],
          minLength: [{ type: _debug_node_chunk.pde }],
          maxLength: [{ type: _debug_node_chunk.pde }],
          activeChange: [{ type: _debug_node_chunk.k7i }],
          value: [{ type: _debug_node_chunk.pde }],
          parentFormGroup: [{ type: _debug_node_chunk.pde }],
          id: [{ type: _debug_node_chunk.pde }],
          valueChange: [{ type: _debug_node_chunk.k7i }],
        };
      };
      PasswordComponent = (0, tslib_es6.Cg)(
        [
          (0, _debug_node_chunk.uAl)({
            changeDetection: _debug_node_chunk.Ngq.OnPush,
            selector: "ui-password",
            template:
              '<div class="flex w-full flex-col gap-1.5" [formGroup]="parentFormGroup">\n  <div\n    class="relative h-[36px] w-full rounded-md border px-3 transition-colors duration-200"\n    [class.border-red-500]="isInvalid"\n    [class.border-blue-600]="isActive && !isInvalid"\n    [class.border-slate-300]="!isActive && !isInvalid"\n  >\n    <input\n      [id]="id"\n      [type]="passwordVisible ? \'text\' : \'password\'"\n      [formControlName]="id"\n      [placeholder]="placeholder"\n      [value]="value"\n      [attr.minlength]="minLength"\n      [attr.maxlength]="maxLength"\n      (input)="onInput($event)"\n      (focus)="onFocus()"\n      (blur)="onBlur()"\n      class="peer h-full w-full bg-transparent pr-8 text-[14px] outline-none placeholder-transparent focus:placeholder-gray-400"\n    />\n\n    <label\n      [for]="id"\n      class="pointer-events-none absolute left-2 px-1 transition-all duration-200"\n      [class.-top-2]="isActive || hasValue"\n      [class.top-1.5]="!(isActive || hasValue)"\n      [class.text-xs]="isActive || hasValue"\n      [class.text-sm]="!(isActive || hasValue)"\n      [class.text-red-500]="isInvalid"\n      [class.text-blue-600]="!isInvalid && isActive"\n      [class.text-gray-500]="!isInvalid && !isActive"\n      [class.bg-white]="isActive || hasValue"\n    >\n      {{ label }}\n      @if (isRequired) {\n        <span class="text-red-600">*</span>\n      }\n    </label>\n\n    <button\n      type="button"\n      (click)="togglePassword()"\n      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"\n      aria-label="Toggle password visibility"\n    >\n      <ui-icon [name]="passwordVisible ? \'eye_off\' : \'eye\'"></ui-icon>\n    </button>\n  </div>\n</div>\n',
            imports: [icon_component.R, fesm2022_forms.X1],
            styles: [password_componentngResource_default()],
          }),
        ],
        PasswordComponent,
      );
    },
    "./src/libs/modules/employees/src/lib/components/employees/employees.stories.ts"(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) {
      "use strict";
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AddEmployee: () => AddEmployee,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/tslib/tslib.es6.mjs",
        ),
        _storybook_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@storybook/angular/dist/index.js",
        ),
        _angular_router_testing__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@angular/router/fesm2022/testing.mjs",
          ),
        _add_employee_add_employee_component__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/add-employee/add-employee.component.ts",
          ),
        _basic_info_basic_info_component__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/basic-info/basic-info.component.ts",
          ),
        _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/contact-info/contact-info.component.ts",
          ),
        _job_details_job_details_component__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/job-details/job-details.component.ts",
          ),
        _education_details_education_details_component__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/education-details/education-details.component.ts",
          ),
        _salary_structure_salary_structure_component__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/salary-structure/salary-structure.component.ts",
          ),
        _work_experience_work_experience_component__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/work-experience/work-experience.component.ts",
          ),
        _documents_upload_documents_upload_component__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/documents-upload/documents-upload.component.ts",
          ),
        _temp_login_credentials_temp_login_credentials_component__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            "./src/libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component.ts",
          ),
        _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_debug_node-chunk.mjs",
        ),
        _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          "./node_modules/@angular/core/fesm2022/_effect-chunk2.mjs",
        ),
        _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          "./node_modules/@angular/router/fesm2022/_router-chunk.mjs",
        );
      let AddEmployeeWrapperComponent = class AddEmployeeWrapperComponent {
        router = (0, _angular_core__WEBPACK_IMPORTED_MODULE_13__.WQX)(
          _angular_router__WEBPACK_IMPORTED_MODULE_14__.Ix,
        );
        ngOnInit() {
          this.router.navigate(["/add-employee/basic-info"]);
        }
      };
      AddEmployeeWrapperComponent = (0, tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)(
        [
          (0, _angular_core__WEBPACK_IMPORTED_MODULE_12__.uAl)({
            selector: "story-add-employee-wrapper",
            standalone: !0,
            imports: [
              _add_employee_add_employee_component__WEBPACK_IMPORTED_MODULE_3__.D,
            ],
            template: "<employees-add-employee></employees-add-employee>",
          }),
        ],
        AddEmployeeWrapperComponent,
      );
      const childRoutes = [
          { path: "", redirectTo: "basic-info", pathMatch: "full" },
          {
            path: "basic-info",
            component:
              _basic_info_basic_info_component__WEBPACK_IMPORTED_MODULE_4__.s,
          },
          {
            path: "contact-info",
            component:
              _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_5__.s,
          },
          {
            path: "job-details",
            component:
              _job_details_job_details_component__WEBPACK_IMPORTED_MODULE_6__.N,
          },
          {
            path: "education-details",
            component:
              _education_details_education_details_component__WEBPACK_IMPORTED_MODULE_7__.a,
          },
          {
            path: "salary-structure",
            component:
              _salary_structure_salary_structure_component__WEBPACK_IMPORTED_MODULE_8__.v,
          },
          {
            path: "work-experience",
            component:
              _work_experience_work_experience_component__WEBPACK_IMPORTED_MODULE_9__.D,
          },
          {
            path: "documents-upload",
            component:
              _documents_upload_documents_upload_component__WEBPACK_IMPORTED_MODULE_10__.p,
          },
          {
            path: "temp-login-credentials",
            component:
              _temp_login_credentials_temp_login_credentials_component__WEBPACK_IMPORTED_MODULE_11__.b,
          },
        ],
        __WEBPACK_DEFAULT_EXPORT__ = {
          component: AddEmployeeWrapperComponent,
          title: "Employees/Add Employee",
          tags: ["autodocs"],
          decorators: [
            (0, _storybook_angular__WEBPACK_IMPORTED_MODULE_1__.Iz)({
              imports: [
                _angular_router_testing__WEBPACK_IMPORTED_MODULE_2__.c1.withRoutes(
                  [
                    {
                      path: "add-employee",
                      component:
                        _add_employee_add_employee_component__WEBPACK_IMPORTED_MODULE_3__.D,
                      children: childRoutes,
                    },
                  ],
                ),
                AddEmployeeWrapperComponent,
              ],
            }),
          ],
          parameters: { layout: "fullscreen" },
        },
        AddEmployee = {
          render: () => ({ template: "<router-outlet></router-outlet>" }),
        },
        __namedExportsOrder = ["AddEmployee"];
      AddEmployee.parameters = {
        ...AddEmployee.parameters,
        docs: {
          ...AddEmployee.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: () => ({\n    template: `<router-outlet></router-outlet>`\n  })\n}",
            ...AddEmployee.parameters?.docs?.source,
          },
        },
      };
    },
    "./src/libs/modules/employees/src/lib/components/basic-info/basic-info.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/modules/employees/src/lib/components/education-details/education-details.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/modules/employees/src/lib/components/job-details/job-details.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/modules/employees/src/lib/components/salary-structure/salary-structure.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/modules/employees/src/lib/components/work-experience/work-experience.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/shared/ui/src/lib/components/controls/number-box/number-box.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([
        module.id,
        ".number-box-container {\n  height: 36px;\n}",
        "",
      ]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/shared/ui/src/lib/components/controls/password/password.component.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([
        module.id,
        ".password-container {\n  height: 36px;\n}",
        "",
      ]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
    "./src/libs/shared/ui/src/lib/components/primitives/notice-banner/notice-banner.scss?ngResource"(
      module,
      __unused_webpack_exports,
      __webpack_require__,
    ) {
      var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/noSourceMaps.js",
        ),
        ___CSS_LOADER_EXPORT___ = __webpack_require__(
          "./node_modules/css-loader/dist/runtime/api.js",
        )(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
      (___CSS_LOADER_EXPORT___.push([module.id, "", ""]),
        (module.exports = ___CSS_LOADER_EXPORT___.toString()));
    },
  },
]);
//# sourceMappingURL=libs-modules-employees-src-lib-components-employees-employees-stories.e6acf442.iframe.bundle.js.map
