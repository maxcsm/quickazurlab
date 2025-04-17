import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaylorPage } from './taylor.page';

const routes: Routes = [
  {
    path: '',
    component: TaylorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaylorPageRoutingModule {}
