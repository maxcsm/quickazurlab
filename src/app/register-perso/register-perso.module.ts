import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPersoPageRoutingModule } from './register-perso-routing.module';

import { RegisterPersoPage } from './register-perso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPersoPageRoutingModule
  ],
  declarations: [RegisterPersoPage]
})
export class RegisterPersoPageModule {}
