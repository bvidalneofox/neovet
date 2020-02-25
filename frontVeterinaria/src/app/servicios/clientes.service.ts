import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setCliente(formCliente): Observable<any> {
    let form = new FormData();
    form.append("nombre", formCliente.nombre);
    form.append("rut", formCliente.rut);
    form.append("correo", formCliente.correo);
    form.append("direccion", formCliente.direccion);
    form.append("numero", formCliente.numero);
    form.append("fecha_ingreso", formCliente.fecha_ingreso);
    return this._http.post(this.url + "setCliente", form);
  }

  updateCliente(formCliente): Observable<any> {
    let form = new FormData();
    form.append("id", formCliente.id);
    form.append("nombre", formCliente.nombre);
    form.append("rut", formCliente.rut);
    form.append("correo", formCliente.correo);
    form.append("direccion", formCliente.direccion);
    form.append("numero", formCliente.numero);
    return this._http.post(this.url + "updateCliente", form);
  }

  getMascotasPorRut(rut): Observable<any>{
    return this._http.get(this.url + "getMascotasClientePorRut/" + rut);
  }

  getClientePorRut(rut): Observable<any> {
    return this._http.get(this.url + "getClientePorRut/" + rut);
  }

  getClientePorId(id): Observable<any> {
    return this._http.get(this.url + "getClientePorId/" + id);
  }

  getClientesPorNombre(nombre): Observable<any>{
    return this._http.get(this.url + "getClientesPorNombre/" + nombre);
  }

  getMascotasPorIdCliente(id): Observable<any>{
    return this._http.get(this.url + "getMascotasPorIdCliente/" + id);
  }
}
