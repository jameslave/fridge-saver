import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { Food } from '../../models/food';

@Injectable()
export class FoodsProvider {

  public foods: Food[] = [];

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public events: Events,
  ) { }

  getToken(): Promise<string> {
    return new Promise((resolve) => {
      this.storage.get('token')
        .then(resolve);
    });
  }

  createRequestWithToken(token): Promise<any> {
    const req = this.http.get('http://10.0.2.2:3000/foods', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(req);
  }

  setFoodsFromRequest(req: Observable<Food[]>): Promise<Observable<Food[]>> {
    req.subscribe(
      (res: Food[]) => {
        this.foods = res;
        this.events.publish('foods:updated', res);
      },
      err => console.error(JSON.stringify(err)),
    );
    return Promise.resolve(req);
  }

  getFoods(): Promise<any> {
    return new Promise((resolve) => {
      this.getToken()
        .then(this.createRequestWithToken.bind(this))
        .then(this.setFoodsFromRequest.bind(this))
        .then(resolve);
    });
  }

}
