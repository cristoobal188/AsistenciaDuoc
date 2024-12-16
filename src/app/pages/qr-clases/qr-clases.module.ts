import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrClasesPageRoutingModule } from './qr-clases-routing.module';

import { QrClasesPage } from './qr-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrClasesPageRoutingModule
  ],
  declarations: [QrClasesPage]
})
export class QrClasesPageModule {}
