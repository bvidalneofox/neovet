import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ficha-cliente',
  templateUrl: './ficha-cliente.component.html',
  styleUrls: ['./ficha-cliente.component.css']
})
export class FichaClienteComponent implements OnInit {

  //Variable para rescatar el id de la ruta
  idCliente = '';
  //Variable para almacenar los datos obtenidos
  datosCliente = [];
  //Variable para almacenar las mascotas obtenidas
  datosMascota = [];

  constructor(private _clientesService: ClientesService, private rutaActiva: ActivatedRoute) {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idCliente = params.idCliente;
      }
    );
  }

  ngOnInit() {
    this.getDatosClientePorId();
    this.getMascotasPorIdCliente();
  }

  getDatosClientePorId(){
    this._clientesService.getClientePorId(this.idCliente).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosCliente = response.cliente;
        console.log(this.datosCliente);
      }
    }, error=>{
      console.log(error);
    });
  }

  getMascotasPorIdCliente(){
    this._clientesService.getMascotasPorIdCliente(this.idCliente).subscribe(response=>{
      if(response.estado == 'success'){
        this.datosMascota = response.mascotas;
        console.log(this.datosMascota);
      }else{
        alert(response.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }

  updateDatosCliente(){
    this._clientesService.updateCliente(this.datosCliente).subscribe(response=>{
      if(response.estado == 'success'){
        alert(response.mensaje);
      }else{
        alert(response.mensaje);
      }
    },error=>{
      console.log(error);
    });
  }

}
