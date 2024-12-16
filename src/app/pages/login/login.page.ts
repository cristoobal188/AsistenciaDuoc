import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsuariosService } from 'src/app/services/usuario.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailValue?: string;
  passValue?: string;
  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private loadingController: LoadingController, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private usuariosService: UsuariosService 
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@(duocuc\\.cl|profesor.duoc\\.cl|admin\\.cl)$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async cargarUsuariosAleatorios() {
    try {
      await this.usuariosService.cargarUsuariosAleatorios();
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Cuentas aleatorias creadas exitosamente.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error al crear cuentas aleatorias:', error); 
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al crear las cuentas aleatorias.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

  async login() {
    try {
      if (this.loginForm.invalid) {
        let errorMessage = 'Debe ingresar datos.';
  
        if (this.loginForm.get('email')?.hasError('required')) {
          errorMessage = 'El correo es obligatorio.';
        } else if (this.loginForm.get('email')?.hasError('pattern')) {
          errorMessage = 'Correo Inválido. Debe terminar con @duocuc.cl o @profesor.duoc.cl';
        } else if (this.loginForm.get('password')?.hasError('required')) {
          errorMessage = 'La contraseña es obligatoria.';
        } else if (this.loginForm.get('password')?.hasError('minlength')) {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        }
  
        const alert = await this.alertController.create({
          header: 'Error',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
  
        this.loginForm.reset(); 
        return;
      }
  
      const email = this.loginForm.get('email')?.value;
      const pass = this.loginForm.get('password')?.value;
  
      const usuarioLogeado = await this.authService.login(email as string, pass as string);
  
      if (usuarioLogeado.user) {
        const loading = await this.loadingController.create({
          message: 'Cargando......',
          duration: 2000
        });
  
        await loading.present();
  
        const usuarioDoc = await this.firestore.collection('usuarios').doc(usuarioLogeado.user.uid).get().toPromise();
        if (usuarioDoc?.exists) {
          const userData = usuarioDoc.data() as Usuario;
  
          if (userData && userData.tipo) {
            localStorage.setItem('usuarioLogin', JSON.stringify({
              email: userData.email,
              nombre: userData.nombre,
              tipo: userData.tipo
            }));
  
            setTimeout(async () => {
              await loading.dismiss();
  
              this.loginForm.reset();
  
              if (userData.tipo === 'admin') {
                this.router.navigate(['/admin-dashboard']);
              } else if (userData.tipo === 'profesor') {
                this.router.navigate(['/profesor-dashboard']);
              } else {
                this.router.navigate(['/alumno-dashboard']);
              }
            }, 2000);
          } else {
            await loading.dismiss();
            this.mostrarError('No se encontró el tipo de usuario.');
          }
        } else {
          await loading.dismiss();
          this.mostrarError('Usuario no encontrado en la base de datos.');
        }
      } 
    } catch (error) {
      this.mostrarError('Usuario o contraseña incorrectas.');
    }
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
