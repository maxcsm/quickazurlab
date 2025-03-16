import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController, AlertController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { LocalService } from 'src/providers/local.service';
import { AuthenticationService } from 'src/providers/authentication.service';
import { RedditService } from 'src/providers/reddit-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {



 firstname : any;
  email: any;
  password:any;
  token: any;
  public onLoginForm!: FormGroup;
  language: any ;
  isSubmitted = false;
  loading: any;
  @Input() model_title: string | undefined;
  roleUser: any;
  modelId: any;
  title: any;
  content: any;
  url: any;
  price: any;
  UrlImage: any;
  private file!: File;
  image: any;


  format: any;
  base64: string | undefined;
  subject: any="Assistance";


  public onContactForm!: FormGroup;
  iduser: any;
  constructor(

    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public LoadingController: LoadingController,
    public formBuilder: FormBuilder,
    public redditService:RedditService,
    private router: Router,
    public alertController: AlertController,
    private localStore: LocalService,
    private authService: AuthenticationService,
    private modalController: ModalController
  ) {



  }

  ngOnInit() {
    this.iduser = this.localStore.getItem('iduser');
 
    this.subject="Assistance";


    this.onContactForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
   })

  }




   async  doSave() {
    var data = JSON.stringify({
     user_id: this.iduser,
     title: this.subject,
     content: this.content,
     image: this.image


     //category:this.category,
   });

   console.log(data);

   this.redditService.addPost("notifcontact",data)
   .toPromise()
   .then((response) =>{
   setTimeout(async () => {
    console.log(response);

    const toast = await this.toastCtrl.create({
      color:"primary",
      cssClass: 'bg-profile',
      message: 'Message envoyé',
      duration: 3000,
      position: 'bottom',

    });
    toast.present();


   this.closeModel();
   }, 600);
   })}




   async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }













}
