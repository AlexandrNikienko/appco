import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserStatisticsService } from '../core/services/user-statistics.service';
import { UserStatistic } from '../core/models/userstatistic.model';

@Component({
    selector: 'app-user-page',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
    public userId: number;
    public user: UserStatistic;
    public usersStatistics$ = this.userStatisticsService.USERSTATISTICS$;

    constructor(private route: ActivatedRoute,
        private userStatisticsService: UserStatisticsService,
        private title: Title) { }

    ngOnInit() {
        this.userId = +this.route.snapshot.params['id'];
        this.usersStatistics$.subscribe(usersStatistics => {
            this.user = usersStatistics.filter(user => +user['id'] === this.userId)[0];
            this.title.setTitle(this.user.firstName + ' ' + this.user.lastName);
        });
    }
}
