import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReaderStopModalPageRoutingModule } from './reader-stop-modal-routing.module';

import { ReaderStopModalPage } from './reader-stop-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReaderStopModalPageRoutingModule
  ],
  declarations: [ReaderStopModalPage]
})
export class ReaderStopModalPageModule {}
