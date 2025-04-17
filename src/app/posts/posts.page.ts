import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;
  table: string="posts";
  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;

  title: string="";
  content: string="";
  status:any="";
  category:any="faq";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="asc";
  currentpage!: number;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  image: any;
  url: any;


  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController ) {
    this.page=1;
  }
  ngOnInit() {}

  ionViewWillEnter(){
    this.getData();
  }
  async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
        console.log(data); 
          this.posts=data.data;

          console.log(this.posts); 
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



 }
  
  