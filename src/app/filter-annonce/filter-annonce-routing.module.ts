import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterAnnoncePage } from './filter-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: FilterAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterAnnoncePageRoutingModule {}
