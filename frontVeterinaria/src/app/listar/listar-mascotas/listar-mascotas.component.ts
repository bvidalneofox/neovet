import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.css']
})
export class ListarMascotasComponent implements OnInit {

  //Formulario de busqueda
  formRut = '';
  //Datos de la busqueda
  datosBusqueda = '';
  //Datos de la mascota
  datosMascota = '';

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getMascotasPorRut(form){
    this._clientesService.getMascotasPorRut(this.formRut).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosBusqueda = response.mascotas;
        form.reset();
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
