import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { USERSTATISTICS } from '../../../environments/environment';
import { USERSTATISTICS_PAGE5 } from '../../../environments/environment';
import { UserStatistics } from '../models/userstatistic.model';

import { USERSTATISTIC } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class UserStatisticsService {
	USERSTATISTICS$ = this.getUsers(USERSTATISTICS.getItems);
	USERSTATISTICS_PAGE5$ = this.getUsers(USERSTATISTICS_PAGE5.getItems);

	USERSTATISTIC$ = this.http.get<any[]>(USERSTATISTIC.getItems);

	DATA$ = this.http.get<any[]>(USERSTATISTICS.getItems);

	constructor(private http: HttpClient) {
	}

	getUsers(url: string): Observable<UserStatistics[]> {
		return this.http.get<any[]>(url).pipe(
			map(obj => obj['content'])
		);
	}
}
