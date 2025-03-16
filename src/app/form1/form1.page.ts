import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import SignaturePad from 'signature_pad';
import { ModalSignaturePage } from '../modal-signature/modal-signature.page';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit, AfterViewInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  public editorValue: string = '';
  table: string="projects";

  table3: string="users";

  category:string="";
  push: boolean=false;
  data: any;
  posts: any;
  content: string="";
  image:string="";
  title: string="";
  viewdata: any;
  transfer: any;
  datareponse: any = [];
  isCollapsed1 = false;
  userslists: any;
  historiques: any;
  bloc1: any;
  bloc2: any;
  bloc3: any;
  bloc4: any;
  bloc5: any;

  bloc1view: any;
  bloc2view: any;
  bloc3view: any;
  bloc4view: any;
  bloc5view: any;

  blocedit: boolean=true;
  blocedit2: boolean=false;
  bloc1edit: boolean=false;
  bloc2edit: boolean=false;
  bloc3edit: boolean=false;
  bloc4edit: boolean=false;
  bloc5edit: boolean=false;
  bloceditsign: boolean=true;
  addblochistorique: boolean=true;
  addblocusers: boolean=true;

  @ViewChild('sPad', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };

  signaturePad: any;
  signaturePad2: any;
  signBase64!: Blob;
  imgsign: any;
  imgsign2: any;
  idsignature: any;
  firstnamesignature: any;
  lastnamesignature: any;
  client: any;
  id: any;
  
  label1: any="";
  label3: any=1;
  label2: any="";
  label4: any="1 an";
  label5: any="1000";
  label6: any="6";
  label7: any=1;
  label8: any=1;
  label9: any=15;
  label10: any=1;
  label11: any=1;
  idclient: any;
  dataReturned: any;
  iduser: any;
  tech: any;

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router, 
    public toastCtrl: ToastController,
    private _sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    public LoadingController: LoadingController,
    public modalController: ModalController,
    private localStore: LocalService ) {
 }
 

  ngOnInit() {
   this.iduser = this.localStore.getItem('iduser');
   this.route.params.subscribe(params => {
      this.idclient = params['id']; 
  });
  this.getclient();
  this.gettech();
  }

  ngAfterViewInit(): void {}
  async getclient() {
    this.redditService.getByid(this.table3, this.idclient).subscribe(data=>{
        this.client = data;
    })
   }

   async gettech() {
    this.redditService.getByid(this.table3, this.iduser).subscribe(data=>{
        this.tech= data;
    })
   }


  async doSavebloc1() {
      var data = JSON.stringify({ 
      bloc1:this.bloc1,
      }); 
      console.log(data);
      this.redditService.update(this.table,this.id,data) 
      .toPromise()
      .then((response) =>
      {
      setTimeout(() => { 
      this.getData();
      this.bloc1edit=false;
      this.presentToast() 
     }, 400); 
    })}

getData(){
      this.redditService.postByid(this.table, this.id).subscribe(data=>{
        console.log(data);    
          this.posts = data.project;
          this.bloc1 = data.project[0].bloc1;
          this.bloc1view = this._sanitizer.bypassSecurityTrustHtml(data.project[0].bloc1);
       
      })
    }

async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Vos données sont enregistrées.',
        duration: 2000
      });
      toast.present();
}
 
async savePdf() {
const loader = await this.LoadingController.create({
message: 'enregistrement',
});
loader.present();
if(this.label11==1){ 
  this.label2="Traitement unique en "+this.label10+" applications";
} else { 
  this.label2=this.label10+" prestation(s) annuel";
}

var data = JSON.stringify({ 
userid:this.iduser,
clientid:this.idclient,
bloc1:this.bloc1,
img1:this.imgsign,
img2:this.imgsign2,
label1:this.label1.toString(),
label2:this.label2.toString(),
label3:this.label3.toString(),
label4:this.label4.toString(),
label5:this.label5.toString(),
label6:this.label6.toString(),
label7:this.label7.toString(),
label8:this.label8.toString(),
label9:this.label9.toString(),
}); 

      this.redditService.addPost("saveformpdf1",data)
             .subscribe((response) => {
              setTimeout(() => { 
             this.router.navigateByUrl('/account/' + this.idclient);
              loader.dismiss();
               this.presentToast(); 
               this.imgsign==""; 
              }, 1000); 
          },(error: any) => {console.log(error);});
         }

         handleChange(event:any) {
          const query = event.target.value;
          console.log(query);
        }


        async openModal() {
          const modal = await this.modalController.create({
            component: ModalSignaturePage,
            componentProps: {
              "paramID": this.idclient,
            }
          });
          modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
              this.imgsign = dataReturned.data;
            }
          });
          return await modal.present();
       }  

       async openModalTech() {
        const modal = await this.modalController.create({
          component: ModalSignaturePage,
          componentProps: {
            "paramID": this.iduser,
          }
        });
        modal.onDidDismiss().then((dataReturned) => {
          if (dataReturned !== null) {
            this.imgsign2 = dataReturned.data;
          }
        });
        return await modal.present();
     }  


}
