import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecentService} from './recent.service';
import {Earthquake} from '../../models/earthquake';
import {
  PastHourFilter,
  PastDayFilter,
  PastWeekFilter
} from '../../filters/earthquake';

@Component({
  templateUrl: 'build/pages/recent/recent.html',
  pipes: [PastHourFilter, PastDayFilter, PastWeekFilter],
  providers: [RecentService]
})
export class RecentPage {
  errorMessage: string;
  earthquakes: Earthquake[];

  constructor (private navCtrl: NavController, private recentService: RecentService) {
    this.earthquakes = [];
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
