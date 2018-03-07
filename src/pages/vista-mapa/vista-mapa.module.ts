import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VistaMapaPage } from './vista-mapa';

@NgModule({
  declarations: [
    VistaMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(VistaMapaPage),
  ],
})
export class VistaMapaPageModule {}
