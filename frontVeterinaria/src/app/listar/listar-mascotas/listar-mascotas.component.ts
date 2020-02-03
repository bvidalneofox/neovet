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

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService) { }

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

}
