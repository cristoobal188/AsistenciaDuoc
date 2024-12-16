import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore 
  ) { }

  login(email: string, pass: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pass);
  }

  register(email: string, pass: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState; 
  }

  recoveryPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Correo enviado!");
      })
      .catch((error) => {
        console.log("No se pudo enviar el correo");
        throw error;
      });
  }

  async updatePasswordInFirestore(uid: string, newPassword: string) {
    try {
      await this.angularFirestore.collection('usuarios').doc(uid).update({
        pass: newPassword
      });
      console.log('Contraseña actualizada en Firestore');
    } catch (error) {
      console.log('Error al actualizar la contraseña en Firestore', error);
    }
  }
}
