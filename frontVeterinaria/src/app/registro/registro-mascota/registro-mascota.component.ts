import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css']
})
export class RegistroMascotaComponent implements OnInit {

  //Formulario buscador cliente
  formRutRm = '';
  datosCliente = '';

  //Formulario registro Mascota
  formMascota = {
    nombre_mascota: '',
    fecha_nacimiento: '',
    esterilizado: '',
    chip: '',
    numero_chip: '',
    genero: '',
    tipo: '',
    raza: '',
    color: '',
  }

  constructor(private _snotify: SnotifyService, private _clientesService: ClientesService, private _mascotasService: MascotasService) { }

  ngOnInit() {
  }

  getClientePorRutRm(form){
    this.formRutRm = this.checkRut(this.formRutRm);
    this._clientesService.getClientePorRut(this.formRutRm).subscribe(response=>{
      if(response.estado == 'success'){
        form.reset();
        this.datosCliente = response.cliente;
      }else{
        this._snotify.warning(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    }, error=>{
      console.log(error);
    });
  }

  setMascota(form){
    this._mascotasService.setMascota(this.formMascota, this.datosCliente).subscribe(response=>{
      if(response.estado == 'success'){
        form.reset();
        this.datosCliente = '';
        this._snotify.success(response.mensaje, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }else{
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
    }, error=>{
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
