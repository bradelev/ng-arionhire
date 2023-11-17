import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'job-description',
    loadComponent: () => import('./pages/job-description/job-description.component').then(c => c.JobDescriptionComponent),
  },
  { path: '**', redirectTo: 'dashboard' }
];
