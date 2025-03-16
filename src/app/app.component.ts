import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/providers/authentication.service';

import { ReturnPage } from './return/return.page';
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
    { title: 'Historique', url: '/tabs/locations-my', icon: 'list' },
    { title: 'Profil', url: '/tabs/profil', icon: 'person' },
   // { title: 'Favoris', url: '/tabs/favoris', icon: 'heart' },
   // { title: 'Parrainez', url: '/parrainez', icon: 'share' },
   // { title: 'Pros', url: '/tabs/users', icon: 'person' },
   //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
   //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public appTech = [
    { title: 'Accueil', url: '/tabs/home', icon: 'home' },
    { title: 'Mes piscines', url: '/tabs/locations-my', icon: 'list' },
    { title: 'Historique', url: '/tabs/locations-my', icon: 'list' },
    { title: 'Profil', url: '/tabs/profil', icon: 'person' },

  //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
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
    this.menu.enable(false, 'menu2');
    this.menu.enable(false, 'menu3');

    this.localStore.saveItem('filter_location_title',"Guyane");
    this.localStore.saveItem('filter_lat',"4.9371544");
    this.localStore.saveItem('filter_lng',"-52.3258736");
    this.localStore.saveItem('filter_annonce_category',  "");
    this.localStore.saveItem('filter_annonce_subcategory',"");
    this.localStore.saveItem('filter_category', "");
    this.localStore.saveItem('filter_distance',"500");
    console.log(this.menu.getOpen());
    this.platform.ready().then(() => {
   
      this.router.navigate(['/tabs/login']);    
     //this.router.navigate(['/home']);     
 //   });

 // this.authenticationService.authState.subscribe(state => {
   // this.loginmenu=state;
   // console.log(this.loginmenu);
 //   });
  //  console.log("AuthGuard");
   // console.log( this.AuthGuard.canActivate());
 //    this.login= this.AuthGuard.canActivate()
      // this.setupDeeplinks();
      // this.splashScreen.hide();

      /*

      this.deeplinks.route({
        '/login': LoginPage,
        '/return': ReturnPage
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
      */


/*

       this.deeplinks
        .route({
          "/home": HomePage,
        })
        .subscribe(
          (match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          (nomatch) => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }

          */

/*
  email: this.email,
        salutation: this.salutation,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        cp:this.cp,
        city: this.city,
        state: this.state,
        country: this.country,
        phone_mobile: this.phone_mobile,
        phone_number: this.phone_number,
        company: this.company,
        customer_type: this.customer_type,
        notes: this.notes,
  
        shipping_address: this.shipping_address,
        shipping_cp:this.shipping_cp,
        shipping_city: this.shipping_city,
        shipping_state: this.shipping_state,
        shipping_country: this.shipping_country,
        shipping_phone: this.shipping_phone,
        billing_phone: this.billing_phone,
        siret_number: this.siret_number,
        tva_number: this.tva_number,
        role:1,

        lat:this.lat, 
        lng:this.lng





        );*/
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
