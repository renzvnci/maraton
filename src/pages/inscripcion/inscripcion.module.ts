import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscripcionPage } from './inscripcion';

@NgModule({
  declarations: [
    InscripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(InscripcionPage),
  ],
})
export class InscripcionPageModule {}
