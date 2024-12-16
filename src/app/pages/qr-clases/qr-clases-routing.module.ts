import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrClasesPage } from './qr-clases.page';

const routes: Routes = [
  {
    path: '',
    component: QrClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrClasesPageRoutingModule {}
