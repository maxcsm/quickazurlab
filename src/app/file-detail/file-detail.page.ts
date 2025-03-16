
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.page.html',
  styleUrls: ['./file-detail.page.scss'],
})
export class FileDetailPage implements OnInit {
  id: any;
  posts: any;
  url: any;


 
  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
 ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getdata();
  });
  }
  async getdata() {
      this.redditService.getByid("files", this.id).subscribe(data=>{
          this.posts = [data];
          this.url = data.url;
          console.log(data); 

        
       
  })
  }

  async dowload() {


  
    }


}
