import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FridgePage } from './fridge';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    FridgePage,
  ],
  imports: [
    IonicPageModule.forChild(FridgePage),
    MomentModule,
  ],
})
export class FridgePageModule { }
