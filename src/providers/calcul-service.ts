import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, } from 'rxjs';
import { retry, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable()
export class CalculService {

  isChloreSelected!: boolean;
  isBromeSelected!: boolean;
  isLinerSelected!: boolean;
  isCarrelageSelected!: boolean;


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



   getInfoText = (type: 'TAC' | 'pH' | 'TH' | 'CYA') => {
   // const isChloreSelected = selectedDisinfectants.includes('Chlore stabilisé') || selectedDisinfectants.includes('Chlore non stabilisé');
   // const isBromeSelected = selectedDisinfectants.includes('Brome');
   // const isSelSelected = selectedDisinfectants.includes('Sel');
   // const isLinerSelected = selectedButton === 'Coque' || selectedButton === 'Liner' || selectedButton === 'PVC armé';
   // const isCarrelageSelected = selectedButton === 'Enduit' || selectedButton === 'Carrelage' || selectedButton === 'Peinture';
  

   const isChloreSelected = true;
   const isBromeSelected = true;
   const isSelSelected = true;
   const isLinerSelected = true;
   const isCarrelageSelected = true;

    let desinfectant = "un désinfectant";
    let revetement = isLinerSelected ? "liner" : "carrelage";
    
    let range = "80-120 ppm"; // Valeur par défaut pour le TAC
  
    if (isChloreSelected) {
      desinfectant = "un désinfectant au chlore";
    } else if (isBromeSelected) {
      desinfectant = "un désinfectant au brome";
    }
  


    switch (type) {
      case 'TAC':
        range = isBromeSelected ? "100-150 ppm" : range;
        return `Le TAC (Titre Alcalimétrique Complet) mesure l'alcalinité de l'eau. Avec ${desinfectant} et ${revetement}, une alcalinité correcte (${range}) aide à stabiliser le pH pour une efficacité optimale.`;
      case 'pH':
        return `Le pH mesure l'acidité de l'eau. Avec ${desinfectant} et le type ce type de fond, une acidité correcte (7-7.4) aide à stabiliser le pH pour une efficacité optimale.`;
      case 'TH':
        range = isCarrelageSelected ? "200-400 ppm" : "100-250 ppm";
        return `Le TH (Titre Hydrotimétrique) mesure la dureté de l'eau. Avec ${desinfectant} et ${revetement}, une dureté correcte (${range}) aide à prévenir l'entartrage des équipements et à assurer l'efficacité des traitements.`;
      case 'CYA':
        range = isChloreSelected ? "25-50 ppm" : "100-250 ppm";
        return `Le CYA (Acide Cyanurique) mesure la stabilisation du chlore dans l'eau. Pour un traitement efficace au chlore, la valeur idéale doit être comprise entre 25 et 50 ppm.`;
      default:
        return '';
    }
  };
  
  calculateHighChlorineReducer = (volumeValue: number, currentCl: number) => {
    const idealCl = 3; // Niveau de chlore idéal en ppm
    const clReducerPerPpm = volumeValue * 1.5; // Quantité de réducteur pour chaque ppm à abaisser
    const neededClReduction = currentCl - idealCl;

    return neededClReduction * clReducerPerPpm; // Quantité de réducteur en grammes
  };

  // Fonction pour calculer la quantité de chlore pour augmenter le chlore stabilisé (CYA 0-25 ppm)
  calculateLowChlorineStabilized = (volumeValue: number, currentCl: number, idealCl: number = 2) => {
    const dosagePer2Ppm = volumeValue * 18; // Dosage pour augmenter de 2 ppm
    const neededClIncrease = idealCl - currentCl;

    return (neededClIncrease / idealCl) * dosagePer2Ppm; // Quantité de chlore stabilisé à ajouter en grammes
  };

  // Fonction pour augmenter le chlore avec du calcium hypochlorite (CYA 50-75 ppm)
  calculateLowChlorineCalciumHighCYA = (volumeValue: number, currentCl: number, idealCl: number = 1) => {
    const dosagePerPpm = volumeValue * 13; // Dosage pour 1 ppm
    const neededClIncrease = idealCl - currentCl;

    return (neededClIncrease / idealCl) * dosagePerPpm; // Quantité de chlore à ajouter en grammes
  };

  // Fonction pour augmenter le chlore avec du calcium hypochlorite (CYA 25-50 ppm)
  calculateLowChlorineCalciumMidCYA = (volumeValue: number, currentCl: number, idealCl: number = 2) => {
    const dosagePer2Ppm = volumeValue * 13; // Dosage pour 2 ppm
    const neededClIncrease = idealCl - currentCl;

    return (neededClIncrease / idealCl) * dosagePer2Ppm; // Quantité de chlore à ajouter en grammes
  };

  // Fonctions pour les formules de CYA
   calculateLowCYA = (volumeValue: number, cya : number) => {
    const idealCYA = 37.5 - cya;
    const V10 = volumeValue * 10;
    const eau = (idealCYA / 10)* V10;
    return eau;
  };
  
  calculateHighCYA = (volumeValue: number, cya: number) => {
    const idealCYA = cya - 75;
    const V10 = volumeValue / (volumeValue /1.50);
    const eau = idealCYA * V10;
    return eau;
  };

  calculateSaltToAdd = (currentSalt: string, requiredSalt: string, volume: number) => {
    const parsevolume = volume !== null ? volume : 0;
    const parsecurrentSalt = parseFloat(currentSalt);
    const parserequiredSalt = parseFloat(requiredSalt);
    const totalSaltPresent = parsevolume * parsecurrentSalt;
    const totalSaltRequired = parsevolume * parserequiredSalt;
    const saltToAddValue = totalSaltRequired - totalSaltPresent;
    return saltToAddValue;
  };

  calculateWaterToRemove = (currentSalt: string, requiredSalt: string, volume: number) => {
    const parsevolume = volume !== null ? volume : 0;
    const surface = parsevolume /1.5;
    const tse = parseFloat(requiredSalt);
    const tsp = parseFloat(currentSalt);
    const heightToRemove = Math.ceil((((1 - tse / tsp) * (parsevolume) / surface))*100);
    return heightToRemove;
  };

  calculateLowBrome = (volumeValue: number, clBr : number) => {
    const V1 = volumeValue * 20;
    const BrOk = 3 - clBr;
    const brome = (BrOk / 3) * V1;
    return brome;
  };

  calculateHightBrome = (volumeValue: number, clBr : number) => {
    const V1 = volumeValue * 0.75;
    const BrOk = clBr - 3;
    const brome = BrOk*V1;
    return brome;
  };

  calculateLowPH = (volumeValue: number,  roundedPH: number) => {
    const V10 = volumeValue * 10;
    const PhOk = 7.2 - roundedPH;
    const ph = (PhOk / 0.3) * V10;
    return ph;
  };
  
  calculateHightPH = (volumeValue: number, roundedPH : number) => {
    const V10 = volumeValue * 10;
    const PhOk = roundedPH - 7.2;
    const ph = (PhOk / 0.3) * V10;
    return ph;
  };

  calculateLowTACClBr = (volumeValue: number,  currenttac: number) => {
    const V25 = volumeValue * 25;
    const TacOk = currenttac - 140;
    const  tac = (TacOk / 10) * V25;
    return tac;
  };

  calculateHightTACClBr = (volumeValue: number,  currenttac: number) => {
    const V17 = volumeValue * 17;
    const TacOk = 140 - currenttac;
    const  tac = (TacOk / 10) * V17;
    return tac;
  };

  calculateLowTACSel = (volumeValue: number,  currenttac: number) => {
    const V25 = volumeValue * 25;
    const TacOk = currenttac - 100;
    const  tac = (TacOk / 10) * V25;
    return tac;
  };

  calculateHightTACSel = (volumeValue: number,  currenttac: number) => {
    const V17 = volumeValue * 17;
    const TacOk = 100 - currenttac;
    const  tac = (TacOk / 10) * V17;
    return tac;
  };

  calculateLowTH = (volumeValue: number) => {
    const V15 = volumeValue * 0.025;
    const th = parseFloat(V15.toFixed(1));
    return th;
  };

  calculateHightTHLiner = (volumeValue: number,  currentTh: number) => {
    const V15 = volumeValue * 15;
    const ThOk = 175 - currentTh;
    const  th = (ThOk / 10) * V15;
    return th;
  };

  calculateHightTHCarrelage = (volumeValue: number,  currentTh: number) => {
    const V15 = volumeValue * 15;
    const ThOk = 300 - currentTh;
    const  th = (ThOk / 10) * V15;
    return th;
  };

  // Fonction pour obtenir un message de recommandation en fonction des niveaux de chlore et CYA
    getChlorineRecommendationText = (currentCl: number, cya: number, volumeValue: number, selact : string,selreq: string,currentSaltLevel :any, requiredSaltLevel: any, clBr :any): any => {

    const phrase = "Nous vous recommandons de tester régulièrement votre eau et de réajuster si besoin les paramètres de l’équilibre de l’eau.";
    const isSelSelected = true;
    const isChloreSelected = true; 
    const isBromeSelected = true;

    //const isSelSelected = selectedDisinfectants.includes('Sel');
    //const isChloreSelected = selectedDisinfectants.includes('Chlore stabilisé') || selectedDisinfectants.includes('Chlore non stabilisé');
    //const isBromeSelected = selectedDisinfectants.includes('Brome');

    if (isChloreSelected){
      if (currentCl >= 1 && currentCl <= 3) {
        return `Continuez le traitement en maintenant le taux de chlore entre [1-3] ppm.\n${phrase}`;
      } else if (currentCl < 1 &&  cya < 25) {
        const chlorineToAdd = this.calculateLowChlorineStabilized(volumeValue, currentCl);
        return `Le taux de chlore est bas.
Un manque de désinfectant favorise le développement des algues et micro-organismes.
Nous vous conseillons de rajouter du chlore stabilisé
Rajoutez ${chlorineToAdd.toFixed(2)} g de chlore granulé stabilisé.
Maintenez les niveaux de chlore entre [1-3] ppm`;
      } else if (currentCl < 1  && cya >= 25 && cya <= 75) {
        const chlorineToAdd = this.calculateLowChlorineCalciumHighCYA(volumeValue, currentCl);
        return `Le taux de chlore est faible [ 0-1] ppm.\nAjoutez un chlore non stabilisé (hypochlorite de calcium) afin de ne pas faire monter le taux de CYA.\nRajoutez ${chlorineToAdd.toFixed(2)} g de chlore non stabilisé granulés. Maintenez les niveaux de chlore entre [1-3] ppm.\n${phrase}`;
      } else if (cya > 75) {
        return `Avant de corriger votre taux de chlore.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
      } else if (currentCl > 3  && cya >= 25 && cya <= 50) {
        const chlorineToAdd = this.calculateHighChlorineReducer(volumeValue, currentCl);
        return `Le taux de chlore est trop élevé.
Une concentration trop élevée risque d’endommager les équipements et générer de l’inconfort aux
baigneurs (yeux et peau irrités)
Au-dessus de 5 ppm, ne pas se baigner.
Ajoutez ${chlorineToAdd.toFixed(2)} g de réducteur de chlore
Maintenez les niveaux de chlore entre [1-3] ppm.\n${phrase}`;
      } else if (currentCl > 3  && cya >= 0 && cya <= 24) {
        const chlorineToAdd = this.calculateHighChlorineReducer(volumeValue, currentCl);
        return `Le taux de chlore est trop élevé.
Une concentration trop élevée risque d’endommager les équipements et générer de l’inconfort aux
baigneurs (yeux et peau irrités)
Au-dessus de 5 ppm, ne pas se baigner.
Ajoutez ${chlorineToAdd.toFixed(2)} g de réducteur de chlore
Maintenez les niveaux de chlore entre |1-3] ppm.\n${phrase}`;
      } else if (currentCl > 3  && cya > 50 && cya <= 75) {
        const chlorineToAdd = this.calculateHighChlorineReducer(volumeValue, currentCl);
        return `Le taux de chlore est trop élevé.
Une concentration trop élevée risque d’endommager les équipements et générer de l’inconfort aux
baigneurs (yeux et peau irrités)
Au-dessus de 5 ppm, ne pas se baigner.
Ajoutez ${chlorineToAdd.toFixed(2)} g de réducteur de chlore
Maintenez les niveaux de chlore entre |1-3] ppm.\n${phrase}`;
      } else if (currentCl >= 1 && currentCl <= 3 && cya >= 76 && cya <= 100) {
        const chlorineToAdd = this.calculateLowChlorineCalciumMidCYA(volumeValue, currentCl);
        return `Le niveau de chlore est faible. Ajoutez ${chlorineToAdd.toFixed(2)} g de calcium hypochlorite.`;
      } else if (currentCl >= 1 && currentCl <= 3 && cya > 100) {
        const chlorineReducer = this.calculateHighChlorineReducer(volumeValue, currentCl);
        return `Le niveau de chlore est élevé. Ajoutez ${chlorineReducer.toFixed(2)} g de réducteur de chlore.`;
      } else {
        return 'Vérifiez les paramètres de l\'eau.';
      }
    }
    if(isSelSelected){
      if(parseFloat(selact) < parseFloat(selreq)){
        if (cya <= 75) {
          const sel = this.calculateSaltToAdd(currentSaltLevel, requiredSaltLevel, volumeValue);
          const bag = Math.ceil(this.calculateSaltToAdd(currentSaltLevel, requiredSaltLevel,volumeValue) / 25);
          return `Le taux de sel est faible.
Il est en dessous du taux recommandé par l'électrolyseur (voir notice)
Arrêtez l'électrolyseur.
Ajoutez uniformément dans l'eau la quantité de sel requis :
${sel} Kg ou ${bag} sacs de sel
Attendez que le sel soit complètement dissous avant de remettre en marche votre appareil (24 - 48 h)
Contrôlez sous 24 - 48 H le taux de chlore.
Maintenez la production de chlore de l'électrolyseur entre 1 et 3 ppm.`;
        } else if (cya > 75) {
          return `Avant de corriger votre taux de sel
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
        } else {
          return 'Vérifiez les paramètres de l\'eau.';
        }
      } else if(parseFloat(selact) == parseFloat(selreq)){
        if (cya > 75) {
          return `Avant de corriger votre taux de sel
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
        } else {
          return `Le taux de sel est suffisant.
Il est dans les plages recommandées par l’électrolyseur (voir notice).`;
        } 
      } else if(parseFloat(selact) > parseFloat(selreq)){
      const eau = this.calculateWaterToRemove(currentSaltLevel, requiredSaltLevel, volumeValue);
      if(parseFloat(selact) >= 10){
        return `Le taux de sel est trop élevé.
Il est au-dessus des plages recommandées par l’électrolyseur (voir notice)
Nous vous recommandons de vider l’eau de la piscine et de la remplir avec de l’eau.
neuve sans ajouter de sel.
Arrêtez l’électrolyseur.
Vidangez la piscine si la structure le permet (rapprochez-vous de votre installateur).
Testez à nouveau votre nouvelle eau et équilibrez tous les paramètres.`;
      }
      return`Le taux de sel est élevé.
Il est au-dessus des plages recommandées par l’électrolyseur (voir notice)
Nous vous recommandons de vider partiellement l’eau de la piscine et de la remplir avec de l’eau
neuve sans ajouter de sel.
Arrêtez l’électrolyseur.
Vidangez partiellement la piscine si la structure le permet (rapprochez-vous de votre installateur)
Retirer ${eau} cm d’eau de votre piscine.
Testez à nouveau votre nouvelle eau et équilibrez tous les paramètres.`;
      }
    } 
    
    
    if(isBromeSelected){
      if (clBr < 2) {
        const brome1 = Math.round(this.calculateLowBrome(volumeValue, clBr));
        return `Le taux de brome est insuffisant.
La teneur en brome est en dessous des plages recommandées pour une désinfection optimale.
Ajoutez ${brome1} g de brome choc.
Maintenez le taux de brome entre [2-4] ppm.`; 
      } else if (clBr >= 2 && clBr <= 4) {
        return `Le taux de brome est correct.
Continuez le traitement en maintenant le taux de brome entre [2-4] ppm.`; 
      } else if (clBr > 4) {
        const brome2 = Math.round(this.calculateHightBrome(volumeValue, clBr));
        return `Le taux de brome est élevé.
La teneur en brome de votre eau est trop importante.
Réduisez le niveau de dosage du brominateur.
Ajoutez ${brome2} g de réducteur de brome.
Attendez que le niveau de brome soit tombé à son niveau recommandé avant d'utiliser à nouveau la piscine.
Maintenez le taux de brome entre [2-4] ppm.`; 
      }
    }
  };

 getChloreRecommendationText = (currentCl: number, cya: number, volumeValue: number, selact : string, selreq: string) => {
    const phrase = "Nous vous recommandons de tester régulièrement votre eau et de réajuster si besoin les paramètres de l’équilibre de l’eau.";
    if (parseFloat(selact) > parseFloat(selreq) && currentCl >= 1 && currentCl <= 3) {
      return `En cas de vidange partielle ou totale.
Même si votre taux de chlore est suffisant entre 1 et 3 ppm.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
    } else if (parseFloat(selact) > parseFloat(selreq) && currentCl < 1 || currentCl > 3) {
      return `En cas de vidange partielle ou totale.
Avant de corriger votre taux de chlore entre 1 et 3 ppm.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
    } else if (currentCl >= 1 && currentCl <= 3 && cya > 75) {
        return `Avant de corriger votre taux de chlore
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
      } else if (currentCl < 1 && cya < 25) {
        const chlorineToAdd = this.calculateLowChlorineStabilized(volumeValue, currentCl);
        return `Le taux de chlore est bas.
Un manque de désinfectant favorise le développement des algues et micro-organismes.
Nous vous conseillons de rajouter du chlore stabilisé
Rajoutez ${chlorineToAdd.toFixed(2)} g de chlore granulé stabilisé.
Maintenez les niveaux de chlore entre [1-3] ppm`;
      } else if (currentCl < 1  && cya >= 25 && cya <= 75) {
        const chlorineToAdd = this.calculateLowChlorineCalciumHighCYA(volumeValue, currentCl);
        return `Le taux de chlore est faible [ 0-1] ppm.\nAjoutez un chlore non stabilisé (hypochlorite de calcium) afin de ne pas faire monter le taux de CYA.\nRajoutez ${chlorineToAdd.toFixed(2)} g de chlore non stabilisé granulés. Maintenez les niveaux de chlore entre [1-3] ppm.\n${phrase}`;
      } else if (cya > 75) {
        return `Avant de corriger votre taux de chlore.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
      } else if (currentCl > 3) {
        return `Le taux de chlore est trop élevé.
Une concentration trop élevée risque d’endommager les équipements et générer de l’inconfort aux baigneurs (yeux et peau irrités).
Au-dessus de 5 ppm, ne pas se baigner.
Baissez la production de chlore de l’électrolyseur.
Maintenez les niveaux de chlore entre [1-3] ppm.`;
      }  else if (currentCl >= 1 && currentCl <= 3) {
        const chlorineToAdd = this.calculateLowChlorineCalciumMidCYA(volumeValue, currentCl);
        return `Continuez le traitement en maintenant le taux de chlore entre [1-3] ppm.`;
      } else {
        return 'Vérifiez les paramètres de l\'eau.';
      }

      return
  };

  // Messages de recommandation pour le CYA
  getCYARecommendationText = (currentCYA: number, volumeValue: number, currentCl: number, selact : string, selreq: string, cya :any) => {
    const phrase = "Nous vous recommandons de tester régulièrement votre eau et de réajuster si besoin les paramètres de l’équilibre de l’eau.";
    if (parseFloat(selact) > parseFloat(selreq) && cya <25 || cya > 75) {
      return `En cas de vidange partielle ou totale.
Avant de corriger votre taux de CYA entre 25 et 75 ppm.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
    } else if (parseFloat(selact) > parseFloat(selreq) && cya >= 25 && cya <= 75) {
      return `En cas de vidange partielle ou totale.
Même si votre taux de CYA est correct entre 25 et 75 ppm.
Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.`;
    } else if (currentCYA < 25 && currentCl < 1) {
        return `Le taux de CYA est bas en dessous de 25 ppm.
Un manque de désinfectant favorise le développement des algues et micro-organismes.
Nous vous conseillons de rajouter du chlore stabilisé (voir recommandations dosage de chlore).
Maintenez le taux de CYA entre [25-50] ppm`;
      }  else if (currentCYA < 25 && currentCl >= 1) {
        const cyaToAdd = this.calculateLowCYA(volumeValue, currentCYA);
        return `Le taux de CYA est bas en dessous de 25 ppm.
La teneur en stabilisant de votre eau est trop faible pour protéger le chlore contre l'action destructrice des U.V.
Réajustez votre teneur en stabilisant entre 25 et 50 mg/l.\nRépartissez ${cyaToAdd.toFixed(2)} g de produit stabilisant sur toute la surface du bassin.\n${phrase}`;
      } else if (currentCYA >= 51 && currentCYA <= 75) {
        return `La teneur en stabilisant de votre eau est acceptable entre 50 et 75 ppm. \n${phrase}`;
      } else if (currentCYA > 75 && currentCYA <= 100) {
        const waterToRemove = this.calculateHighCYA(volumeValue, currentCYA);
        return `Réajustez le niveau d’eau, puis procédez à une nouvelle analyse de tous les paramètres afin de rééquilibrer correctement l’ensemble.\nRapprochez-vous de votre installateur avant toute vidange. Retirez ${waterToRemove.toFixed(2)} cm d'eau de votre piscine.\nRéajuster le niveau d'eau puis testez de nouveau votre eau et équillibrez tous les paramètres.`;
      } else if (currentCYA > 100) {
        return `Le taux de CYA est trop élevé au-dessus de 100 ppm.
La teneur en stabilisant de votre eau est hors de la limite acceptable.
Une vidange partielle voire totale est fortement recommandée.
Rapprochez-vous de votre installateur avant tout vidange.
Réajuster le niveau d'eau puis testez de nouveau votre eau et équillibrez tous les paramètres.`;
      } else {
        return 'Le taux de CYA est correct.\nLa teneur en stabilisant de votre eau est dans la plage entre 25 et 50 ppm.';
      }
  }

getTACRecommendationText = (currentTAC: any, volumeValue: any, tac:any, selectedTypeDesinfection:any,  selectedTypeRevetement :any) => {

  const isChloreSelected = this.checkString(selectedTypeDesinfection,'Chlore stabilisé') || this.checkString(selectedTypeDesinfection,'Chlore non stabilisé'); 
  const isBromeSelected= this.checkString(selectedTypeDesinfection,'Brome'); 
  const isLinerSelected = selectedTypeRevetement  === 'Coque' || selectedTypeRevetement === 'Liner' || selectedTypeRevetement  === 'PVC armé';
    if (isChloreSelected || isBromeSelected) {
      if(currentTAC >=100 && currentTAC <=180){
        return `Le TAC est correct
L'alcalinité de votre eau (TAC) est correcte.
Surveillez ce paramètre environ 1 fois par mois.
Un TAC trop élevé peut expliquer un pH difficile à stabiliser.
Maintenez l’équilibre du TAC entre [100-180] ppm.`;
      } else if(currentTAC > 180){
        const TACClBr1 = Math.round(this.calculateLowTACClBr(volumeValue, tac));
        return `Le TAC est haut au-dessus de 180 ppm
L'alcalinité de votre eau est trop élevée, le pH risque d'être élevé.
Si votre bassin est équipé d'un régulateur automatique de pH, pensez à le couper avant
d'ajuster l'alcalinité.
Baissez l’alcalinité avec du pH moins.
Ajoutez ${TACClBr1} grammes de PH moins.
Répartir la dose recommandée en 3 fois.
Attendez au minimum 8 heures entre chaque apport, filtration en route.
Testez à nouveau votre eau après 48 heures et équilibrez tous les paramètres.
Maintenez l’équilibre du TAC entre [100-180] ppm`;
      } else if(currentTAC < 100){
        const TACClBr2 = Math.round(this.calculateHightTACClBr(volumeValue, tac));
        return`Le TAC est bas en dessous de 100 ppm.
L’alcalinité de votre eau est insuffisante, le pH risque d’être instable.
Si votre bassin est équipé d'un régulateur automatique de pH, pensez à le couper avant d'ajuster l'alcalinité.
Augmentez l’alcalinité avec du TAC plus.
Ajoutez ${TACClBr2} grammes de TAC plus.
Répartir la dose recommandée en 3 fois.
Attendez au minimum 8 heures entre chaque apport, filtration en route.
Testez à nouveau votre eau après 48 heures et équilibrez tous les paramètres.
Maintenez l’équilibre du TAC entre [100-180] ppm`;
      }
    } else {
      if(currentTAC >=80 && currentTAC <=120 ){
        return `Le TAC est correct
L'alcalinité de votre eau (TAC) est correcte.
Surveillez ce paramètre environ 1 fois par mois.
Un TAC trop élevé peut expliquer un pH difficile à stabiliser.
Maintenez l’équilibre du TAC entre [80-120] ppm.`;
      } else if(currentTAC > 120){
        const TACSel1 = Math.round(this.calculateLowTACSel(volumeValue, tac));
        return `2 Le TAC est haut au-dessus de 120 ppm
L'alcalinité de votre eau est trop élevée, le pH risque d'être élevé.
Si votre bassin est équipé d'un régulateur automatique de pH, pensez à le couper avant
d'ajuster l'alcalinité.
Baissez l’alcalinité avec du pH moins.
Ajoutez ${TACSel1} grammes de PH moins.
Répartir la dose recommandée en 3 fois.
Attendez au minimum 8 heures entre chaque apport, filtration en route.
Testez à nouveau votre eau après 48 heures et équilibrez tous les paramètres.
Maintenez l’équilibre du TAC entre [80-120] ppm`;
      } else if(currentTAC < 80){
        const TACSel2 = Math.round(this.calculateHightTACSel(volumeValue, tac));
        return`Le TAC est bas en dessous de 80 ppm.
L’alcalinité de votre eau est insuffisante, le pH risque d’être instable.
Si votre bassin est équipé d'un régulateur automatique de pH, pensez à le couper avant
d'ajuster l'alcalinité.
Augmentez l’alcalinité avec du TAC plus.
Ajoutez ${TACSel2} grammes de TAC plus.
Répartir la dose recommandée en 3 fois.
Attendez au minimum 8 heures entre chaque apport, filtration en route.
Testez à nouveau votre eau après 48 heures et équilibrez tous les paramètres.
Maintenez l’équilibre du TAC entre [80-120] ppm`;
      }
    }

    return
}




getPHRecommendationText = (currentPh: any, volumeValue: any, currentTAC: any, roundedPH:any, selectedTypeDesinfection:any,  selectedTypeRevetement :any ) => {


   const isChloreSelected = this.checkString(selectedTypeDesinfection,'Chlore stabilisé') || this.checkString(selectedTypeDesinfection,'Chlore non stabilisé'); 
   const isBromeSelected= this.checkString(selectedTypeDesinfection,'Brome'); 

   const isLinerSelected = selectedTypeRevetement === 'Coque' || selectedTypeRevetement === 'Liner' || selectedTypeRevetement === 'PVC armé';
   const isCarrelageSelected = selectedTypeRevetement === 'Enduit' || selectedTypeRevetement === 'Carrelage' || selectedTypeRevetement === 'Peinture';



    
    if (isChloreSelected || isBromeSelected) {
      if(currentTAC >=100 && currentTAC <=180){
        if(currentPh >= 7 && currentPh <= 7.4){
          return`Le pH est correct [7- 7.4]
Le pH de votre eau est correctement ajusté.
Continuez à le surveiller très régulièrement. Ce paramètre évolue très rapidement et son équilibre est indispensable à votre confort de baignade et à l'efficacité de votre désinfectant.
Maintenez le taux de ph entre 7 et 7,4`;
        } else if(currentPh > 7.4){
          const ph1 =this.calculateHightPH(volumeValue, roundedPH);
          return ` le pH est au-dessus de 7.4.
Le pH de votre eau est trop élevé, ce qui diminue l'efficacité du désinfectant.
Ajustez le ph avec du pH moins granulés (en poudre)
Ajoutez ${ph1} L de ph moins
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau.
Divisez le traitement en deux fois, laissez agir au minimum 2h entre chaque intervention.
Maintenez le taux de ph entre 7 et 7,4`;
        } else if(currentPh < 7){
          const ph2 =this.calculateLowPH(volumeValue, roundedPH);
          return` Le pH est bas, en dessous de 7.
Le pH de votre eau est trop bas.
L'eau est agressive pour la peau, les yeux et les équipements.
Ajustez le pH plus liquide ou granulés.
Ajoutez ${ph2} L de pH plus.
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau
Maintenez le taux de pH entre 7 et 7,4`;
        }
      } else if(currentTAC < 100 || currentTAC > 180){
        if(currentPh >= 7 && currentPh <= 7.4){
          return`Le pH est correct [7- 7.4]
Le pH de votre eau est correctement ajusté.
Continuez à le surveiller très régulièrement. Ce paramètre évolue très rapidement et son équilibre est indispensable à votre confort de baignade et à l'efficacité de votre désinfectant.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh > 7.4){
          const ph1 =this.calculateHightPH(volumeValue, roundedPH);
          return ` le pH est haut au-dessus de 7.4
Le pH de votre eau est trop élevé, ce qui diminue l'efficacité du désinfectant.
Corrigez d’abord votre niveau de TAC puis refaire une analyse complète avant de corriger le pH
Ajustez le pH avec du pH moins granulés (en poudre)
Ajoutez ${ph1} L de pH moins
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau.
Divisez le traitement en deux fois, laissez agir au minimum 2h entre chaque intervention.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh < 7){
          const ph2 =this.calculateLowPH(volumeValue, roundedPH);
          return`Le pH est bas, en dessous de 7.
Le pH de votre eau est trop bas.
L'eau est agressive pour la peau, les yeux et les équipements.
Corrigez d’abord votre niveau de TAC puis refaire une analyse complète avant de corriger le pH
Ajustez le pH plus liquide ou granulés
Ajoutez ${ph2} L de pH plus
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau
Maintenez le taux de pH entre 7 et 7,4.`;
        }
      }
    } else if(!isChloreSelected || !isBromeSelected) { 
      if(currentTAC >=80 && currentTAC <=120){
        if(currentPh >= 7 && currentPh <= 7.4){
          return`Le pH est correct [7- 7.4]
Le pH de votre eau est correctement ajusté.
Continuez à le surveiller très régulièrement. Ce paramètre évolue très rapidement et son équilibre est indispensable à votre confort de baignade et à l'efficacité de votre désinfectant.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh > 7.4){
          const ph1 =this.calculateHightPH(volumeValue, roundedPH);
          return ` le pH est au-dessus de 7.4.
Le pH de votre eau est trop élevé, ce qui diminue l'efficacité du désinfectant.
Ajustez le pH avec du pH moins granulés (en poudre)
Ajoutez ${ph1} L de pH moins
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau.
Divisez le traitement en deux fois, laissez agir au minimum 2h entre chaque intervention.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh < 7){
          const ph2 =this.calculateLowPH(volumeValue, roundedPH);
          return` Le pH est bas, en dessous de 7.
Le pH de votre eau est trop bas.
L'eau est agressive pour la peau, les yeux et les équipements.
Ajustez le pH plus liquide ou granulés.
Ajoutez ${ph2} L de pH plus.
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau
Maintenez le taux de pH entre 7 et 7,4`;
        }
      } else if(currentTAC < 80 || currentTAC > 120){
        if(currentPh >= 7 && currentPh <= 7.4){
          return`Le pH est correct [7- 7.4]
Le pH de votre eau est correctement ajusté.
Continuez à le surveiller très régulièrement. Ce paramètre évolue très rapidement et son équilibre est indispensable à votre confort de baignade et à l'efficacité de votre désinfectant.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh > 7.4){
          const ph1 =this.calculateHightPH(volumeValue, roundedPH);
          return ` le pH est haut au-dessus de 7.4
Le pH de votre eau est trop élevé, ce qui diminue l'efficacité du désinfectant.
Corrigez d’abord votre niveau de TAC puis refaire une analyse complète avant de corriger le pH
Ajustez le pH avec du pH moins granulés (en poudre)
Ajoutez ${ph1} L de pH moins
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau.
Divisez le traitement en deux fois, laissez agir au minimum 2h entre chaque intervention.
Maintenez le taux de pH entre 7 et 7,4`;
        } else if(currentPh < 7){
          const ph2 =this.calculateLowPH(volumeValue, roundedPH);
          return`Le pH est bas, en dessous de 7.
Le pH de votre eau est trop bas.
L'eau est agressive pour la peau, les yeux et les équipements.
Corrigez d’abord votre niveau de TAC puis refaire une analyse complète avant de corriger le pH
Ajustez le pH plus liquide ou granulés
Ajoutez ${ph2} L de pH plus
Répartir le produit sur la surface de l’eau en ayant préalablement dilué le produit dans un sceau avec de l’eau
Maintenez le taux de pH entre 7 et 7,4.`;
        }
      }
    }
    return
  }

  

getTHRecommendationText = (th: number,currentTH: number, volumeValue: number,  selectedTypeDesinfection:any,  selectedTypeRevetement :any ) => {

  const isChloreSelected = this.checkString(selectedTypeDesinfection,'Chlore stabilisé') || this.checkString(selectedTypeDesinfection,'Chlore non stabilisé'); 
  const isBromeSelected= this.checkString(selectedTypeDesinfection,'Brome'); 




   const isLinerSelected =  selectedTypeRevetement === 'Coque' ||  selectedTypeRevetement === 'Liner' ||  selectedTypeRevetement === 'PVC armé';
   const isCarrelageSelected =  selectedTypeRevetement === 'Enduit' ||  selectedTypeRevetement === 'Carrelage' ||  selectedTypeRevetement === 'Peinture';

  
    if(isLinerSelected){
      if(currentTH >= 100 && currentTH <=250){
        return`Le TH est correct [100-250] ppm.
La dureté (TH) de votre eau est correcte.
Pensez à la vérifier à chaque apport de nouvelle eau.
Maintenez l’équilibre du TH entre [100-250] ppm.`;
      } else if(currentTH <100){
        const THLiner1 = this.calculateHightTHLiner(volumeValue, th);
        return`Le TH est bas en dessous de 100 ppm.
Votre eau est très douce, il existe des risques d’endommagement des équipements.
Ajustez le taux avec du TH plus.
Ajoutez ${THLiner1} grammes de TH plus.
Maintenez l’équilibre du TH entre [100-250] ppm.`;
      } else if(currentTH >250){
        const THLiner2 = this.calculateLowTH(volumeValue);
        return`Le TH est haut au-dessus de 250 ppm.
Votre eau est dure.
Des dépôts calcaires peuvent apparaître sur les parois, dans les canalisations et dans le filtre.
Ajustez le TH avec un produit anti calcaire.
Ajoutez ${THLiner2} L de produit anti calcaire.
Maintenez l’équilibre du TH entre [100-250] ppm.`;
      }
    } else if (isCarrelageSelected){
      if(currentTH >= 200 && currentTH <=400){
        return`Le TH est correct [200-400] ppm.
La dureté (TH) de votre eau est correcte.
Pensez à la vérifier à chaque apport de nouvelle eau.
Maintenez l’équilibre du TH entre [200-400] ppm.`;
      } else if(currentTH <200){
        const THCar1 = this.calculateHightTHCarrelage(volumeValue, th);
        return`Le TH est bas en dessous de 200 ppm.
Votre eau est très douce, il existe des risques d’endommagement des équipements.
Ajustez le taux avec du TH plus.
Ajoutez ${THCar1} grammes de TH plus.
Maintenez l’équilibre du TH entre [200-400] ppm.`;
      } else if(currentTH >400){
        const THCar2 = this.calculateLowTH(volumeValue);
        return`Le TH est haut au-dessus de 400 ppm.
Votre eau est dure.
Des dépôts calcaires peuvent apparaître sur les parois, dans les canalisations et dans le filtre.
Ajustez le TH avec un produit anti calcaire.
Ajoutez ${THCar2} L de produit anti calcaire.
Maintenez l’équilibre du TH entre [200-400] ppm.`;
      }
    }
    return
  }

   getCtRecommendationText = (currentCt: any, ClBr: any) => {
    const CC = currentCt - ClBr;
      if(CC >= 0 && CC <=0.6){
        return`Le chlore combiné est dans les bonnes valeurs. Le désinfectant est efficace.`;
      } else if(CC > 0.6){
        return`Le chlore combiné est supérieur au chlore libre dans la piscine. 
L’accumulation de chloramines peut causer des problèmes d’inconfort (odeur forte, irritation des yeux et de la peau) et réduire l'efficacité de la désinfection.
Des niveaux élevés nécessitent des actions correctives pour éviter les désagréments et assurer une eau de qualité.`;
      } 
      return
    }


  
    getObservationText = (observation: string) => {
      switch (observation) {
        case 'Algues vertes':
          return `Brossez les parois, le fond du bassin, les angles et nettoyez les paniers des skimmers
  Effectuez scrupuleusement un lavage rinçage de filtre.
  Ne pas attendre.  
  En cas de présence d’algues récalcitrantes, changez votre média filtrant pour éviter toute nouvelle contamination.`;
        case 'Algues moutarde':
          return `Les algues Moutarde sont très difficile à éradiquer.
  Ne pas utilisez un robot aspirateur au début.
  Brossez les parois, le fond du bassin et nettoyez les paniers des skimmers.
  Effectuez un lavage à contre-courant du filtre puis rincez ou nettoyez scrupuleusement la cartouche.
  Utilisez toujours le même balai puis le désinfecter avec de l’hypochlorite de calcium.
  Traitez la piscine toutes les 48 heures jusqu’à ce que l’algue moutarde soit complètement morte.
  Prenez soin de bien nettoyer et désinfecter maillots de bain, jouets, accessoires, terrasse, volet… 
  Si vous ne vous en sortez pas, c’est le bon moment de contacter un professionnel de l’entretien de piscine.`;
        case 'Eau trouble':
          return `La cause de la turbidité de l’eau varie selon l’origine. 
  Après un traitement choc l’eau peut se troubler. 
  Utilisez un floculant pour un filtre à sable ou du clarifiant pour une cartouche.
  Contrôlez également votre taux de chlore car une eau trouble peut être une cause avant-coureur d’arrivée d’algues.`;
        case 'Forte odeur de chlore':
          return `Cette forte odeur ne provient pas du chlore mais de chloramines qui se sont accumulées dans votre eau de piscine. 
  Cela signifie que vous avez un déséquilibre des paramètres de l’eau.`;
        case 'dépôt de sable':
          return ` Le dépôt de sable au fond du bassin provient 
  Soit d’une filtration défectueuse, à savoir les crépines dans le filtre sont endommagées, il est temps de les changer. Surtout si vous retrouvez du sable à la sortie des buses de refoulement. 
  Soit d’un début d’algues moutarde, cette poussière est très volatile, et impossible à aspirer.
  Dans les deux cas, ne tardez pas trop à intervenir. `;
        case 'Piscine limpide':
          return `Vous êtes au top au niveau de l’entretien et de la désinfection.
  Bravo ! Continuez comme ça.
  Bonnes baignades.`;
        default:
          return '';
      }
    };
  
  isValueInRange = (value: number, min: number, max: number): boolean => {
      return value >= min && value <= max;
    };
    

  

  getThImageSource = (th: any, selectedTypeRevetement: any) => {
      const isCarrelageSelected = selectedTypeRevetement === 'Enduit' || selectedTypeRevetement === 'Carrelage' || selectedTypeRevetement=== 'Peinture';
      const thMin = isCarrelageSelected ? 200 : 100;
      const thMax = isCarrelageSelected ? 400 : 250;
      return th && this.isValueInRange(th, thMin, thMax)
  };

 checkString(text: string, search: string): boolean {
      return text?.includes(search ?? '') ?? false;
}




getCtImageSource = (ct: number, clBr: number) => {
  const CC = ct - clBr;
  const thMin = 0;
  const thMax = 0.6;
  return this.isValueInRange(CC, thMin, thMax); 

};





getPhosphateRecommendationText = (phosphateValue: number, volumeValue: number) => {
  const V100 = volumeValue /100;
  if (phosphateValue <=100){
      return`Le taux de phosphate est acceptable en dessous de 100 ppb.
Les phosphates favorisent la croissance des algues dans les piscines.
Ajoutez chaque mois une dose préventive de produit anti-phosphate.
Maintenez le taux de phosphate en dessous de 100 ppb.
Contrôlez régulièrement l’équilibre de l’eau régulièrement.`;
  } else if(phosphateValue >100 && phosphateValue <=500){
      const produit500 = V100 *0.6;
      return`Le taux de phosphate est élevé entre 100 et 500 ppb.
Le taux de phosphate est élevé.
Invisibles à l’œil nu, leur présence est liée à un risque élevé d’algues.
Répartissez ${produit500} ml de produit anti-phosphate.
Maintenez le taux de phosphate en dessous de 100 ppb.`;
  } else if(phosphateValue >500 && phosphateValue <=1000){
      const produit1000 = V100 *1.2;
     return`Le taux de phosphate est trop élevé au-dessus de 500 ppb
Le taux de phosphate est très élevé.
Les phosphates favorisent la croissance des algues dans les piscines.
Répartissez ${produit1000} ml de produit anti-phosphate.
Maintenez le taux de phosphate en dessous de 100 ppb.`; 
  } else if(phosphateValue >1000 && phosphateValue <=2500){
      const produit2500 = V100 *2.4;
     return`Le taux de phosphate est trop élevé au-dessus de 500 ppb
Le taux de phosphate est très élevé.
Les phosphates favorisent la croissance des algues dans les piscines.
Répartissez ${produit2500} ml de produit anti-phosphate.
Maintenez le taux de phosphate en dessous de 100 ppb.`; 
  } else if(phosphateValue >2500){
      const produit5000 = V100 *4.8;
     return`Le taux de phosphate est trop élevé au-dessus de 500 ppb
Le taux de phosphate est très élevé.
Les phosphates favorisent la croissance des algues dans les piscines.
Répartissez ${produit5000} ml de produit anti-phosphate.
Maintenez le taux de phosphate en dessous de 100 ppb.`; 
  }
  return
};

getCuivreRecommendationText = (cuivre: number, volumeValue: number) => {
  const V100 = volumeValue /100;
  if (cuivre <=0.8){
      const CuivreLow = parseFloat((V100 *0.5).toFixed(2));
      return`Le taux de cuivre est inférieur à 0.8 ppm.
Le niveau de cuivre est dans les plages recommandées, en dessous de 0.8 ppm.
Protégez vos équipements en utilisant à titre préventif un séquestrant cuivre.
Ajoutez ${CuivreLow} cl de séquestrant cuivre en entretien préventif.`;
  } else if(cuivre > 0.8){
      const CuivreHight = V100;
      return`Le taux de cuivre est supérieur à 0.8 ppm.
Le niveau de cuivre est trop élevé pour lutter contre l’incrustation des métaux dissous. Utilisez un séquestrant cuivre pour éviter de tacher en autre le revêtement de la piscine.
Ajoutez ${CuivreHight} cl de séquestrant cuivre.`;
  } 
  return
};

cgetFerRecommendationText = (fer: number, volumeValue: number) => {
  const V100 = volumeValue /100;
  if (fer <=0.2){
      const FerLow = parseFloat((V100 *0.5).toFixed(2));
      return`Le taux de fer est inférieur à 0.2 ppm.
Le niveau de fer est dans les plages recommandées, en dessous de 0.2 ppm.
Protégez votre bassin en utilisant à titre préventif un séquestrant métallique.
Ajoutez ${FerLow} cl de séquestrant cuivre en entretien préventif.`;
  } else if(fer > 0.2){
      const FerHight = parseFloat((V100 *1.5).toFixed(2));
      return`Le taux de fer est supérieur à 0.2 ppm.
Le niveau de fer est trop élevé.
Utilisez un séquestrant métallique spécifique au fer, manganèse et cobalt.
Ajoutez ${FerHight} cl de séquestrant métallique.`;
  } 
  return
};






    /*






getChloreImageSource = () => {
  if (clBr < 1) {
    return require('../assets/feu-rouge.png'); // CYA très bas
  } else if (clBr >= 1 && clBr <= 3) {
    return require('../assets/feu-vert.png'); // CYA idéal
  } else if (clBr > 3) {
    return require('../assets/feu-rouge.png'); // CYA élevé
  }
};

    // Fonction pour obtenir la source de l'image en fonction de la valeur de TAC
  getTacImageSource = () => {
      const isSelSelected = selectedDisinfectants.includes('Sel piscine');
      const tacMin = isSelSelected ? 80 : 100;
      const tacMax = isSelSelected ? 120 : 150 ;
  
      return tac && isValueInRange(tac, tacMin, tacMax) 
        ? require('../assets/feu-vert.png') // Image verte si dans la plage
        : require('../assets/feu-rouge.png'); // Image rouge si hors plage
    };

  
    // Fonction pour obtenir la source de l'image en fonction de la valeur de TH
  getThImageSource = () => {
      const isCarrelageSelected = selectedButton === 'Enduit' || selectedButton === 'Carrelage' || selectedButton === 'Peinture';
      const thMin = isCarrelageSelected ? 200 : 100;
      const thMax = isCarrelageSelected ? 400 : 250;
  
      return th && isValueInRange(th, thMin, thMax)
        ? require('../assets/feu-vert.png') // Image verte si dans la plage
        : require('../assets/feu-rouge.png'); // Image rouge si hors plage
    };
  

  
  
    // Fonction pour obtenir la source de l'image en fonction de la valeur du CYA
  getCYAImageSource = () => {
    if (cya >= 0 && cya < 25) {
      return require('../assets/feu-rouge.png'); // CYA très bas
    } else if (cya >= 25 && cya <= 50) {
      return require('../assets/feu-vert.png'); // CYA idéal
    } else if (cya > 50 && cya <= 75) {
      return require('../assets/feu-orange.png'); // CYA ok
    } else if (cya > 75 && cya <= 100) {
      return require('../assets/feu-rouge.png'); // CYA élevé
    } else {
      return require('../assets/feu-rouge.png'); // CYA très élevé
    }
  };
  
  getDesinfectantsImageSource = () => {
    const isChloreSelected = selectedDisinfectants.includes('Chlore stabilisé') || selectedDisinfectants.includes('Chlore non stabilisé');
    const isSelSelected = selectedDisinfectants.includes('Sel');
    const isBromeSelected = selectedDisinfectants.includes('Brome');
  
    if(isChloreSelected){
      if (clBr < 1) {
        return require('../assets/feu-rouge.png'); // Chlore très bas
      } else if (clBr >= 1 && clBr <= 3) {
        return require('../assets/feu-vert.png'); // Chlore idéal
      } else if (clBr > 3) {
        return require('../assets/feu-rouge.png'); // Chlore élevé
      }
    } else if(isSelSelected){
      if (parseFloat(requiredSaltLevel) > parseFloat(currentSaltLevel)) {
        return require('../assets/feu-rouge.png'); // Sel très bas
      } else if (parseFloat(requiredSaltLevel) == parseFloat(currentSaltLevel)) {
        return require('../assets/feu-vert.png'); // Sel idéal
      } else if (parseFloat(requiredSaltLevel) < parseFloat(currentSaltLevel)) {
        return require('../assets/feu-rouge.png'); // Sel élevé
      } 
    } else if(isBromeSelected){
        if (clBr < 2) {
          return require('../assets/feu-rouge.png'); // Chlore très bas
        } else if (clBr >= 2 && clBr <= 4) {
          return require('../assets/feu-vert.png'); // Chlore idéal
        } else if (clBr > 4) {
          return require('../assets/feu-rouge.png'); // Chlore élevé
        }
    }
    
  };
  

  
  getInfoCyaText = (type: 'CYA' | 'clBr', cya : number, clBr:any) => {
    const isChloreSelected = selectedDisinfectants.includes('Chlore stabilisé') || selectedDisinfectants.includes('Chlore non stabilisé');
  
    if (type === 'CYA' && isChloreSelected && clBr < 1) {
      if (cya >= 0 && cya < 25 ) {
        return "Le CYA (Acide Cyanurique) est très bas (0-25 ppm). Cela signifie que l'eau est peu protégée contre la dégradation du chlore par les rayons UV, ce qui peut entraîner une désinfection insuffisante.";
      } else if (cya >= 25 && cya < 50) {
        return "Le CYA (Acide Cyanurique) est idéal (25-50 ppm). Cela signifie que l'eau est bien protégée contre les rayons UV tout en maintenant une bonne efficacité du chlore.";
      } else if (cya >= 50 && cya < 75) {
        return "Le CYA (Acide Cyanurique) est dans la zone OK (50-75 ppm). L'eau est encore protégée, mais l'efficacité du chlore commence à diminuer.";
      } else if (cya >= 75 && cya <= 100) {
        return "Le CYA (Acide Cyanurique) est élevé (75-100 ppm). À ce niveau, le chlore devient moins efficace et il peut être nécessaire de prendre des mesures correctives.";
      } else {
        return "Le CYA (Acide Cyanurique) est très élevé (plus de 100 ppm). Le chlore devient inefficace et l'eau peut devenir difficile à traiter. Il est recommandé de diluer l'eau de la piscine.";
      }
    }
    return '';
  };
  
*/
}


