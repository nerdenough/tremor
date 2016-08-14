import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Tremor} from '../../models/tremor';
import {TremorService} from '../../services/tremor.service';
import {TremorItem} from '../../components/tremor-item.component';

import {
  PastHourAndDayFilter,
  PastWeekFilter,
  PastMonthFilter
} from '../../pipes/tremor.pipe';

@Component({
  templateUrl: 'build/pages/significant/significant.html',
  pipes: [PastHourAndDayFilter, PastWeekFilter, PastMonthFilter],
  providers: [TremorService],
  directives: [TremorItem]
})
export class SignificantPage {
  errorMessage: string;
  tremors: Tremor[];

  constructor (private navCtrl: NavController, private tremorService: TremorService) {
    this.tremors = [];
    this.getTremors();
  }

  private url = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

  getTremors (): void {
    this.tremorService
      .getTremors(this.url)
      .subscribe(
        tremors => this.tremors = tremors,
        error => this.errorMessage = <any>error);
  }
}
