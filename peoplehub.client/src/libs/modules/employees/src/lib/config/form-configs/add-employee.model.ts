import { IFormFieldConfig } from 'common';

export interface IBasicInfoConfig {
    fullName: IFormFieldConfig;
    employeeId: IFormFieldConfig;
    dateofBirth: IFormFieldConfig;
    dateofJoining: IFormFieldConfig;
    gender: IFormFieldConfig;
    maritalStatus: IFormFieldConfig;
}
export interface IContactInfoConfig {
    personalMail: IFormFieldConfig;
    linkedinUrl: IFormFieldConfig;
    contactNo: IFormFieldConfig;
    permanentAddress: IFormFieldConfig;
    currentAddress: IFormFieldConfig;
    checkToggle: IFormFieldConfig;
    contactName: IFormFieldConfig;
    contactNumber: IFormFieldConfig;
    relation: IFormFieldConfig;
}
export interface IDocumentsUploadConfig {
    employeePhoto: IFormFieldConfig;
    employeePanNumber: IFormFieldConfig;
    employeePan: IFormFieldConfig;
    employeeAadharNumber: IFormFieldConfig;
    employeeAadhar: IFormFieldConfig;
    employeePassportNumber: IFormFieldConfig;
    employeePassport: IFormFieldConfig;
    last6monthsBankStatements: IFormFieldConfig;
    last3monthsPayslips: IFormFieldConfig;
    experienceLetter: IFormFieldConfig;
    relievingLetter: IFormFieldConfig;
    offerLetter: IFormFieldConfig;
}
export interface IEducationDetailsConfig {
    higherQualification: IFormFieldConfig;
    specialization: IFormFieldConfig;
    yearofPassing: IFormFieldConfig;
    universityName: IFormFieldConfig;
    certifications: IFormFieldConfig;
}
export interface IInsuranceDetailsConfig {
    fatherName: IFormFieldConfig;
    fatherAadharNumber: IFormFieldConfig;
    aadharUpload: IFormFieldConfig;
    fatherPanNumber: IFormFieldConfig;
    panUpload: IFormFieldConfig;
    dob: IFormFieldConfig;
    occupation: IFormFieldConfig;
    motherName: IFormFieldConfig;
    motherAadharNumber: IFormFieldConfig;
    motherPanNumber: IFormFieldConfig;
    dateofBirth: IFormFieldConfig;
    spouseName: IFormFieldConfig;
    spouseAadharNumber: IFormFieldConfig;
    spousePanNumber: IFormFieldConfig;
}
export interface IJobDetailsConfig {
    officeEmail: IFormFieldConfig;
    department: IFormFieldConfig;
    designation: IFormFieldConfig;
    employeeType: IFormFieldConfig;
    workLocation: IFormFieldConfig;
    shiftTimings: IFormFieldConfig;
    paylevel: IFormFieldConfig;
    reportingManager: IFormFieldConfig;
}

export interface IWorkExperienceConfig {
    previousorganisation: IFormFieldConfig;
    organizationLocation: IFormFieldConfig;
    yearOfExperience: IFormFieldConfig;
    previousdesignation: IFormFieldConfig;
}

export type { IAddEmployeeConfig } from './add-employee.types';



