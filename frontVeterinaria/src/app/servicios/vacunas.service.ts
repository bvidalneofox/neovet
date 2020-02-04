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
    return this._http.post("https://neovet.neofox.cl/api/setVacuna", form);
  }

  getVacunasPorIdMascota(id): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getVacunasPorIdMascota/" + id);
  }

}
