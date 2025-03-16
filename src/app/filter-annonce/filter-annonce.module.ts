import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterAnnoncePageRoutingModule } from './filter-annonce-routing.module';

import { FilterAnnoncePage } from './filter-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterAnnoncePageRoutingModule
  ],
  declarations: [FilterAnnoncePage]
})
export class FilterAnnoncePageModule {}
