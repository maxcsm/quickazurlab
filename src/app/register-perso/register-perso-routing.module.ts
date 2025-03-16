import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPersoPage } from './register-perso.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPersoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPersoPageRoutingModule {}
