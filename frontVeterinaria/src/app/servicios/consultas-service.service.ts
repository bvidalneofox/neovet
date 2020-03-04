import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConsultasServiceService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setConsulta(datosConsulta, datosMascota): Observable<any> {
    let form = new FormData();
    form.append("motivo", datosConsulta.motivoTextarea);
    form.append("fecha_consulta", datosConsulta.fechaConsulta);
    form.append("nivel_emergencia", datosConsulta.nivelUrgencia);
    form.append("nombre_cliente_solicita", datosMascota.nombreDuenio);
    form.append("id_mascota", datosMascota.id);
    return this._http.post(this.url + "setConsulta", form);
  }

  getUltimasConsultasPorIdMascota(id): Observable<any> {
    return this._http.get(this.url + "getUltimasConsultasPorIdMascota/" + id);
  }

  getConsultasActivas(estado): Observable<any> {
    return this._http.get(this.url + "getConsultasActivas/" + estado);
  }

  getConsultasInactivas(): Observable<any> {
    return this._http.get(this.url + "getConsultasInactivas");
  }

  getConsultaPorId(id): Observable<any> {
    return this._http.get(this.url + "getConsultaPorId/" + id);
  }

  getConsultasInactivasPorFechas(fechaInicio, fechaFin): Observable<any> {
    return this._http.get(this.url + "getConsultasInactivaPorRangoFecha/" + fechaInicio + '/' + fechaFin);
  }

  //OBTENER CONSULTAS PARA LA FICHA CLINICA
  getFichaClinica(id): Observable<any>{
    return this._http.get(this.url + "getConsultasInactivaPorIdMascota/" + id);
  }

  setProcedimientoConsulta(idConsulta, procedimientoConsulta, peso, checkHosp, numeroCamilla, motivoHospitalizacion, idMascota):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    form.append("peso", peso);
    form.append("procedimiento", procedimientoConsulta);
    form.append("checkHospitalizacion", checkHosp);
    form.append("numero_camilla", numeroCamilla);
    form.append("motivoHospitalizacion", motivoHospitalizacion);
    form.append("idMascota", idMascota)
    return this._http.post(this.url + "setProcedimientoConsulta", form);
  }

  setConsultaFinalizada(idConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    return this._http.post(this.url + "setConsultaFinalizada", form);
  }

  cambiarEstadoConsulta(id, metodo):Observable<any>{
    let form = new FormData();
    form.append("metodo", metodo);
    form.append("id", id);
    return this._http.post(this.url + "cambiarEstadoConsulta", form);
  }

}
