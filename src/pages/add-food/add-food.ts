import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { Food } from '../../models/food';
import { FoodsProvider } from '../../providers/foods/foods';
import { SelectIconPage } from '../select-icon/select-icon';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {
  @ViewChild('searchBar') searchBar;

  matchingFoodTemplates: Food[];
  selectedFoodTemplate: Food;
  possibleLocations: string[] = ['pantry', 'fridge', 'freezer'];
  userInputDefault = {
    icon: <string>'',
    name: <string>'',
    description: <string>'',
    purchaseDate: <string>moment().format(),
    expDate: <string>'',
    expDuration: <number>0, // seconds
    location: <string>'',
  };
  userInput = { ...this.userInputDefault };
  maxPurchaseDate: string = moment().format();

  constructor(
    private navCtrl: NavController,
    private foodsProvider: FoodsProvider,
    private events: Events,
  ) {
    this.events.subscribe('icon:changed', (icon: string) => this.userInput.icon = icon);
  }

  ionViewDidLoad() {
    setTimeout(() => this.searchBar.setFocus(), 500);
  }

  ionViewWillExit() {
    this.events.unsubscribe('icon:changed');
  }

  searchFoods($event): void {
    const query = $event.target.value;
    if (query && query.trim() !== '') {
      this.foodsProvider.searchFoods(query)
        .then((req) => {
          req.subscribe(
            (foods: Food[]) => this.matchingFoodTemplates = foods,
            err => console.error(JSON.stringify(err)));
        });
    } else {
      this.matchingFoodTemplates = [];
    }
  }

  setPossibleLocations(food: Food) {
    const locationsList = [];
    if (food.pantry_new_min || food.pantry_new_max) locationsList.push('pantry');
    if (food.fridge_new_min || food.fridge_new_max) locationsList.push('fridge');
    if (food.freezer_min || food.freezer_max) locationsList.push('freezer');

    // only reset possible locations if list has at least one option
    if (locationsList.length) this.possibleLocations = locationsList;
  }

  selectFood(food: Food) {
    this.selectedFoodTemplate = food;
    this.matchingFoodTemplates = [];
    this.setPossibleLocations(food);
    this.searchBar.value = '';
    this.userInput.icon = food.icon || '';
    this.userInput.name = food.name || '';
    this.userInput.description = food.description || '';
    this.userInput.location = '';
  }

  onLocationChange() {
    const { location: newLocation } = this.userInput;
    let expirationIndex;

    if (newLocation === 'freezer') {
      expirationIndex = `${newLocation}_min`;
    } else {
      expirationIndex = `${newLocation}_new_min`;
    }

    // set expiration duration according to selected location
    if (this.selectedFoodTemplate) {
      this.userInput.expDuration = this.selectedFoodTemplate[expirationIndex] || null;
    } else {
      this.userInput.expDuration = null;
    }

    this.setExpirationDate();
  }

  setExpirationDate() {
    const { purchaseDate, expDuration } = this.userInput;

    if (expDuration) {
      this.userInput.expDate = moment(purchaseDate).add(expDuration, 's').format();
    }
  }

  clearUserInput() {
    this.userInput = { ...this.userInputDefault };
  }

  showIcons() {
    this.navCtrl.push(SelectIconPage);
  }

  saveFood() {

  }

}
