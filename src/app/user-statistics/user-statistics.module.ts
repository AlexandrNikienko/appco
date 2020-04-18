import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserStatisticsComponent } from './user-statistics.component';

import { UserStatisticsService } from '../core/services/user-statistics.service';

const userStatisticsRoutes: Routes = [
    {
        path: 'user-statistics',
        component: UserStatisticsComponent,
        pathMatch: 'full',
        data: {
            title: 'User statistics'
        }
    }
];

@NgModule({
    declarations: [
        UserStatisticsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(userStatisticsRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        UserStatisticsService
    ]
})

export class UserStatisticsModule { }
