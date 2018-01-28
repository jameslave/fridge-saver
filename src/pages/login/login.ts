import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userInput: { email: string; password: string } = {
    email: '',
    password: '',
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public storage: Storage,
    public toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.http.post('http://10.0.2.2:3000/auth/login', this.userInput, { observe: 'response' })
      .subscribe(
      (res: HttpResponse<any>) => {
        const authHeader: string = res.headers.get('Authorization');
        const token: string = authHeader.split(' ')[1];
        this.storage.set('token', token).then(() => this.navCtrl.setRoot(TabsPage));
      },
      (err: HttpErrorResponse) => {
        const message: string = err.error;
        const toast = this.toastCtrl.create({
          message,
          duration: 4000,
        });
        toast.present();
      },
    );
  }

}
