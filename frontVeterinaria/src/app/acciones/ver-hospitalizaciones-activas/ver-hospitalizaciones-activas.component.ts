import { Component, OnInit } from '@angular/core';
import { HospitalizacionesService } from 'src/app/servicios/hospitalizaciones.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ver-hospitalizaciones-activas',
  templateUrl: './ver-hospitalizaciones-activas.component.html',
  styleUrls: ['./ver-hospitalizaciones-activas.component.css']
})
export class VerHospitalizacionesActivasComponent implements OnInit {

  //datos con las hospitalizaciones activas
  hospitalizacionesActivas = [];

  constructor(private _snotify: SnotifyService, private _hospitalizacionesService: HospitalizacionesService) { }

  ngOnInit() {
  }

  getHospitalizacionesActivas(){
    this._hospitalizacionesService.getHospitalizacionesActivas().subscribe(response=>{
      if(response.estado == 'success'){
        this.hospitalizacionesActivas = response.hospitalizaciones;
        console.log(this.hospitalizacionesActivas);
      }else{
        alert(response.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }
}
