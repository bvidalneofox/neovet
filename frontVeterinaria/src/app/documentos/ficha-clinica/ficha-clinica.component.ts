import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generarPDF(){
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 1
    }).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'PNG',7, 20, 195, 205);
      doc.save('postres.pdf');
    });
  }

}
