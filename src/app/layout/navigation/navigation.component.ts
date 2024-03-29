import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavigationComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  constructor(private router: Router, config: NgbDropdownConfig) {
    config.placement = "bottom-right";
  }
  ngOnInit() {}

  toggleRightSidebar() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  toggleIconOnlySidebar() {
    this.iconOnlyToggled = !this.iconOnlyToggled;
    if (this.iconOnlyToggled) {
      document.querySelector("body").classList.add("sidebar-icon-only");
    } else {
      document.querySelector("body").classList.remove("sidebar-icon-only");
    }
  }
  
  logOut() {
    localStorage.removeItem("tokenData");
    this.router.navigate(['/login']);
  }

}
