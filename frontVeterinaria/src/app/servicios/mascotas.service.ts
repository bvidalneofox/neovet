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
    return this._http.post("https://neovet.neofox.cl/api/setMascota", form);
  }

  getMascotaPorId(id): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getMascotaPorId/" + id);
  }

  getMascotaPorNombre(nombre): Observable<any>{
    return this._http.get("https://neovet.neofox.cl/api/getMascotasPorNombre/" + nombre);
  }
}
