import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService { 
  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getDatosUsuarioSistema(): Observable<any>{
    return this._http.get(this.url + "getDatosUsuarioSistema");
  }

  setUsuario(formCliente): Observable<any> {
    let form = new FormData();
    form.append("nombre", formCliente.nombreUsuario);
    form.append("rut", formCliente.rutUsuario);
    form.append("correo", formCliente.correoUsuario);
    form.append("direccion", formCliente.direccionUsuario);
    form.append("numero", formCliente.numeroUsuario);
    form.append("tipo_usuario", formCliente.tipoUsuario);
    return this._http.post(this.url + "setUsuario", form);
  }

  getUsuariosSistema(): Observable<any>{
    return this._http.get(this.url + "getUsuariosSistemaControl");
  }

  updateCliente(formCliente): Observable<any> {
    let form = new FormData();
    form.append("id", formCliente.id);
    form.append("nombre", formCliente.name);
    form.append("rut", formCliente.rut);
    form.append("correo", formCliente.email);
    form.append("direccion", formCliente.direccion);
    form.append("numero", formCliente.numero);
    return this._http.post(this.url + "updateUsuarioSistema", form);
  }

  deleteUsuario(metodo, idUsuario): Observable<any> {
    let form = new FormData();
    form.append("metodo", metodo);
    form.append("id", idUsuario);
    return this._http.post(this.url + "deleteUsuario", form);
  }

  changePasswordUser(formCliente, formPass): Observable<any>{
    let form = new FormData();
    form.append("id", formCliente.id);
    form.append("passwordActual", formPass.passActual);
    form.append("passwordNueva", formPass.nuevaPass1);
    return this._http.post(this.url + "changePasswordUser", form);
  }

}
