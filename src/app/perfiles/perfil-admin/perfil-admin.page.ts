import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.page.html',
  styleUrls: ['./perfil-admin.page.scss'],
})
export class PerfilAdminPage implements OnInit {
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
