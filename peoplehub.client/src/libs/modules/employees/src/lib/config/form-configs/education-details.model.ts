import { IFormFieldConfig } from 'common';

// export interface IEducationDetailsFormFields {
//     higherQualification: IFormFieldConfig;
//     board: IFormFieldConfig;
//     courseType: IFormFieldConfig;
//     specialization: IFormFieldConfig;
//     percentageScore: IFormFieldConfig;
//     scoringMethod: IFormFieldConfig;
//     monthOfPassing: IFormFieldConfig;
//     yearOfPassing: IFormFieldConfig;
//     universityName: IFormFieldConfig;
//     certifications: IFormFieldConfig;
// }

 

export type IEducationDetailsFormFields = {
   QualificationLevel : IFormFieldConfig;
   DegreeorCourseName : IFormFieldConfig;
   SpecializationorMajor : IFormFieldConfig;
   InstitutionorCollegeName : IFormFieldConfig;
   UniversityorBoardName : IFormFieldConfig;
   ModeofStudy : IFormFieldConfig; 
   StartDate : IFormFieldConfig;
   EndDate : IFormFieldConfig;
   YearofPassing : IFormFieldConfig;
   GradePercentageorCGPA : IFormFieldConfig;
   HighestQualificationFlag : IFormFieldConfig;
   EducationDocumentLink : IFormFieldConfig;
    certificationName : IFormFieldConfig;
    issuingOrganization : IFormFieldConfig;
    credentialId : IFormFieldConfig;
    issueDate : IFormFieldConfig;
    validFrom : IFormFieldConfig;
    validTo : IFormFieldConfig;
    certificationScoreOrGrade : IFormFieldConfig;
    verificationUrl : IFormFieldConfig;
    attachmentLink : IFormFieldConfig;
    activeExpiredStatus : IFormFieldConfig;
    
}

export type IEducationForm = {
  QualificationLevel: IFormFieldConfig;
  DegreeorCourseName: IFormFieldConfig;
  SpecializationorMajor: IFormFieldConfig;
  InstitutionorCollegeName: IFormFieldConfig;
  UniversityorBoardName: IFormFieldConfig;
  ModeofStudy: IFormFieldConfig;
  StartDate: IFormFieldConfig;
  EndDate: IFormFieldConfig;
  YearofPassing: IFormFieldConfig;
  GradePercentageorCGPA: IFormFieldConfig;
  HighestQualificationFlag: IFormFieldConfig;
  EducationDocumentLink: IFormFieldConfig;
};

export type ICertificationForm = {
  certificationName: IFormFieldConfig;
  issuingOrganization: IFormFieldConfig;
  credentialId: IFormFieldConfig;
  issueDate: IFormFieldConfig;
  validFrom: IFormFieldConfig;
  validTo: IFormFieldConfig;
  certificationScoreOrGrade: IFormFieldConfig;
  verificationUrl: IFormFieldConfig;
  attachmentLink: IFormFieldConfig;
  activeExpiredStatus: IFormFieldConfig;
};