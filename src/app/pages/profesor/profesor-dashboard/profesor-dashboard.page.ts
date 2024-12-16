import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-profesor-dashboard',
  templateUrl: './profesor-dashboard.page.html',
  styleUrls: ['./profesor-dashboard.page.scss'],
})
export class ProfesorDashboardPage implements OnInit{
  nombreCompletoUsuario: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private cdr: ChangeDetectorRef,  
    private firestore: AngularFirestore
  ) {}

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
            localStorage.removeItem('usuarioLogin');
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  
  openMenu() {
    this.menuCtrl.open('main-menu');
  }

  async ngOnInit() {
    const usuarioLogeado = firebase.auth().currentUser;
    if (usuarioLogeado) {
      const usuarioDoc = await this.firestore.collection('usuarios').doc(usuarioLogeado.uid).get().toPromise();
      const datosUsuario = usuarioDoc?.data() as any;
      console.log('Datos del usuario:', datosUsuario);
      
      if (datosUsuario && datosUsuario.nombre) {
        this.nombreCompletoUsuario = datosUsuario.nombre; 
        console.log('Nombre completo del usuario:', this.nombreCompletoUsuario);
        this.cdr.detectChanges();
      } else {
        console.log('No se encontró el nombre completo del usuario.');
      }
    } else {
      console.log('No se encontró ningún usuario logeado');
    }
  }
}
