import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(private _http: HttpClient) { }

  setVacuna(datosMascota, formVacuna): Observable<any> {
    let form = new FormData();
    form.append("id_mascota", datosMascota.id);
    form.append("id_vacuna", formVacuna.tipoVacuna);
    form.append("fecha", formVacuna.fechaVacuna);
    return this._http.post("http://127.0.0.1:8000/api/setVacuna", form);
  }

  getVacunasPorIdMascota(id): Observable<any>{
    return this._http.get("http://127.0.0.1:8000/api/getVacunasPorIdMascota/" + id);
  }

}
