import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() {}

  mensaje(msj: string, icon: any, title: string, showCancelButton: boolean = false) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: msj,
      heightAuto: false,
      showCancelButton: showCancelButton,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });
  }

  mixin(timer: number, msj: string, icon: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      heightAuto: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: msj,
      heightAuto: false
    });
  }
}
