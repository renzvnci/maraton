import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
 } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-vista-mapa',
  templateUrl: 'vista-mapa.html',
})
export class VistaMapaPage {

  map: GoogleMap;
  parent:any;
  posicionInicial:any;
  posicionActual:any;
  thread:any;
  iniciado:boolean = false;

  constructor(public navCtrl:NavController, public navParams:NavParams ) { 
        let params = this.navParams.get("params");
        this.parent = this.navParams.get("parent");
        this.posicionInicial = params.posicion;
  }

  ionViewDidLoad() {
   this.loadMap();
  /* this.navBar.backButtonClick = (e:UIEvent)=>{
        this.stopListener();
        this.navCtrl.pop();
    }*/
  }

 loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.posicionInicial.coords.latitude,
          lng: this.posicionInicial.coords.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.iniciado = true;
        this.map.addMarker({
            title: 'Su ubicación',
            icon: 'blue',
            position: {
              lat: this.posicionInicial.coords.latitude,
              lng: this.posicionInicial.coords.longitude
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              });
          });
          this.positionListener();
      });
  }
  positionListener(){
    let that = this;
    
    this.thread = setInterval(function(){
        that.refreshLocation();
    },2000);
  }
  stopListener(){
     clearInterval(this.thread);
  }
  refreshLocation(){
      this.posicionActual = this.parent.getLastLocation();
      this.map.clear();
      this.map.addMarker({
          title: 'Su ubicación',
          icon: 'blue',
          position: {
            lat: this.posicionActual.coords.latitude,
            lng: this.posicionActual.coords.longitude
          }
        });
      let center = {lat: this.posicionActual.coords.latitude, lng:this.posicionActual.coords.longitude };
      this.map.setCameraTarget(center);
  }
  goBack(){
    this.stopListener();
    this.map.destroy();
    this.navCtrl.pop();
  }
  ionViewDidLeave(){
    console.log('me fui');
    this.stopListener();
    this.map.destroy();
  }
}