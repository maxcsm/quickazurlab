import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, IonSelect, IonSelectOption, IonList, IonItem, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';


import { LocalService } from 'src/providers/local.service';
import { FilterLocationPage } from '../filter-location/filter-location.page';
  
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
    @ViewChild(IonModal)
    modal!: IonModal;
    categories: any;
    filter_category: any;
    filter_type: any="";
    distance: any=200;
  filter_location_title: any;


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


  this.filter_location_title = this.localStore.getItem('filter_location_title');
  this.filter_category = this.localStore.getItem('filter_category');
  this.filter_type = this.localStore.getItem('filter_type');
  this.distance = this.localStore.getItem('filter_distance');
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


  async openFilterLocation() {
    const modal = await this.modalController.create({
      component: FilterLocationPage,
      componentProps: {
        "paramID": "",
      }
    });
    modal.onDidDismiss().then((dataReturned) => {

    
    if (dataReturned !== null) {
        ///dataReturned.data;
      }


      setTimeout(() => { 
        this.filter_location_title = this.localStore.getItem('filter_location_title');
       }, 1000);
   
    });
    return await modal.present();
 }  


}

