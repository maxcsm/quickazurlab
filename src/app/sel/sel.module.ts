import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelPageRoutingModule } from './sel-routing.module';

import { SelPage } from './sel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelPageRoutingModule
  ],
  declarations: [SelPage]
})
export class SelPageModule {}
