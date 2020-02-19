import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';
import { LocationStrategy } from "@angular/common";
import { ActivatedRoute, Params } from '@angular/router';
import { VacunasService } from 'src/app/servicios/vacunas.service';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';

@Component({
  selector: 'app-ficha-mascota',
  templateUrl: './ficha-mascota.component.html',
  styleUrls: ['./ficha-mascota.component.css']
})
export class FichaMascotaComponent implements OnInit {
  //Variable para rescatar el id de la ruta
  idMascota = '';
  //Variable para almacenar los datos obtenidos
  datosMascota = [];
  //Variable para almacenar los datos de las vacunas
  datosVacunas = [];
  //Variable apra almacenar las ultimas 5 consultas
  datosConsulta = [];

  constructor(private _mascotasService: MascotasService, private _snotify: SnotifyService, location: LocationStrategy, private rutaActiva: ActivatedRoute, private _vacunasService: VacunasService, private _consultasService: ConsultasServiceService) {
    location.onPopState(() => {
      if (document.getElementById('close') != null) {
        document.getElementById('close').click();
      }
    });
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idMascota = params.idMascota;
      }
    );
  }

  ngOnInit() {
    this.getMascotaPorId(this.idMascota);
    this.getVacunas();
    this.getUltimasConsultasPorIdMascota();
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

  getVacunas(){
    //guardar id al hacer click para no hacer un nuevo servicio
    this._vacunasService.getVacunasPorIdMascota(this.idMascota).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosVacunas = response.vacunas;
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

  getUltimasConsultasPorIdMascota(){
    this._consultasService.getUltimasConsultasPorIdMascota(this.idMascota).subscribe(response=>{
      if(response.estado = 'success'){
        this.datosConsulta = response.consultas;
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

}
