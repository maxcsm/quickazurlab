import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ModalController,ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { FileNewPage } from '../file-new/file-new.page';
import { PictureNewPage } from '../picture-new/picture-new.page';
@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.page.html',
  styleUrls: ['./my-pictures.page.scss'],
})
export class MyPicturesPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  rolename: string="Administrateur";
  role:any=3;

  pages: any;
  items: any;
  posts: any;
  page:number;
  table: string="files/files_user";
  status:any="";
  category:any=3;
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="desc";
  email_verified_at: any;
  currentpage!: number;
 
  email: any;
  address: any;
  city: any;
  cp: any;
  phone: any;
  firstname: any;
  lastname: any;
  title: any;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  iduser: any;
  images: any;
  id: any;

  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    public  modalController:ModalController,
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private localStore: LocalService ) {
    this.page=1;}


  ngOnInit() {
 

    this.iduser = this.localStore.getItem('iduser');
    this.getData();
  } 
  async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
   
      this.redditService.getByid("gallerieByuser", this.iduser).subscribe(data=>{
          this.images = data;
          loading.dismiss();
        })
      
   
  }  
  
  




async openModal() {

  console.log(this.images.length); 
          if(this.images.length<11){

            const modal = await this.modalController.create({
              component: PictureNewPage,
              componentProps: {
                "paramID": "",
              }
            });
            modal.onDidDismiss().then((dataReturned) => {
              this.getData(); 
              if (dataReturned !== null) {
                ///dataReturned.data;
              }
            });
            return await modal.present();

          } else {

            const toast = await this.toastCtrl.create({
              cssClass: 'bg-profile',
              message: 'Vous pouvez ajouter uniquement 10 photos maximum. ',
              duration: 3000,
              position: 'bottom',
        
            });
            toast.present();
          }

        
       }  



       async delete(event: any, item: { id: number; }) {
        this.id=item.id;
        const alert = await this.alertController.create({
          header: 'Supprimer',
          message: 'Voulez-vous vraiment ? ',
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Oui',
              handler: () => { 
          this.redditService.delete("gallery",this.id)  
            .toPromise()
            .then((response) =>{
           setTimeout(() => { 
         this.getData();
         }, 400); 
         })}}]
         });
        await alert.present();
       }

 }
  
  