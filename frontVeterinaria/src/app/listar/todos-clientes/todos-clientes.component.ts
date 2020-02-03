import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-todos-clientes',
  templateUrl: './todos-clientes.component.html',
  styleUrls: ['./todos-clientes.component.css']
})
export class TodosClientesComponent implements OnInit {
  //texto a buscar
  inputBusqueda = '';
  //resultados de la busqueda
  resultadosBusqueda = '';
  //datos de las mascotas encontradas
  datosMascotas = '';
  //Datos de la mascota seleccionada
  mascotaSeleccionada = '';

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getClientesPorNombre(){
    this._clientesService.getClientesPorNombre(this.inputBusqueda).subscribe(response=>{
      if(response.estado == 'success'){
        this.resultadosBusqueda = response.clientes;
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

  getMascotaPorClienteId(id){
    this._clientesService.getMascotasPorIdCliente(id).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosMascotas = response.mascotas;
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

  getMascotaPorId(id){
    this._mascotasService.getMascotaPorId(id).subscribe(response=>{
      if(response.estado == 'success'){
        this.mascotaSeleccionada = response.mascota;
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
