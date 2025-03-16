import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPro2PageRoutingModule } from './register-pro2-routing.module';

import { RegisterPro2Page } from './register-pro2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPro2PageRoutingModule
  ],
  declarations: [RegisterPro2Page]
})
export class RegisterPro2PageModule {}
