import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-profesor-detalle',
  templateUrl: './profesor-detalle.page.html',
  styleUrls: ['./profesor-detalle.page.scss'],
})
export class ProfesorDetallePage implements OnInit {
  profesor: Usuario | undefined;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    const asignatura = this.route.snapshot.paramMap.get('asignatura');
    if (asignatura) {
      this.usuariosService.getProfesorByAsignatura(asignatura).subscribe((data) => {
        if (data && data.length > 0) {
          this.profesor = data[0];  
        } else {
          console.error('No se encontró ningún profesor para la asignatura: ', asignatura);
        }
      });
    }
  }
}
