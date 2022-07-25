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
        // this tells RxJS is that I only want to take one value from that observable and thereafter, 
        // it should automatically unsubscribe.
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
              return this.http.get<HistoricalUsers>(
                'https://thingsboard.cloud:443/api/audit/logs',
                {
                  params: new HttpParams().set('pageSize', 10).set('page', 0).set('sortProperty', 'createdTime').set('sortOrder', 'DESC'),
                  headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${user.token}`)
                }
              );
            }),
            // map(response => {
            //   return response.data.map(historicalUser => {
            //     return {
            //       ...historicalUser
            //     };
            //   });
            // }),
            tap(historicalUsers => {
              this.setListHistoricalUser(historicalUsers.data);
            })
          );
    }
}