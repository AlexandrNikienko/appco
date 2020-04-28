import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

import { UserComponent } from './user.component';


const userRoutes: Routes = [
    {
        path: '',
        component: UserComponent,
        pathMatch: 'full',
        data: {
            title: 'User page'
        }
    }
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
		RouterModule.forChild(userRoutes),
		GoogleChartsModule
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})

export class UserModule { }
