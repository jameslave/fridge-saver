import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FoodsProvider } from '../../providers/foods/foods';
import { Food } from '../../models/food';
import { AddFoodPage } from '../add-food/add-food';

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
    private foodsProvider: FoodsProvider,
    private events: Events,
    private app: App,
  ) {
    this.foods = this.foodsProvider.foods;
    this.events.subscribe('foods:updated', (foods: Food[]) => {
      this.foods = foods;
    });
  }

  ionViewWillEnter(): void {
    this.foodsProvider.getFoods();
  }

  ionViewWillLeave(): void {
    this.events.unsubscribe('foods:updated');
  }

  onTapAddFood(): void {
    // show AddFoodPage on top of tabs
    this.app.getRootNav().push(AddFoodPage);
  }

}
