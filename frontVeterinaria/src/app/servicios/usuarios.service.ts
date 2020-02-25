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

}
