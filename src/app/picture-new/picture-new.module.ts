import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PictureNewPageRoutingModule } from './picture-new-routing.module';

import { PictureNewPage } from './picture-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictureNewPageRoutingModule
  ],
  declarations: [PictureNewPage]
})
export class PictureNewPageModule {}
