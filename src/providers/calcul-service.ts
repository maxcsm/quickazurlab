import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, } from 'rxjs';
import { retry, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable()
export class CalculService {


  constructor(
    public http: HttpClient, 
    public alertController: AlertController,
    public toastCtrl: ToastController) { }



  ngOnInit() { }







    calculerVolume(selectedForm: any, fond: string, largeur: any,longueur: any , rayon: any, petiteLargeur: any, grandeLargeur: any,petiteLongueur: any, 
      grandeLongueur: any, profondeur: any, profondeurMin: any, profondeurMax: any) {



   console.log(largeur); 
   console.log(longueur); 




   // const parseValue = (val: string) => parseFloat(val.replace(',', '.')); // Remplace la virgule par un point pour les calculs
    const L = largeur;
    const l = longueur;
    const r = rayon;
    const petiteL = petiteLargeur;
    const grandeL = grandeLargeur;
    const petiteLo = petiteLongueur;
    const grandeLo = grandeLongueur;
    const h = profondeur;
    const hMin = profondeurMin;
    const hMax = profondeurMax;
    const hMoyenne = (fond === 'evolutif' || fond === 'double') ? (hMin + hMax) / 2 : h;
    const pi = 3.14;
    let volumeCalcul = 0;
  
    switch (selectedForm) {
      case 'rectangulaire':
        volumeCalcul = L * l * hMoyenne;
        break;
      case 'ronde':
        volumeCalcul = pi * Math.pow(r, 2) * hMoyenne;
        break;
      case 'ovale':
        volumeCalcul = L * l * hMoyenne * 0.89;
        break;
      case 'haricot':
        volumeCalcul = L * l * hMoyenne * 0.85;
        break;
      case "formeenl":
        volumeCalcul = ((petiteL * grandeL) + (grandeLo * petiteLo)) * hMoyenne;
        break;
      case "formelibre":
        volumeCalcul = L * l * hMoyenne * 0.85;
        break;
      default:
        volumeCalcul = 0;
    }
  
    return Math.round(volumeCalcul);
  };






}