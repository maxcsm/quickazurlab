import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAnnoncePageRoutingModule } from './new-annonce-routing.module';

import { NewAnnoncePage } from './new-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAnnoncePageRoutingModule
  ],
  declarations: [NewAnnoncePage]
})
export class NewAnnoncePageModule {}
