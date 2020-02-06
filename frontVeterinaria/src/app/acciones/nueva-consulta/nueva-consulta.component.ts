import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { SnotifyService } from 'ng-snotify';
import { LocationStrategy } from "@angular/common";

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent implements OnInit {
  //texto a buscar
  inputBusqueda = '';
  //resultados de la busqueda
  resultadosBusqueda = '';
  //Datos de la mascota
  datosMascota = '';
  //formConsulta
  datosConsulta = {
    fechaConsulta: '',
    motivoTextarea: ''
  }
  //Variable para los steps del Modal
  step = 0;

  constructor(private _snotify: SnotifyService, private _mascotasService: MascotasService, private _consultasService: ConsultasServiceService, location: LocationStrategy) {
    location.onPopState(() => {
      if (document.getElementById('closeButton') != null) {
        document.getElementById("closeButton").click();
      }
    });
  }

  ngOnInit() {
  }

  getMascotasPorNombre(form) {
    console.log(this.inputBusqueda);
    this._mascotasService.getMascotaPorNombre(this.inputBusqueda).subscribe(response => {
      if (response.estado == 'success') {
        form.reset();
        this.resultadosBusqueda = response.mascotas;
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

  cargarMascotaSeleccionada(datos) {
    this.datosMascota = datos;
  }

  setConsulta() {
    console.log(this.datosConsulta, this.datosMascota);
    this._consultasService.setConsulta(this.datosConsulta, this.datosMascota).subscribe(response => {
      if (response.estado == 'success') {
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'rightTop'
        });
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

  controlSteps(accion) {
    switch (accion) {
      case 0:
        this.step = 0;
        break;

      case 1:
        if (this.step == 1) {
          document.getElementById("closeButton").click();
          this.setConsulta();
          this.step = 0;
        } else {
          this.step++;
        }
        break;

      case 2:
        this.step--;
        break;

      default:
        break;
    }
  }

}
