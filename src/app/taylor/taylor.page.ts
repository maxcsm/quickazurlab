import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CalculService } from 'src/providers/calcul-service';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-taylor',
  templateUrl: './taylor.page.html',
  styleUrls: ['./taylor.page.scss'],
})
export class TaylorPage implements OnInit {
  test: any;
  test1: any;
  test2: any;
  records: any;

  total:number=0;
  last_page:number=0;
  per_page:number=1;
  order_id:any="id";
  order_by:any="desc";
  id: any;
  page: number=1;

  category: any;
  order: any;
  status: string=""
  filter: string="";
  ph: any;
  tac: any;
  th: any;
  testth:any;
  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private calculService : CalculService,
    private localStore: LocalService) {




   }
  ngOnInit() {
    this.route.params.subscribe(params => {
       this.id=params['id']; 
    
       this.getMyLocationData();
   
      });
    }




    async getMyLocationData(){
      this.page=1;
      this.redditService.getDataBypageByUser(this.id,this.page,"postsByLocation",this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
        this.records=data.data;
        console.log( this.records);

        this.total=data.total;


        if(this.total>0){
          this.ph=this.records[0].ph; 
          this.tac=this.records[0].tac;
          this.th=this.records[0].th;
          this.test= this.CalculatePositionTac(); 
          this.test1= this.CalculatePositionPh(); 
          this.testth= this.CalculatePositionTh(); 
        }
      })
}  


  


     PosPh: { [key: number]: number } ={
      0: 628,
      6.0: 568, 6.2: 540, 6.4: 514, 6.6: 486, 6.8: 458, 
      7.0: 429, 7.2: 400, 7.4: 376, 7.6: 345, 7.8: 317,
      8.0: 290, 8.2: 262, 8.4: 235, 8.6: 208, 8.8: 180,
      9.0: 152, 
      14: 100,
    };

 PosTh: { [key: number]: number } ={
  0: 100, 20: 123, 30: 173, 40: 208, 50: 238, 60: 256, 70: 274, 80: 288, 90: 306,
  100: 320, 200: 399, 300: 445, 400: 492, 500: 509, 600: 528, 700: 547, 800: 564,
  900: 578, 1000: 594,
    };



    PosTac: { [key: number]: number } = {
      0: 100, 20: 123, 30: 173, 40: 208, 50: 238, 60: 256, 70: 274, 80: 288, 90: 306,
      100: 320, 200: 399, 300: 445, 400: 492, 500: 509, 600: 528, 700: 547, 800: 564,
      900: 578, 1000: 594,
    };
   

    getAdjacentValues(posObject: { [key: number]: number }, target: number) {
      const keys = Object.keys(posObject)
        .map(Number)
        .sort((a, b) => a - b);
  
      let lowerKey: number | undefined = undefined;
      let upperKey: number | undefined = undefined;
  
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] <= target) {
          lowerKey = keys[i];
        }
        if (keys[i] > target) {
          upperKey = keys[i];
          break;
        }
      }
  
      return { lowerKey, upperKey };
    }
  
    CalculatePositionTac() {

      const tacDiz= this.arrondirDizaine(this.tac); 

      console.log(tacDiz); 
      const TacPos = this.PosTac[tacDiz]-0.8*tacDiz;

      console.log(TacPos); 

      return TacPos;

      /*
      if (isNaN(TacPos)) {
        // Retrieve adjacent keys for interpolation
        const { lowerKey: lowerTacKey, upperKey: upperTacKey } = this.getAdjacentValues(this.PosTac, this.tac);
  
        // Check that adjacent keys exist to avoid NaN
        const CoefTac1 = (lowerTacKey !== undefined && upperTacKey !== undefined)
          ? this.PosTac[lowerTacKey] +
            ((this.tac - lowerTacKey) / (upperTacKey - lowerTacKey)) *
              (this.PosTac[upperTacKey] - this.PosTac[lowerTacKey])
          : 0;
  
        // Calculate the index with the interpolated coefficients
        const i = CoefTac1;
        const indice = parseFloat(i.toFixed(2));
        return indice;
      } else {
        // Calculate the index with the exact coefficients
        return TacPos;
      }
*/
      
    }




  arrondirDizaine(nombre: number): number {
      return Math.round(nombre / 10) * 10;
    }


     arrondirDecimal(nombre: any): any {
 

      return parseFloat((nombre).toFixed(1));
    }

    CalculatePositionPh() {


    
      const PhDeci = parseFloat((this.ph));
      console.log( PhDeci ); 
      const PhPos = this.PosPh[PhDeci]-60;

      console.log( PhPos ); 
      return PhPos; 
      /*
  
      if (isNaN(PhPos)) {
        const { lowerKey: lowerphKey, upperKey: upperphKey } = this.getAdjacentValues(this.PosPh, 6);
  
        const Coefph1 = (lowerphKey !== undefined && upperphKey !== undefined)
          ? this.PosPh[lowerphKey] +
            ((ph - lowerphKey) / (upperphKey - lowerphKey)) *
              (this.PosPh[upperphKey] - this.PosPh[lowerphKey])
          : 0;
  
        const i = Coefph1;
        const indice = parseFloat(i.toFixed(2));
        return indice;
      } else {
        return PhPos;
      }*/
    }

    CalculatePositionTh() {

      const thDiz= this.arrondirDizaine(this.th); 
      const ThPos = this.PosTh[thDiz]-0.8*thDiz;

      console.log(ThPos ); 
      return ThPos;

      /*
     console.log( ThPos); 
      if (isNaN(ThPos)) {
        const { lowerKey: lowerThKey, upperKey: upperThKey } = this.getAdjacentValues(this.PosTh, 80);
  
        const CoefTh1 = (lowerThKey !== undefined && upperThKey !== undefined)
          ? this.PosTh[lowerThKey] +
            ((th - lowerThKey) / (upperThKey - lowerThKey)) *
              (this.PosTh[upperThKey] - this.PosTh[lowerThKey])
          : 0;
  
        const i = CoefTh1;
        const indice = parseFloat(i.toFixed(2));
        return indice;
      } else {
        return ThPos;
      }*/
    }
  
 
  }