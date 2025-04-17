
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild ,  AfterViewInit} from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import {Swiper } from 'swiper';
//home.page.ts
import { IonicSlides } from '@ionic/angular'; //For crousel
import { SwiperOptions } from 'swiper/types';
import { CalculService } from 'src/providers/calcul-service';
import { LocalService } from 'src/providers/local.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit,AfterViewInit {

  public swiper !:Swiper; 
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="posts";
  file: any;
  gallery: any;
  idgallery: any;
  editurl: boolean=false;

  status:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=1;
  order_id:any="id";
  order_by:any="desc";
  currentpage!: number;
  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
  category: any;
  order: any;
 

  slider: any;
  records: any;
  page: number=1;
  ph: any=null;
  volume: any;
  selectedForm: any;
  selectedType: any;
  selectedTypeDesinfection: any;
  selectedTypeFiltre: any;
  selectedTypeRevetement: any;
  tac: any;

  roundedPH:any;
  getRecoPh: any;
  getRecoTac: any;
  cya: any;
  getRecoCya: any;
  ct: any;
  salt_current: any;
  pht: any;
  fer: any;
  cuiv: any;
  clBr: any;
  th_current: any;
  getRecoTh: any;
  imageTh: any;
  ctlib: any;
  observ: any;
  getRecoObserv: any;
  iduser: any;
  getRecoChlore: any;
  getRecoChlorine: any;
  selreq: any;
  salt_requis: any;
  clib: any;
  imageCT: boolean=false;
  getRecoPht: string | undefined;
  getRecoCuiv: string | undefined;
  getRecoFer: string | undefined;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private calculService : CalculService,
    private localStore: LocalService) {

   }

   public slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 200,
    autoplay: true
  };



  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getdata(); 
      this.getMyLocationData();
      this.UrlImage=this.redditService.getUrlImage();
      this.iduser = this.localStore.getItem('iduser');
     });
   }


   ngAfterViewInit() {
 
   }

   async getdata() {
    this.redditService.getByid("locations", this.id).subscribe(data=>{
 
        this.posts = [data];

        console.log(this.posts); 
        console.log(this.posts[0].edited_by.firstname); 
        console.log(this.posts[0].edited_by.lastname); 

        this.title = this.posts[0].title;
        this.subtitle = this.posts[0].subtitle;
        this.content = this.posts[0].content;
        this.image = this.posts[0].image;

        this.volume = this.posts[0].volume;
        this.selectedForm = this.posts[0].selectedForm;
        this.selectedType = this.posts[0].selectedType;
        this.selectedTypeDesinfection = this.posts[0].selectedTypeDesinfection;
        this.selectedTypeFiltre = this.posts[0].selectedTypeFiltre;
        this.selectedTypeRevetement = this.posts[0].selectedTypeRevetement;
   
      })
    }
 

    async send($event: any, item: { edited_by: any ; firstname: string; lastname: string; }) {


      
      setTimeout(() => {
        this.router.navigateByUrl('/messagenew/' + item.edited_by.id+'/'+this.posts[0].edited_by.firstname+'/'+this.posts[0].edited_by.lastname);
      }, 1000);
    }
          

   

  


    async getMyLocationData(){
          this.page=1;
          this.redditService.getDataBypageByUser(this.id,this.page,"postsByLocation",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
          console.log(data);
            this.records=data.data;
            console.log( this.records);

            this.total=data.total;
            this.per_page=data.per_page;
            this.currentpage=data.current_page;    
            this.last_page=data.last_page;   

            if(this.total>0){
              this.ph=this.records[0].ph; 
              this.tac=this.records[0].tac;
              this.cya=this.records[0].cya;
              this.clib=this.records[0].clib;
              this.ct=this.records[0].ct;
              this.clBr=this.records[0].clBr;
              this.cuiv=this.records[0].cuiv;
              this.fer=this.records[0].fer;
              this.pht=this.records[0].pht;
              this.salt_current=this.records[0].salt;
              this.salt_requis=this.records[0].selreq;
              this.selreq=this.records[0].selreq;
              this.th_current=this.records[0].th;
              this.observ=this.records[0].obser;
              this.getRecom();
            }
          })
    }  
    
    next(event: any ) {
       if (this.currentpage<this.last_page){
       this.page = this.page +1 ;
        this.redditService.getDataBypageByUser(this.id,this.page,"postsByLocation",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
          let postspush = data.data;
          for (let post of postspush) {
            this.posts.push(post);
          }
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page; 
        }) 
        event.target.complete();  
      }  else    {
        event.target.complete();  
      }
    }
    
    async  doInfinite(event:any) {
      this.next(event);
    }





   getRecom(){





   this.getRecoObserv=this.calculService.getObservationText ( this.observ);
   this.getRecoPh=this.calculService.getPHRecommendationText( this.ph, this.volume, 10,  this.ph,  this.selectedTypeDesinfection,  this.selectedTypeRevetement );
   this.getRecoTac=this.calculService.getTACRecommendationText(this.ph, this.volume, this.tac,  this.selectedTypeDesinfection,  this.selectedTypeRevetement );

   this.getRecoTh=this.calculService.getTHRecommendationText(this.th_current,this.th_current,this.volume, this.selectedTypeDesinfection,  this.selectedTypeRevetement);
   this.imageTh=this.calculService.getThImageSource(this.th_current, this.selectedTypeRevetement);
   //this.getRecoChlorine = this.calculService.getChlorineRecommendationText(this.ctlib,this.cya,this.volume, selact : string,selreq: string,this.salt_current, requiredSaltLevel: any, this.clBr);
   this.getRecoChlorine = this.calculService.getChlorineRecommendationText(this.clib,this.cya,this.volume, this.salt_current,this.selreq,this.salt_current, this.selreq, this.clBr);
   this.getRecoChlore = this.calculService.getChloreRecommendationText(this.th_current,this.th_current,this.volume, this.selectedTypeDesinfection,  this.selectedTypeRevetement);
   this.imageCT=this.calculService.getCtImageSource(this.ct,this.clBr) ; 
   //  this.getRecoCya=this.calculService.getCYARecommendationText(this.cya, this.volume, currentCl: number, selact : string, selreq: string, cya :any)
   this.getRecoCya=this.calculService.getCYARecommendationText(this.cya, this.volume, this.ct, this.salt_current, "1", this.cya)

   this.getRecoPht=this.calculService.getPhosphateRecommendationText(this.pht, this.volume); 
   this.getRecoCuiv=this.calculService.getCuivreRecommendationText(this.cuiv, this.volume); 
   this.getRecoFer=this.calculService.cgetFerRecommendationText(this.fer, this.volume); 


   console.log("-------------IMAGE TH-------------"); 
   console.log(this.imageTh); 
   }

   


   async goObservations() {
    this.router.navigateByUrl('/observations/'+this.id);
 }
  
   async NewRecord() {
       this.router.navigateByUrl('/record/'+this.id);
    }
    async goTaylor() {
      this.router.navigateByUrl('/taylor/'+this.id);
   }
   async goSel() {
    this.router.navigateByUrl('/sel/'+this.id);
   }

   async goSendRapport() {
   //this.router.navigateByUrl('/sel/'+this.id);
   }

   

   async savePdf() {
    const loader = await this.loadingController.create({
    message: 'enregistrement',
    });
    loader.present();
 
    
    var data = JSON.stringify({ 
    userid:this.iduser,
    clientid:this.id,
    bloc1:"",
    img1:"",
    img2:"",
    label1:this.getRecoObserv,
    label2:this.getRecoTac,
    label3:this.getRecoPh,
    label4:this.getRecoTh,
    label5: this.getRecoChlorine,
    label6:this.getRecoChlore,
    label7: this.getRecoCya,
    label8:this.getRecoPht,
    label9:  this.getRecoCuiv,
    label10:  this.getRecoFer,
    }); 
    


    this.redditService.addPost("saveformpdf1",data)
    .subscribe((response) => {
    setTimeout(() => { 
 
      loader.dismiss();
      this.presentToast(); 

      }, 1000); 
    },(error: any) => {console.log(error);});
  }
 

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Vous allez reçevoir le rapport par e-mail. ',
      duration: 2000
    });
    toast.present();
}

}