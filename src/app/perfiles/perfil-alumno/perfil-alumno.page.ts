import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {
  usuario: any;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    const usuarioLogeado = firebase.auth().currentUser;
    if (usuarioLogeado && usuarioLogeado.uid) {
      this.usuariosService.getUsuarioByUID(usuarioLogeado.uid).subscribe((data) => {
        this.usuario = data;
      });
    } else {
      console.error("No se encontró el UID del usuario logueado.");
    }
  }
}
