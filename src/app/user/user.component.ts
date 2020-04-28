import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserStatisticsService } from '../core/services/user-statistics.service';
import { UserStatistics } from '../core/models/userstatistic.model';

import { LineChart } from '../core/models/line-chart.model copy';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
    selector: 'app-user-page',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
	@ViewChild('chart') chart: GoogleChartComponent;
	
    public userId: number;
    public user: UserStatistics;
	public usersStatistics$ = this.userStatisticsService.USERSTATISTICS$;
	public usersStatistic$ = this.userStatisticsService.USERSTATISTIC$;
	public clicksChart: LineChart;
	public viewsChart: LineChart;
	
	private chartParams = {
		type: 'Line',
		options: {
			colors: ['#3A80BA'],
			legend: { 
				position: 'none'
			}
		}
	}

	private monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(private route: ActivatedRoute,
        private userStatisticsService: UserStatisticsService,
        private title: Title) { }

    ngOnInit() {
        this.userId = +this.route.snapshot.params['id'];
        this.usersStatistics$.subscribe(usersStatistics => {
            this.user = usersStatistics.filter(user => +user['id'] === this.userId)[0];
            this.title.setTitle(this.user.firstName + ' ' + this.user.lastName);
		});

		this.usersStatistic$.subscribe(statistic => {
			const clicks = statistic.map(obj => {				
				return [this.monthNames[new Date(obj['date']).getMonth()] + ' ' + new Date(obj['date']).getDate(), obj['clicks']];
			});

			const views = statistic.map(obj => {				
				return [this.monthNames[new Date(obj['date']).getMonth()] + ' ' + new Date(obj['date']).getDate(), obj['page_views']];
			});

			this.clicksChart = {
				...this.chartParams,
				title: 'Clicks',
				data: clicks
			};

			this.viewsChart = {
				...this.chartParams,
				title: 'Views',
				data: views
			};
		})
	}
}
