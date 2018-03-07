import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaratonPage } from './maraton';

@NgModule({
  declarations: [
    MaratonPage,
  ],
  imports: [
    IonicPageModule.forChild(MaratonPage),
  ],
})
export class MaratonPageModule {}
