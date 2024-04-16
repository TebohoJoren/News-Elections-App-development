import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderStopModalPage } from './reader-stop-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReaderStopModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReaderStopModalPageRoutingModule {}
