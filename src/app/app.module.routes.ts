import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'index',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'user-statistics',
        loadChildren: './user-statistics/user-statistics.module#UserStatisticsModule'
    },
    {
        path: 'user/:id',
        loadChildren: './user/user.module#UserModule'
    }
];
