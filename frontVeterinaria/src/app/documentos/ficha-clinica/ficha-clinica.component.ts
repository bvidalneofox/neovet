import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { SnotifyService } from 'ng-snotify';
import { LocationStrategy } from "@angular/common";

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css']
})
export class FichaClinicaComponent implements OnInit {

  //Variable para los datos basicos
  datosBasicos = '';
  //Variable para las consultas
  consultasMascota = '';
  //edad mascota
  edadMascota = '';
  constructor(private _snotify: SnotifyService, private _consultasService: ConsultasServiceService, location: LocationStrategy) {
    location.onPopState(() => {
      if (document.getElementById('close2') != null) {
        document.getElementById('close2').click();
      }
    });
  }

  ngOnInit() {
  }

  getFichaClinica(id) {
    this._consultasService.getFichaClinica(id).subscribe(response => {
      if (response.estado == 'success') {
        this.datosBasicos = response.datosBasicos;
        this.consultasMascota = response.consultas;
        this.edadMascota = response.edad;
      } else {
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'centerCenter'
        });
      }
    }, error => {
      console.log(error);
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
