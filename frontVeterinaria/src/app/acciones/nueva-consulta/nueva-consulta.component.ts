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
  //Variable del gif loading
  loading = false;
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
    this.loading = true;
    this._mascotasService.getMascotaPorNombre(this.inputBusqueda).subscribe(response => {
      if (response.estado == 'success') {
        this.loading = false;
        form.reset();
        this.resultadosBusqueda = response.mascotas;
      } else {
        this.loading = false;
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  cargarMascotaSeleccionada(datos) {
    this.datosMascota = datos;
  }

  setConsulta() {
    this._consultasService.setConsulta(this.datosConsulta, this.datosMascota).subscribe(response => {
      if (response.estado == 'success') {
        this.limpiarCampos();
        document.getElementById("closeButton").click();
        this.step = 0;
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      } else {
        for (let index = 0; index < Object.keys(response.mensaje).length; index++) {
          this._snotify.warning(response.mensaje[Object.keys(response.mensaje)[index]], {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
        }
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
          this.setConsulta();
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

  limpiarCampos(){
    this.datosConsulta.fechaConsulta = '';
    this.datosConsulta.motivoTextarea = '';
  }

}
