import {Component, Input} from '@angular/core';

@Component({
  selector: 'tremor-item',
  templateUrl: 'build/components/tremor-item.component.html'
})
export class TremorItem {
  @Input() magnitude: string;
  @Input() country: string;
  @Input() place: string;
  @Input() depth: string;
  @Input() date: string;
}
