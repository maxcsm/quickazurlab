import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CalculService } from 'src/providers/calcul-service';



@Component({
  selector: 'app-sel',
  templateUrl: './sel.page.html',
  styleUrls: ['./sel.page.scss'],
})
export class SelPage implements OnInit {



  onRecordForm!: FormGroup;
  th: any=50;
  tac: any=50;
  clBr: any=50;
  ct: any=50;
  cya:any=50;
  cuiv: any=7;
  pht: any=50;
  fer: any=7;
  salt: any=7;
  ph: any=7;
  iduser: any;
  id: any;

  total:number=0;
  last_page:number=0;
  per_page:number=1;
  order_id:any="id";
  order_by:any="desc";
  records: any;
  page: number=1;
  th_current: any;
  salt_current: any;
  observation: any;
  temp: any;
  selectedImage: any;
  ctlib: any;
  obser: any;
  salt_requis: any;
  volume: any;
  posts: any;
  setBagsRequired:any=0;
  setSaltToAdd: any=0;
  setWaterToRemove: any=0;
  poolSurface: any =0;
  showSelToadd: boolean = false;
  showWaterToremove: boolean = false;
  showWaterSurface: boolean =false;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private localStore: LocalService,
    private loadingCtrl: LoadingController, 
    private calculService : CalculService
    ) {
   }

  
   ngOnInit() {
    this.route.params.subscribe(params => {
    this.id=params['id']; 
   });

   this.iduser = this.localStore.getItem('iduser');


   this.onRecordForm = this.formBuilder.group({
    salt_current: ['', [Validators.required, Validators.minLength(1)]],
    salt_requis: ['', [Validators.required,  Validators.minLength(1)]]
  })



  this.getMyLocationData();
  this.getdata(); 
  }


  selectImage(item: any) {
    this.obser = item.value;
   // this.onRecordForm.controls['obs'] = item.value;
  }


  submitForm(){

    this.calculateSaltToAdd();
    if (this.onRecordForm.valid) {
 
    }
  }

  get errorControl() {
    return this.onRecordForm.controls;
  }

  async getdata() {
    this.redditService.getByid("locations", this.id).subscribe(data=>{
      console.log(data); 
        this.posts=[data];
     
        this.volume = this.posts[0].volume;

        console.log(  this.volume ); 
    })
  }




  async getMyLocationData(){
    this.page=1;
    this.redditService.getDataBypageByUser(this.id,this.page,"postsByLocation",this.per_page,this.order_id,this.order_by,"","","").subscribe(data => {
    console.log(data);
      this.records=data.data;
      this.total=data.total;
      if(this.total>0){
        this.ph=this.records[0].ph; 
        this.tac=this.records[0].tac;
        this.cya=this.records[0].cya;
        this.ct=this.records[0].ct;
        this.ctlib=this.records[0].ctlib;
        this.clBr=this.records[0].clBr;
        this.cuiv=this.records[0].cuiv;
        this.fer=this.records[0].fer;
        this.pht=this.records[0].pht;
        this.salt_current=this.records[0].salt;
        this.salt_requis=this.records[0].selreq;
        this.th_current=this.records[0].th;
        this.obser=this.records[0].obser;
        this.temp=this.records[0].temp;
      }
    })
}  


    async  newRecord() {

      const loader = await this.loadingController.create({
        message: 'Enregistrement en cours',
        });
        loader.present();
    
        var data = JSON.stringify({ 
        ph: this.ph,
        tac: this.tac,
        clBr : this.clBr, 
        ct: this.ct,
        ctlib:this.ctlib,
        cya:this.cya,
        pht:this.pht,
        cuiv:this.cuiv,
        fer:this.fer,
        salt:this.salt_current,
        selreq :this.salt_requis, 
        th:this.th_current,
        obser:this.obser,
        temp:this.temp,
        edited_by: this.iduser,
        location_id: this.id
      });

      console.log(data); 
      this.redditService.addPost("records",data) 
      .toPromise()
      .then(async (response) =>
      {
      console.log(response);
      loader.dismiss();
     setTimeout(async () => { 
      const toast = await this.toastCtrl.create({
        cssClass: 'bg-profile',
        message: 'Vos données sont enregistrées',
        duration: 3000,
        position: 'bottom',
  
      });
      toast.present();
    }, 400); 

    setTimeout(async () => { 
      this.router.navigateByUrl('/location/'+this.id);
    }, 2000); 
    })
    }





    async calculateSaltToAdd() {
      const parsevolume = this.volume  !== null ? this.volume  : 0;
      const currentSalt = parseFloat(this.salt_current);
      const requiredSalt = parseFloat(this.salt_requis);
  
      if (!isNaN(parsevolume) && !isNaN(currentSalt) && !isNaN(requiredSalt)) {
        if (requiredSalt > currentSalt) {

          console.log(" -----SEl requi > current ------")
          const totalSaltPresent = parsevolume * currentSalt;
          const totalSaltRequired = parsevolume * requiredSalt;
          const saltToAddValue = totalSaltRequired - totalSaltPresent;
          const bagsRequiredValue = Math.ceil(saltToAddValue / 25);
  
          this.setSaltToAdd=saltToAddValue;
          this.setBagsRequired=bagsRequiredValue;
          this.showSelToadd=true; 
          this.showWaterToremove=false; 
          this.showWaterSurface=false; 
          console.log( this.setSaltToAdd); 
          console.log(  this.setBagsRequired); 
        } else {
          this.setSaltToAdd=null;
          this.setBagsRequired=null;
          this.calculateWaterToRemove();
        }
      } else {
        this.setSaltToAdd=null;
        this.setBagsRequired=null;
      }
    };
  
    async  calculateWaterToRemove (){
      const parsevolume = this.volume !== null ? this.volume : 0;
      const surface = parseFloat(this.poolSurface);
      const tse = parseFloat(this.salt_requis);
      const tsp = parseFloat(this.salt_current);
  
   

      if (this.showWaterSurface) {

      if (!isNaN(parsevolume) && !isNaN(surface) && !isNaN(tse) && !isNaN(tsp)) {
        if (tsp > tse) {
          const heightToRemove = ((1 - tse / tsp) * parsevolume) / surface;

          this.setWaterToRemove=heightToRemove.toFixed(2);
          this.showWaterToremove=true; 
          this.showWaterSurface=false; 
          console.log( this.setWaterToRemove); 

        } else {
          this.setWaterToRemove=null;
        }
      } else {
        this.setWaterToRemove=null;
      }
    }else {
      this.showWaterSurface=true; 
 
    }
    };



    async  reset() {
      this.showSelToadd=false; 
      this.showWaterToremove=false; 
      this.showWaterSurface=false; 
      this.poolSurface=0;
      this.setWaterToRemove=0;
    }

    
  }

 



