import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserStatisticsService } from '../core/services/user-statistics.service';

@Component({
    selector: 'app-user-statistics-page',
    templateUrl: './user-statistics.component.html'
})

export class UserStatisticsComponent implements OnInit {
    public userStatistics$ = this.userStatisticsService.USERSTATISTICS$;

    public data$ = this.userStatisticsService.DATA$;
    public data: object = {};

    public pages: number[] = [];
    public totalPages: number;
    public totalItems: number;
    public currentPage: number = 1;
    public startPage: number;
    public endPage: number;
    public pageSize: number = 10;

    constructor(private userStatisticsService: UserStatisticsService,
        private title: Title) { }

    ngOnInit() {
        this.title.setTitle('User Statistics');
        this.data$.subscribe(data => {
            this.data = data;
            this.totalPages = data['totalPages'];
            this.totalItems = data['totalElements'];

            this.generatePaginator();
        });
    }

    generatePaginator(): void {
        if (this.totalPages <= 5) {
            this.startPage = 1;
            this.endPage = this.totalPages;
        } else {
            if (this.currentPage <= 3) {
                this.startPage = 1;
                this.endPage = 5;
            } else if (this.currentPage + 1 >= this.totalPages) {
                this.startPage = this.totalPages - 4;
                this.endPage = this.totalPages;
            } else {

                if ((this.totalPages - (this.currentPage - 2)) == 5) {
                    this.startPage = this.currentPage - 1;
                    this.endPage = this.currentPage + 3;
                } else {
                    this.startPage = this.currentPage - 2;
                    this.endPage = this.currentPage + 2;
                }
            }
        }

        for (var i = this.startPage; i <= this.endPage; i++) {
            this.pages.push(i);
        }
    }

    setPage(page: number): void {
        if (page < 1 || page > this.totalPages) {
            return;
        }

        //:TODO request to prodUrl;
        const prodUrl = `http://159.65.233.178:8080/task/api/v1/users?page=${page}&range=10`;

        const testUrl = './assets/mocks/statistics-page5.json';

        this.userStatistics$ = this.userStatisticsService.getUsers(testUrl)
    }
}
