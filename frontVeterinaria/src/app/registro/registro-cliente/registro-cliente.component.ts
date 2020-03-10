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
    this.formClientes.rut = this.checkRut(this.formClientes.rut);
    this._clientesService.setCliente(this.formClientes).subscribe(response => {
      if (response.estado == 'success') {
        form.reset();
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      } else {
        for (let index = 0; index < Object.keys(response.mensaje).length; index++) {
          this._snotify.warning(response.mensaje[Object.keys(response.mensaje)[index]], {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
        }
      }
    }, error => {
      console.log(error);
    });
  }

  checkRut(rut) {
    // Despejar Puntos
    let test = rut.replace(/\./g, "");
    test = test.replace(/\-/g, "");
    return test;
}

}
