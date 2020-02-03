import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  formClientes = {
    nombre: '',
    rut: '',
    correo: '',
    direccion: '',
    numero: '',
    fecha_ingreso: '2020-01-01 10:10:10'
  }

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService) { }

  ngOnInit() {
  }

  setClienteForm(form : any) {
    console.log(this.formClientes);
    this._clientesService.setCliente(this.formClientes).subscribe(response => {
      if (response.estado == 'success') {
        form.reset();
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'rightTop'
        });
      } else {
        this._snotify.error(response.mensaje, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          backdrop: 0.5,
          position: 'centerCenter'
        });
      }
    }, error => {
      console.log(error);
    });
  }

}
