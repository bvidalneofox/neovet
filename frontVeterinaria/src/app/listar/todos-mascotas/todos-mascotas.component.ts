import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-todos-mascotas',
  templateUrl: './todos-mascotas.component.html',
  styleUrls: ['./todos-mascotas.component.css']
})
export class TodosMascotasComponent implements OnInit {
  //texto a buscar
  inputBusqueda = '';
  //resultados de la busqueda
  resultadosBusqueda = '';

  constructor(private _snotify: SnotifyService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getMascotasPorNombre(form){
    console.log(this.inputBusqueda);
    this._mascotasService.getMascotaPorNombre(this.inputBusqueda).subscribe(response=>{
      if(response.estado == 'success'){
        form.reset();
        this.resultadosBusqueda = response.mascotas;
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
    },error=>{
      console.log(error);
    });
  }

}
