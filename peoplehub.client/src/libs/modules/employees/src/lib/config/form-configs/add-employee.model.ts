import { IFormFieldConfig } from 'common';

export interface IBasicInfoConfig {
    firstName: IFormFieldConfig;
    employeeId: IFormFieldConfig;
    dateOfBirth: IFormFieldConfig;
    dateOfJoining: IFormFieldConfig;
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
    employeeAadhaarNumber: IFormFieldConfig;
    employeeAadhaar: IFormFieldConfig;
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
    yearOfPassing: IFormFieldConfig;
    universityName: IFormFieldConfig;
    certifications: IFormFieldConfig;
}
export interface IInsuranceDetailsConfig {
    fatherName: IFormFieldConfig;
    fatherAadhaarNumber: IFormFieldConfig;
    aadhaarUpload: IFormFieldConfig;
    fatherPanNumber: IFormFieldConfig;
    panUpload: IFormFieldConfig;
    dob: IFormFieldConfig;
    occupation: IFormFieldConfig;
    motherName: IFormFieldConfig;
    motherAadhaarNumber: IFormFieldConfig;
    motherPanNumber: IFormFieldConfig;
    dateOfBirth: IFormFieldConfig;
    spouseName: IFormFieldConfig;
    spouseAadhaarNumber: IFormFieldConfig;
    spousePanNumber: IFormFieldConfig;
}
export interface IJobDetailsConfig {
    officeEmail: IFormFieldConfig;
    department: IFormFieldConfig;
    designation: IFormFieldConfig;
    employeeType: IFormFieldConfig;
    workLocation: IFormFieldConfig;
    shiftTimings: IFormFieldConfig;
    payLevel: IFormFieldConfig;
    reportingManager: IFormFieldConfig;
}

export interface IWorkExperienceConfig {
    previousOrganization: IFormFieldConfig;
    organizationLocation: IFormFieldConfig;
    yearOfExperience: IFormFieldConfig;
    previousDesignation: IFormFieldConfig;
}

export type { IAddEmployeeConfig } from './add-employee.types';



