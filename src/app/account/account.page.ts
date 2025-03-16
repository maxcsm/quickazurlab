import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';

import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { Share } from '@capacitor/share';
import * as Leaflet from 'leaflet';
import { ModalNotePage } from '../modal-note/modal-note.page';
import { LocalService } from 'src/providers/local.service';

import {Swiper } from 'swiper';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public swiper !:Swiper; 
  map!: Leaflet.Map;
  @ViewChild(IonModal)
  modal!: IonModal;

  public editorValue: string = '';

  table: string="users";

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
  datestart= new Date().toISOString();
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
  iduserselected: any=null;
  listinvoices: any;
  listquotes: any;
  UrlImage: any;
  idproduct: any;

  segment: any="about";
  images: any;

  slider: any;
  slideOptions = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay: true
};

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    private modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private localStore: LocalService ) {}



    public slideOpts = {
      initialSlide: 1,
      slidesPerView: 1,
      speed: 400,
      autoplay: true
    };

  ionViewWillEnter() {}

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.idproduct= params['id']; 
      this.iduser = this.localStore.getItem('iduser');
      this.UrlImage=this.redditService.getUrlImage();
      this.getdata(); 
      this.getDataNotes(); 
      this.getdataGallery();
   
     });
   }

     async getdata() {
      this.redditService.getByid(this.table, this.idproduct).subscribe(data=>{
        console.log(data);
          this.posts = [data];
    
          this.salutation= data[0].salutation;
          this.firstname = data[0].firstname;
          this.lastname = data[0].lastname;
          this.address = data[0].address;
          this.cp = data[0].cp;
          this.city = data[0].city;
          this.state = data[0].state;
          this.country= data[0].country;            
          this.phone_mobile = data[0].phone_mobile;
          this.phone_number = data[0].phone_number;
          this.company = data[0].company;
          this.customer_type = data[0].customer_type;
          this.notes = data[0].notes;

          this.shipping_address = data[0].shipping_address;
          this.shipping_cp = data[0].shipping_cp;
          this.shipping_city = data[0].shipping_city;
          this.shipping_state = data[0].shipping_state;
          this.shipping_country= data[0].shipping_country;            
          this.shipping_phone= data[0].shipping_phone;
          this.billing_phone = data[0].billing_phone;
          this.tva_number= data[0].tva_number;
          this.siret_number= data[0].siret_number;
          this.lat= data[0].lat;
          this.lng= data[0].lng;
         // this.leafletMap(); 
        })
     }



     async getdataGallery() {
      this.redditService.getByid("gallerieByuser", this.idproduct).subscribe(data=>{
          this.images = data;
        })
      }
   

     leafletMap() {
      var startIcon = Leaflet.icon({
        iconUrl: './assets/icon/marker-icon.png',
        iconAnchor:   [2, 32] 
      });
      this.map = new Leaflet.Map('mapId2').setView([this.lat, this.lng], 12);
      Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      }).addTo(this.map);
      const markPoint = Leaflet.marker([this.lat, this.lng],{icon: startIcon});
      this.map.addLayer(markPoint);
 
    }
  




 cancel() {
  this.modal.dismiss(null, 'cancel');
}


onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
  }
}





   async openModalNote($event: any, item: any) {
  
   
    const modal = await this.modalCtrl.create({
      component: ModalNotePage,
      //componentProps: {
      // "paramID": 255225,
      // }
    });
    modal.onDidDismiss().then(async (dataReturned ) => {
      if (dataReturned !== null) {
      //this.imgsign = dataReturned.data;

     
      var data = JSON.stringify({ 
          idpost: this.idproduct,
          iduser:this.iduser,
          note: dataReturned.data[0].postData.note,
          comment:dataReturned.data[0].postData.commentaire
      });

      console.log(data);

      const loading = await this.loadingCtrl.create({
        message: 'Enregistrement..',
        spinner: 'bubbles',
      });

      this.redditService.addPost("postnotation", data)  
      .subscribe((response) => {
        console.log(response); 
        loading.dismiss();
          setTimeout(() => { 
           this.getDataNotes();
         }, 400); 
      })
      }
    });
    return await modal.present();
  
  
 }  


 async getDataNotes(){
      this.redditService.getByid("postnotes",this.idproduct).subscribe(data => {
      console.log(data);
      this.notes=data;
      })
}  


async send($event: any, item: { id: string; firstname: string; lastname: string; }) {
  setTimeout(() => {
    this.router.navigateByUrl('/messagenew/' + item.id+'/'+item.firstname+'/'+item.lastname);
  }, 1000);
}


async addFavoris() {
    var data = JSON.stringify({ 
        location_id: this.idproduct,
        user_id:this.iduser,

    });

    this.redditService.addPost("checkfavoris", data)  
    .subscribe((response) => {
      console.log(response.favorisexist); 
if(response.favorisexist==true){
  setTimeout(async () => { 
    const toast = await this.toastCtrl.create({
      cssClass: 'bg-profile',
      message: 'Vous avez déjà ajouté ce favoris ! ',
      duration: 3000,
      position: 'bottom',
    
    });
    toast.present();
 }, 200); 
} else {
  this.saveFavoris(); 
}
})
    
}  


async saveFavoris() {
  var data = JSON.stringify({ 
      location_id: this.idproduct,
      user_id:this.iduser,

  });

  this.redditService.addPost("favoris", data)  
  .subscribe((response) => {
    console.log(response); 
      setTimeout(async () => { 

        const toast = await this.toastCtrl.create({
          cssClass: 'bg-profile',
          message: 'Favoris ajouté ! ',
          duration: 3000,
          position: 'bottom',
        
        });
        toast.present();
     }, 200); 
  })
  
}  



async share() {
await Share.share({
  title: 'BizNextConnect',
  text: 'Trouvez une professionnel rapidement',
  url: 'biznextconnect.fr',
  dialogTitle: 'BizNextConnect',
});

}

}