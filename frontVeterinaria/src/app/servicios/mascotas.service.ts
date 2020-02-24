import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setMascota(formMascota, formCliente): Observable<any> {
    let form = new FormData();
    form.append("nombre", formMascota.nombre_mascota);
    form.append("fecha_nacimiento", formMascota.fecha_nacimiento);
    form.append("estado_esterilizado", formMascota.esterilizado);
    form.append("estado_chip", formMascota.chip);
    form.append("genero", formMascota.genero);
    form.append("id_tipo_mascota", formMascota.tipo);
    form.append("raza", formMascota.raza);
    form.append("color", formMascota.color);
    form.append("fecha_ingreso", formCliente.fecha_ingreso);
    form.append("id_cliente", formCliente.id);
    return this._http.post(this.url + "setMascota", form);
  }

  getMascotaPorId(id): Observable<any>{
    return this._http.get(this.url + "getMascotaPorId/" + id);
  }

  getMascotaPorNombre(nombre): Observable<any>{
    return this._http.get(this.url + "getMascotasPorNombre/" + nombre);
  }

  getPesoMascotaUltimos(id): Observable<any>{
    return this._http.get(this.url + "getPesoMascotaUltimosControles/" + id);
  }

  updateMascota(formMascota, idMascota): Observable<any>{
    let form = new FormData();
    form.append("id", idMascota);
    form.append("nombre", formMascota.nombre_mascota);
    form.append("fecha_nacimiento", formMascota.fecha_nacimiento);
    form.append("estado_esterilizado", formMascota.esterilizado);
    form.append("estado_chip", formMascota.chip);
    form.append("genero", formMascota.genero);
    form.append("id_tipo_mascota", formMascota.tipo);
    form.append("raza", formMascota.raza);
    form.append("color", formMascota.color);
    return this._http.post(this.url + "updateMascota", formMascota);
  }

  updateDuenioMascota(idMascota, idDuenio): Observable<any>{
    let form = new FormData();
    form.append("id", idMascota);
    form.append("id_cliente", idDuenio.id);
    return this._http.post(this.url + "updateDuenioMascota", form);
  }
}
