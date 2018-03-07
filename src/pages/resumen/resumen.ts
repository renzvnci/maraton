import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'; 
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';
import { Base64 } from '@ionic-native/base64';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLngBounds
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage extends AppviewPage{
  header:boolean = true;
  actividad:any;
  detalle:any;
  map: GoogleMap;
  imageMap:any ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public database:DatabaseProvider, public shareCtrl:SocialSharing, public screenCtrl:Screenshot, public baseCtrl:Base64) {
   super(navCtrl, navParams, alertCtrl, loadingCtrl);
    
   let params = this.navParams.get("params");
   this.actividad = params.item;
   this.detalle = params.detalle;
}

  ionViewDidLoad() {
    this.loadMap();
  }

  share(denominacion){
      this.screenCtrl.URI(80).then((result) => {
        this.shareCtrl.share("Mi Actividad", "Conoce mi actividad", result.URI, "" ).then(() => {
            console.log(" share");
        }).catch((err) => {
            console.log("error share",err );
        });
      }).catch(() => {
      });
  }
  loadMap() {
    this.showLoading("Obteniendo información..");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 14,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('mapCanvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.viewTravel();
      });
     
  }
  createImage(){
      this.map.toDataURL().then((imagen) => {
        this.map.remove();
        document.getElementById("mapCanvas").style.display= "none";
        document.getElementById("contenido").style.display= "block";
        var div = document.getElementById("img");
        var img = document.createElement("img");
        img.src = imagen;
        div.appendChild(img);
        this.hideLoading();
    });
  }
  viewTravel(){
     let points = [];
     let bounds:LatLngBounds = new LatLngBounds();
     for(let item of this.detalle){
       points.push({lat : item.latitud, lng : item.longitud});
       bounds.extend({lat : item.latitud, lng : item.longitud});
     }
     if(points.length > 0 ){
          this.map.addPolyline({
            points: points,
            'color' : '#0099A8',
            'width': 10,
            'geodesic': true
          });
          this.map.setCameraTarget(bounds.getCenter());
          let hideFooterTimeout = setTimeout( () => {
              this.createImage();
          }, 650);
     }
    
  }
  verMapa(){
    super.goPage("ResumenMapPage",{item: this.actividad, detalle: this.detalle}, false, null);
  }
}
