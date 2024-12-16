import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    private mensajesService: MensajesService
  ) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getUsuariosOnce().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  async openUpdateModal(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Actualizar Usuario',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: usuario.nombre },
        { name: 'rut', type: 'text', placeholder: 'RUT', value: usuario.rut },
        { name: 'email', type: 'email', placeholder: 'Email', value: usuario.email },
        { name: 'tipo', type: 'text', placeholder: 'Tipo de Usuario', value: usuario.tipo }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.confirmUpdate(usuario, data);
          }
        }
      ]
    });
    await alert.present();
  }

  confirmUpdate(usuario: Usuario, data: Partial<Usuario>) {
    this.mensajesService.mensaje(
      '¿Desea confirmar los cambios?',
      'warning',
      'Confirmación',
      true
    ).then((result: any) => {
      if (result.isConfirmed) {
        if (usuario.uid) {
          this.updateUsuario(usuario.uid, data);
          this.mensajesService.mixin(2000, 'Usuario actualizado con éxito', 'success');
        } else {
          console.error('El usuario no tiene un UID válido');
        }
      }
    });
  }

  updateUsuario(uid: string, data: Partial<Usuario>) {
    this.usuariosService.updateUsuario(uid, data).then(() => {
      this.loadUsuarios(); 
    }).catch(error => {
      console.error('Error actualizando usuario en Firebase', error);
    });
  }
}
