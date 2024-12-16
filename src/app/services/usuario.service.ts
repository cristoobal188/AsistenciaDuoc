import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  private generarRutAleatorio(): string {
    const num = Math.floor(10000000 + Math.random() * 90000000);
    const dv = this.calcularDigitoVerificador(num);
    return `${num}-${dv}`;
  }

  private calcularDigitoVerificador(rut: number): string {
    let suma = 0;
    let multiplicador = 2;
    for (let i = rut.toString().length - 1; i >= 0; i--) {
      suma += parseInt(rut.toString().charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const dv = 11 - (suma % 11);
    return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
  }

  async cargarUsuariosAleatorios(): Promise<void> {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      const usuarios = response.data.results;

      const usuariosProcesados = usuarios.map((usuario: { login: { username: string }; name: { first: string; last: string } }, index: number) => {
        const nombreUsuario = usuario.login.username;
        const correo = index < 5 ? `${nombreUsuario}@duocuc.cl` : `${nombreUsuario}@profesor.duoc.cl`;
        const tipo = index < 5 ? 'alumno' : 'profesor';

        return {
          nombre: `${usuario.name.first} ${usuario.name.last}`,
          email: correo,
          tipo: tipo,
          pass: 'asdasd123123',
          rut: this.generarRutAleatorio()
        };
      });

      for (const usuario of usuariosProcesados) {
        try {
          console.log(`Intentando crear usuario en Firebase Auth: ${usuario.email}`);
          const credenciales = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass);
          if (credenciales.user) {
            console.log(`Usuario creado en Firebase Auth con UID: ${credenciales.user.uid}`);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log(`Intentando agregar usuario a Firestore: ${usuario.email}`);
            await this.firestore.collection('usuarios').doc(credenciales.user.uid).set({
              uid: credenciales.user.uid,
              nombre: usuario.nombre,
              email: usuario.email,
              tipo: usuario.tipo,
              rut: usuario.rut,
              pass: usuario.pass
            });
            console.log(`Usuario agregado a Firestore: ${usuario.email}`);
          }
        } catch (error) {
          console.error(`Error al crear el usuario ${usuario.email} en Firebase Auth o Firestore:`, error);
        }
      }

      console.log('Cuentas aleatorias creadas exitosamente.');
      alert('Cuentas aleatorias creadas exitosamente.');
      
    } catch (error) {
      console.error("Error general al crear usuarios aleatorios:", error);
      alert('Hubo un error al crear las cuentas aleatorias.');
      throw error;
    }
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>('usuarios').valueChanges();
  }

  getUsuariosOnce(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>('usuarios').get().pipe(
      map((snapshot: any) => snapshot.docs.map((doc: any) => {
        const data = doc.data() as Usuario;
        const uid = doc.id;
        return { uid, ...data };
      }))
    );
  }

  getUsuarioByEmail(email: string): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('email', '==', email)).valueChanges();
  }

  addUsuario(usuario: Usuario): Promise<void> {
    const uid = usuario.uid; 
    return this.firestore.collection('usuarios').doc(uid).set(usuario);
  }

  getUsuarioByUID(uid: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>('usuarios').doc(uid).valueChanges();
  }

  deleteUsuario(uid: string): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).delete();
  }

  updateUsuario(uid: string, usuario: Partial<Usuario>): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).update(usuario);
  }

  getUsuarioLogueado(): Usuario | null {
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      return JSON.parse(usuarioLogin);
    }
    return null;
  }

  getProfesorByAsignatura(asignatura: string): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('asignatura', '==', asignatura).where('tipo', '==', 'profesor')).valueChanges();
  }
}
