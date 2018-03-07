import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { DatabaseProvider } from '../../providers/database/database'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends AppviewPage {
  formulario:any = {
    nombre: '',
    apellido: '',
    mail: '',
    fechaNacimiento: '',
    peso: 0,
    altura: 0
  };
  date:Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public database: DatabaseProvider) {
      super(navCtrl, navParams, alertCtrl, loadingCtrl);

      
  }
  ionViewDidLoad() {
    console.log('open');
   
  }
  registro(){
    this.database.saveRegistroPerfil(this.formulario).then((result) => {
      if(result.rowsAffected == 1){
          this.database.saveConf();
          super.goPage("MenuPage", null, true, null);
      }
     });  
  }
  clearForm(){
    this.formulario = {
      nombre: '',
      apellido: '',
      mail: '',
      fechaNacimiento: '',
      peso: 0,
      altura: 0,
      pais: '',
      provincia: '',
      edad: ''
    };
  }
  validateForm(){
     if(this.formulario.mail == "")
        this.showMsg("Advertencia", "Ingrese una dirección de correo electrónico");
     else if(this.formulario.nombre == "")
        this.showMsg("Advertencia", "Ingrese su nombre");
     else if(this.formulario.nombre == "")
        this.showMsg("Advertencia", "Ingrese su apellido");
     else if(this.formulario.peso  ==  0 || this.formulario.peso == "" )
        this.showMsg("Advertencia", "Ingrese su peso en kilogramos");
     else if(this.formulario.altura  ==  0 || this.formulario.altura == "" )
        this.showMsg("Advertencia", "Ingrese su altura en centimetros");
     else
        this.registro();
  }
 
}
