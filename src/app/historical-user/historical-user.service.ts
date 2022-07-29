import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { environment } from "src/environments/environment";

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
        environment.API_URL + '/api/audit/logs',
        {
          params: new HttpParams().set('pageSize', 10).set('page', 0).set('sortProperty', 'createdTime').set('sortOrder', 'DESC'),
        })
        .pipe(
          map(historicalUsers => {
            return historicalUsers.data.map(hu => {
              return {
                ...hu,
                createdDateTime: hu.createdTime ? (new Date(hu.createdTime)).toLocaleString() : (new Date()).toLocaleString()
              };
            });
          }),
          tap(data => {
            this.setListHistoricalUser(data);
          })
        );
    }
}