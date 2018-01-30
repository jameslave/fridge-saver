import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FoodsProvider } from '../../providers/foods/foods';
import { Food } from '../../models/food';
import { FoodCardComponent } from '../../components/food-card/food-card';

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  foods: Food[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: HttpClient,
    private foodsProvider: FoodsProvider,
    private events: Events,
  ) {
    this.foods = this.foodsProvider.foods;
    this.events.subscribe('foods:updated', (foods: Food[]) => {
      this.foods = foods;
    });
  }

  ionViewWillEnter() {
    this.foodsProvider.getFoods();
  }

  ionViewWillLeave() {
    this.events.unsubscribe('foods:updated');
  }

}
