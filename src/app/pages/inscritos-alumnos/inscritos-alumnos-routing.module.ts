import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscritosAlumnosPage } from './inscritos-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: InscritosAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscritosAlumnosPageRoutingModule {}
