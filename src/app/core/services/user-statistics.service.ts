import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { USERSTATISTICS } from '../../../environments/environment';
import { UserStatistic } from '../models/userstatistic.model';

@Injectable()
export class UserStatisticsService {
  USERSTATISTICS$ = this.http.get<UserStatistic[]>(USERSTATISTICS.getItems)
    .pipe(
      map(obj => this.getContent(obj))
    );

  constructor(private http: HttpClient) {
  }

  getContent(obj: any): UserStatistic[] {
    return obj.content;
  }
}