import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelPage } from './sel.page';

const routes: Routes = [
  {
    path: '',
    component: SelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelPageRoutingModule {}
