import { Routes } from '@angular/router';
import { BuyTicketsComponent } from './buy-tickets.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: BuyTicketsComponent,
        children: [
            {
                path: 'sector',
                loadComponent: () => import('./sector/sector.component').then(m => m.SectorComponent),
            },
            {
                path: 'payment',
                loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent),
            },
            {
                path: 'tickets',
                loadComponent: () => import('./tickets/tickets.component').then(m => m.TicketsComponent),
            }
        ]
    }
    
];

