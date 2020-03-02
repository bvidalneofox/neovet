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
  //prioridad orden tabla
  prioridadOrden = '';


  constructor(private _snotify: SnotifyService, private _consultasService: ConsultasServiceService) { }

  ngOnInit() {
  }

  getConsultasActivas(estado) {
    this.consultasActivas = [];
    this._consultasService.getConsultasActivas(estado).subscribe(response => {
      if (response.estado == 'success') {
        this.consultasActivas = response.consultas;
        if(estado == 1){
          this.prioridadOrden = 'urgencia';
        }else{
          this.prioridadOrden = 'llegada';
        }
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

}
