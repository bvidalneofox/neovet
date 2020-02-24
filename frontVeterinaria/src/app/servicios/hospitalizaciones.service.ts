import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionesService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getHospitalizacionesActivas(): Observable<any> {
    return this._http.get(this.url + "getHospitalizacionesActivas");
  }

  getHospitalizacionesInactivas(): Observable<any> {
    return this._http.get(this.url + "getHospitalizacionesInactivas");
  }

  getHospitalizacionesInactivasPorFechas(fechaInicio, fechaFin): Observable<any> {
    return this._http.get(this.url + "getHospitalizacionesInactivasPorRangoFecha/" + fechaInicio + '/' + fechaFin);
  }

  getHospitalizacionPorId(id): Observable<any> {
    return this._http.get(this.url + "getHospitalizacionPorId/" + id);
  }

  setSeguimiento(descripcion, archivo, id, estadoEsterilizacion, idMascota): Observable<any> {
    let form = new FormData();
    form.append("descripcion", descripcion);
    form.append("archivo", archivo);
    form.append("id_hospitalizacion", id);
    form.append("esterilizacion", estadoEsterilizacion);
    form.append("id_mascota", idMascota.id_mascota);
    return this._http.post(this.url + "setSeguimiento", form);
  }

  getSeguimientoPorId(id): Observable<any> {
    return this._http.get(this.url + "getSeguimientoPorId/" + id);
  }

  setHospitalizacionFinalizada(idConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    return this._http.post(this.url + "setHospitalizacionFinalizada", form);
  }

}
