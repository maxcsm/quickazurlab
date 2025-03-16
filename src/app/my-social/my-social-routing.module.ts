import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySocialPage } from './my-social.page';

const routes: Routes = [
  {
    path: '',
    component: MySocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySocialPageRoutingModule {}
