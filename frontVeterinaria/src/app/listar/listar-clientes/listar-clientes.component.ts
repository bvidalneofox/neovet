import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  //Formulario Buscador Cliente
  formRut = '';
  datosCliente = '';

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService) { }

  ngOnInit() {
  }

  getClientePorRut(form){
    console.log(this.formRut);
    this._clientesService.getClientePorRut(this.formRut).subscribe(response=>{
      if(response.estado == 'success'){
        form.reset();
        this.datosCliente = response.cliente;
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

}
