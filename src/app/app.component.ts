import { Component, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: any[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/logout') {
          this.confirmLogout();
        }
      }
    });
  }

  ngOnInit() {
    this.initializeMenu();
  }

  initializeMenu() {
    firebase.auth().onAuthStateChanged(async (usuarioLogeado) => {
      if (usuarioLogeado) {
        console.log('Usuario logeado:', usuarioLogeado);
        const usuarioDoc = await this.firestore.collection('usuarios').doc(usuarioLogeado.uid).get().toPromise();
        const datosUsuario = usuarioDoc?.data() as any;

        if (datosUsuario) {
          this.tipoUsuario = datosUsuario.tipo;
          this.emailUsuario = usuarioLogeado.email ? usuarioLogeado.email : 'Sin correo';
          console.log('Tipo de usuario:', this.tipoUsuario);
          this.configSideMenu();
          console.log('App Pages:', this.appPages);
        }
      }
      this.cdr.detectChanges();
    });
  }

  configSideMenu() {
    if (this.tipoUsuario === 'alumno') {
      this.appPages = [
        { title: 'Mi Perfil', url: '/perfil-alumno', icon: 'person' },
        { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' },
      ];
    } else if (this.tipoUsuario === 'profesor') {
      this.appPages = [
        { title: 'Mi Perfil', url: '/perfil-profesor', icon: 'person' },
        { title: 'Mis clases', url: '/clases-profesor', icon: 'book' },
        { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' },
      ];
    }

    console.log('Contenido de appPages:', this.appPages);
    this.cdr.detectChanges();
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.router.navigate(['/login']);
            localStorage.removeItem('usuarioLogin');
          }
        }
      ]
    });

    await alert.present();
  }

  closeMenu() {
    document.querySelector('ion-menu')?.close();
  }
}
