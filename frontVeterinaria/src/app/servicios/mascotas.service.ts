import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private _http: HttpClient) { }

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
    return this._http.post("http://127.0.0.1:8000/api/setMascota", form);
  }

  getMascotaPorId(id): Observable<any>{
    return this._http.get("http://127.0.0.1:8000/api/getMascotaPorId/" + id);
  }

  getMascotaPorNombre(nombre): Observable<any>{
    return this._http.get("http://127.0.0.1:8000/api/getMascotasPorNombre/" + nombre);
  }
}
