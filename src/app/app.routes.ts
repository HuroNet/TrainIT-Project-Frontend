import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'empleados',
    pathMatch: 'full'
  },
  {
    path: 'empleados',
    loadComponent: () => import('./pages/empleados/empleados.component').then(m => m.EmpleadosComponent)
  }
];
