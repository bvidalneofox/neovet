import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  //Variable para almacenar los datos del ususario del sistema
  datosUsuario = [];

  constructor(private _usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getDatosUsuarioSistema();
  }

  getDatosUsuarioSistema() {
    this._usuariosService.getDatosUsuarioSistema().subscribe(response => {
      if (response.estado == 'success') {
        this.datosUsuario = response.usuario;
      } else {
        alert(response.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  updateDatosCliente() {
    this._usuariosService.updateCliente(this.datosUsuario).subscribe(response => {
      if (response.estado == 'success') {
        alert(response.mensaje);
      } else {
        alert(response.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  changePasswordUser(form) {
    if (form.nuevaPass1 == form.nuevaPass2) {
      this._usuariosService.changePasswordUser(this.datosUsuario, form).subscribe(response => {
        if (response.estado == 'success') {
          alert(response.mensaje);
        } else {
          alert(response.mensaje);
        }
      }, error => {
        console.log(error);
      });
    }else{
      alert('Los campos de nueva contraseña no coinciden');
    }
  }

}
