import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FoodsProvider } from '../../providers/foods/foods';
import { Food } from '../../models/food';

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  foods: Food[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public foodsProvider: FoodsProvider,
    public events: Events,
  ) {
    this.foods = this.foodsProvider.foods;
    this.events.subscribe('foods:updated', (foods: Food[]) => {
      this.foods = foods;
      console.log('foods: ', JSON.stringify(foods));
    });
  }

  ionViewWillEnter() {
    this.foodsProvider.getFoods();
    console.log('Entered fridge page');
  }

}
