import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-select-icon',
  templateUrl: 'select-icon.html',
})
export class SelectIconPage {

  iconFiles: { name: string; file: string }[];
  filteredIconFiles: Object[] = [];

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private events: Events,
  ) { }

  // load list of available icons from server
  ionViewWillEnter() {
    this.http.get('http://localhost:3000/icons')
      .subscribe(
      (icons: string) => {
        this.iconFiles = JSON.parse(icons);
        this.filteredIconFiles = this.iconFiles;
      },
      (err) => {
        console.error(err);
      },
    );
  }

  filterIcons($event) {
    const query = $event.target.value;
    if (query && query.trim() !== '') {
      this.filteredIconFiles = this.iconFiles.filter(file => file.name.includes(query));
    } else {
      this.filteredIconFiles = this.iconFiles;
    }
  }

  onSelectIcon(icon) {
    this.events.publish('icon:changed', icon);
    this.navCtrl.pop();
  }

}
