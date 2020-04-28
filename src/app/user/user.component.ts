import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

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
		private title: Title,
		private http: HttpClient) { }

    ngOnInit() {
        this.userId = +this.route.snapshot.params['id'];
        this.usersStatistics$.subscribe(usersStatistics => {
            this.user = usersStatistics.filter(user => +user['id'] === this.userId)[0];
            this.title.setTitle(this.user.firstName + ' ' + this.user.lastName);
		});

		// TODO Link for Prod
		//this.usersStatistic$ = this.http.get<any[]>(`http://159.65.233.178:8080/task/api/v1/users/statistic?id=${this.userId}&from=2018-01-06&to=2020-10-02`);
		this.usersStatistic$.subscribe(statistic => {
			this.clicksChart = {
				...this.chartParams,
				title: 'Clicks',
				data: this.getData(statistic, 'clicks')
			};

			this.viewsChart = {
				...this.chartParams,
				title: 'Views',
				data: this.getData(statistic, 'page_views')
			};
		})
	}

	getData(statistic: any, key: string): string[] {
		return statistic.map(obj => {	
			const date = this.getUsefulDateString(obj['date']);
			return [this.monthNames[new Date(date).getMonth()] + ' ' + new Date(date).getDate(), obj[key]];
		});
	}

	getUsefulDateString(date: string): string {
		return date.slice(0, 10).replace(/-/g, "/");
	}
}
