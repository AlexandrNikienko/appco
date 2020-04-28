import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { USERSTATISTICS } from '../../../environments/environment';
import { USERSTATISTICS_PAGE5 } from '../../../environments/environment';
import { UserStatistics } from '../models/userstatistic.model';

import { USERSTATISTIC } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class UserStatisticsService {
	USERSTATISTICS$ = this.getKey(USERSTATISTICS.getItems, 'content');
	USERSTATISTICS_PAGE5$ = this.getKey(USERSTATISTICS_PAGE5.getItems, 'content');
	USERSTATISTIC$ = this.http.get<any[]>(USERSTATISTIC.getItems);

	DATA$ = this.http.get<any[]>(USERSTATISTICS.getItems);

	constructor(private http: HttpClient) {
	}

	getKey(url: string, key: string): Observable<UserStatistics[]> {
		return this.http.get<any[]>(url).pipe(
			map(obj => obj[key])
		);
	}
}
