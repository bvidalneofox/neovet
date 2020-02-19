import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';

@Component({
  selector: 'app-ficha-consulta',
  templateUrl: './ficha-consulta.component.html',
  styleUrls: ['./ficha-consulta.component.css']
})
export class FichaConsultaComponent implements OnInit {
  //idConsulta Recibida por ruta
  idConsulta = '';
  //guadarMotivo
  motivoConsulta = '';
  //variable de el peso de la mascota
  pesoMascota = '';
  //variable del procedimiento
  procedimientoConsulta = '';
  //checkbox hospitalizacion
  hospitalizacionCheckBox = false;
  //motivo hospitalizacion
  motivoHospitalizacion = '';
  //Comprobar si la consulta se encuentra finalizada
  estadoConsulta = 2;
  //idMascota para la hospitalizacion
  idMascotaHospitalizacion = '';
  //datos Consulta
  datosConsulta = [];

  constructor(private _snotify: SnotifyService, private _consultasService: ConsultasServiceService, private router: Router, private rutaActiva: ActivatedRoute) {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idConsulta = params.idConsulta;
      }
    );
  }

  ngOnInit() {
    this.getConsultaPorId();
  }

  getConsultaPorId() {
    this._consultasService.getConsultaPorId(this.idConsulta).subscribe(response => {
      if (response.estado == 'success') {
        this.datosConsulta = response.consultas;
        this.procedimientoConsulta = response.consultas.procedimiento;
        this.pesoMascota = response.consultas.peso;
        this.idMascotaHospitalizacion = response.consultas.id_mascota;
        this.estadoConsulta = response.consultas.id_estado;
      } else {
        alert(response.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  setProcedimientoConsulta() {
    this._consultasService.setProcedimientoConsulta(this.idConsulta, this.procedimientoConsulta, this.pesoMascota, this.hospitalizacionCheckBox, this.motivoHospitalizacion, this.idMascotaHospitalizacion).subscribe(response => {
      if (response.estado == 'success') {
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      } else if (response.estado == 'successDerivacion') {
        this.router.navigateByUrl('/Inicio');
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

  setConsultaFinalizada() {
    this._consultasService.setConsultaFinalizada(this.idConsulta).subscribe(response => {
      if (response.estado == 'success') {
        this.router.navigateByUrl('/Inicio');
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      } else {
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error => {
      console.log(error);
    });
  }

}
