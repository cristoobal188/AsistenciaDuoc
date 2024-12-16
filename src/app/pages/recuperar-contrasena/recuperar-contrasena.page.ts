import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  email: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  async sendEmail() {
    if (!this.email) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      return;
    }

    try {
      let timerInterval: any;
      await this.authService.recoveryPassword(this.email);  

      Swal.fire({
        title: 'Procesando',
        html: 'Enviando correo de recuperación...',
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup()!.querySelector('b');
          timerInterval = setInterval(() => {
            if (timer) timer.textContent = Swal.getTimerLeft()?.toString() || '';
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then(() => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Correo enviado correctamente!',
          icon: 'success',
          confirmButtonText: 'OK',
          heightAuto: false
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo enviar el correo. Por favor, inténtelo de nuevo más tarde.',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false
      });
    }
  }
}
