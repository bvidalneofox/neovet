import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {
  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setVacuna(datosMascota, formVacuna): Observable<any> {
    let form = new FormData();
    form.append("id_mascota", datosMascota.id);
    form.append("id_vacuna", formVacuna.tipoVacuna);
    form.append("fecha", formVacuna.fechaVacuna);
    return this._http.post(this.url + "setVacuna", form);
  }

  getVacunasPorIdMascota(id): Observable<any>{
    return this._http.get(this.url + "getVacunasPorIdMascota/" + id);
  }

}
