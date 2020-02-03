import { Component, OnInit, Input } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ficha-mascota',
  templateUrl: './ficha-mascota.component.html',
  styleUrls: ['./ficha-mascota.component.css']
})
export class FichaMascotaComponent implements OnInit {

  datosMascota = '';

  constructor(private _mascotasService: MascotasService, private _snotify: SnotifyService) { }

  ngOnInit() {
  }

  getMascotaPorId(id){
    this._mascotasService.getMascotaPorId(id).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosMascota = response.mascota;
      }else{
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'centerCenter'
        });
      }
    },error=>{
      console.log(error);
    });
  }

}
