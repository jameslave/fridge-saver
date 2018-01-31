import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Food } from '../../models/food';
import { FoodsProvider } from '../../providers/foods/foods';

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {
  @ViewChild('searchBar') searchBar;

  matchingFoods: Food[];
  selectedFood: Food;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private foodsProvider: FoodsProvider,
    private events: Events,
  ) { }

  ionViewDidLoad() {
    setTimeout(this.searchBar.setFocus, 1000);
  }

  searchFoods($event): void {
    const query = $event.target.value;
    if (query && query.trim() !== '') {
      this.foodsProvider.searchFoods(query)
        .then((req) => {
          req.subscribe(
            (foods: Food[]) => {
              this.matchingFoods = foods;
            },
            err => console.error(JSON.stringify(err)));
        });
    } else {
      this.matchingFoods = [];
    }
  }

  selectFood(food: Food) {
    this.selectedFood = food;
    this.matchingFoods = [];
    this.searchBar.value = '';
  }

}
