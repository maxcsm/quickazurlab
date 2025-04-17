import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/providers/authentication.service';
import { LoginPage } from './login/login.page';
import { LocalService } from 'src/providers/local.service';

  //app.component.ts
  import { register } from 'swiper/element/bundle';
  register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appClient = [
    { title: 'Accueil', url: '/tabs/home', icon: 'home' },
    { title: 'Mes piscines', url: '/tabs/locations-my', icon: 'list' },
    { title: 'Faq', url: '/tabs/posts', icon: 'chatbubble' },
    { title: 'Profil', url: '/tabs/profil', icon: 'person' },
  ];


  public labels = ['Divers'];
  firstname: any;
  lastname: any;
  role: any;
  constructor(   
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    public menu: MenuController,
    private storage: Storage,
    private localStore: LocalService
  
) {

    this.initializeApp();
  }



  initializeApp() {



    this.menu.enable(false, 'menu1');



    console.log(this.menu.getOpen());
    this.platform.ready().then(() => {
   
      this.router.navigate(['/login']);    



    });
  }



  async logout() {


    const alert = await this.alertController.create({
      header: 'Déconnexion',
      subHeader: '',
      message: 'Voulez-vous vraiment déconnecter ?',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
     
          this.authenticationService.logout();
           setTimeout(() => { 
       
           
          this.menu.enable(false);
           this.router.navigateByUrl('/login');
         }, 1000); 
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
  }
}
