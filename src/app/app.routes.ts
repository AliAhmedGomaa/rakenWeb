import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page').then(m => m.HomePage),
    title: 'Raken — Anonymous car contact',
  },
  {
    path: 'c/:carId',
    loadComponent: () =>
      import('./pages/scan/scan-page').then(m => m.ScanPage),
    title: 'Contact the owner — Raken',
  },
  { path: '**', redirectTo: '' },
];
