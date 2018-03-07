import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumenMapPage } from './resumen-map';

@NgModule({
  declarations: [
    ResumenMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ResumenMapPage),
  ],
})
export class ResumenMapPageModule {}
