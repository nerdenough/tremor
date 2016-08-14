import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Earthquake} from '../../models/earthquake';

@Injectable()
export class RecentService {
  constructor (private http: Http) {}

  getEarthquakes (url: string): Observable<Earthquake[]> {
    return this.http
      .get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData (res: Response) {
    let body = res.json();
    let features = body.features;
    let earthquakes = [];

    for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      let earthquake = new Earthquake();

      // TODO: String title and place to hold different information
      earthquake.title = feature.properties.place;
      earthquake.place = feature.properties.place;
      earthquake.magnitude = feature.properties.mag;
      earthquake.latitude = feature.geometry.coordinates[0];
      earthquake.longitude = feature.geometry.coordinates[1];
      earthquake.depth = feature.geometry.coordinates[2];

      earthquakes.push(earthquake);
    }

    return earthquakes;
  }

  private handleError (error: any) {
    let errMsg = 'Server error';

    if (error.message) {
      errMsg = error.message;
    } else if (error.status) {
      errMsg = error.status;
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
