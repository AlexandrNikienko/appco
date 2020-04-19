import { Component, OnInit } from '@angular/core';

import { UserStatisticsService } from '../core/services/user-statistics.service';

@Component({
    selector: 'app-user-statistics-page',
    templateUrl: './user-statistics.component.html'
})

export class UserStatisticsComponent implements OnInit {
    public userStatistics$ = this.userStatisticsService.USERSTATISTICS$;

    constructor(private userStatisticsService: UserStatisticsService) { }

    ngOnInit() {
        
    }
}
