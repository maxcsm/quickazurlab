import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, IonSelect, IonSelectOption, IonList, IonItem, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';


import { LocalService } from 'src/providers/local.service';
  

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.page.html',
  styleUrls: ['./filter-location.page.scss'],
})
export class FilterLocationPage implements OnInit {
    @ViewChild(IonModal)
    modal!: IonModal;
    categories: any;
    filter_category: any;
    filter_type: any=2;
    distance: any=200;
  lat: any;
  lng: any;


    constructor(
      private localStore: LocalService,
      public navCtrl: NavController, 
      public formBuilder: FormBuilder,
      public popoverCtrl: PopoverController,
      public alertController: AlertController,
      private route: ActivatedRoute,
      public LoadingController:LoadingController,  
      public redditService:RedditService, 
      private router: Router,  
      public toastCtrl: ToastController,
      public  modalController:ModalController) {
  
     }


    ngOnInit() {
      this.getCategories(); 
     }
  


async getCategories() {
  this.redditService.getDataAll("public_tags").subscribe(data=>{
    console.log(data); 
      this.categories = data.data;
    })
  }

  categoryChange(event:any) {
    this.filter_category = event.target.value;
    this.localStore.saveItem('filter_category',  this.filter_category);

  }

  typeChange(event:any) {
    this.filter_type = event.target.value;
    this.localStore.saveItem('filter_type',this.filter_type);
    
  }

  async  doSave() {
    this.localStore.saveItem('filter_distance', this.distance);
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }


  async cancel() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }


  async  doSave1() {
    this.localStore.saveItem('filter_location_title',"Guyane");

    this.localStore.saveItem('filter_lat',"4.9371544");
    this.localStore.saveItem('filter_lng',"-52.3258736");

    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }

  async  doSave2() {
    this.localStore.saveItem('filter_location_title',"Martinique");
    this.localStore.saveItem('filter_lat',"14.6113732");
    this.localStore.saveItem('filter_lng',"-60.9620777");

    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }

  async  doSave3() {
    this.localStore.saveItem('filter_location_title',"Gadeloupe");
    this.localStore.saveItem('filter_lat',"16.2408636");
    this.localStore.saveItem('filter_lng',"-61.5334077");

    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }

}

