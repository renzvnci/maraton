import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { AppviewPage } from '../appview/appview';
import { AlertController, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
 } from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-recorrido',
  templateUrl: 'recorrido.html',
})
export class RecorridoPage extends AppviewPage{
  _imageViewerCtrl: ImageViewerController;
  map10: GoogleMap;
  map21: GoogleMap;

  recorrido10:any = [ 
    {lat: -32.877041, lng: -68.841167},
    {lat: -32.875131, lng: -68.840512},
    {lat: -32.877055, lng: -68.83857},
    {lat: -32.879861, lng: -68.839254},
    {lat: -32.879122, lng: -68.845659},
    {lat: -32.892197, lng: -68.84917},
    {lat: -32.8898, lng: -68.861884},
    {lat: -32.866826, lng: -68.858438},
    {lat: -32.865874, lng: -68.842419},
    {lat: -32.873029, lng: -68.844028},
    {lat: -32.877557, lng: -68.843152},
    {lat: -32.877661, lng: -68.841336}
  ];
  recorrido21:any = [ 
    {lat: -32.87658, lng: -68.840998},
    {lat: -32.875156, lng: -68.840536},
    {lat: -32.877066, lng: -68.838616},
    {lat: -32.879841, lng: -68.839184},
    {lat: -32.879121, lng: -68.845632},
    {lat: -32.896134, lng: -68.850239},
    {lat: -32.896405, lng: -68.842219},
    {lat: -32.862368, lng: -68.833523},
    {lat: -32.862249, lng: -68.832648},
    {lat: -32.903994, lng: -68.842885},
    {lat: -32.903075, lng: -68.851907},
    {lat: -32.902409, lng: -68.851972},
    {lat: -32.901409, lng: -68.864857},
    {lat: -32.866867, lng: -68.858488},
    {lat: -32.865946, lng: -68.842485},
    {lat: -32.872658, lng: -68.843759},
    {lat: -32.877487, lng: -68.843211},
    {lat: -32.877652, lng: -68.841315},
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    super(navCtrl, navParams, alertCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecorridoPage');
    this.loadMaps();
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present(); 
  }
  loadMaps(){
    this.showLoading("visualizando recorridos..");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 12,
        tilt: 30
      }
    };
    this.map10 = GoogleMaps.create('map10', mapOptions);
    this.map10.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map 10 is ready!');
        this.map10.addPolyline({
          points: this.recorrido10,
          'color' : '#0099A8',
          'width': 10,
          'geodesic': true
        });
        this.map10.setCameraTarget(this.recorrido10[0]);
      });
    
    this.map21 = GoogleMaps.create('map21', mapOptions);
    this.map21.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map 21 is ready!');
        this.map21.addPolyline({
          points: this.recorrido21,
          'color' : '#0099A8',
          'width': 10,
          'geodesic': true
        });
        this.map21.setCameraTarget(this.recorrido21[0]);
      });
      this.hideLoading();
  }

}
