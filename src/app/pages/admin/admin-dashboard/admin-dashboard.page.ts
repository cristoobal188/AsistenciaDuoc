import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  usuario: any;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('Login');
    if (userString) {
      const user = JSON.parse(userString);
      this.usuario = this.usuariosService.getUsuarioByEmail(user.email);
    }
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            localStorage.removeItem('Login');
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
