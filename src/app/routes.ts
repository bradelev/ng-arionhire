import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'job-description'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
        canActivate: [authenticationGuard],
      },
      {
        path: 'job-description',
        loadComponent: () => import('./pages/job-description/job-description.component').then(c => c.JobDescriptionComponent),
        canActivate: [authenticationGuard],
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
  },
  
  { path: '**', redirectTo: 'dashboard' }
];
