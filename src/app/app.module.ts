import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { FoodsProvider } from '../providers/foods/foods';
import { FridgePageModule } from '../pages/fridge/fridge.module';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { LoginPage } from '../pages/login/login';
import { FoodCardComponent } from '../components/food-card/food-card';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    FoodCardComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FridgePageModule,
    RecipesPageModule,
    SettingsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClient,
    FoodsProvider,
  ],
})
export class AppModule { }
