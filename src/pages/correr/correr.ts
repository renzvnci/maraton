import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../../providers/database/database'; 
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@IonicPage()
@Component({
  selector: 'page-correr',
  templateUrl: 'correr.html',
})
export class CorrerPage extends AppviewPage{
  cronometro:any ={
    horas:0,
    minutos:0,
    segundos:0,
    displayHoras: '00',
    displayMin: '00',
    displaySeg: '00'  
  }
  cleanCrono:any ={
    horas:0,
    minutos:0,
    segundos:0,
    displayHoras: '00',
    displayMin: '00',
    displaySeg: '00'
  }
  viaje:any = {
    inicio: '',
    tiempo: '',
    corriendo: false,
    terminado:true,
    detalle: [],
    calorias: '',
    distancia: 0,
    velocidad: 0,
    denominacion: 'Actividad'
  }
  temporizador:any;
  listenGeo:any;
  ultimaCoordenada: any = "";
  anterior: any = "";
  ultimaFecha:any = "";
  posicionActual:any;
  peso:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, 
    public geolocation:Geolocation, public database:DatabaseProvider, public locationAccuracy:LocationAccuracy) {
    super(navCtrl, navParams, alertCtrl, loadingCtrl);

    
 }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorrerPage');
    this.database.getPerfil().then((result) => {
      console.log('perfil', result);
      if(result.length > 0){
          this.peso = Number(result[0].peso);
      }
    });
  }
  controlCronometro(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then((response) =>{
              if(!this.viaje.corriendo){
                this.viaje.corriendo = true;
                this.initGeoListener();
                this.runningTemporizador();
                if(this.viaje.terminado){
                    this.viaje.terminado = false;
                    this.viaje.inicio = super.getStringDate();
                }
              }
              console.log('Request successful'
        )},error => {
            console.log('Error requesting location permissions', error)}
        );
      }
    });
  }
  stopCronometro(){
      if(this.viaje.corriendo){
          this.viaje.corriendo = false;
          this.stopTemporizador();
          this.stopListenGeo();
         // console.log('detenido', this.viaje);
      }
  }
  finalizarActividad(){
      if(!this.viaje.terminado){
          this.stopTemporizador();
          this.stopListenGeo();
          this.viaje.terminado = true;
          this.viaje.tiempo = this.cronometro.displayHoras+":"+this.cronometro.displayMin+":"+this.cronometro.displaySeg;
          this.viaje.corriendo = false;
          this.cronometro = this.cleanCrono;
          this.cleanParams();
          this.navCtrl.push("ResumenPage");
          //console.log('terminado', this.viaje);
          //console.log('detalle', this.viaje.detalle);
      }
  }
  runningTemporizador(){
      let that = this;
      this.temporizador = setInterval(function(){
          that.addSegundos();
      },1000);
  }
  stopTemporizador(){
      clearInterval(this.temporizador);
      
  }
  addSegundos(){
      if(this.cronometro.segundos < 59){
          this.cronometro.segundos++;
          this.cronometro.displaySeg = this.parseNumber(this.cronometro.segundos);
      }else{
          this.cronometro.segundos = 0;
          this.cronometro.displaySeg = this.parseNumber(this.cronometro.segundos);
          this.addMinutos();
      }
  }
  addMinutos(){
      if(this.cronometro.minutos < 59){
        this.cronometro.minutos++;
        this.cronometro.displayMin = this.parseNumber(this.cronometro.minutos);
      }else{
        this.cronometro.minutos = 0;
        this.cronometro.displayMin = this.parseNumber(this.cronometro.minutos);
        this.cronometro.horas++;
        this.cronometro.displayHoras = this.parseNumber(this.cronometro.horas);
      }
  }
  parseNumber(nro):string{
      if(nro < 10)
          return "0"+nro.toString();
      else
          return nro.toString();
  }
  cleanViaje(){
    this.viaje= {
      inicio: '',
      tiempo: '',
      corriendo: false,
      terminado:true,
      detalle: [], 
      distancia: 0,
      velocidad: 0
    }
  }
  initGeoListener(){
    this.listenGeo = this.geolocation.watchPosition().subscribe((data) => {
            if(data.coords !== undefined){
                let date = new Date(data.timestamp);
                let detalle = {
                    tiempo: date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
                    latitud: data.coords.latitude,
                    longitud: data.coords.longitude,
                    velocidad: data.coords.speed,
                    distancia: (this.anterior != "" ? (this.getKilometros(this.anterior.coords.latitude, this.anterior.coords.longitude, data.coords.latitude, data.coords.longitude)): ''),
                    tiempoTranscurrido: (this.ultimaFecha != "" ? (this.getTiempoTranscurrido(this.ultimaFecha, date)): '')
                }
                if(this.ultimaCoordenada == "")
                    this.ultimaCoordenada = data;
                if(this.anterior == "")
                    this.anterior = data;
                if(this.ultimaFecha == "")
                    this.ultimaFecha = date;

                this.posicionActual = data;
                this.viaje.distancia = Number(this.viaje.distancia) + Number(detalle.distancia);
                this.viaje.detalle.push(detalle);
                //console.log('detalle', detalle);
            }
    });
  }
  stopListenGeo(){
    //console.log('stop listegoe', this.listenGeo);
    this.listenGeo.unsubscribe();
  }
  getTiempoTranscurrido(fecha1, fecha2):any{
    var diasDif = fecha2.getTime() - fecha1.getTime();
    var dias = Math.round(diasDif/(1000 * 60 * 60 * 24));
    return dias;
  }
  getKilometros(lat1,lon1,lat2,lon2):any {
    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.getRadio( lat2 - lat1 );
    var dLong = this.getRadio( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.getRadio(lat1)) * Math.cos(this.getRadio(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3); 
 }
 getRadio(x):any{
    return x*Math.PI/180;
 }
 cleanParams(){
     this.ultimaFecha = "";
     this.ultimaCoordenada = "";
     this.anterior = "";
 }
 goMap(){
      if(this.viaje.corriendo){
          if(this.viaje.detalle.length > 0)
            super.goPage('VistaMapaPage', {posicion: this.posicionActual}, false, this);
          else
            super.showMsg("Advertencia", "aun no se registra una coordenda");
      }          
      else
          super.showMsg("Advertencia", "No se ha iniciado el cronometro");
 }
 getLastLocation():any{
   return this.posicionActual;
 }

 showConfirmSave() {
    let alert = this.alertCtrl.create({
      title: 'Información Actividad',
      subTitle: 'Desea guardar la actividad?',
      cssClass: 'alertCustomCss',
      inputs: [
        {
          name: 'Denominación',
          placeholder: 'Ingrese un nombre para la actividad realizada'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            this.finalizarActividad();
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            if(data.Denominación != "")
                this.viaje.denominacion = data.Denominación;
            this.viaje.tiempo = this.cronometro.displayHoras+":"+this.cronometro.displayMin+":"+this.cronometro.displaySeg;

            let tiempoMinutos = (this.cronometro.horas > 0 ? (this.cronometro.horas*60) : 0)+this.cronometro.minutos;

            this.viaje.velocidad = Number(this.viaje.distancia)/Number(tiempoMinutos);
            this.viaje.calorias = parseInt(this.calcularCalorias(this.viaje.velocidad, Number(this.viaje.distancia)));


            this.database.saveActividad(this.viaje).then((result) => {
                //console.log("resultado actividad", result);
                if(result.rowsAffected == 1)
                    this.database.saveDetalleActividad(this.viaje, result.insertId);
            });
            this.finalizarActividad();
          }
        }
      ]
    });
    alert.present();
  }
  calcularCalorias(velocidad, distancia){
        let calorias:any = 0;
        let tabla = [
              {min: 110, max: 110, valor: 1.060},
              {min: 111, max: 120, valor: 1.052},
              {min: 121, max: 130, valor: 1.046},
              {min: 131, max: 140, valor: 1.041},
              {min: 141, max: 150, valor: 1.037},
              {min: 151, max: 160, valor: 1.034},
              {min: 161, max: 170, valor: 1.031},
              {min: 171, max: 180, valor: 1.029},
              {min: 181, max: 190, valor: 1.028},
              {min: 191, max: 200, valor: 1.027},
              {min: 201, max: 210, valor: 1.027},
              {min: 211, max: 220, valor: 1.026},
              {min: 221, max: 230, valor: 1.027},
              {min: 231, max: 240, valor: 1.027},
              {min: 241, max: 250, valor: 1.028},
              {min: 251, max: 260, valor: 1.029},
              {min: 261, max: 270, valor: 1.031},
              {min: 271, max: 280, valor: 1.032},
              {min: 281, max: 290, valor: 1.034},
              {min: 291, max: 300, valor: 1.036},
              {min: 301, max: 310, valor: 1.038},
              {min: 311, max: 320, valor: 1.040},
              {min: 321, max: 330, valor: 1.043},
              {min: 331, max: 340, valor: 1.046},
              {min: 341, max: 350, valor: 1.049},
              {min: 351, max: 360, valor: 1.052},
              {min: 361, max: 370, valor: 1.055},
              {min: 371, max: 380, valor: 1.058},
              {min: 381, max: 390, valor: 1.062},
              {min: 391, max: 400, valor: 1.065}
        ];
        let valorObtenido = 1.060;
        for(let item of tabla){
            if(velocidad >= item.min && velocidad <= item.max){
                valorObtenido = item.valor;
                break;
            }
        }
        let cpk = Number(valorObtenido)*this.peso;
        calorias = distancia*cpk;

        return calorias;
  }
  ejemplo(){
    
  }
}
