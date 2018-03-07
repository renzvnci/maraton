import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KitPage } from './kit';

@NgModule({
  declarations: [
    KitPage,
  ],
  imports: [
    IonicPageModule.forChild(KitPage),
  ],
})
export class KitPageModule {}
