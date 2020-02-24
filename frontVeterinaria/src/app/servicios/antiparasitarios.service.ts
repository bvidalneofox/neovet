import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AntiparasitariosService {
  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setAntiparasitario(datosMascota, nombreAntiparasitario): Observable<any> {
    let form = new FormData();
    form.append("id_mascota", datosMascota.id);
    form.append("nombre_antiparasitario", nombreAntiparasitario);
    return this._http.post(this.url + "setAntiparasitario", form);
  }

  getAntiparasitarioPorIdMascota(id): Observable<any>{
    return this._http.get(this.url + "getAntiparasitarioPorIdMascota/" + id);
  }

}
