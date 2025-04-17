import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Geolocation } from '@capacitor/geolocation';
import { LocalService } from 'src/providers/local.service';
import { el } from '@fullcalendar/core/internal-common';



import {Swiper } from 'swiper';

   //home.page.ts
   import { IonicSlides } from '@ionic/angular'; //For crousel
   import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swiper !:Swiper; 


  location:boolean=false; 
  locationButton:boolean=false; 
  table: string = "users";
  iduser!: any;
  posts: any;
  role: any;
  id: any;
  categories: any;
  filter_category: any;
  URLImage: any;


  slider: any;


  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public LoadingController: LoadingController,
    private localStore: LocalService,
    public  modalController:ModalController ) {

  }





  async ngOnInit() {
  }



addNewPool() {
this.router.navigateByUrl('/tabs/locations-my');
}



}
