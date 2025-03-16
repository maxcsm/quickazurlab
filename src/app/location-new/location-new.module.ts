import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationNewPageRoutingModule } from './location-new-routing.module';

import { LocationNewPage } from './location-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LocationNewPageRoutingModule
  ],
  declarations: [LocationNewPage]
})
export class LocationNewPageModule {}
