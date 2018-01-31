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
    private http: HttpClient,
    private storage: Storage,
    private events: Events,
  ) { }

  getToken(): Promise<string> {
    return new Promise((resolve) => {
      this.storage.get('token')
        .then(resolve);
    });
  }

  createRequestWithToken(url): Promise<any> {
    return new Promise((resolve) => {
      this.getToken()
        .then((token) => {
          const req = this.http.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          resolve(req);
        });
    });
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

  getFoods(): Promise<Observable<any>> {
    const url = 'http://localhost:3000/foods';

    return new Promise((resolve) => {
      this.createRequestWithToken.call(this, url)
        .then(this.setFoodsFromRequest.bind(this))
        .then(resolve);
    });
  }

  searchFoods(query): Promise<Observable<any>> {
    const url = `http://localhost:3000/foods/search?q=${query}`;

    return new Promise((resolve) => {
      this.createRequestWithToken.call(this, url)
        .then(resolve);
    });
  }

}
