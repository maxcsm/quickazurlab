import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPro2Page } from './register-pro2.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPro2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPro2PageRoutingModule {}
