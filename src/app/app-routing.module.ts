import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoricalUserComponent } from './historical-user/historical-user.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "control", component: ControlComponent },
  { path: "historical-user", component: HistoricalUserComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
