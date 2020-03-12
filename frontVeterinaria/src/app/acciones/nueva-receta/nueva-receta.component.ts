import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.component.html',
  styleUrls: ['./nueva-receta.component.css']
})
export class NuevaRecetaComponent implements OnInit {

  rutaLogo = localStorage.getItem('rutaLogo');
  nombreVeterinaria = localStorage.getItem('nombreVeterinaria');
  direccionVeterinaria = localStorage.getItem('direccion');
  numero = localStorage.getItem('numero');

  //Nombre Mascosta
  nombreMascota = '';

  //Variable para almacenar los medicamentos
  receta = [];

  constructor(private _snotify: SnotifyService) { }

  ngOnInit() {
  }

  agregarMedicamento(datos) {
    if(!datos.value.nombreMedicamento || !datos.value.indicacionesMedicamento){
      this._snotify.warning('Debe de completar campo de medicamento e indicaciones', {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        position: 'rightTop'
      });
    }else{
    console.log(datos.value);
    this.receta.push(datos.value);
    datos.reset();
    this._snotify.success('Item Incorporado Correctamente', {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      position: 'rightTop'
    });
  }
  }

  deleteElementoReceta(indice) {
    this.receta.splice(indice, 1);
    this._snotify.warning('Item Retirado Correctamente', {
      timeout: 3000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      position: 'rightTop'
    });
  }

  generarPDF() {
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 1
    }).then(function (canvas) {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 10; // give some top padding to first page

      doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('file.pdf');
    });
  }

}
