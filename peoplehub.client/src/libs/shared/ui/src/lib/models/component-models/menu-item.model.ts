export interface SubRoute {
  label: string;
  route: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  routes?: SubRoute[];
}