import {Component, Input} from '@angular/core';
import {Tremor} from '../models/tremor';

@Component({
  selector: 'tremor-item',
  templateUrl: 'build/components/tremor-item.component.html'
})
export class TremorItem {
  @Input() tremor: Tremor;
}
