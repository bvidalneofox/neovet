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

  getEstadisticasConsultasAnios(): Observable<any> {
    return this._http.get(this.url + "getEstadisticasConsultasAnios");
  }

  getEstadisticasConsultasPorFecha(fechaIni, fechaFini): Observable<any>{
    return this._http.get(this.url + "getEstadisticasConsultasPorFecha/" + fechaIni + "/" + fechaFini);
  }

  getEstadisticasHospitalizaciones(): Observable<any> {
    return this._http.get(this.url + "getEstadisticasHospitalizaciones");
  }

  getEstadisticasHospitalizacionesAnios(): Observable<any> {
    return this._http.get(this.url + "getEstadisticasHospitalizacionesAnios");
  }

  getEstadisticasHospitalizacionesPorFecha(fechaIni, fechaFini): Observable<any>{
    return this._http.get(this.url + "getEstadisticasHospitalizacionesPorFecha/" + fechaIni + "/" + fechaFini);
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

  getEstadisticasClientes(): Observable<any>{
    return this._http.get(this.url + "getEstadisticasClientes");
  }

  getEstadisticasClientesAnios(): Observable<any>{
    return this._http.get(this.url + "getEstadisticasClientesAnios");
  }

  getEstadisticasClientesPorFecha(fechaIni, fechaFini): Observable<any>{
    return this._http.get(this.url + "getEstadisticasClientesPorFecha/" + fechaIni + "/" + fechaFini);
  }

  getEstadisticasMascotas(): Observable<any>{
    return this._http.get(this.url + "getEstadisticasMascotas");
  }

  getEstadisticasMascotasAnios(): Observable<any>{
    return this._http.get(this.url + "getEstadisticasMascotasAnios");
  }

  getEstadisticasMascotasPorFecha(fechaIni, fechaFini): Observable<any>{
    return this._http.get(this.url + "getEstadisticasMascotasPorFecha/" + fechaIni + "/" + fechaFini);
  }

  getUsuariosConMasProcedimientos(): Observable<any>{
    return this._http.get(this.url + "getusuariosConMasProcedimientos");
  }

}
