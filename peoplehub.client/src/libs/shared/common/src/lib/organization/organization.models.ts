/** Organizations (Super Admin). Matches PeopleHub.Server OrganizationsController. */

export interface Organization {
  id: number;
  code: string;
  name: string;
  legalName: string | null;
  industry: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  addressLine: string | null;
  city: string | null;
  stateProvince: string | null;
  country: string | null;
  pincode: string | null;
  timeZone: string | null;
  currency: string | null;
  financialYearStartMonth: number | null;
  taxId: string | null;
  registrationNumber: string | null;
  isActive: boolean;
  employeeCount: number;
  roleCount: number;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface OrganizationDraft {
  code: string;
  name: string;
  legalName: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  addressLine: string;
  city: string;
  stateProvince: string;
  country: string;
  pincode: string;
  timeZone: string;
  currency: string;
  financialYearStartMonth: number | null;
  taxId: string;
  registrationNumber: string;
}

export type OrganizationErrors = Partial<Record<keyof OrganizationDraft, string>>;

export const ORG_INDUSTRIES = [
  'Information Technology',
  'Software Products',
  'Consulting',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Education',
  'Finance & Banking',
  'Logistics',
  'Hospitality',
  'Construction',
  'Non-profit',
  'Other',
];

export const ORG_COUNTRIES = ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Australia', 'Canada', 'Germany', 'Other'];

/** Windows time zone ids (the server uses them), with a friendly label. */
export const ORG_TIME_ZONES: { id: string; label: string }[] = [
  { id: 'India Standard Time', label: '(UTC+05:30) India' },
  { id: 'Arabian Standard Time', label: '(UTC+04:00) Dubai' },
  { id: 'Singapore Standard Time', label: '(UTC+08:00) Singapore' },
  { id: 'GMT Standard Time', label: '(UTC+00:00) London' },
  { id: 'W. Europe Standard Time', label: '(UTC+01:00) Berlin, Paris' },
  { id: 'Eastern Standard Time', label: '(UTC-05:00) New York' },
  { id: 'Pacific Standard Time', label: '(UTC-08:00) Los Angeles' },
  { id: 'AUS Eastern Standard Time', label: '(UTC+10:00) Sydney' },
];

export const ORG_CURRENCIES: { code: string; label: string }[] = [
  { code: 'INR', label: 'INR - Indian Rupee' },
  { code: 'USD', label: 'USD - US Dollar' },
  { code: 'GBP', label: 'GBP - British Pound' },
  { code: 'EUR', label: 'EUR - Euro' },
  { code: 'AED', label: 'AED - UAE Dirham' },
  { code: 'SGD', label: 'SGD - Singapore Dollar' },
  { code: 'AUD', label: 'AUD - Australian Dollar' },
  { code: 'CAD', label: 'CAD - Canadian Dollar' },
];

export const ORG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const ORG_LIMITS = { codeMax: 20, nameMax: 200, legalNameMax: 200, emailMax: 150, websiteMax: 200, addressMax: 300, cityMax: 100, taxIdMax: 30, registrationMax: 50 };

export function emptyOrganizationDraft(): OrganizationDraft {
  return {
    code: '', name: '', legalName: '', industry: '', email: '', phone: '', website: '', addressLine: '', city: '', stateProvince: '',
    country: 'India', pincode: '', timeZone: 'India Standard Time', currency: 'INR', financialYearStartMonth: 4, taxId: '', registrationNumber: '',
  };
}

export function draftFromOrganization(o: Organization): OrganizationDraft {
  return {
    code: o.code, name: o.name, legalName: o.legalName ?? '', industry: o.industry ?? '', email: o.email ?? '', phone: o.phone ?? '',
    website: o.website ?? '', addressLine: o.addressLine ?? '', city: o.city ?? '', stateProvince: o.stateProvince ?? '', country: o.country ?? '',
    pincode: o.pincode ?? '', timeZone: o.timeZone ?? '', currency: o.currency ?? '', financialYearStartMonth: o.financialYearStartMonth,
    taxId: o.taxId ?? '', registrationNumber: o.registrationNumber ?? '',
  };
}

/** Same rules as SaveOrganizationRequestValidator on the server. */
export function validateOrganization(d: OrganizationDraft): OrganizationErrors {
  const e: OrganizationErrors = {};
  const has = (v: string) => v.trim().length > 0;
  if (!has(d.code)) e.code = 'Give the organization a short code, e.g. OR.';
  else if (!/^[A-Za-z][A-Za-z0-9-]{1,19}$/.test(d.code.trim())) e.code = 'Code must start with a letter and use 2-20 letters, digits or dashes.';
  if (!has(d.name)) e.name = 'Give the organization a name.';
  else if (d.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
  if (has(d.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email address.';
  if (has(d.phone) && !/^[0-9+()\-\s]{6,20}$/.test(d.phone.trim())) e.phone = 'Enter a valid phone number (6-20 digits).';
  if (has(d.website) && !/^https?:\/\/[^\s]+\.[^\s]+$/i.test(d.website.trim())) e.website = 'Website must start with http:// or https://.';
  if (has(d.pincode) && !/^[A-Za-z0-9\s-]{3,12}$/.test(d.pincode.trim())) e.pincode = 'Enter a valid PIN / postal code.';
  if (has(d.taxId) && !/^[A-Za-z0-9/\-\s]{3,30}$/.test(d.taxId.trim())) e.taxId = 'Tax ID can use letters, digits, / and - (3-30 characters).';
  return e;
}
