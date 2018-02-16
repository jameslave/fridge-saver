import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  possibleLocations: string[];
  userInput = {
    icon: '',
    name: '',
    description: '',
    purchased: moment().format(),
    location: null,
    exp_min: null,
  };
  maxDate: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private foodsProvider: FoodsProvider,
    private events: Events,
  ) {
    this.events.subscribe('icon:changed', (icon) => {
      this.userInput.icon = icon.name;
    });
    this.maxDate = moment().format();
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
    if (food.pantry_new_min || food.pantry_new_max) {
      locationsList.push('pantry');
    }
    if (food.fridge_new_min || food.fridge_new_max) {
      locationsList.push('fridge');
    }
    if (food.freeze_min || food.freeze_max) {
      locationsList.push('freeze');
    }
    this.possibleLocations = locationsList;
  }

  selectFood(food: Food) {
    this.selectedFoodTemplate = food;
    this.matchingFoodTemplates = [];
    this.setPossibleLocations(food);
    this.searchBar.value = '';
    this.userInput.icon = food.icon || '';
    this.userInput.name = food.name || '';
    this.userInput.description = food.description || '';
    this.userInput.location = null;
  }

  clearUserInput() {
    this.userInput = {
      icon: '',
      name: '',
      description: '',
      purchased: moment().format(),
      location: null,
      exp_min: null,
    };
  }

  showIcons() {
    this.navCtrl.push(SelectIconPage);
  }

  saveFood() {

  }

}
