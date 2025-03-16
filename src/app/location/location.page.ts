
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import {Swiper } from 'swiper';

   //home.page.ts
   import { IonicSlides } from '@ionic/angular'; //For crousel
   import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {


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

  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
  category: any;
  order: any;
 

  slider: any;



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

      this.UrlImage=this.redditService.getUrlImage();
     });
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
      })
    }
 

    async send($event: any, item: { edited_by: any ; firstname: string; lastname: string; }) {


      
      setTimeout(() => {
        this.router.navigateByUrl('/messagenew/' + item.edited_by.id+'/'+this.posts[0].edited_by.firstname+'/'+this.posts[0].edited_by.lastname);
      }, 1000);
    }
          

    slideChanged()
    {
       this.slider.stopAutoplay(); //this code for slide after page change
       }


}