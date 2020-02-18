import { Component, OnInit } from '@angular/core';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ver-consultas-activas',
  templateUrl: './ver-consultas-activas.component.html',
  styleUrls: ['./ver-consultas-activas.component.css']
})
export class VerConsultasActivasComponent implements OnInit {

  //datos con las consultas activas
  consultasActivas = [];
  //guadarMotivo
  motivoConsulta = '';
  //datos mascota
  datosMascota = '';
  //variable de el peso de la mascota
  pesoMascota = '';
  //variable del procedimiento
  procedimientoConsulta = '';
  //checkbox hospitalizacion
  hospitalizacionCheckBox = false;
  //motivo hospitalizacion
  motivoHospitalizacion = '';
  //idMascota para la hospitalizacion
  idMascotaHospitalizacion = '';
  //Id de la consulta seleccionada
  idConsultaProcedimiento = '';
  //ID A FINALIZAR
  idConsultaFinalizar = '';

  constructor(private _snotify: SnotifyService, private _consultasService: ConsultasServiceService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getConsultasActivas() {
    this.consultasActivas = [];
    this._consultasService.getConsultasActivas().subscribe(response => {
      if (response.estado == 'success') {
        this.consultasActivas = response.consultas;
      } else {
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
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

  getMascotaPorId(id) {
    this._mascotasService.getMascotaPorId(id).subscribe(response => {
      if (response.estado == 'success') {
        this.datosMascota = response.mascota;
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

  getMotivoConsulta(motivo) {
    this.motivoConsulta = motivo;
  }

  setProcedimientoConsulta() {
    this._consultasService.setProcedimientoConsulta(this.idConsultaProcedimiento, this.procedimientoConsulta, this.pesoMascota, this.hospitalizacionCheckBox, this.motivoHospitalizacion, this.idMascotaHospitalizacion).subscribe(response => {
      if (response.estado == 'success') {
        this.getConsultasActivas();
        document.getElementById('close-modal-procedimiento').click();
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

  getProcedimientoConsulta(procedimiento, peso, idMascota) {
    this.procedimientoConsulta = procedimiento;
    this.pesoMascota = peso;
    this.idMascotaHospitalizacion = idMascota;
  }

  setIdConsultaProcedimiento(id) {
    this.idConsultaProcedimiento = id;
  }

  setConsultaFinalizada() {
    this._consultasService.setConsultaFinalizada(this.idConsultaFinalizar).subscribe(response => {
      if (response.estado == 'success') {
        this.getConsultasActivas();
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

  setIdConsultaFinalizar(id) {
    this.idConsultaFinalizar = id;
  }

}
