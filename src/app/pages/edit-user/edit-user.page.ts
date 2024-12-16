import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  uid: string = '';
  editUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.editUserForm = this.formBuilder.group({ 
      nombre: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      asignatura: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid') as string;
    this.cargarData();
  }

  cargarData() {
    this.firestore.collection('usuarios').doc(this.uid).get().toPromise()
      .then((user) => {
        if (user && user.exists) {
          const userData = user.data() as Usuario;
          this.editUserForm.patchValue({
            nombre: userData.nombre,
            rut: userData.rut,
            email: userData.email,
            pass: userData.pass,
            tipo: userData.tipo,
            asignatura: userData.asignatura
          });
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: "Vuelve más Tarde!",
          heightAuto: false,
        });
      });
  }

  UpdateUser() {
    if (this.editUserForm.valid) {
      const updatedUser: Usuario = {
        uid: this.uid,
        nombre: this.editUserForm.value.nombre,
        rut: this.editUserForm.value.rut,
        email: this.editUserForm.value.email,
        pass: this.editUserForm.value.pass,
        tipo: this.editUserForm.value.tipo,
        asignatura: this.editUserForm.value.asignatura
      };

      this.firestore.collection('usuarios').doc(this.uid).update(updatedUser)
        .then(() => {
          Swal.fire({
            title: "Actualizado!",
            text: "El usuario ha sido actualizado correctamente.",
            icon: "success",
            heightAuto: false,
          });
          this.router.navigate(['/ver-usuarios']);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error en la actualización",
            text: "Hubo un problema al actualizar los datos.",
            heightAuto: false,
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Formulario Invalido",
        text: "Por favor verifica que todos los campos sean válidos.",
        heightAuto: false,
      });
    }
  }
}
