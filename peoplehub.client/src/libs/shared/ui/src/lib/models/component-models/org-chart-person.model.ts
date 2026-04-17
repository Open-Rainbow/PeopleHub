export interface OrgChartPerson {
  id: string;
  name: string;
  title: string;
  color?: 'blue' | 'orange';
  avatar?: string;
  children?: OrgChartPerson[];
}