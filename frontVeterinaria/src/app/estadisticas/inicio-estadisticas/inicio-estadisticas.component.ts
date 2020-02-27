import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-inicio-estadisticas',
  templateUrl: './inicio-estadisticas.component.html',
  styleUrls: ['./inicio-estadisticas.component.css']
})
export class InicioEstadisticasComponent implements OnInit {

  // GRAFICO DE LAS CONSULTAS REALIZADAS
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Consultas Realizadas' }
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

  // GRAFICO DE LAS CONSULTAS REALIZADAS
  public lineChartDataHospitalizaciones: ChartDataSets[] = [
    { data: [], label: 'Hospitalizaciones Realizadas' }
  ];
  public lineChartLabelsHospitalizaciones: Label[] = [];
  public lineChartOptionsHospitalizaciones: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: {
      annotations: [
        {
        },
      ],
    },
  };
  public lineChartColorsHospitalizaciones: Color[] = [
    { // red
      backgroundColor: 'rgba(63,63,191,0.8)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(63,63,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendHospitalizaciones = false;
  public lineChartTypeHospitalizaciones = 'bar';

  //Varriable para obtener los datos de las consultas
  estadisticasConsultas = [];
  //Varriable para obtener los datos de las hospitalizaciones
  estadisticasHospitalizaciones = [];
  //Variables con datos de los usuarios mascotas y clientes
  numeroClientes = '';
  numeroMascotas = '';
  numeroUsuarios = '';

  constructor(private _estadisticasService: EstadisticasService) { }

  ngOnInit() {
    this.getEstadisticasConsultas();
    this.getEstadisticasHospitalizaciones();
    this.getClientesSistema();
    this.getMascotasSistema();
    this.getUsuariosSistema();
  }

  getClientesSistema() {
    this._estadisticasService.getClientesSistema().subscribe(response=>{
      if(response.estado == 'success'){
        this.numeroClientes = response.clientes.numeroClientes;
      }
    },error=>{
      console.log(error);
    });
  }

  getMascotasSistema() {
    this._estadisticasService.getMascotasSistema().subscribe(response=>{
      if(response.estado == 'success'){
        this.numeroMascotas = response.mascotas.numeroMascotas;
      }
    },error=>{
      console.log(error);
    });
  }

  getUsuariosSistema() {
    this._estadisticasService.getUsuariosSistema().subscribe(response=>{
      if(response.estado == 'success'){
        this.numeroUsuarios = response.usuarios.numeroUsuarios;
      }
    },error=>{
      console.log(error);
    });
  }

  getEstadisticasConsultas() {
    this._estadisticasService.getEstadisticasConsultas().subscribe(response => {
      if (response.estado == 'success') {
        for (let index = 0; index < Object.keys(response.consultas).length; index++) {
          this.lineChartData[0].data.push(response.consultas[Object.keys(response.consultas)[index]].numeroConsultas);
          this.lineChartLabels.push(response.consultas[Object.keys(response.consultas)[index]].anio);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getEstadisticasHospitalizaciones() {
    this._estadisticasService.getEstadisticasHospitalizaciones().subscribe(response => {
      if (response.estado == 'success') {
        for (let index = 0; index < Object.keys(response.hospitalizaciones).length; index++) {
          this.lineChartDataHospitalizaciones[0].data.push(response.hospitalizaciones[Object.keys(response.hospitalizaciones)[index]].numerohospitalizaciones);
          this.lineChartLabelsHospitalizaciones.push(response.hospitalizaciones[Object.keys(response.hospitalizaciones)[index]].anio);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  cambiarGrafico(grafico){
    switch (grafico) {
      case 'hosp':
        if (this.lineChartTypeHospitalizaciones == 'line'){
          this.lineChartTypeHospitalizaciones = 'bar';
        }else{
          this.lineChartTypeHospitalizaciones = 'line';
        }
        break;

        case 'cons':
        if (this.lineChartType == 'line'){
          this.lineChartType = 'bar';
        }else{
          this.lineChartType = 'line';
        }
        break;
    
      default:
        break;
    }
  }

}
