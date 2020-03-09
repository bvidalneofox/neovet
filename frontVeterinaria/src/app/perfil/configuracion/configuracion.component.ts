import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ConfiguracionesService } from 'src/app/servicios/configuraciones.service';
import { error } from 'protractor';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  //Ruta de la imagen logo
  rutaLogo = localStorage.getItem('rutaLogo');
  //Variable para almacenar los datos de los usuarios
  datosUsuarios = [];
  //Nombre del file cargado en el input
  nombreArchivo = '';
  //Ngmodel del FOrmulario Seguimiento
  archivo: null;

  //Configuración
  nombreVeterinaria = localStorage.getItem('nombreVeterinaria');
  direccionVeterinaria = localStorage.getItem('direccion');
  numero = localStorage.getItem('numero');

  constructor(private _snotify: SnotifyService, private _usuariosService : UsuariosService, private _configuracionService: ConfiguracionesService) { }

  ngOnInit() {
  }

  setNuevoUsuario(form){
    this._usuariosService.setUsuario(form).subscribe(response=>{
      if(response.estado == 'success'){
        this._snotify.success(response.mensaje, {
          timeout: 3000,
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

  getUsuariosSistema(){
    this._usuariosService.getUsuariosSistema().subscribe(response=>{
        this.datosUsuarios = response;
    }, error=>{
      console.log(error);
    });
  }

  deleteUsuario(metodo ,idUsuario){
    this._usuariosService.deleteUsuario(metodo, idUsuario).subscribe(response=>{
      if(response.estado == 'success'){
        this._snotify.success(response.mensaje, {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
        this.getUsuariosSistema();
      }else{
        this._snotify.error(response.mensaje, {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
      }
    },error=>{
      console.log(error);
    });
  }

  //FUNCIONES PARA EL BOTON DE SUBIR LOGO
  fileClick(){
    document.getElementById('testArchivoLogo').click();
  }

  updateFile(test){
    this.nombreArchivo = test.target.files[0].name;
    this.archivo = test.srcElement.files[0];
  }

  setLogotest(){
    this._configuracionService.setLogoService(this.archivo).subscribe(response=>{
      if(response.estado == 'success'){
        alert(response.mensaje);
      }else{
        alert(response.mensaje);
      }
    },error=>{
      console.log(error);
    });
  }

  setNombreDireccion(form){
    this._configuracionService.setNombreDireccion(form).subscribe(response=>{
      if(response.estado == 'success'){
        this._snotify.success(response.mensaje, {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          position: 'rightTop'
        });
        localStorage.setItem('nombreVeterinaria', form.nombreEmpresaLogo);
        localStorage.setItem('direccion', form.direccionVeterinaria);
        localStorage.setItem('numero', form.numeroVeterinaria);
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

}
