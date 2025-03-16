import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileDetailPageRoutingModule } from './file-detail-routing.module';

import { FileDetailPage } from './file-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileDetailPageRoutingModule
  ],
  declarations: [FileDetailPage]
})
export class FileDetailPageModule {}
