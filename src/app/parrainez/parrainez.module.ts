import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParrainezPageRoutingModule } from './parrainez-routing.module';

import { ParrainezPage } from './parrainez.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParrainezPageRoutingModule
  ],
  declarations: [ParrainezPage]
})
export class ParrainezPageModule {}
