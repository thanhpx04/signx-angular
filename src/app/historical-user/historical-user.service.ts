import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";

import { AuthService } from "../shared/auth/auth.service";
import { HistoricalUser, HistoricalUsers } from "./historical-user.model";

@Injectable({ providedIn: 'root' })
export class HistoricalUserService {
    private listHistoricalUser: HistoricalUser[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {}

    setListHistoricalUser(historicalUsers: HistoricalUser[]) {
      this.listHistoricalUser = historicalUsers;
    }
  
    getListHistoricalUser() {
      return this.listHistoricalUser.slice();
    }
    
    fetListHistoricalUser() {
      return this.http.get<HistoricalUsers>(
        'https://thingsboard.cloud:443/api/audit/logs',
        {
          params: new HttpParams().set('pageSize', 10).set('page', 0).set('sortProperty', 'createdTime').set('sortOrder', 'DESC'),
        })
        .pipe(
          tap(historicalUsers => {
            this.setListHistoricalUser(historicalUsers.data);
          })
        );
    }
}