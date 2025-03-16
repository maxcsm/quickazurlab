import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, IonSelect, IonSelectOption, IonList, IonItem } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';


import { LocalService } from 'src/providers/local.service';
  
@Component({
  selector: 'app-my-social',
  templateUrl: './my-social.page.html',
  styleUrls: ['./my-social.page.scss'],
})
export class MySocialPage implements OnInit {
    @ViewChild(IonModal)
    modal!: IonModal;

    public editorValue: string = '';
    table: string="products";
    table1: string="users";
 
    
    view:boolean=true;
    push: boolean=false;
    data: any;
    posts: any;
    image:string="";
    title: string="";
    url: string="";
    urlrewiting: string="";
    meta: string="";
    keyword: string="";
    keywords: any;
    deadlineTask: any;
    postdata: any;
    events: any;
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
    edit3:boolean=false;
    edit4:boolean=false;
    edit5:boolean=false;
    edit6:boolean=false;

    segType: string = 'info';
    indicatif : string = '+33';
    phone: any;
    address: any;
    number:any = '';
    complement: any;
    city: any;
    cp: any;
    complemement: any;
    postall: any;
   
    name: any;
    contactList: any;
    partnerId: any;
    phonenew: any;
    firstnamenew: any;
    lastnamenew: any;
    emailnew: any;
    editcontactId: any;
    statuscontactedit: any;
    emailcontactedit: any;
    lastnamecontactedit: any;
    firstnamecontactedit: any;
    statuspartenaire: boolean=false;
    daycreatedAt: any;
    formaddphonetocontact:  boolean=false;

    contactId: any;
    addphone: any;
    indicatifnew:  string = '+33';
    addindicatif: string = '+33';
    phoneId: any;
    phonenumbertype: string = 'MOBILE';
    addtypephone:string = 'MOBILE';
    phonenumbertypenew:string = 'MOBILE';

    clientId: any;
    siren: any;
    id: any;
    files: any;
    formgroup!: FormGroup;
    validations_form!: FormGroup;
    datestart: Date= new Date();
    content: string="";
    iduser: any;
    phone_mobile: any;
    phone_number: any;
    company: any;
    notes: any;
    country: any;
    state: any;
    salutation: any;
    customer_type: any;
    shipping_cp: any;
    shipping_address: any;
    shipping_city: any;
    shipping_state: any;
    shipping_country: any;
    shipping_phone: any;
    billing_phone: any;
    tva_number: any;
    siret_number: any;
    role: any;
    client: boolean=false;
    listappointements: any;
    lat: any;
    lng: any;
    userstech: any;
    iduserselected: any;
    listinvoices: any;
    listquotes: any;
   
    catresult: any=[];
    page: number | undefined;
    per_page: number | undefined;
    order_id: string | undefined;
    order_by: string | undefined;
    category: string | undefined;
    status: string | undefined;
    filter: string | undefined;
    products: any;

  moyendepaiement: any;
  lastname_activite: any;
  firstname_activite: any;
  birthdate_activite: any;

  onStep3Form!: FormGroup;
  idinvoice: any;
  urlcheckout: string="";
  token: any;
  reponseToken: any;
  totalprice: number=0;
  amount1: number=0;
  amount2:number=0;
  amount3: number=0;
  priceTotal=0;
  nbselect=0;
  checkoutIntentId: any;
  categories: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  url_facebook: any;
  url_instagram: any;
  url_tiktok: any;
  url_website: any;
  url_whatsapp: any;


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
      public toastCtrl: ToastController,) {
  
     }


    ngOnInit() {
      this.iduser = this.localStore.getItem('iduser');
      this.getdata(); 
     }
  

   async  doSave() {

    const loader = await this.LoadingController.create({
      message: 'Enregistrement en cours',
      });
      loader.present();
  
    var data = {
     url_facebook:this.url_facebook,
     url_instagram:this.url_instagram,
     url_tiktok:this.url_tiktok,
     url_website:this.url_website,
     url_whatsapp:this.url_whatsapp,
   


   }
   console.log(data); 


   this.redditService.update(this.table1,this.iduser,data) 
   .toPromise()
   .then(async (response) =>
   {console.log(response);
   setTimeout(() => { 
    loader.dismiss();
    this.router.navigateByUrl('/tabs/profil');
    this.presentToast(); 
   }, 400); 
          
 })}
         

 async getdata() {

  var data = "";
  this.redditService.addPost("profil", data).subscribe(data=>{
    console.log(data);
      this.posts = [data.user];
      this.url_facebook= data.user.url_facebook;
      this.url_instagram= data.user.url_instagram;
      this.url_tiktok= data.user.url_tiktok;
      this.url_website= data.user.url_website;
      this.url_whatsapp= data.user.url_whatsapp;
    
    
  

  
    })
 }

cancel() {
  this.router.navigateByUrl('/tabs/profil');
}



async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Vos données sont enregistrées.',
    duration: 2000,
  });
  toast.present();
}





}

