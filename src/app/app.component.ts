import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from "../providers/database/database";
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = "LoginPage";
  loading:any;
  viewLoading:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public database:DatabaseProvider, public loadingCtrl:LoadingController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.verifyConfig();
    });
  }
  verifyConfig(){
    this.showLoading("Cargando contenido");
    this.database.openWithConfig().then((result) => {
      console.log('configuracio0n', result);
      if(result.length > 0){
          if(result[0].loguedo == "Si"){
              console.log("se encuentra logueado");
              this.rootPage = "MenuPage";
          }
       }
      this.hideLoading();
    });
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
}

