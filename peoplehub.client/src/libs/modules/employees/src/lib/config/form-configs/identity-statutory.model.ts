import { IFormFieldConfig } from 'common';

export interface IIdentityStatutoryFormFields {
  // Fixed identity and statutory fields
  panNumber: IFormFieldConfig;
  aadhaarNumber: IFormFieldConfig;
  uanNumber: IFormFieldConfig;
  pfAccountNumber: IFormFieldConfig;
  esiNumber: IFormFieldConfig;


  // Generic identification document rows

  documentType: IFormFieldConfig;
  documentNumber: IFormFieldConfig;
  nameOnDocument: IFormFieldConfig;
  issuingAuthority: IFormFieldConfig;
  issueDate: IFormFieldConfig;
  validFrom: IFormFieldConfig;
  validTo: IFormFieldConfig;
  countryOfIssue: IFormFieldConfig;
  placeOfIssue: IFormFieldConfig;
  verificationStatus: IFormFieldConfig;
  verifiedBy: IFormFieldConfig;
  frontAttachLink: IFormFieldConfig;
  backAttachLink: IFormFieldConfig;
  identificationDocumentRemarks: IFormFieldConfig;


  // Generic document repository model
  genericDocumentCategory: IFormFieldConfig;
  genericDocumentName: IFormFieldConfig;
  genericRelatedSection: IFormFieldConfig;
  genericRelatedRecordID: IFormFieldConfig;
  genericFileUpload: IFormFieldConfig;
  genericUploadDate: IFormFieldConfig;
  genericValidFrom: IFormFieldConfig;
  genericValidTo: IFormFieldConfig;
  genericVerificationStatus: IFormFieldConfig;
  genericVerifiedBy: IFormFieldConfig;
  genericRemarks: IFormFieldConfig;




}

export type { IIdentityStatutoryForm } from './identity-statutory.types';
