import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileDetailPage } from './file-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FileDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileDetailPageRoutingModule {}
