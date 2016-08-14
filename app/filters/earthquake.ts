import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Earthquake} from '../models/earthquake';

@Pipe({
  name: 'pastHourFilter'
})
@Injectable()
export class PastHourFilter implements PipeTransform {
  transform (earthquakes: Earthquake[]): any {
    let ms = new Date().getTime();
    let hour = 60 * 60 * 1000;

    return earthquakes.filter(earthquake => ms - earthquake.time <= hour);
  }
}

@Pipe({
  name: 'pastDayFilter'
})
@Injectable()
export class PastDayFilter implements PipeTransform {
  transform (earthquakes: Earthquake[]): any {
    let ms = new Date().getTime();
    let hour = 60 * 60 * 1000;
    let day = 24 * 60 * 60 * 1000;

    return earthquakes.filter(
      earthquake => ms - earthquake.time > hour
      && ms - earthquake.time <= day);
  }
}

@Pipe({
  name: 'pastWeekFilter'
})
@Injectable()
export class PastWeekFilter implements PipeTransform {
  transform (earthquakes: Earthquake[]): any {
    let ms = new Date().getTime();
    let day = 24 * 60 * 60 * 1000;

    return earthquakes.filter(
      earthquake => ms - earthquake.time > day);
  }
}
