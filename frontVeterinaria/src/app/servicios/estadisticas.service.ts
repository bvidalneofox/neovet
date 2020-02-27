import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getEstadisticasConsultas(): Observable<any> {
    return this._http.get(this.url + "getEstadisticasConsultas");
  }

  getEstadisticasHospitalizaciones(): Observable<any> {
    return this._http.get(this.url + "getEstadisticasHospitalizaciones");
  }

  getUsuariosSistema(): Observable<any> {
    return this._http.get(this.url + "getUsuariosSistema");
  }

  getClientesSistema(): Observable<any>{
    return this._http.get(this.url + "getClientesSistema");
  }

  getMascotasSistema(): Observable<any>{
    return this._http.get(this.url + "getMascotasSistema");
  }

}
