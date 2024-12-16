import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorDetallePageRoutingModule } from './profesor-detalle-routing.module';

import { ProfesorDetallePage } from './profesor-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorDetallePageRoutingModule
  ],
  declarations: [ProfesorDetallePage]
})
export class ProfesorDetallePageModule {}
