import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClasificacionPage } from './clasificacion';

@NgModule({
  declarations: [
    ClasificacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ClasificacionPage),
  ],
})
export class ClasificacionPageModule {}
