import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAnnoncePage } from './new-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: NewAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAnnoncePageRoutingModule {}
