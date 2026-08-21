import { IFormFieldConfig } from 'common';

export interface ISkillsFormFields {
  skillName: IFormFieldConfig;
  skillCategory: IFormFieldConfig;
  proficiencyLevel: IFormFieldConfig;
  yearsOfExperience: IFormFieldConfig;
  lastUsedYear: IFormFieldConfig;
  linkedCertification: IFormFieldConfig;
  primarySkill: IFormFieldConfig;
  remarks: IFormFieldConfig;
}

export type { ISkillsForm } from './skills.types';
