import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFoodPage } from './add-food';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AddFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFoodPage),
    PipesModule,
  ],
})
export class AddFoodPageModule { }
