import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { HospitalizacionesService } from 'src/app/servicios/hospitalizaciones.service';

@Component({
  selector: 'app-ver-historial-hospitalizaciones',
  templateUrl: './ver-historial-hospitalizaciones.component.html',
  styleUrls: ['./ver-historial-hospitalizaciones.component.css']
})
export class VerHistorialHospitalizacionesComponent implements OnInit {
  //CONSULTAS INACATIVAS
  hospitalizacionesInactivas = [];

  constructor(private _snotify: SnotifyService, private _hospitalizacionesService: HospitalizacionesService) { }

  ngOnInit() {
  }

  getHospitalizacionesInactivas(){
    this._hospitalizacionesService.getHospitalizacionesInactivas().subscribe(response=>{
      if(response.estado == 'success'){
        this.hospitalizacionesInactivas = response.hospitalizaciones;
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
    this.hospitalizacionesInactivas = [];
    this._hospitalizacionesService.getHospitalizacionesInactivasPorFechas(fechaInicio, fechaFin).subscribe(response =>{
      if(response.estado == 'success'){
        this.hospitalizacionesInactivas = response.hospitalizaciones;
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
