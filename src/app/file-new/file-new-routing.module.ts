import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileNewPage } from './file-new.page';

const routes: Routes = [
  {
    path: '',
    component: FileNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileNewPageRoutingModule {}
