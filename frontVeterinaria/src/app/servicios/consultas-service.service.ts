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
    form.append("id_mascota", datosMascota.id);
    return this._http.post(this.url + "setConsulta", form);
  }

  getConsultasActivas(): Observable<any> {
    return this._http.get(this.url + "getConsultasActivas");
  }

  getConsultasInactivas(): Observable<any> {
    return this._http.get(this.url + "getConsultasInactivas");
  }

  //OBTENER CONSULTAS PARA LA FICHA CLINICA
  getFichaClinica(id): Observable<any>{
    return this._http.get(this.url + "getConsultasInactivaPorIdMascota/" + id);
  }

  setProcedimientoConsulta(idConsulta, procedimientoConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    form.append("procedimiento", procedimientoConsulta);
    return this._http.post(this.url + "setProcedimientoConsulta", form);
  }

  setConsultaFinalizada(idConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    return this._http.post(this.url + "setConsultaFinalizada", form);
  }

}
