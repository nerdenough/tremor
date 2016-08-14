import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecentService} from './recent.service';
import {Earthquake} from '../../models/earthquake';

@Component({
  templateUrl: 'build/pages/recent/recent.html',
  providers: [RecentService]
})
export class RecentPage {
  errorMessage: string;
  earthquakes: Earthquake[];

  constructor (private navCtrl: NavController, private recentService: RecentService) {
    this.getEarthquakes();
  }

  private url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';

  getEarthquakes (): void {
    this.recentService
      .getEarthquakes(this.url)
      .subscribe(
        earthquakes => this.earthquakes = earthquakes,
        error => this.errorMessage = <any>error);
  }
}
