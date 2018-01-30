import { Component, Input } from '@angular/core';
import { Food } from '../../models/food';

@Component({
  selector: 'food-card',
  templateUrl: 'food-card.html',
})
export class FoodCardComponent {

  @Input('food') food: Food;

  constructor() { }

}
