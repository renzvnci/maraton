import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-appview',
  templateUrl: 'appview.html',
})
export class AppviewPage {
  viewLoading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppviewPage');
  }

  showLoading(msg){
    this.viewLoading = this.loadingCtrl.create({
      content: msg,
      cssClass: 'loadingCustomCss'
    });
  
    this.viewLoading.present();
  }
  hideLoading(){
    this.viewLoading.dismiss();
  }
  showMsg(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      cssClass: 'alertCustomCss',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  goPage(page, params, isRoot, parent){
      if(isRoot)
          this.navCtrl.setRoot(page, {params: params, parent: parent});
      else  
          this.navCtrl.push(page, {params:params, parent: parent} );
  }
  getStringDate():string{
    var today = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd < 10){
        dd='0'+dd;
    } 
    if(mm < 10){
        mm='0'+mm;
    } 
    var resultado = dd+'/'+mm+'/'+yyyy;
    return resultado;
  }
  
}
