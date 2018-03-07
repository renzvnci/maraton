import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLngBounds
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-resumen-map',
  templateUrl: 'resumen-map.html',
})
export class ResumenMapPage extends AppviewPage{
  header:boolean = true;
  actividad:any;
  detalle:any;
  map: GoogleMap;
  imageMap:any ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
   super(navCtrl, navParams, alertCtrl, loadingCtrl);
    
   let params = this.navParams.get("params");
   this.actividad = params.item;
   this.detalle = params.detalle;
}

  ionViewDidLoad() {
    this.loadMap();
  }
  loadMap() {
    this.showLoading("Cargando actividad..");
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
    this.map = GoogleMaps.create('mapResumen', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.viewTravel();
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
     }
     this.hideLoading();
     
  }
  ionViewDidLeave(){
    console.log('me fui');
    this.map.destroy();
  }
 
}
