import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorDetallePage } from './profesor-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorDetallePageRoutingModule {}
