import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscritosAlumnosPageRoutingModule } from './inscritos-alumnos-routing.module';

import { InscritosAlumnosPage } from './inscritos-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscritosAlumnosPageRoutingModule
  ],
  declarations: [InscritosAlumnosPage]
})
export class InscritosAlumnosPageModule {}
