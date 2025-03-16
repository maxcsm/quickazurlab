import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, ModalController} from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/providers/local.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-picture-new',
  templateUrl: './picture-new.page.html',
  styleUrls: ['./picture-new.page.scss'],
})
export class PictureNewPage implements OnInit {


  public editorValue: string = '';


  
  view:boolean=true;
  push: boolean=false;
  data: any;
  posts: any;
  priority: any;

  firstname: any;
  lastname: any;
  email: any;
  user: any;
  namebank: any;
  dombank: any;
  iban: any;
  rib: any;
  bic: any;
  profilid: any;
  profilId: any;

  edit:boolean=false;
  edit2:boolean=false;
  editnumber:number = 0;


  ItemName: any;
  iditem: any;
  ItemDesc: any;
  ItemPrice: any;
  ItemTotal: any;
  ItemQuantity: any;
  Quantity: any;
  idinvoiceuser: any;
  InvoiceID: any;
  ItemTax1: any;
  company: any;
  DueDate: any;
  id: any;
  postsTotal: any;
  city: any;
  title: any;
  category: any="KBIS";
  image: any;
  url: any;
  iduser: any;
  format: any;
  base64: string | undefined;
  selectedFile: any;
 
  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private localStore: LocalService,
    public  modalController:ModalController,
    private http: HttpClient
 ) { }

  ngOnInit() {
    this.iduser = this.localStore.getItem('iduser');
  }






async doSave() {
  var data = JSON.stringify({ 
    image :this.image,
    posts_id :this.iduser ,
    edited_by: this.iduser 
    });
  this.redditService.addPost("gallery",data)  
  .subscribe(async (response) => {
    console.log(response); 
    setTimeout(() => { 
      this.closeModal(); 
     }, 1000); 
  })
  }

  cancel() {
    this.closeModal();
  }
  
  async closeModal() {
    const onClosedData: string = "";
    await this.modalController.dismiss(onClosedData);
  }


  async addFormGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      quality: 2, // highest quality (0 to 100)
      source: CameraSource.Photos
      //CameraSource:PHOTOS
    });
     this.format=capturedPhoto.format;
     this.base64=capturedPhoto.base64String;
     var data = JSON.stringify({ 
     format: this.format,
     base64: this.base64
     }); 


  this.image='data:image/'+capturedPhoto.format+';base64,' + this.base64;
   console.log(data); 
   const loader = await this.loadingController.create({
    cssClass: 'ion-loading',
    spinner: 'circular',
    message: "Enregistrement de l'image"});
    loader.present();
    setTimeout(async () => { 
      await loader.dismiss();
    },1000);

   
   }
   
   
   async addFormCamera() {
     const capturedPhoto = await Camera.getPhoto({
     resultType: CameraResultType.Base64, 
     quality: 2, 
     source: CameraSource.Camera
     });
   
     this.format=capturedPhoto.format;
     this.base64=capturedPhoto.base64String;
     var data = JSON.stringify({ 
     format: this.format,
     base64:this.base64
     }); 

     this.image='data:image/'+capturedPhoto.format+';base64,' + this.base64;
     const loader = await this.loadingController.create({
      cssClass: 'ion-loading',
      spinner: 'circular',
      message: "Enregistrement de l'image"});
      loader.present();
      setTimeout(async () => { 
        await loader.dismiss();
      },1000);
  
      
    }



}
