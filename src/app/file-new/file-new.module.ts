import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileNewPageRoutingModule } from './file-new-routing.module';

import { FileNewPage } from './file-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileNewPageRoutingModule
  ],
  declarations: [FileNewPage]
})
export class FileNewPageModule {}
