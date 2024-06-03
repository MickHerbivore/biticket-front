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
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'registro',
        loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent),
    },
    {
        path: 'buy',
        loadChildren: () => import('./pages/buy-tickets/buy-tickets.routes').then(m => m.routes),
    },
    
];

