import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CalculService } from 'src/providers/calcul-service';



@Component({
  selector: 'app-observations',
  templateUrl: './observations.page.html',
  styleUrls: ['./observations.page.scss'],
})
export class ObservationsPage implements OnInit {


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
    //obs: ['', [Validators.required, Validators.minLength(0),  Validators.minLength(100)]],
    temp: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
  })
  this.getMyLocationData();
  }


  selectImage(item: any) {
    this.obser = item.value;
   // this.onRecordForm.controls['obs'] = item.value;
  }


  observations = [
  { id: 1,image: 'assets/piscine-algue-verte.png',  value:  "Algues vertes", name:"Présence d’algues vertes\nFacilement reconnaissable, l’algue verte commence par se déposer au fond du bassin, puis sur les parois, jusqu’à recouvrir complètement la superficie de la piscine. La couleur de l’eau se caractérise par différents niveaux de vert."},
  { id: 2,image: 'assets/piscine-algue-moutarde.png',  value: "Algues moutarde",name: "Présence d’algues jaunes ou moutarde\nL’algue moutarde se différencie des autres algues par son aspect filandreux, et par sa couleur jaune\nvoire ocre. On la retrouve dans le fond et sur les marches de la piscine. Elle est très volatile et le robot n’arrive pas à l’aspirer."},
  { id: 3,image: 'assets/piscine-trouble.png',  value: "Eau trouble",name:"Les causes d’une eau trouble\nCe déséquilibre de l’eau provient soit d’un mauvais brassage, c’est-à-dire une circulation trop faible\nou bien un temps de filtration insuffisant; soit d’une mauvaise chimie de l’eau avec un traitement mal adapté ou insuffisant; soit de contaminants; soit d’une eau trop calcaire."},
  { id: 4,image: 'assets/piscine-odeur-chlore.png',  value: "Forte odeur de chlore",name:"Forte odeur de chlore\nCette odeur désagréable souvent confondue avec celle du chlore, est dû à la présence de chloramines. Elles se forment lorsque le chlore réagit avec des composés azotés présents dans l'eau, comme la sueur, les cellules mortes de la peau et d'autres impuretés…"},
  { id: 5,image: 'assets/piscine-sable-au-fond.png', value: "dépôt de sable",name:"Dépôt de sable\nCela provient généralement d’un dysfonctionnement du filtre à sable. Les crépines sont certainement à changer. Faîtes contrôler votre installation par un professionnel."},
  { id: 6,image: 'assets/piscine-ok.png',  value: "Piscine limpide",name:"Bonnes baignades"}];



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
        this.ct=this.records[0].ct;
        this.ctlib=this.records[0].ctlib;
        this.clBr=this.records[0].clBr;
        this.cuiv=this.records[0].cuiv;
        this.fer=this.records[0].fer;
        this.pht=this.records[0].pht;
        this.salt_current=this.records[0].salt;
        this.salt_requis=this.records[0].selreq;
        this.th=this.records[0].th;
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
        th:this.th,
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

    
  }

 



