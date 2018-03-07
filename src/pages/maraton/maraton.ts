import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-maraton',
  templateUrl: 'maraton.html',
})
export class MaratonPage extends AppviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    super(navCtrl, navParams, alertCtrl, loadingCtrl);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaratonPage');
  }
  
}
