import { Component, OnInit } from '@angular/core';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ver-historial-consultas',
  templateUrl: './ver-historial-consultas.component.html',
  styleUrls: ['./ver-historial-consultas.component.css']
})
export class VerHistorialConsultasComponent implements OnInit {

  //CONSULTAS INACATIVAS
  consultasInactivas = [];

  constructor(private _snotify: SnotifyService, private _consultasController: ConsultasServiceService) { }

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
          position: 'rightTop'
        });
      }
    }, error=>{
      console.log(error);
    });
  }

  getHospitalizacionesInactivasPorFecha(fechaInicio, fechaFin){
    this.consultasInactivas = [];
    this._consultasController.getConsultasInactivasPorFechas(fechaInicio, fechaFin).subscribe(response =>{
      if(response.estado == 'success'){
        this.consultasInactivas = response.consultas;
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error=>{
      console.log(error);
    });
  }

}
