import { Component, OnInit } from '@angular/core';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { SnotifyService } from 'ng-snotify';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
  selector: 'app-ver-historial-consultas',
  templateUrl: './ver-historial-consultas.component.html',
  styleUrls: ['./ver-historial-consultas.component.css']
})
export class VerHistorialConsultasComponent implements OnInit {

  //CONSULTAS INACATIVAS
  consultasInactivas = '';
  //DATOS MASCOTA
  datosMascota = '';
  //MOTIVO CONSULTA
  motivoConsulta = '';
  //PROCEDIMIENTO CONSULTA
  procedimientoConsulta = '';

  constructor(private _snotify: SnotifyService, private _consultasController: ConsultasServiceService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getConsultasInactivas(){
    this._consultasController.getConsultasInactivas().subscribe(response=>{
      if(response.estado == 'success'){
        this.consultasInactivas = response.consultas;
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'rightTop'
        });
      }
    }, error=>{
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
          backdrop: 0.5,
          position: 'centerCenter'
        });
      }
    }, error => {
      console.log(error);
    });
  }

  getMotivoConsulta(motivo) {
    this.motivoConsulta = motivo;
  }

  getProcedimientoConsulta(procedimiento) {
    this.procedimientoConsulta = procedimiento;
  }

}
