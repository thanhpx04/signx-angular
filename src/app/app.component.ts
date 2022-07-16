import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedFeature = 'dashboard';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
