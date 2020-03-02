import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
    legend: {
      position: 'left',
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'black',
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }],
      yAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }]
    },
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
    legend: {
      position: 'left',
    },
    scales: {
      xAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }],
      yAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }]
    },
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

  // GRAFICO DE CLIENTES REGISTRADOS  
  public lineChartDataClientes: ChartDataSets[] = [
    { data: [], label: 'Clientes Nuevos' }
  ];
  public lineChartLabelsClientes: Label[] = [];
  public lineChartOptionsClientes: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }],
      yAxes: [{
        ticks: {
          fontStyle: 'bold',
          fontColor: 'black',
        }
      }]
    },
    annotation: {
      annotations: [
        {
        },
      ],
    },
  };
  public lineChartColorsClientes: Color[] = [
    { // red
      backgroundColor: 'rgba(63,63,191,0.8)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(63,63,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegendClientes = false;
  public lineChartTypeClientes = 'bar';

  // GRAFICO PIE DE USUARIOS CON MAYOR NUMERO DE CONSULTAS
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16,
        fontColor: 'black',
        fontStyle: 'bold',
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

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
    this.getEstadisticasClientes();
    this.getClientesSistema();
    this.getMascotasSistema();
    this.getUsuariosSistema();
    this.getUsuariosConMasProcedimientos();
  }

  getClientesSistema() {
    this._estadisticasService.getClientesSistema().subscribe(response => {
      if (response.estado == 'success') {
        this.numeroClientes = response.clientes.numeroClientes;
      }
    }, error => {
      console.log(error);
    });
  }

  getMascotasSistema() {
    this._estadisticasService.getMascotasSistema().subscribe(response => {
      if (response.estado == 'success') {
        this.numeroMascotas = response.mascotas.numeroMascotas;
      }
    }, error => {
      console.log(error);
    });
  }

  getUsuariosSistema() {
    this._estadisticasService.getUsuariosSistema().subscribe(response => {
      if (response.estado == 'success') {
        this.numeroUsuarios = response.usuarios.numeroUsuarios;
      }
    }, error => {
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

  getEstadisticasClientes() {
    this._estadisticasService.getEstadisticasClientes().subscribe(response => {
      if (response.estado == 'success') {
        for (let index = 0; index < Object.keys(response.clientes).length; index++) {
          this.lineChartDataClientes[0].data.push(response.clientes[Object.keys(response.clientes)[index]].numeroClientes);
          this.lineChartLabelsClientes.push(response.clientes[Object.keys(response.clientes)[index]].anio);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getUsuariosConMasProcedimientos() {
    this._estadisticasService.getUsuariosConMasProcedimientos().subscribe(response => {
      for (let index = 0; index < Object.keys(response).length; index++) {
        this.pieChartData.push(response[Object.keys(response)[index]].numeroAtenciones);
        this.pieChartLabels.push(response[Object.keys(response)[index]].name);
      }
    }, error => {
      console.log(error);
    });
  }

  cambiarGrafico(grafico) {
    switch (grafico) {
      case 'hosp':
        if (this.lineChartTypeHospitalizaciones == 'line') {
          this.lineChartTypeHospitalizaciones = 'bar';
        } else {
          this.lineChartTypeHospitalizaciones = 'line';
        }
        break;

      case 'cons':
        if (this.lineChartType == 'line') {
          this.lineChartType = 'bar';
        } else {
          this.lineChartType = 'line';
        }
        break;

        case 'clie':
          if (this.lineChartTypeClientes == 'line') {
            this.lineChartTypeClientes = 'bar';
          } else {
            this.lineChartTypeClientes = 'line';
          }
          break;

      default:
        break;
    }
  }

}
