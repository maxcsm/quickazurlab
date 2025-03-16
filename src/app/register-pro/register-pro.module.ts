import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProPageRoutingModule } from './register-pro-routing.module';

import { RegisterProPage } from './register-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterProPageRoutingModule
  ],
  declarations: [RegisterProPage]
})
export class RegisterProPageModule {}
