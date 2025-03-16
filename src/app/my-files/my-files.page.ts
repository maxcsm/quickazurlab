import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ModalController,ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { FileNewPage } from '../file-new/file-new.page';
@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.page.html',
  styleUrls: ['./my-files.page.scss'],
})
export class MyFilesPage implements OnInit {

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
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ]))
   
    
    });
  



  }

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'Prénom requis.' },
      { type: 'minlength', message: '3 caractères minimum.' },
      { type: 'maxlength', message: '25 caractères maximum.' },
    ],
    'lastname': [
      { type: 'required', message: 'Nom requis.' },
      { type: 'minlength', message: '3 caractères minimum.' },
      { type: 'maxlength', message: '25 caractères maximum.' },
    ],
    'email': [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Email non valide.' }
    ]
  };

  async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypageByUser(this.iduser, this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        console.log(data);
        loading.dismiss();
        //this.dismissLoader();
          this.posts=data.data;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
        })
  }  
  
  
  next(event: any ) {
     if (this.currentpage<this.last_page){
     this.page = this.page +1 ;
      this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
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

  async onChangeWord(event:any){
    this.filter=event.target.value;
    this.page=1;

    setTimeout(() => { 
      this.getData();
     }, 800);
 
}
        
  onCancelword(selectedValue: any) {
       this.filter=="";
  }
            
reset(){
      this.filter="";
      this.page=1;
      this.per_page=20;
      this.getData();
}


cancel() {
  this.modal.dismiss(null, 'cancel');
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;

}



  prev() {
    if  (this.page>1){
    this.page = this.page -1;
    this.getData();}}


forward(){
    if  (this.currentpage<this.last_page){
    this.page = this.last_page
   this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
      this.posts=data.data;
      this.total=data.total;
      this.per_page=data.per_page;
      this.currentpage=data.current_page;    
      this.last_page=data.last_page;   
    })
}}



backward() {
  if  (this.currentpage>1){
  this.page=1;
  this.getData();}
}
  
async edit(event: any, item: { id: string; }) {
    console.log(item.id); 
    this.router.navigateByUrl('/file-detail/'+item.id);
}



async openModal() {
          const modal = await this.modalController.create({
            component: FileNewPage,
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
       }  

 }
  
  