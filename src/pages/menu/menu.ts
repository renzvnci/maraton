import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  item: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  gotoCorrer() {
    this.navCtrl.push("CorrerPage");
  }
  gotoEventos() {
    this.navCtrl.push("EventosPage");
  }
  gotoActividad() {
    this.navCtrl.push("ActividadPage");
  }
  gotoCircuitos() {
    this.navCtrl.push("CircuitosPage");
  }
  gotoMaraton() {
    this.navCtrl.push("MaratonPage");
  }

}
