import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterLocationPage } from './filter-location.page';

const routes: Routes = [
  {
    path: '',
    component: FilterLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterLocationPageRoutingModule {}
