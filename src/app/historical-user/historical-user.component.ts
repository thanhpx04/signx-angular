import { Component, OnInit } from '@angular/core';
import { HistoricalUser } from './historical-user.model';
import { HistoricalUserService } from './historical-user.service';

@Component({
  selector: 'app-historical-user',
  templateUrl: './historical-user.component.html',
  styleUrls: ['./historical-user.component.scss'],
  providers: [HistoricalUserService]
})
export class HistoricalUserComponent implements OnInit {

  listHistoricalUser: HistoricalUser[];

  constructor(private historicalUserService: HistoricalUserService) { }

  ngOnInit(): void {
    this.listHistoricalUser = this.historicalUserService.getListHistoricalUser();
  }

}
