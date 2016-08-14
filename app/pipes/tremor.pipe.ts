import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Tremor} from '../models/tremor';

@Pipe({
  name: 'pastHourFilter'
})
@Injectable()
export class PastHourFilter implements PipeTransform {
  transform (tremors: Tremor[]): any {
    let ms = new Date().getTime();
    let hour = 60 * 60 * 1000;

    return tremors.filter(tremor => ms - tremor.time <= hour);
  }
}

@Pipe({
  name: 'pastDayFilter'
})
@Injectable()
export class PastDayFilter implements PipeTransform {
  transform (tremors: Tremor[]): any {
    let ms = new Date().getTime();
    let hour = 60 * 60 * 1000;
    let day = 24 * 60 * 60 * 1000;

    return tremors.filter(
      tremor => ms - tremor.time > hour
      && ms - tremor.time <= day);
  }
}

@Pipe({
  name: 'pastWeekFilter'
})
@Injectable()
export class PastWeekFilter implements PipeTransform {
  transform (tremors: Tremor[]): any {
    let ms = new Date().getTime();
    let day = 24 * 60 * 60 * 1000;

    return tremors.filter(
      tremor => ms - tremor.time > day);
  }
}
