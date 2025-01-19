export interface MenuItem {
  path: string;
  icon: string;
  label: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    path: '/administration/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    path: '/administration/new',
    icon: 'add',
    label: 'Nuevo Certificado'
  },
  {
    path: '/administration/list',
    icon: 'list',
    label: 'Lista de Certificados'
  }
];
