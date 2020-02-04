import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http: HttpClient) { }

  setCliente(formCliente): Observable<any> {
    let form = new FormData();
    form.append("nombre", formCliente.nombre);
    form.append("rut", formCliente.rut);
    form.append("correo", formCliente.correo);
    form.append("direccion", formCliente.direccion);
    form.append("numero", formCliente.numero);
    form.append("fecha_ingreso", formCliente.fecha_ingreso);
    return this._http.post("https://neovet.neofox.cl/api/setCliente", form);
  }

  getMascotasPorRut(rut): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getMascotasClientePorRut/" + rut);
  }

  getClientePorRut(rut): Observable<any> {
    return this._http.get("https://neovet.neofox.cl/api/getClientePorRut/" + rut);
  }

  getClientesPorNombre(nombre): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getClientesPorNombre/" + nombre);
  }

  getMascotasPorIdCliente(id): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getMascotasPorIdCliente/" + id);
  }
}
