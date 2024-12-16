import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-clases',
  templateUrl: './qr-clases.page.html',
  styleUrls: ['./qr-clases.page.scss'],
})
export class QrClasesPage {
  mostrarQR: boolean = false;

  constructor() { }

  generarQR() {
    this.mostrarQR = true;
  }
}
