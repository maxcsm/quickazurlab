import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsMyPage } from './locations-my.page';

const routes: Routes = [
  {
    path: '',
    component: LocationsMyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsMyPageRoutingModule {}
