import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasServiceService {

  constructor(private _http: HttpClient) { }

  setConsulta(datosConsulta, datosMascota): Observable<any> {
    let form = new FormData();
    form.append("motivo", datosConsulta.motivoTextarea);
    form.append("fecha_consulta", datosConsulta.fechaConsulta);
    form.append("id_mascota", datosMascota.id);
    return this._http.post("http://127.0.0.1:8000/api/setConsulta", form);
  }

  getConsultasActivas(): Observable<any> {
    return this._http.get("http://127.0.0.1:8000/api/getConsultasActivas/");
  }

  getConsultasInactivas(): Observable<any> {
    return this._http.get("http://127.0.0.1:8000/api/getConsultasInactivas/");
  }

  //OBTENER CONSULTAS PARA LA FICHA CLINICA
  getFichaClinica(id): Observable<any>{
    return this._http.get("http://127.0.0.1:8000/api/getConsultasInactivaPorIdMascota/" + id);
  }

  setProcedimientoConsulta(idConsulta, procedimientoConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    form.append("procedimiento", procedimientoConsulta);
    return this._http.post("http://127.0.0.1:8000/api/setProcedimientoConsulta", form);
  }

  setConsultaFinalizada(idConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    return this._http.post("http://127.0.0.1:8000/api/setConsultaFinalizada", form);
  }

}
