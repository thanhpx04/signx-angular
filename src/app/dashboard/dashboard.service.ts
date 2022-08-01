import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { environment } from "src/environments/environment";

import { AuthService } from "../shared/auth/auth.service";
import { DashboardMaster, DashboardItem } from "./dashboard.model";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private listDashboardItem: DashboardItem[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {}

    setListDashboardItem(dashboardItems: DashboardItem[]) {
      this.listDashboardItem = dashboardItems;
    }
  
    getListDashboardItem() {
      return this.listDashboardItem.slice();
    }
    
    fetListDashboardItem() {
      return this.http.get<DashboardMaster>(
        environment.API_URL + '/api/tenant/dashboards',
        {
          params: new HttpParams().set('pageSize', 10).set('page', 0).set('sortProperty', 'createdTime').set('sortOrder', 'DESC'),
        })
        .pipe(
          map(dashboardMaster => {
            return dashboardMaster.data.map(item => {
              return {
                ...item,
                createdDateTime: item.createdTime ? (new Date(item.createdTime)).toLocaleString() : (new Date()).toLocaleString()
              };
            });
          }),
          tap(data => {
            this.setListDashboardItem(data);
          })
        );
    }
}