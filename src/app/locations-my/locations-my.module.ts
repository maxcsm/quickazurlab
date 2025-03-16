import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsMyPageRoutingModule } from './locations-my-routing.module';

import { LocationsMyPage } from './locations-my.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsMyPageRoutingModule
  ],
  declarations: [LocationsMyPage]
})
export class LocationsMyPageModule {}
