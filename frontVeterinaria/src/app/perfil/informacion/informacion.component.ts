import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  //Variable para almacenar los datos del ususario del sistema
  datosUsuario = [];

  constructor(private _snotify: SnotifyService, private _usuariosService: UsuariosService) { }

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
        this._snotify.success(response.mensaje, {
          timeout: 3000,
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

  changePasswordUser(form) {
    if (form.nuevaPass1 == form.nuevaPass2) {
      this._usuariosService.changePasswordUser(this.datosUsuario, form).subscribe(response => {
        if (response.estado == 'success') {
          this._snotify.success(response.mensaje, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
        } else {
          this._snotify.error(response.mensaje, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            position: 'rightTop'
          });
        }
      }, error => {
        console.log(error);
      });
    }else{
      alert('Los campos de nueva contraseña no coinciden');
    }
  }

}
