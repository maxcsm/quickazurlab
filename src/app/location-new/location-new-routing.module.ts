import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationNewPage } from './location-new.page';

const routes: Routes = [
  {
    path: '',
    component: LocationNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationNewPageRoutingModule {}
