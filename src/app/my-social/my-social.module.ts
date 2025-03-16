import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySocialPageRoutingModule } from './my-social-routing.module';

import { MySocialPage } from './my-social.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySocialPageRoutingModule
  ],
  declarations: [MySocialPage]
})
export class MySocialPageModule {}
