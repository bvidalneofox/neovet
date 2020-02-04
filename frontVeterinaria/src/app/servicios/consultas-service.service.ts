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
    return this._http.post("https://neovet.neofox.cl/api/setConsulta", form);
  }

  getConsultasActivas(): Observable<any> {
    return this._http.get("https://neovet.neofox.cl/api/getConsultasActivas/");
  }

  getConsultasInactivas(): Observable<any> {
    return this._http.get("https://neovet.neofox.cl/api/getConsultasInactivas/");
  }

  setProcedimientoConsulta(idConsulta, procedimientoConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    form.append("procedimiento", procedimientoConsulta);
    return this._http.post("https://neovet.neofox.cl/api/setProcedimientoConsulta", form);
  }

  setConsultaFinalizada(idConsulta):Observable<any>{
    let form = new FormData();
    form.append("id", idConsulta);
    return this._http.post("https://neovet.neofox.cl/api/setConsultaFinalizada", form);
  }

}
