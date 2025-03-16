import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterLocationPageRoutingModule } from './filter-location-routing.module';

import { FilterLocationPage } from './filter-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterLocationPageRoutingModule
  ],
  declarations: [FilterLocationPage]
})
export class FilterLocationPageModule {}
