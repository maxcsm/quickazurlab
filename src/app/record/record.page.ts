import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CalculService } from 'src/providers/calcul-service';



@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {


  onRecordForm!: FormGroup;
  th: any=50;
  tac: any=50;
  clBr: any=50;
  ct: any=50;
  clib: any=50;
  cya:any=50;
  cuiv: any=0.4;
  pht: any=50;
  fer: any=0.15;
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
  temp: any;
  observ: any;



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
    tac: ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    ph: ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(14)]],
    th: ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    clib: ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    ct: ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    clBr : ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    cya : ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    pht : ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    cuiv : ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]],
    fer : ['', [Validators.required, Validators.minLength(0),  Validators.maxLength(100)]]
  })
  this.getMyLocationData();
  }


  submitForm(){
    if (this.onRecordForm.valid) {
      this.newRecord(); 
   }
  }


  get errorControl() {
    return this.onRecordForm.controls;
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
        this.clib=this.records[0].clib;
        this.ct=this.records[0].ct;
        this.clBr=this.records[0].clBr;
        this.cuiv=this.records[0].cuiv;
        this.fer=this.records[0].fer;
        this.pht=this.records[0].pht;
        this.salt_current=this.records[0].salt;
        this.th=this.records[0].th;
        this.temp=this.records[0].temp;
        this.observ=this.records[0].obser;
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
        th: this.th,
        tac: this.tac,
        clBr : this.clBr, 
        clib : this.clib,
        ct: this.ct,
        cya:this.cya,
        pht:this.pht,
        cuiv:this.cuiv,
        fer:this.fer,
        salt:this.salt,
        temp:this.temp,
        obser: this.observ,
        edited_by: this.iduser,
        location_id: this.id,
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


    

      onRangeChangeTh(event: any) {
        this.th = event.detail.value;
      }

      onRangeChangePh(event: any) {
        this.ph = event.detail.value;
      }

      onRangeChangeTac(event: any) {
        this.tac = event.detail.value;
      }

      onRangeChangeclBr(event: any) {
        this.clBr = event.detail.value;
      }


      onRangeChangeClib(event: any) {
        this.clib = event.detail.value;
      }

      onRangeChangeCt(event: any) {
        this.ct = event.detail.value;
      }

      onRangeChangeCya(event: any) {
        this.cya = event.detail.value;
      }

      onRangeChangePht(event: any) {
        this.pht = event.detail.value;
      }



      onRangeChangeCuiv(event: any) {
        this.cuiv = event.detail.value;
      }
    	
      onRangeChangeFer(event: any) {
        this.fer = event.detail.value;
      }
    	
  
    	
  
    
  }

 



