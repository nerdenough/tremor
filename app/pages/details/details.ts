import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Tremor} from '../../models/tremor';

@Component({
  templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
  tremor: Tremor;

  constructor (private navCtrl: NavController, private navParams: NavParams) {
    this.tremor = navParams.get('tremor');
  }
}
