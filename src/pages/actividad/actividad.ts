import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'; 


@IonicPage()
@Component({
  selector: 'page-actividad',
  templateUrl: 'actividad.html',
})
export class ActividadPage extends AppviewPage {

  actividades:any = [];
  empty:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
     public database:DatabaseProvider) {
    super(navCtrl, navParams, alertCtrl, loadingCtrl);

 }
  ionViewDidLoad() {
    this.database.getActividades().then((result) => {
      this.actividades = result;
      if(this.actividades.length > 0)
        this.empty = false;
  });
  }
  gotoResumen(id, item) {
    this.database.getDetalleActividad(id).then((result) => {
         let params = {item: item, detalle: result};
         super.goPage("ResumenPage",params, false, null);
    });
  }
  
}

