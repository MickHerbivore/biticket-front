import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'buy',
        loadChildren: () => import('./pages/buy-tickets/buy-tickets.routes').then(m => m.routes),
    },
    
];

