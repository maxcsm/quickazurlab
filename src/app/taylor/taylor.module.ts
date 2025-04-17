import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaylorPageRoutingModule } from './taylor-routing.module';

import { TaylorPage } from './taylor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaylorPageRoutingModule
  ],
  declarations: [TaylorPage]
})
export class TaylorPageModule {}
