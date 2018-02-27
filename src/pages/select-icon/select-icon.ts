import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import iconsList from '../../assets/icons/foods/iconsList';

@IonicPage()
@Component({
  selector: 'page-select-icon',
  templateUrl: 'select-icon.html',
})
export class SelectIconPage {

  iconsList: string[] = iconsList;
  filteredIconsList: string[] = this.iconsList;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private events: Events,
  ) { }

  filterIcons($event) {
    const query: string = $event.target.value;
    if (query && query.trim() !== '') {
      this.filteredIconsList = this.iconsList.filter((file: string) => file.includes(query));
    } else {
      this.filteredIconsList = this.iconsList;
    }
  }

  onSelectIcon(icon: string) {
    this.events.publish('icon:changed', icon);
    this.navCtrl.pop();
  }

}
