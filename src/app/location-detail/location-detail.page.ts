

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {

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

  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
  category: any;
  order: any;
 


  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id=params['id']; 
      this.getdata(); 

      this.UrlImage=this.redditService.getUrlImage();
     });
   }

   async getdata() {
    this.redditService.getByid("locations", this.id).subscribe(data=>{
      console.log(data); 
        this.posts = [data];
        this.title = this.posts[0].title;
        this.subtitle = this.posts[0].subtitle;
        this.content = this.posts[0].content;
        this.image = this.posts[0].image;
      })
    }
 


          
 


}