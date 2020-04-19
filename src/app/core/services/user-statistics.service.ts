import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { USERSTATISTICS } from '../../../environments/environment';
import { USERSTATISTICS_PAGE5 } from '../../../environments/environment';
import { UserStatistic } from '../models/userstatistic.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserStatisticsService {
  USERSTATISTICS$ = this.getUsers(USERSTATISTICS.getItems);
  USERSTATISTICS_PAGE5$ = this.getUsers(USERSTATISTICS_PAGE5.getItems);

  DATA$ = this.http.get<any[]>(USERSTATISTICS.getItems);

  constructor(private http: HttpClient) {
  }

  getKey(key: string): any {
    return this[key]
  }

  getUsers(url: string): Observable<UserStatistic[]> {
    return this.http.get<any[]>(url).pipe(
      map(obj => this.getKey.call(obj, 'content'))
    );
  }
}
