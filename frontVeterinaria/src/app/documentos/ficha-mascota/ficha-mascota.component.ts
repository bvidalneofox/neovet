import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';
import { LocationStrategy } from "@angular/common";
import { ActivatedRoute, Params } from '@angular/router';
import { VacunasService } from 'src/app/servicios/vacunas.service';
import { ConsultasServiceService } from 'src/app/servicios/consultas-service.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { AntiparasitariosService } from 'src/app/servicios/antiparasitarios.service';

@Component({
  selector: 'app-ficha-mascota',
  templateUrl: './ficha-mascota.component.html',
  styleUrls: ['./ficha-mascota.component.css']
})
export class FichaMascotaComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Peso de la Mascota'}
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: {
      annotations: [
        {
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  //Variable para rescatar el id de la ruta
  idMascota = '';
  //Variable para almacenar los datos obtenidos
  datosMascota = [];
  //Variable para almacenar los datos de las vacunas
  datosVacunas = [];
  //Variable apra almacenar las ultimas 5 consultas
  datosConsulta = [];
  //Variable para almacenar los antiparasitarios
  datosAntiparasitarios = [];
  //Datos del cliente para la adopcion
  datosCliente = [];

  constructor(private _mascotasService: MascotasService, private _snotify: SnotifyService, location: LocationStrategy, private rutaActiva: ActivatedRoute, private _vacunasService: VacunasService, private _consultasService: ConsultasServiceService, private _clientesService: ClientesService, private _antiparasitarioService: AntiparasitariosService) {
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
    this.getPesoMascotaUltimosControles();
    this.getAntiparasitario();
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

  getPesoMascotaUltimosControles(){
    this._mascotasService.getPesoMascotaUltimos(this.idMascota).subscribe(response=>{
      if(response.estado == 'success'){
        for (let index = 0; index < Object.keys(response.peso).length; index++) {
          this.lineChartData[0].data.push(response.peso[Object.keys(response.peso)[index]].peso);
          this.lineChartLabels.push(response.peso[Object.keys(response.peso)[index]].created_at);
        }
      }
    },error=>{
      console.log(error);
    });
  }

  getAntiparasitario(){
    this._antiparasitarioService.getAntiparasitarioPorIdMascota(this.idMascota).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosAntiparasitarios = response.antiparasitarios;
      }
    }, error=>{
      console.log(error);
    });
  }

  getClientePorRut(rut){
    this._clientesService.getClientePorRut(rut).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosCliente = response.cliente;
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

  updateNumeroChip(numeroChip){
    this._mascotasService.updateNumeroChip(this.idMascota, numeroChip).subscribe(response=>{
      if(response.estado == 'success'){
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }else{
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
    }, error=>{
      console.log(error);
    });
  }

  updateDuenioMascota(){
    this._mascotasService.updateDuenioMascota(this.idMascota, this.datosCliente).subscribe(response => {
      if(response.estado == 'success'){
        alert(response.mensaje);
        this.getMascotaPorId(this.idMascota);
      }else{
        alert(response.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }

  updateMascota(){
    this._mascotasService.updateMascota(this.datosMascota, this.idMascota).subscribe(response=>{
      if(response.estado == 'success'){
        this.getMascotaPorId(this.idMascota);
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }else{
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
    },error=>{
      console.log(error);
    });
  }

}
