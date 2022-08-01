import { Component, OnInit } from '@angular/core';
import { DashboardItem } from './dashboard.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  listDashboardItem: DashboardItem[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.fetListDashboardItem().subscribe( response => {
      this.listDashboardItem = response;
    });
  }

}
