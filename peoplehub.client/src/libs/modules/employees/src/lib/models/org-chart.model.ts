/** One person on the org chart (GET /api/v1/org-chart). */
export interface OrgPerson {
  employeeId: string;
  name: string;
  preferredName: string;
  designation: string;
  department: string;
  location: string;
  employeeType: string;
  employmentStatus: string;
  employeeStatus: string;
  /** Empty for the top of the chart. */
  managerId: string;
  dottedLineManagerId: string;
  email: string;
  mobile: string;
  /** YYYY-MM-DD or empty. */
  dateOfJoining: string;
  /** The saved reporting line formed a loop and was cut here. */
  inLoop: boolean;
}

export interface OrgNode {
  person: OrgPerson;
  children: OrgNode[];
  depth: number;
  /** Everyone below, at any depth. */
  total: number;
}

export interface OrgForest {
  roots: OrgNode[];
  byId: Map<string, OrgNode>;
  /** Highest depth + 1. */
  levels: number;
}
