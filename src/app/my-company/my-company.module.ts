import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCompanyPageRoutingModule } from './my-company-routing.module';

import { MyCompanyPage } from './my-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCompanyPageRoutingModule
  ],
  declarations: [MyCompanyPage]
})
export class MyCompanyPageModule {}
