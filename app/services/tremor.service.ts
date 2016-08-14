import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Tremor} from '../models/tremor';

@Injectable()
export class TremorService {
  constructor (private http: Http) {}

  getTremors (url: string): Observable<Tremor[]> {
    return this.http
      .get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData (res: Response) {
    let body = res.json();
    let features = body.features;
    let tremors = [];

    for (let i = 0; i < features.length; i++) {
      let feature = features[i];

      // Split the location based on country and general area
      let place = feature.properties.place;
      let location = place.substring(0, place.lastIndexOf(','));
      let country = place.substring(place.lastIndexOf(',') + 1, place.length);

      // Convert the date to a nicely formatted string.
      // Example Format: 14/8/2016 @ 10:23 UTC
      //
      // TODO: Rewrite format to be "14 August, 2016 @ 10:23am UTC" to deal with
      // the confusion America may face when presented with a logical date
      // structure.
      let time = feature.properties.time;
      let date = new Date(time);
      let dateString = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/'
        + date.getUTCFullYear() + ' @ ' + date.getUTCHours() + ':'
        + date.getUTCMinutes() + ' UTC';

      // Create tremor object
      let tremor = new Tremor();

      tremor.longitude = feature.geometry.coordinates[0];
      tremor.latitude = feature.geometry.coordinates[1];
      tremor.depth = feature.geometry.coordinates[2].toFixed(1);

      tremor.country = country;
      tremor.place = location;

      tremor.magnitude = feature.properties.mag.toFixed(1);
      tremor.intensity = feature.properties.mmi;

      tremor.time = time;
      tremor.date = dateString;

      tremors.push(tremor);
    }

    return tremors;
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
