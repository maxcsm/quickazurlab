import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalService } from 'src/providers/local.service';


@Component({
  selector: 'app-parrainez',
  templateUrl: './parrainez.page.html',
  styleUrls: ['./parrainez.page.scss'],
})
export class ParrainezPage implements OnInit {




  firstname: any;
  lastname: any;
  email: any;
  password: any;
  salutation: any="M.";


  segType: string = 'info';
  indicatif : string = '+33';
  phone: any;
  address: any;
  number:any = '';
  city: any;
  cp: any;
  id: any;
  iduser: any;
  phone_mobile: any;
  phone_number: any;
  customer_type: any;
  company: any;
  notes: any;
  country: any;
  state: any;

  tva_number: any;
  siret_number: any;
  lng: any;
  lat: any;

  queryadressinput: any;
  queryadressdata: any;
  showaddress: boolean=false;

  check1: boolean = true;
  check2: boolean = true;
  check3: boolean = true;
  check4: boolean = true;
  check5: boolean = true;
  parcours: string="";

  onStep1Form!: FormGroup;
  onStep3Form!: FormGroup;
  onStep2Form!: FormGroup;
  onStep4Form!: FormGroup;

  category:any=[];
  catresult: any=[];
  formsession:boolean=true;
  form0:boolean=false;
  form1:boolean=true;
  form2:boolean=false;
  form3:boolean=false;
  form4:boolean=false;
  form5:boolean=false;

  birth_date: any;
  session_id: any;
  categories: any;
  color: any;
  services: any;
  url_facebook: any;
  url_instagram: any;
  url_tiktok: any;
  url_website: any;
  url_whatsapp: any;
  


  onRegisterForm1!: FormGroup;
  onRegisterForm: any;


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
    private loadingCtrl: LoadingController) {
   }

  
   ngOnInit() {


    
    this.onRegisterForm1 = this.formBuilder.group({
     email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
   })




  }

  async sessionSelect(event: any, item: { id: number; }) {
    this.session_id=item.id;
    this.form1=true;
    this.formsession=false;
   }


  submitForm1(){
    if (this.onRegisterForm1.valid) {
     this.form1=false;
     this.save();
   }
  }


  






  get errorControl() {
    return this.onRegisterForm.controls;
  }



    async  save() {
      const loader = await this.loadingController.create({
        message: 'Envoi en cours',
        });
        loader.present();
        var data = JSON.stringify({ 
          email: this.email
        });
    console.log(data); 
    this.redditService.addPost("adduserparrain",data) 
    .toPromise()
    .then(async (response) =>
    {
    console.log(response);
    loader.dismiss();
     setTimeout(async () => { 
      handler: async () => {}
      this.router.navigateByUrl('/tabs');

      const toast = await this.toastCtrl.create({
        cssClass: 'bg-profile',
        message: 'Votre demande de parrainage a été envoyée',
        duration: 3000,
        position: 'bottom',
  
      });
      toast.present();
    }, 1000); 
    })
    }

    
 
    
   
  }

 



