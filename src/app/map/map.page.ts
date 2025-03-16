import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';


import * as Leaflet from 'leaflet';
import { RedditService } from 'src/providers/reddit-service';
import { FilterPage } from '../filter/filter.page';
import { LocalService } from 'src/providers/local.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit,AfterViewInit, OnDestroy {

  map!: Leaflet.Map;
  role:any="";
  pages: any;
  items: any;
  posts: any;
  page:number;
  table: string="public_location";

  status:any="";
  category:any=2;
  filter:string="";
  per_page:number=100;
  order_id:any="id";
  order_by:any="desc";
  locationappointement: any;
  totaltech: any;
  totalappointemnts: any;

  lngevnt: any;
  techs: any;
  postsevents: any;
  eventid: any;
  appointement: any;
  technicienId: any;
  filter_location_title: any;
  total: any;
  currentpage: any;
  last_page: any;
  lat_new: any;
  lng_new: any;
  markers: any;
  posts2: any;


  constructor
  ( 
    private formBuilder: FormBuilder, 
    public alertController: AlertController, 
    public redditService:RedditService, 
    private router: Router,  
    private loadingCtrl: LoadingController,
    public  modalController:ModalController,
   private localStore: LocalService ) {
    this.page=1;
  }

  async ngOnInit() { 
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
 
  }



  ngAfterViewInit() {
    // this.initializeMap();
    // this.getData();
   }



   ionViewWillEnter() {
    this.filter_location_title=this.localStore.getItem('filter_location_title');
    this.role = this.localStore.getItem('role');
    this.initializeMap();
    }
  


   private async initializeMap() {

    console.log("---initialisez map------"); 

    if(this.map) {
      this.map.remove();
    }
    this.lat_new = this.localStore.getItem('filter_lat'); 
    this.lng_new = this.localStore.getItem('filter_lng');
    this.map = new Leaflet.Map('mapId2').setView([ this.lat_new,this.lng_new ], 8);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);
    this.markers = Leaflet.layerGroup().addTo(this.map);

    this.addmarker();
    if(this.role==2){

      console.log("role 2"+"------LOAD USERS MAP------"); 
      this.getDataLocations();

    } else if( this.role==1){
      this.getDataUsers();
    }


   
  }



  async getDataUsers(){

    console.log("------LOAD USERS MAP------"); 
  

    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;

        var data = JSON.stringify({ 
          page:1,
          lat:this.localStore.getItem('filter_lat'),
          lng:this.localStore.getItem('filter_lng'),
          tags:this.localStore.getItem('filter_category'),
          dmin:0,
          dmax:this.localStore.getItem('filter_distance')

          }); 

          console.log(data);
        this.redditService.addPost("public_location",data).subscribe(data => {
        console.log(data);
        loading.dismiss();
        //this.dismissLoader();
          this.posts=data;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
          console.log(this.posts); 
          this.LoadMarkerUsers();
   
        })
  }  
  


  async getDataLocations(){



    console.log("------LOAD LOCATIONS MAP------"); 
  

    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;

        var data = JSON.stringify({ 
          page:1,
          lat:this.localStore.getItem('filter_lat'),
          lng:this.localStore.getItem('filter_lng'),
          tags:this.localStore.getItem('filter_annonce_category'),
          types:this.localStore.getItem('filter_annonce_subcategory'),
          dmin:0,
          dmax:this.localStore.getItem('filter_distance')

          }); 

          console.log(data);
        this.redditService.addPost("public_location_posts",data).subscribe(data => {
        console.log(data);
        loading.dismiss();
        //this.dismissLoader();
          this.posts2=data;

          console.log(this.posts2);
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
          console.log(this.posts); 
          this.LoadMarkerLocations();

   
        })
  }  
  

  LoadMarkerUsers(){



    
    this.posts.forEach((item: any) => {

      this.addmarker1(item);  
    }); 
  }

  LoadMarkerLocations(){


    this.posts2.forEach((value: any) => {
      console.log(value)
      let item = value;
      this.addmarker2(item);  
      console.log("foreatch");
    })

   
  }

  ngOnDestroy() {
   // this.markers.clear();
    this.map.remove();
  }

  addmarker() {
    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon.png',
      iconAnchor:   [2, 32] 
    });

   
    const markPoint = Leaflet.marker([this.lat_new, this.lng_new],{icon: startIcon});

    markPoint.bindPopup('<p> Ma position </p>');
    this.map.addLayer(markPoint);
    this.map.setView([this.lat_new, this.lng_new], 10);
  }

  addmarker1(value: any) {
    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon-2.png',
      iconAnchor:   [2, 10] 
    });
    console.log(value);
    const markPoint = Leaflet.marker([value.lat, value.lng],{icon: startIcon});

    let markergroup = Leaflet.featureGroup();
    markergroup.addLayer(markPoint );

     markPoint.bindPopup(
     '<p>'+value.firstname+' '+value.lastname+'</p>'+
     '<p><ion-button id="popup-button"> Voir </ion-button></p>');

    this.eventid =value.item ; 
   this.map.addLayer(markPoint);

   markPoint.on("click", (e) => {
    const button = document.getElementById('popup-button');
    if (button) {
      button.addEventListener('click', (e) => {
        console.log(e);
        console.log(value.id);

        this.edit( value.id); 
        markPoint.closePopup();
      });
    }
  
  });
  
  }


  addmarker2(value: any) {
    var startIcon = Leaflet.icon({
      iconUrl: './assets/icon/marker-icon-2.png',
      iconAnchor:   [2, 10] 
    });
    console.log(value);
    const markPoint = Leaflet.marker([value.lat, value.lng],{icon: startIcon});

    let markergroup = Leaflet.featureGroup();
    markergroup.addLayer(markPoint );

     markPoint.bindPopup(
      '<p>'+value.title+'</p>'+
      '<p>'+value.city+'</p>'+
     '<p><ion-button id="popup-button"> Voir </ion-button></p>');

    this.eventid =value.item ; 
   this.map.addLayer(markPoint);

   markPoint.on("click", (e) => {
    const button = document.getElementById('popup-button');
    if (button) {
      button.addEventListener('click', (e) => {
        console.log(e);
        console.log(value.id);

        this.edit2( value.id); 
        markPoint.closePopup();
      });
    }
  
  });

  }




    
  async edit(  id: any ) {
    this.router.navigateByUrl('/account/' + id);
   }



   async edit2(  id: any ) {
    this.router.navigateByUrl('/location/' + id);
   }



   async openFilter() {
             const modal = await this.modalController.create({
               component: FilterPage,
               componentProps: {
                 "paramID": "",
               }
             });
             modal.onDidDismiss().then((dataReturned) => {
   
    
               if (dataReturned !== null) {
                 ///dataReturned.data;
                 if(this.role==2){
                  this.router.navigateByUrl('/tabs/locations');
                } else if( this.role==1){
                  this.router.navigateByUrl('/tabs/users');
                }
            
               }
             });
             return await modal.present();
          }  

  async openListUsers() {


  if(this.role==2){

    setTimeout(() => { 
      this.router.navigateByUrl('/tabs/locations');
     }, 1000);
 

  } else if( this.role==1){
    setTimeout(() => { 
    this.router.navigateByUrl('/tabs/users');
  }, 1000);
  }
  }

}
