import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalService } from 'src/providers/local.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CalculService } from 'src/providers/calcul-service';




@Component({
  selector: 'app-location-new',
  templateUrl: './location-new.page.html',
  styleUrls: ['./location-new.page.scss'],
})
export class LocationNewPage implements OnInit {


  firstname: any;
  lastname: any;
  email: any;
  password: any;

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
  salutation: any="M.";
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
  form6:boolean=false;
  form7:boolean=false;
  form8:boolean=false;



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
  

  onRegisterForm!: FormGroup;
  onRegisterForm1!: FormGroup;
  onRegisterForm2!: FormGroup;
  onRegisterForm3!: FormGroup;
  onRegisterForm4!: FormGroup;
  onRegisterForm5!: FormGroup;
  onRegisterForm6!: FormGroup;
  onRegisterForm7!: FormGroup;
  onRegisterForm8!: FormGroup;

  title: any;
  delay: any=10;
  price: any=100;
  subcategory: any;
  subcategories: any;
  content: any;
  image: any;
  image2: any;
  image3: any;
  image4: any;
  format: any;
  base64: any;


  rayon:number=0; 
  largeur:number=0; 
  longueur:number=0; 
  profondeur:number=0; 
  profondeurMin:number=0; 
  profondeurMax:number=0; 
  volume:number=0; 

  petiteLargeur:number=0; 
  grandeLargeur:number=0; 
  petiteLongueur:number=0; 
  grandeLongueur:number=0; 

  selectedForm: any= "";
  selectedType: any= "";
  selectedTypeFiltre: any= "";
  isHiddenCalculVolume: boolean = false;
  selectedTypeRevetement: any= "";
  selectedTypeDesinfection: any= "";


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


    this.getCategories();
    this.iduser = this.localStore.getItem('iduser');
    this.category='';
    this.onRegisterForm1 = this.formBuilder.group({
     title: ['', [Validators.required, Validators.minLength(1)]],
   })


   this.onRegisterForm2 = this.formBuilder.group({
    queryadressinput: ['', []],
    address: ['', [Validators.required, Validators.minLength(2)]],
    cp: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    country: ['', [Validators.required, Validators.minLength(3)]],
  })

   this.onRegisterForm3 = this.formBuilder.group({
    selectedForm:  ['true'],
  })

   this.onRegisterForm4 = this.formBuilder.group({
    selectedType:  ['true'],
  })

  this.onRegisterForm5 = this.formBuilder.group({
    selectedTypeFiltre:  ['true'],
  })


  this.onRegisterForm6 = this.formBuilder.group({
    selectedTypeDesinfection:  ['true'],
  })


  this.onRegisterForm7 = this.formBuilder.group({
    selectedTypeRevetement: ['true'],
  })

  this.onRegisterForm8 = this.formBuilder.group({
    volume: ['', [Validators.required, Validators.minLength(2)]],
  })


  }


  forms = [
    { id: 1, name: 'Ronde', value: 'ronde',  image: './assets/ronde.png' , checked:false},
    { id: 2, name: 'Ovale', value: 'ovale',  image: './assets/ovale.png' , checked:false},
    { id: 3, name: 'Rectangulaire', value: 'rectangulaire', image: './assets/rectangulaire.png' , checked:false},
    { id: 4, name: 'forme en L', value: 'formeenl',  image: './assets/trapeze.png' , checked:false},
    { id: 5, name: 'Haricot', value: 'haricot',  image: './assets/haricot.png', checked:false },
    { id: 6, name: 'Libre', value: 'formelibre', image: './assets/formelibre.png' , checked:false},
  ];



  types = [
    { id: 1, name: 'Fond plat', value: 'plat',  image: './assets/fond-plat.png' },
    { id: 2, name: 'Double fond', value: 'double',  image: './assets/double-fond.png' },
    { id: 3, name: 'Fond incliné', value: 'evolutif', image: './assets/fond-evolutif.png' },
  ];

  typesFiltres = [
    { id: 1, name: 'Filtre à sable', value: 'sable',  image: './assets/filtre-a-sable-black.png' , checked:false},
    { id: 2, name: 'Filtre à cartouche', value: 'cartouche',  image: './assets/filtre-a-cartouche.png' , checked:false},
  ];


  typesRevetement = [
    { id: 1, name: 'Coque', value: 'Coque',  image: './assets/filtre-a-sable-black.png' },
    { id: 2, name: 'Enduit', value: 'Enduit',  image: './assets/filtre-a-cartouche.png' },
    { id: 3, name: 'Liner', value: 'Liner',  image: './assets/filtre-a-sable-black.png' },
    { id: 4, name: 'Carrelage', value: 'Carrelage',  image: './assets/filtre-a-sable-black.png' },
    { id: 5, name: 'PVC armé', value: 'PVC armé',  image: './assets/filtre-a-sable-black.png' },
    { id: 6, name: 'Peinture', value: 'Peinture',  image: './assets/filtre-a-sable-black.png' },
  ];


  typesDesinfection = [
    { id: 1, name: 'Chlore non stabilisé', value: 'Chlore non stabilisé',  image: './assets/Chlore-non-stabilise.png' },
    { id: 2, name: 'Chlore stabilisé', value: 'Chlore stabilisé',  image: './assets/chlore-stabilise.png' },
    { id: 3, name: 'Brome', value: 'Brome',  image: './assets/brome.png' },
    { id: 4, name: 'Sel', value: 'Sel',  image: './assets/sable-piscine.png' },
  ];


  selectOnlyOne(item: any) {
    this.selectedForm = item.value;
    console.log(this.selectedForm); 
  }

  selectTypeOne(item: any) {
    this.selectedType = item.value;
  }

  selectTypeFiltre(item: any) {
    this.selectedTypeFiltre = item.value;
  }

  selectTypeRevetement(item: any) {
    this.selectedTypeRevetement = item.value;
  }

  selectTypeDesinfection(item: any) {
    this.selectedTypeDesinfection = item.value;
  }

// Toggle visibility
 toggleVisibility() {
  this.isHiddenCalculVolume = !this.isHiddenCalculVolume;
  console.log(this.isHiddenCalculVolume);
}



  async sessionSelect(event: any, item: { id: number; }) {
    this.session_id=item.id;
    this.form1=true;
    this.formsession=false;
   }


  submitForm1(){
    if (this.onRegisterForm1.valid) {
     this.form1=false;
     this.form2=true;
   }
  }

  submitForm2(){
    if (this.onRegisterForm2.valid) {
      this.form2=false;
      this.form3=true;
    }
  }

  submitForm3(){
    if (this.onRegisterForm3.valid) {
      this.form3=false;
      this.form4=true;
   
   }
  }


  submitForm4(){
    if (this.onRegisterForm4.valid) {
      this.form4=false;
      this.form5=true;
   }
  }



  submitForm5(){
    if (this.onRegisterForm5.valid) {
      this.form5=false;
      this.form6=true;
   }
  }



  submitForm6(){
    if (this.onRegisterForm6.valid) {
      this.form6=false;
      this.form7=true;
   }
  }


  submitForm7(){
    if (this.onRegisterForm7.valid) {
      this.form7=false;
      this.form8=true;
   }
  }



  submitForm8(){
    if (this.onRegisterForm8.valid) {
      this.form8=false;
      this.register(); 
   }
  }


  calculVolume(){

      console.log(this.selectedForm); 
      console.log(this.selectedType); 
      console.log(this.largeur); 
      console.log(this.longueur); 

      this.volume=this.calculService.calculerVolume(this.selectedForm,  this.selectedType, this.largeur,this.longueur, this.rayon, 
      this.petiteLargeur, this.grandeLargeur,this.petiteLongueur, this.grandeLongueur, this.profondeur, this.profondeurMin, this.profondeurMax); 
      console.log(this.volume);

      this.toggleVisibility(); 


  }


  get errorControl() {
    return this.onRegisterForm.controls;
  }



    async  register() {

      const loader = await this.loadingController.create({
        message: 'Enregistrement en cours',
        });
        loader.present();
    
        var data = JSON.stringify({ 
        title: this.title,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        cp:this.cp,
        company:this.company,
        city: this.city,
        state: this.state,
        country: this.country,


        delay:this.delay,
        price:this.price,

        category:this.category,
        subcategory:this.subcategory,


        content : this.content,

      
        lat:this.lat, 
        lng:this.lng,

        edited_by: this.iduser, 

        /*
        image: this.image, 
        image2: this.image2, 
        image3: this.image3, 
        image4: this.image4, 
        */

         volume: this.volume,
         selectedForm : this.selectedForm,
         selectedType : this.selectedType,
         selectedTypeFiltre : this.selectedTypeFiltre,
         selectedTypeRevetement : this.selectedTypeRevetement,
         selectedTypeDesinfection : this.selectedTypeDesinfection
  
       
      });

           console.log(data); 
             this.redditService.addPost("locations",data) 
             .toPromise()
             .then(async (response) =>
             {
               console.log(response);

    
               loader.dismiss();



     setTimeout(async () => { 
      const toast = await this.toastCtrl.create({
        cssClass: 'bg-profile',
        message: 'Votre annonce est enregistrée ',
        duration: 3000,
        position: 'bottom',
  
      });
      toast.present();
    }, 1000); 





    setTimeout(async () => { 
      this.router.navigateByUrl('/tabs/locations-my');
    }, 2000); 
    })
    }

    async queryadress() {
      this.redditService.getsearchAdressGeo(this.queryadressinput)
        .subscribe(async (response) => {
          console.log(response);
          this.queryadressdata=response.features;
    })
    }
    
    
    async selectadress(event: any, item: any) {
      this.address=item.properties.address_line1;
      this.cp=item.properties.postcode;
      this.city=item.properties.city;
      this.country=item.properties.country;
      this.showaddress=true;

      this.lat=item.properties.lat;
      this.lng=item.properties.lon;
    }
    
    
    async iniadresseData() {
      this.firstname="";
      this.lastname="";
      this.address="";
      this.cp="";
      this.city="";
      this.phone="";
      this.email="";
      this.country="";
      this.showaddress=false;
    }
    
    async getCategories() {
      this.redditService.getDataAll("public_tags").subscribe(data=>{
          this.categories = data.data;
        })
      }

      categoryChange(event:any) {
        this.category = event.target.value;
        this.subcategory="";
        this.getSubCategories();
      }
      async getSubCategories() {
        this.redditService.getByid("public_types", this.category).subscribe(data=>{
            this.subcategories = data.data;
            console.log( this.subcategories); 
          })
        }



      typeChange(event:any) {
        this.subcategory = event.target.value;
      }



    
  }

 



