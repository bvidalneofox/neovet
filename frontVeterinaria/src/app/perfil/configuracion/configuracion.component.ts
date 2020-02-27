import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ConfiguracionesService } from 'src/app/servicios/configuraciones.service';
import { error } from 'protractor';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

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

  constructor(private _usuariosService : UsuariosService, private _configuracionService: ConfiguracionesService) { }

  ngOnInit() {
  }

  setNuevoUsuario(form){
    this._usuariosService.setUsuario(form).subscribe(response=>{
      if(response.estado == 'success'){
        alert(response.mensaje);
      }else{
        alert(response.mensaje);
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
        alert(response.mensaje);
        this.getUsuariosSistema();
      }else{
        alert(response.mensaje);
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
        alert(response.mensaje);
        localStorage.setItem('nombreVeterinaria', form.nombreEmpresaLogo);
        localStorage.setItem('direccion', form.direccionVeterinaria);
        localStorage.setItem('numero', form.numeroVeterinaria);
      }else{
        alert(response.mensaje);
      }
    }, error=>{
      console.log(error);
    });
  }

}
