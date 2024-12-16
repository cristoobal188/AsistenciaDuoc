import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private mensajes: MensajesService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern('^[0-9]{8}-[0-9Kk]{1}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  ngOnInit() {}

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  async register() {
    if (this.registerForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const { nombre, rut, email, password } = this.registerForm.value;

    try {
      const loading = await this.loadingController.create({
        message: 'Registrando...',
        spinner: 'crescent'
      });
      await loading.present();

      const usuarioFirebase = await this.authService.register(email, password);
      const user = usuarioFirebase.user;

      if (user) {
        try {
          await this.firestore.collection('usuarios').doc(user.uid).set({
            uid: user.uid,
            nombre: nombre,
            rut: rut,
            email: user.email,
            pass: password,
            tipo: 'alumno'
          });
        } catch (error) {
          this.mensajes.mensaje('Error crear la cuentade usuario, intentelo nuevamente!','error','Error!')
        }
        await loading.dismiss();

        this.mensajes.mensaje('Cuenta creada correctamente!','success','Éxito!').then(()=>{
          this.router.navigate(['/login']);
        });
      }
    } catch (error) {
      await this.loadingController.dismiss();
      this.mensajes.mensaje('Error al crear la cuenta, intentelo nuevamente!','error','Error!')
    } finally {
      this.isSubmitting = false;
    }
  }
}
